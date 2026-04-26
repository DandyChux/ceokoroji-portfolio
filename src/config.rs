use serde::{Deserialize, Serialize};
use std::env;

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
            database_url: std::env::var("DATABASE_URL").expect("DATABASE_URL must be set"),
            port: std::env::var("PORT")
                .expect("PORT must be set")
                .parse()
                .expect("PORT must be a number"),
            server_host: std::env::var("SERVER_HOST").expect("SERVER_HOST must be set"),
            allowed_origins,
            admin_password_hash: std::env::var("ADMIN_PASSWORD_HASH")
                .expect("ADMIN_PASSWORD_HASH must be set"),
            session_secret_key: std::env::var("SESSION_SECRET_KEY")
                .expect("SESSION_SECRET_KEY must be set"),
            session_timeout_hours: std::env::var("SESSION_TIMEOUT_HOURS")
                .unwrap_or("24".to_string())
                .parse()
                .unwrap_or(24),
            rate_limit_max_requests: std::env::var("RATE_LIMIT_MAX_REQUESTS")
                .unwrap_or("5".to_string())
                .parse()
                .unwrap_or(5),
            rate_limit_window_secs: std::env::var("RATE_LIMIT_WINDOW_SECS")
                .unwrap_or("60".to_string())
                .parse()
                .unwrap_or(60),
            github_access_token: std::env::var("GITHUB_ACCESS_TOKEN")
                .expect("GITHUB_ACCESS_TOKEN must be set"),
        })
    }
}
