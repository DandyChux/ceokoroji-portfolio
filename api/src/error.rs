use std::fmt;

use actix_web::{HttpRequest, HttpResponse, Responder, body::BoxBody};

#[derive(Debug)]
pub enum AppError {
    NotFound,
    Unauthorized,
    BadRequest(String),
    Internal(String),
    Conflict(String),
    Database(sqlx::Error),
    Validation(String),
    Config(String),
    Uuid(uuid::Error),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::Database(e) => write!(f, "Database error: {}", e),
            AppError::NotFound => write!(f, "Not found"),
            AppError::Unauthorized => write!(f, "Unauthorized"),
            AppError::BadRequest(msg) => write!(f, "Bad request: {}", msg),
            AppError::Internal(msg) => write!(f, "Internal server error: {}", msg),
            AppError::Conflict(msg) => write!(f, "Conflict: {}", msg),
            AppError::Validation(msg) => write!(f, "Validation error: {}", msg),
            AppError::Config(msg) => write!(f, "Configuration error: {}", msg),
            AppError::Uuid(e) => write!(f, "UUID error: {}", e),
        }
    }
}

impl std::error::Error for AppError {}

impl Into<std::io::Error> for AppError {
    fn into(self) -> std::io::Error {
        match self {
            AppError::Database(e) => std::io::Error::new(std::io::ErrorKind::Other, e),
            AppError::NotFound => std::io::Error::new(std::io::ErrorKind::NotFound, "Not found"),
            AppError::Unauthorized => {
                std::io::Error::new(std::io::ErrorKind::PermissionDenied, "Unauthorized")
            }
            AppError::BadRequest(msg) => std::io::Error::new(std::io::ErrorKind::InvalidInput, msg),
            AppError::Internal(msg) => std::io::Error::new(std::io::ErrorKind::Other, msg),
            AppError::Conflict(msg) => std::io::Error::new(std::io::ErrorKind::AlreadyExists, msg),
            AppError::Validation(msg) => std::io::Error::new(std::io::ErrorKind::InvalidInput, msg),
            AppError::Config(msg) => std::io::Error::new(std::io::ErrorKind::Other, msg),
            AppError::Uuid(e) => std::io::Error::new(std::io::ErrorKind::Other, e),
        }
    }
}

impl From<std::io::Error> for AppError {
    fn from(err: std::io::Error) -> Self {
        AppError::Internal(err.to_string())
    }
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        AppError::Database(err)
    }
}

impl From<validator::ValidationErrors> for AppError {
    fn from(err: validator::ValidationErrors) -> Self {
        AppError::Validation(err.to_string())
    }
}

impl From<sqlx::migrate::MigrateError> for AppError {
    fn from(err: sqlx::migrate::MigrateError) -> Self {
        AppError::Database(sqlx::Error::Migrate(Box::new(err)))
    }
}

impl From<uuid::Error> for AppError {
    fn from(err: uuid::Error) -> Self {
        AppError::Uuid(err)
    }
}

impl Responder for AppError {
    type Body = BoxBody;

    fn respond_to(self, req: &HttpRequest) -> HttpResponse<Self::Body> {
        match self {
            AppError::NotFound => HttpResponse::NotFound().finish(),
            AppError::Unauthorized => HttpResponse::Unauthorized().finish(),
            AppError::BadRequest(msg) => HttpResponse::BadRequest().body(msg),
            AppError::Internal(msg) => HttpResponse::InternalServerError().body(msg),
            AppError::Database(msg) => HttpResponse::InternalServerError().body(msg.to_string()),
            AppError::Conflict(msg) => HttpResponse::Conflict().body(msg),
            AppError::Validation(msg) => HttpResponse::BadRequest().body(msg),
            AppError::Config(msg) => HttpResponse::InternalServerError().body(msg),
            AppError::Uuid(msg) => HttpResponse::InternalServerError().body(msg.to_string()),
        }
    }
}

pub type AppResult<T> = Result<T, AppError>;
