use actix_session::SessionExt;
use actix_web::{FromRequest, HttpRequest, dev::Payload};
use std::future::{Ready, ready};

use crate::error::AppError;

const SESSION_USER_KEY: &str = "admin_authenticated";

/// Extractor that validates admin authentication
/// Use this in handler function signatures to require auth
pub struct AdminAuth;

impl FromRequest for AdminAuth {
    type Error = AppError;
    // Ready<T> means it resolves immediately (no async needed)
    type Future = Ready<Result<Self, Self::Error>>;

    fn from_request(req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        let session = req.get_session();

        match session.get::<bool>(SESSION_USER_KEY) {
            // User is authenticated -> return Ok(AdminAuth)
            // This allows the handler to proceed
            Ok(Some(true)) => ready(Ok(AdminAuth)),

            // User is NOT authenticated -> return Err(...)
            // This short-circuits - handler never runs, 401 returned
            Ok(Some(false)) | Ok(None) => {
                ready(Err(AppError::Unauthorized("Not authenticated".to_string())))
            }

            // Session error
            Err(e) => ready(Err(AppError::Unauthorized("Session error".to_string()))),
        }
    }
}
