mod config;
mod db;
mod error;
mod handlers;
mod middleware;
mod openapi;
mod rate_limiter;
mod routes;
mod schemas;

use crate::config::Config;
use crate::db::create_pool;
use crate::error::{AppError, AppResult};
use crate::openapi::ApiDoc;
use actix_cors::Cors;
use actix_session::SessionMiddleware;
use actix_session::storage::CookieSessionStore;
use actix_web::cookie::{Key, SameSite};
use actix_web::middleware::Logger;
use actix_web::{App, HttpServer, http::header, web};
use rate_limiter::{RateLimiter, RateLimiterConfig};
use sqlx::PgPool;
use tracing::{error, info};
use utoipa_swagger_ui::SwaggerUi;

#[derive(Clone)]
pub struct AppState {
    db: PgPool,
    env: Config,
    rate_limiter: RateLimiter,
}

#[actix_web::main]
async fn main() -> AppResult<()> {
    // Load .env file if it exists (for local development)
    if dotenvy::from_filename(".env.local").is_err() {
        info!("No .env.local file found, using environment variables");
    }

    // Set default RUST_LOG if not set
    if std::env::var_os("RUST_LOG").is_none() {
        unsafe {
            std::env::set_var(
                "RUST_LOG",
                "debug,actix_web=debug,actix_server=info,sqlx=debug,actix_session=info",
            )
        };
    }

    // Initialize tracing
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .with_target(true)
        .with_line_number(true)
        .init();

    // Load env config
    let config = Config::init().map_err(|e| {
        error!("Configuration error: {}", e);
        e
    })?;

    let pool = match create_pool(&config.database_url).await {
        Ok(pool) => pool,
        Err(err) => {
            error!("Failed to create database pool: {}", err);
            std::process::exit(1);
        }
    };

    // Crate rate limiter
    let rate_limiter = RateLimiter::new(RateLimiterConfig {
        max_requests: 10,
        window_secs: 60,
    });

    // Create application state
    let app_state = AppState {
        db: pool,
        env: config.clone(),
        rate_limiter,
    };

    // Run migrations
    sqlx::migrate!().run(&app_state.db).await.map_err(|e| {
        error!("Failed to run migrations: {}", e);
        AppError::from(e)
    })?;

    info!("Database migrations completed");

    let host = config.server_host.clone();
    let port = config.port;

    // Create session key from config
    let secret_key = Key::from(config.session_secret_key.as_bytes());

    info!("Starting HTTP server at http://{}:{}", host, port);

    // Build the application router
    HttpServer::new(move || {
        let allowed_origins = config.allowed_origins.clone();
        let api_version = config.api_version.clone();

        let cors = Cors::default()
            .allowed_methods(vec!["GET", "POST", "PATCH", "DELETE"])
            .allowed_headers(vec![
                header::CONTENT_TYPE,
                header::AUTHORIZATION,
                header::ACCEPT,
            ])
            .allowed_origin_fn(move |origin, _req_head| {
                let allowed = allowed_origins.contains(&origin.to_str().unwrap().to_string());
                if !allowed {
                    info!("Blocked CORS request from {:?}", origin);
                }

                allowed
            })
            .supports_credentials();

        App::new()
            .app_data(web::Data::new(app_state.clone()))
            .service(
                SwaggerUi::new("/swagger-ui/{_:.*}")
                    .url("/api-docs/openapi.json", ApiDoc::with_version(&api_version)),
            )
            .wrap(actix_web::middleware::NormalizePath::trim())
            .wrap(
                SessionMiddleware::builder(CookieSessionStore::default(), secret_key.clone())
                    .cookie_name("admin_session".to_owned())
                    .cookie_secure(false)
                    .cookie_http_only(true)
                    .cookie_same_site(SameSite::Lax)
                    .build(),
            )
            .wrap(cors)
            .wrap(Logger::default())
            .configure(|cfg| routes::init(cfg, api_version))
    })
    .bind((host, port))?
    .run()
    .await
    .map_err(AppError::from)
}
