use crate::config::ENV_CONFIG;
use sqlx::{PgPool, postgres::PgPoolOptions};

use crate::error::AppResult;

pub async fn create_pool() -> AppResult<PgPool> {
    let database_url = &ENV_CONFIG.database_url;

    PgPoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await
        .map_err(|e| e.into())
}
