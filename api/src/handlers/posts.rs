use actix_web::{
    HttpResponse, delete, get, post, put,
    web::{self, Data},
};
use serde_json::json;
use tracing::error;
use validator::Validate;

use crate::{
    AppState,
    error::{AppError, AppResult},
    middleware::auth::AdminAuth,
    schemas::post::{CreatePost, Post, UpdatePost},
};

#[utoipa::path(
    get,
    path = "/posts",
    responses(
        (status = 200, description = "List of published posts", body = Vec<Post>)
    ),
    tag = "Posts"
)]
#[get("")]
pub async fn get_posts(app_state: web::Data<AppState>) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    let result = sqlx::query_as::<_, Post>(
        "SELECT id, title, date, description, published, tags, category, content, slug FROM posts WHERE published = true ORDER BY date DESC"
    )
    .fetch_all(pool)
    .await;

    match result {
        Ok(posts) => Ok(HttpResponse::Ok().json(posts)),
        Err(e) => Err(AppError::Internal("Failed to fetch posts".to_string())),
    }
}

#[utoipa::path(
    get,
    path = "/posts/admin",
    responses(
        (status = 200, description = "List of all posts", body = Vec<Post>),
        (status = 401, description = "Unauthorized")
    ),
    tag = "Posts",
    security(("session" = []))
)]
#[get("/admin")]
pub async fn get_all_posts(app_state: web::Data<AppState>) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    let result = sqlx::query_as::<_, Post>(
        "SELECT id, title, date, description, published, tags, category, content, slug FROM posts ORDER BY date DESC"
    )
    .fetch_all(pool)
    .await;

    match result {
        Ok(posts) => Ok(HttpResponse::Ok().json(posts)),
        Err(e) => {
            error!("Failed to fetch posts: {:?}", e);
            Err(AppError::Internal("Failed to fetch posts".to_string()))
        }
    }
}

#[utoipa::path(
    get,
    path = "/posts/{slug}",
    responses(
        (status = 200, description = "Post found", body = Post),
        (status = 404, description = "Post not found")
    ),
    params(
        ("slug" = String, Path, description = "Post slug")
    ),
    tag = "Posts"
)]
#[get("/{slug}")]
pub async fn get_post_by_slug(
    app_state: web::Data<AppState>,
    slug: web::Path<String>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    let result = sqlx::query_as::<_, Post>(
        "SELECT id, title, date, description, published, tags, category, content, slug FROM posts WHERE slug = $1"
    )
    .bind(slug.as_str())
    .fetch_one(pool)
    .await;

    match result {
        Ok(post) => Ok(HttpResponse::Ok().json(post)),
        Err(sqlx::Error::RowNotFound) => Err(AppError::NotFound("Post not found".to_string())),
        Err(e) => {
            error!("Failed to fetch post: {:?}", e);
            Err(AppError::Internal("Failed to fetch post".to_string()))
        }
    }
}

#[utoipa::path(
    post,
    path = "/posts",
    request_body = CreatePost,
    responses(
        (status = 201, description = "Post created", body = Post),
        (status = 401, description = "Unauthorized")
    ),
    tag = "Posts",
    security(("session" = []))
)]
#[post("")]
pub async fn create_post(
    _auth: AdminAuth,
    app_state: web::Data<AppState>,
    new_post: web::Json<CreatePost>,
) -> AppResult<HttpResponse> {
    // Validate the input data
    new_post.validate()?;

    let category = new_post
        .category
        .clone()
        .unwrap_or_else(|| "General".to_string());
    let pool = &app_state.db;

    let result = sqlx::query_as::<_, Post>(
        "INSERT INTO posts (id, title, description, content, tags, category, slug, published)
         VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, false)
         RETURNING id, title, date, description, published, tags, category, content, slug",
    )
    .bind(&new_post.title)
    .bind(&new_post.description)
    .bind(&new_post.content)
    .bind(&new_post.tags)
    .bind(&category)
    .bind(&new_post.slug)
    .fetch_one(pool)
    .await;

    match result {
        Ok(post) => Ok(HttpResponse::Created().json(post)),
        Err(e) => {
            error!("Failed to create post: {:?}", e);
            Err(AppError::Internal("Failed to create post".to_string()))
        }
    }
}

#[utoipa::path(
    put,
    path = "/posts/{slug}",
    request_body = UpdatePost,
    responses(
        (status = 200, description = "Post updated", body = Post),
        (status = 401, description = "Unauthorized"),
        (status = 404, description = "Post not found")
    ),
    params(
        ("slug" = String, Path, description = "Post slug")
    ),
    tag = "Posts",
    security(("session" = []))
)]
#[put("/{slug}")]
pub async fn update_post(
    _auth: AdminAuth,
    app_state: web::Data<AppState>,
    slug: web::Path<String>,
    update_data: web::Json<UpdatePost>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    // Build dynamic UPDATE query based on provided fields
    let mut query = String::from("UPDATE posts SET updated_at = NOW()");
    let mut bind_count = 1;

    if update_data.title.is_some() {
        bind_count += 1;
        query.push_str(&format!(", title = ${}", bind_count));
    }
    if update_data.description.is_some() {
        bind_count += 1;
        query.push_str(&format!(", description = ${}", bind_count));
    }
    if update_data.content.is_some() {
        bind_count += 1;
        query.push_str(&format!(", content = ${}", bind_count));
    }
    if update_data.tags.is_some() {
        bind_count += 1;
        query.push_str(&format!(", tags = ${}", bind_count));
    }
    if update_data.category.is_some() {
        bind_count += 1;
        query.push_str(&format!(", category = ${}", bind_count));
    }
    if update_data.published.is_some() {
        bind_count += 1;
        query.push_str(&format!(", published = ${}", bind_count));
    }

    query.push_str(&format!(" WHERE slug = $1 RETURNING id, title, date, description, published, tags, category, content, slug"));

    let mut query_builder = sqlx::query_as::<_, Post>(&query);
    query_builder = query_builder.bind(slug.as_str());

    if let Some(title) = &update_data.title {
        query_builder = query_builder.bind(title);
    }
    if let Some(description) = &update_data.description {
        query_builder = query_builder.bind(description);
    }
    if let Some(content) = &update_data.content {
        query_builder = query_builder.bind(content);
    }
    if let Some(tags) = &update_data.tags {
        query_builder = query_builder.bind(tags);
    }
    if let Some(category) = &update_data.category {
        query_builder = query_builder.bind(category);
    }
    if let Some(published) = update_data.published {
        query_builder = query_builder.bind(published);
    }

    match query_builder.fetch_one(pool).await {
        Ok(post) => Ok(HttpResponse::Ok().json(post)),
        Err(sqlx::Error::RowNotFound) => Err(AppError::NotFound("Post not found".to_string())),
        Err(e) => Err(AppError::Internal("Failed to update post".to_string())),
    }
}

#[utoipa::path(
    delete,
    path = "/posts/{slug}",
    responses(
        (status = 200, description = "Post deleted"),
        (status = 401, description = "Unauthorized"),
        (status = 404, description = "Post not found")
    ),
    params(
        ("slug" = String, Path, description = "Post slug")
    ),
    tag = "Posts",
    security(("session" = []))
)]
#[delete("/{slug}")]
pub async fn delete_post(
    _auth: AdminAuth,
    app_state: web::Data<AppState>,
    slug: web::Path<String>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    let result = sqlx::query("DELETE FROM posts WHERE slug = $1")
        .bind(slug.as_str())
        .execute(pool)
        .await;

    match result {
        Ok(result) => {
            if result.rows_affected() == 0 {
                Err(AppError::NotFound("Post not found".to_string()))
            } else {
                Ok(HttpResponse::Ok().json(json!({ "message": "Post deleted successfully" })))
            }
        }
        Err(e) => {
            error!("Failed to delete post: {:?}", e);
            Err(AppError::Internal("Failed to delete post".to_string()))
        }
    }
}
