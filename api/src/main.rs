mod config;
mod db;
mod error;
mod handlers;
mod routes;
mod schemas;

use crate::config::Config;
use crate::db::create_pool;
use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::{App, HttpServer, http::header, web};
use config::ENV_CONFIG;
use sqlx::PgPool;
use tracing::error;

#[derive(Clone)]
pub struct AppState {
    db: PgPool,
    env: Config,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        .init();

    let pool = match create_pool().await {
        Ok(pool) => pool,
        Err(err) => {
            error!("Failed to create database pool: {}", err);
            std::process::exit(1);
        }
    };

    let app_state = AppState {
        db: pool,
        env: ENV_CONFIG.clone(),
    };

    // Build the application router
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_methods(vec!["GET", "POST", "PATCH", "DELETE"])
            .allowed_headers(vec![
                header::CONTENT_TYPE,
                header::AUTHORIZATION,
                header::ACCEPT,
            ])
            .supports_credentials();

        App::new()
            .app_data(web::Data::new(app_state.clone()))
            .configure(routes::init)
            .wrap(cors)
            .wrap(Logger::default())
    })
    .bind((ENV_CONFIG.server_host.clone(), ENV_CONFIG.port))?
    .run()
    .await
}
