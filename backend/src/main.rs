use actix_web::{web, App, HttpServer, middleware};
use actix_cors::Cors;
use dotenvy::dotenv;

mod db;
mod handlers;
mod models;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load environment variables
    dotenv().ok();
    
    // Initialize logger
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    log::info!("Starting server...");

    // Create database pool
    let pool = db::create_pool()
        .await
        .expect("Failed to create database pool");

    // Run migrations
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("Failed to run migrations");

    log::info!("Database migrations completed");

    let bind_address = std::env::var("BIND_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8080".to_string());
    
    log::info!("Starting server on {}", bind_address);

    HttpServer::new(move || {
        let cors = Cors::permissive(); // Configure CORS as needed

        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .route("/api/posts", web::get().to(handlers::posts::get_posts))
            .route("/api/posts/{id}", web::get().to(handlers::posts::get_post_by_id))
            .route("/api/posts", web::post().to(handlers::posts::create_post))
            .route("/api/contact", web::post().to(handlers::contact::send_contact_email))
    })
    .bind(&bind_address)?
    .run()
    .await
}
