use actix_web::{
    HttpResponse, delete, get, post, put,
    web::{self, Data},
};
use tracing::error;

use crate::{
    AppState,
    error::{AppError, AppResult},
    schemas::repository::RepoResponse,
};

#[get("/{owner}/{repo}")]
pub async fn get_repository(
    app_state: Data<AppState>,
    path: web::Path<(String, String)>,
) -> AppResult<HttpResponse> {
    let (owner, repo) = path.into_inner();
    let client = reqwest::Client::new();
    let url = format!("https://api.github.com/repos/{}/{}", owner, repo);

    let response = client
        .get(&url)
        .header("User-Agent", "ceokoroji-portfolio")
        .header(
            "Authorization",
            format!("Bearer {}", app_state.env.github_access_token),
        )
        .header("Accept", "application/vnd.github.v3+json")
        .send()
        .await
        .map_err(|e| {
            error!("Failed to fetch repository: {:?}", e);
            AppError::from(e)
        })?;

    let status = response.status();

    if status.is_success() {
        let body = response.text().await.map_err(|e| AppError::from(e))?;
        let repo_response: RepoResponse = serde_json::from_str(&body).map_err(|e| {
            error!("Failed to parse GitHub response: {:?}", e);
            AppError::from(e)
        })?;
        Ok(HttpResponse::Ok().json(repo_response))
    } else if status.is_client_error() {
        Err(AppError::Forbidden(
            "You do not have permission to access this repository".to_string(),
        ))
    } else {
        let body = response
            .text()
            .await
            .unwrap_or_else(|_| "No response body".to_string());
        error!("GitHub API error ({}): {}", status, body);

        match status.as_u16() {
            403 => Err(AppError::Forbidden(format!(
                "Access denied to repository. Check your token permissions. GitHub says: {}",
                body
            ))),
            404 => Err(AppError::NotFound(
                "Repository not found or you don't have access".to_string(),
            )),
            _ => Err(AppError::Internal(format!("GitHub API error: {}", status))),
        }
    }
}
