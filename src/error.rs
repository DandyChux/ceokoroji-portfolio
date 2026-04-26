use actix_web::{HttpResponse, ResponseError, body::BoxBody, http::StatusCode};
use serde::Serialize;
use serde_json::json;
use std::fmt;

#[derive(Debug, Serialize)]
struct ErrorResponse {
    error: String,
    status: u16,
}

#[derive(Debug)]
pub enum AppError {
    NotFound(String),
    Unauthorized(String),
    BadRequest(String),
    Internal(String),
    Conflict(String),
    Database(sqlx::Error),
    Validation(String),
    Config(String),
    Uuid(uuid::Error),
    TooManyRequests(String),
    Argon2(argon2::password_hash::Error),
    SessionInsert(actix_session::SessionInsertError),
    SessionGet(actix_session::SessionGetError),
    Request(reqwest::Error),
    Json(serde_json::Error),
    Forbidden(String),
}

impl AppError {
    fn error_response_json(&self) -> ErrorResponse {
        let (status, message) = match self {
            AppError::NotFound(msg) => (StatusCode::NOT_FOUND, msg.clone()),
            AppError::Unauthorized(msg) => (StatusCode::UNAUTHORIZED, msg.clone()),
            AppError::BadRequest(msg) => (StatusCode::BAD_REQUEST, msg.clone()),
            AppError::Internal(msg) => (StatusCode::INTERNAL_SERVER_ERROR, msg.clone()),
            AppError::Database(e) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Database error: {}", e),
            ),
            AppError::Conflict(msg) => (StatusCode::CONFLICT, msg.clone()),
            AppError::Validation(msg) => (StatusCode::BAD_REQUEST, msg.clone()),
            AppError::Config(msg) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Configuration error: {}", msg),
            ),
            AppError::Uuid(e) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("UUID error: {}", e),
            ),
            AppError::TooManyRequests(msg) => (StatusCode::TOO_MANY_REQUESTS, msg.clone()),
            AppError::Argon2(_) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "Authentication error".to_string(),
            ),
            AppError::SessionInsert(e) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Session error: {}", e),
            ),
            AppError::SessionGet(e) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Session error: {}", e),
            ),
            AppError::Request(e) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("HTTP error: {}", e),
            ),
            AppError::Json(e) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("JSON error: {}", e),
            ),
            AppError::Forbidden(msg) => (StatusCode::FORBIDDEN, format!("Forbidden: {}", msg)),
        };

        ErrorResponse {
            error: message,
            status: status.as_u16(),
        }
    }
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::Database(e) => write!(f, "Database error: {}", e),
            AppError::NotFound(msg) => write!(f, "Not found: {}", msg),
            AppError::Unauthorized(msg) => write!(f, "Unauthorized: {}", msg),
            AppError::BadRequest(msg) => write!(f, "Bad request: {}", msg),
            AppError::Internal(msg) => write!(f, "Internal server error: {}", msg),
            AppError::Conflict(msg) => write!(f, "Conflict: {}", msg),
            AppError::Validation(msg) => write!(f, "Validation error: {}", msg),
            AppError::Config(msg) => write!(f, "Configuration error: {}", msg),
            AppError::Uuid(e) => write!(f, "UUID error: {}", e),
            AppError::TooManyRequests(msg) => write!(f, "Too Many Requests: {}", msg),
            AppError::Argon2(e) => write!(f, "Argon2 error: {}", e),
            AppError::SessionInsert(e) => write!(f, "Session insert error: {}", e),
            AppError::SessionGet(e) => write!(f, "Session get error: {}", e),
            AppError::Request(e) => write!(f, "Request error: {}", e),
            AppError::Json(e) => write!(f, "JSON error: {}", e),
            AppError::Forbidden(msg) => write!(f, "Forbidden: {}", msg),
        }
    }
}

impl std::error::Error for AppError {}

impl Into<std::io::Error> for AppError {
    fn into(self) -> std::io::Error {
        match self {
            AppError::Database(e) => std::io::Error::new(std::io::ErrorKind::Other, e),
            AppError::NotFound(msg) => std::io::Error::new(std::io::ErrorKind::NotFound, msg),
            AppError::Unauthorized(msg) => {
                std::io::Error::new(std::io::ErrorKind::PermissionDenied, msg)
            }
            AppError::BadRequest(msg) => std::io::Error::new(std::io::ErrorKind::InvalidInput, msg),
            AppError::Internal(msg) => std::io::Error::new(std::io::ErrorKind::Other, msg),
            AppError::Conflict(msg) => std::io::Error::new(std::io::ErrorKind::AlreadyExists, msg),
            AppError::Validation(msg) => std::io::Error::new(std::io::ErrorKind::InvalidInput, msg),
            AppError::Config(msg) => std::io::Error::new(std::io::ErrorKind::Other, msg),
            AppError::Uuid(e) => std::io::Error::new(std::io::ErrorKind::Other, e),
            AppError::TooManyRequests(msg) => std::io::Error::new(std::io::ErrorKind::Other, msg),
            AppError::Argon2(e) => std::io::Error::new(std::io::ErrorKind::Other, e.to_string()),
            AppError::SessionInsert(e) => {
                std::io::Error::new(std::io::ErrorKind::Other, e.to_string())
            }
            AppError::SessionGet(e) => {
                std::io::Error::new(std::io::ErrorKind::Other, e.to_string())
            }
            AppError::Request(e) => std::io::Error::new(std::io::ErrorKind::Other, e.to_string()),
            AppError::Json(e) => std::io::Error::new(std::io::ErrorKind::Other, e.to_string()),
            AppError::Forbidden(msg) => std::io::Error::new(std::io::ErrorKind::Other, msg),
        }
    }
}

impl From<std::io::Error> for AppError {
    fn from(err: std::io::Error) -> Self {
        match err.kind() {
            // std::io::ErrorKind::PermissionDenied => AppError::PermissionDenied(err.to_string()),
            std::io::ErrorKind::InvalidInput => AppError::BadRequest(err.to_string()),
            std::io::ErrorKind::Other => AppError::Internal(err.to_string()),
            _ => AppError::Internal(err.to_string()),
        }
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

impl From<argon2::password_hash::Error> for AppError {
    fn from(err: argon2::password_hash::Error) -> Self {
        AppError::Argon2(err)
    }
}

impl From<actix_session::SessionGetError> for AppError {
    fn from(err: actix_session::SessionGetError) -> Self {
        AppError::SessionGet(err)
    }
}

impl From<actix_session::SessionInsertError> for AppError {
    fn from(err: actix_session::SessionInsertError) -> Self {
        AppError::SessionInsert(err)
    }
}

impl From<reqwest::Error> for AppError {
    fn from(err: reqwest::Error) -> Self {
        AppError::Request(err)
    }
}

impl From<serde_json::Error> for AppError {
    fn from(err: serde_json::Error) -> Self {
        AppError::Json(err)
    }
}

impl ResponseError for AppError {
    fn error_response(&self) -> HttpResponse<BoxBody> {
        let response = self.error_response_json();
        let status =
            StatusCode::from_u16(response.status).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR);

        HttpResponse::build(status).json(json!({
            "error": response.error,
            "status": response.status
        }))
    }

    fn status_code(&self) -> StatusCode {
        match self {
            AppError::NotFound(_) => StatusCode::NOT_FOUND,
            AppError::Unauthorized(_) => StatusCode::UNAUTHORIZED,
            AppError::BadRequest(_) => StatusCode::BAD_REQUEST,
            AppError::Internal(_) => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::Database(_) => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::Conflict(_) => StatusCode::CONFLICT,
            AppError::Validation(_) => StatusCode::BAD_REQUEST,
            AppError::Config(_) => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::Uuid(_) => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::TooManyRequests(_) => StatusCode::TOO_MANY_REQUESTS,
            AppError::Argon2(_) => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::SessionInsert(_) => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::SessionGet(_) => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::Request(_) => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::Json(_) => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::Forbidden(_) => StatusCode::FORBIDDEN,
        }
    }
}

pub type AppResult<T> = Result<T, AppError>;
