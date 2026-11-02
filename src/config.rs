use serde::{Deserialize, Serialize};
use std::{collections::HashSet, env, fmt};

use crate::error::AppError;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Config {
    pub api_version: String,
    pub database_url: String,
    pub server_host: String,
    pub port: u16,
    pub allowed_origins: Vec<String>,
    pub admin_password_hash: String,
    pub session_secret_key: String,
    pub session_timeout_hours: i64,
    pub rate_limit_max_requests: u32,
    pub rate_limit_window_secs: u64,
    pub github_access_token: String,
    pub mailgun_api_key: String,
    pub mailgun_domain: String,
    pub mailgun_from: String,
    #[serde(skip)]
    pub imgproxy: ImageProxyConfig,
}

#[derive(Clone, Default)]
pub struct ImageProxyConfig {
	pub endpoint: String,
	pub key: Vec<u8>,
	pub salt: Vec<u8>,
	pub allowed_hosts: HashSet<String>
}

// Avoid printing the signing secrets if this config is debug-logged.
impl fmt::Debug for ImageProxyConfig {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("ImageProxyConfig")
            .field("endpoint", &self.endpoint)
            .field("key", &"[REDACTED]")
            .field("salt", &"[REDACTED]")
            .field("allowed_hosts", &self.allowed_hosts)
            .finish()
    }
}

impl ImageProxyConfig {
    fn from_env() -> Result<Self, AppError> {
        let endpoint = env::var("IMGPROXY_URL")
            .unwrap_or_default()
            .trim_end_matches('/')
            .to_string();

        if endpoint.is_empty() {
            return Err(AppError::Config("IMGPROXY_URL is required".into()));
        }

        let key_hex = env::var("IMGPROXY_KEY").unwrap_or_default();
        let salt_hex = env::var("IMGPROXY_SALT").unwrap_or_default();
        if key_hex.is_empty() || salt_hex.is_empty() {
            return Err(AppError::Config(
                "IMGPROXY_KEY and IMGPROXY_SALT are required".into(),
            ));
        }

        let key = hex::decode(key_hex)
            .map_err(|err| AppError::Config(format!("decode IMGPROXY_KEY: {err}")))?;
        let salt = hex::decode(salt_hex)
            .map_err(|err| AppError::Config(format!("decode IMGPROXY_SALT: {err}")))?;

        let hosts = env::var("IMGPROXY_ALLOWED_HOSTS").unwrap_or_else(|_| {
            "cdn.sanity.io,blue-nomad.nyc3.cdn.digitaloceanspaces.com".into()
        });

        let allowed_hosts: HashSet<String> = hosts
            .split(',')
            .map(|host| host.trim().to_ascii_lowercase())
            .filter(|host| !host.is_empty())
            .collect();

        if allowed_hosts.is_empty() {
            return Err(AppError::Config(
                "IMGPROXY_ALLOWED_HOSTS must contain at least one host".into(),
            ));
        }

        Ok(Self {
            endpoint,
            key,
            salt,
            allowed_hosts,
        })
    }
}

impl Config {
    pub fn init() -> Result<Self, AppError> {
        let allowed_origins = env::var("ALLOWED_ORIGINS")
            .expect("ALLOWED_ORIGINS must be set")
            .split(',')
            .map(|origin| origin.trim().to_string())
            .collect();

        Ok(Config {
            api_version: "1.0".to_string(),
            database_url: std::env::var("DATABASE_URL")
                .map_err(|_| AppError::Config("DATABASE_URL must be set".into()))?,
            port: std::env::var("PORT")
                .map_err(|_| AppError::Config("PORT must be set".into()))?
                .parse()
                .map_err(|_| AppError::Config("PORT must be a number".into()))?,
            server_host: std::env::var("SERVER_HOST")
                .map_err(|_| AppError::Config("SERVER_HOST must be set".into()))?,
            allowed_origins,
            admin_password_hash: std::env::var("ADMIN_PASSWORD_HASH")
                .map_err(|_| AppError::Config("ADMIN_PASSWORD_HASH must be set".into()))?,
            session_secret_key: std::env::var("SESSION_SECRET_KEY")
                .map_err(|_| AppError::Config("SESSION_SECRET_KEY must be set".into()))?,
            session_timeout_hours: std::env::var("SESSION_TIMEOUT_HOURS")
                .unwrap_or("24".to_string())
                .parse()
                .map_err(|_| AppError::Config("SESSION_TIMEOUT_HOURS must be a number".into()))?,
            rate_limit_max_requests: std::env::var("RATE_LIMIT_MAX_REQUESTS")
                .unwrap_or("5".to_string())
                .parse()
                .map_err(|_| AppError::Config("RATE_LIMIT_MAX_REQUESTS must be a number".into()))?,
            rate_limit_window_secs: std::env::var("RATE_LIMIT_WINDOW_SECS")
                .unwrap_or("60".to_string())
                .parse()
                .map_err(|_| AppError::Config("RATE_LIMIT_WINDOW_SECS must be a number".into()))?,
            github_access_token: std::env::var("GITHUB_ACCESS_TOKEN")
                .map_err(|_| AppError::Config("GITHUB_ACCESS_TOKEN must be set".into()))?,
            mailgun_api_key: std::env::var("MAILGUN_API_KEY")
                .map_err(|_| AppError::Config("MAILGUN_API_KEY must be set".into()))?,
            mailgun_domain: std::env::var("MAILGUN_DOMAIN")
                .map_err(|_| AppError::Config("MAILGUN_DOMAIN must be set".into()))?,
            mailgun_from: env::var("MAILGUN_FROM")
                .map_err(|_| AppError::Config("MAILGUN_FROM must be set".into()))?,
            imgproxy: ImageProxyConfig::from_env()?,
        })
    }
}
