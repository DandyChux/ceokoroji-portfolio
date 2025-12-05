use crate::error::AppResult;
use crate::rate_limiter::extract_and_check_rate_limit;
use crate::{AppState, error::AppError};
use actix_session::Session;
use actix_web::{HttpRequest, HttpResponse, get, post, web};
use argon2::{Argon2, PasswordHash, PasswordVerifier};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Deserialize, ToSchema)]
pub struct LoginRequest {
    password: String,
}

#[derive(Serialize, ToSchema)]
pub struct AuthResponse {
    success: bool,
    message: String,
}

const SESSION_USER_KEY: &str = "admin_authenticated";

#[utoipa::path(
    post,
    path = "/auth/login",
    responses(
        (status = 200, description = "Login successful", body = AuthResponse),
        (status = 401, description = "Invalid credentials", body = AuthResponse),
        (status = 429, description = "Rate limit exceeded", body = AuthResponse),
    ),
    tag = "Authentication"
)]
#[post("/login")]
pub async fn login(
    req: HttpRequest,
    session: Session,
    body: web::Json<LoginRequest>,
    state: web::Data<AppState>,
) -> AppResult<HttpResponse> {
    let ip = extract_and_check_rate_limit(&req, &state).await?;

    let stored_hash = &state.env.admin_password_hash;
    let parsed_hash = PasswordHash::new(&stored_hash).map_err(|e| AppError::from(e))?;

    let argon2 = Argon2::default();

    match argon2.verify_password(body.password.as_bytes(), &parsed_hash) {
        Ok(_) => {
            // Success: reset rate limit
            state.rate_limiter.reset(ip).await;

            session
                .insert(SESSION_USER_KEY, true)
                .map_err(|e| AppError::from(e))?;

            Ok(HttpResponse::Ok().json(AuthResponse {
                success: true,
                message: "Authentication successful".to_string(),
            }))
        }
        Err(e) => {
            tracing::error!("✗ Password verification failed: {:?}", e);
            Err(AppError::Unauthorized("Invalid password".to_string()))
        }
    }
}

#[utoipa::path(
    post,
    path = "/auth/logout",
    responses(
        (status = 200, description = "Logout successful", body = AuthResponse),
    ),
    tag = "Authentication"
)]
#[post("/logout")]
pub async fn logout(
    req: HttpRequest,
    session: Session,
    state: web::Data<AppState>,
) -> AppResult<HttpResponse> {
    // No rate limiting needed for logout, but easy to add if you want
    session.purge();
    Ok(HttpResponse::Ok().json(AuthResponse {
        success: true,
        message: "Logged out successfully".to_string(),
    }))
}

#[utoipa::path(
    get,
    path = "/auth/verify",
    responses(
        (status = 200, description = "Verification successful", body = AuthResponse),
        (status = 401, description = "Not authenticated", body = AuthResponse),
        (status = 429, description = "Rate limit exceeded", body = AuthResponse),
    ),
    tag = "Authentication"
)]
#[get("/verify")]
pub async fn verify_session(
    req: HttpRequest,
    session: Session,
    state: web::Data<AppState>,
) -> AppResult<HttpResponse> {
    let _ip = extract_and_check_rate_limit(&req, &state).await?;

    match session.get::<bool>(SESSION_USER_KEY) {
        Ok(Some(true)) => Ok(HttpResponse::Ok().json(AuthResponse {
            success: true,
            message: "Authenticated".to_string(),
        })),
        Ok(Some(false)) | Ok(None) => Ok(HttpResponse::Unauthorized().json(AuthResponse {
            success: false,
            message: "Not authenticated".to_string(),
        })),
        Err(e) => {
            tracing::error!("✗ Failed to get session user key: {:?}", e);
            Err(AppError::SessionGet(e))
        }
    }
}
