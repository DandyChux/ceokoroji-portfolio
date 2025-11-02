use dotenvy::dotenv;
use serde::{Deserialize, Serialize};
use std::env;
use std::sync::LazyLock;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Config {
    pub api_version: String,
    pub database_url: String,
    pub server_host: String,
    pub port: u16,
    // pub secret_key: String,
}

impl Config {
    pub fn init() -> Self {
        if std::env::var_os("RUST_LOG").is_none() {
            // std::env::set_var("RUST_LOG", "actix_web=debug,sqlx=debug,info");
            unsafe {
                std::env::set_var(
                    "RUST_LOG",
                    "actix_web=info,actix_server=info,sqlx=info,debug",
                )
            };
        }

        // let environment;
        // if cfg!(debug_assertions) {
        //     // Load from `.env.local` in development
        //     from_filename(".env.local").ok().expect("Failed to load .env.local file");
        //     environment = "development";
        // } else {
        //     // Load from `.env` in production
        //     dotenv().ok().expect("Failed to load .env file");
        //     environment = "production";
        // }
        dotenv().ok().expect("Failed to load .env file");
        let environment = env::var("APP_ENV").unwrap_or_else(|_| "dev".to_string());

        Config {
            api_version: "1.0".to_string(),
            database_url: std::env::var("DATABASE_URL").expect("DATABASE_URL must be set"),
            port: std::env::var("PORT")
                .expect("PORT must be set")
                .parse()
                .expect("PORT must be a number"),
            server_host: std::env::var("SERVER_HOST").expect("SERVER_HOST must be set"),
            // secret_key: std::env::var("SECRET_KEY").expect("SECRET_KEY must be set"),
        }
    }
}

pub static ENV_CONFIG: LazyLock<Config> = LazyLock::new(|| Config::init());
