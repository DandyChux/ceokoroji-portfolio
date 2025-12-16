use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow, ToSchema)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub date: DateTime<Utc>,
    pub description: String,
    pub published: bool,
    pub tags: Option<Vec<String>>,
    pub category: String,
    pub content: String,
    pub slug: String,
}

#[derive(Debug, Deserialize, ToSchema, Validate)]
pub struct CreatePost {
    pub title: String,
    #[validate(length(min = 2, max = 500))]
    pub description: String,
    pub content: String,
    pub tags: Option<Vec<String>>,
    pub category: Option<String>,
    pub slug: String,
    pub date: Option<DateTime<Utc>>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct UpdatePost {
    pub title: Option<String>,
    pub description: Option<String>,
    pub content: Option<String>,
    pub tags: Option<Vec<String>>,
    pub category: Option<String>,
    pub published: Option<bool>,
}
