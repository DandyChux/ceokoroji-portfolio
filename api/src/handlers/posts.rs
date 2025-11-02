use actix_web::{
    HttpResponse, Responder,
    web::{self, Data},
};
use serde_json::json;
use tracing::error;
use uuid::Uuid;

use crate::{
    AppState,
    schemas::post::{NewPost, Post},
};

pub async fn get_posts(app_state: web::Data<AppState>) -> impl Responder {
    let pool = &app_state.db;

    let result = sqlx::query_as::<_, Post>(
        "SELECT id, title, date, description, published, tags, category::text as category, content, slug FROM posts"
    )
    .fetch_all(pool)
    .await;

    match result {
        Ok(posts) => HttpResponse::Ok().json(json!({ "data": posts })),
        Err(e) => {
            error!("Failed to fetch posts: {:?}", e);
            HttpResponse::InternalServerError().json(json!({ "error": "Failed to fetch posts" }))
        }
    }
}

pub async fn get_post_by_id(
    app_state: web::Data<AppState>,
    id: web::Path<String>,
) -> impl Responder {
    let pool = &app_state.db;

    let result = sqlx::query_as::<_, Post>(
        "SELECT id, title, date, description, published, tags, category::text as category, content, slug FROM posts WHERE id = $1"
    )
    .bind(id.as_str())
    .fetch_one(pool)
    .await;

    match result {
        Ok(post) => HttpResponse::Ok().json(post),
        Err(sqlx::Error::RowNotFound) => {
            HttpResponse::NotFound().json(json!({ "error": "Post not found" }))
        }
        Err(e) => {
            error!("Failed to fetch post: {:?}", e);
            HttpResponse::InternalServerError().json(json!({ "error": "Failed to fetch post" }))
        }
    }
}

pub async fn create_post(
    app_state: web::Data<AppState>,
    new_post: web::Json<NewPost>,
) -> impl Responder {
    let id = Uuid::new_v4().to_string();
    let category = new_post
        .category
        .clone()
        .unwrap_or_else(|| "General".to_string());
    let pool = &app_state.db;

    let result = sqlx::query_as::<_, Post>(
        "INSERT INTO posts (id, title, description, content, tags, category, slug, published)
         VALUES ($1, $2, $3, $4, $5, $6::categories, $7, false)
         RETURNING id, title, date, description, published, tags, category::text as category, content, slug"
    )
    .bind(&id)
    .bind(&new_post.title)
    .bind(&new_post.description)
    .bind(&new_post.content)
    .bind(&new_post.tags)
    .bind(&category)
    .bind(&new_post.slug)
    .fetch_one(pool)
    .await;

    match result {
        Ok(post) => HttpResponse::Created().json(post),
        Err(e) => {
            error!("Failed to create post: {:?}", e);
            HttpResponse::InternalServerError().json(json!({ "error": "Failed to create post" }))
        }
    }
}
