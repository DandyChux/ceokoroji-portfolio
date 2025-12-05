use actix_session::SessionExt;
use actix_web::{FromRequest, HttpRequest, dev::Payload};
use std::future::{Ready, ready};
use tracing::debug;

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

        debug!("Checking auth for path: {}", req.path());

        let result = session.get::<bool>(SESSION_USER_KEY);
        debug!("Session get result: {:?}", result);

        match result {
            Ok(Some(true)) => {
                debug!("Auth successful");
                ready(Ok(AdminAuth))
            }
            Ok(Some(false)) | Ok(None) => {
                debug!("Auth failed: not authenticated");
                ready(Err(AppError::Unauthorized("Not authenticated".to_string())))
            }
            Err(e) => {
                debug!("Auth failed: session error {:?}", e);
                ready(Err(AppError::Unauthorized("Session error".to_string())))
            }
        }
    }
}
