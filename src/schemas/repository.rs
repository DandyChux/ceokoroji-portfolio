use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use validator::Validate;

#[derive(Deserialize, Serialize, Validate, ToSchema)]
pub struct RepoResponse {
    pub stargazers_count: Option<u32>,
    pub forks_count: Option<u32>,
    pub watchers_count: Option<u32>,
    pub html_url: Option<String>,
    /// Contains any additional fields from the GitHub API response that aren't explicitly defined above
    #[serde(flatten)]
    pub extra: std::collections::HashMap<String, serde_json::Value>,
}
