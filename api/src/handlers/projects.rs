use actix_web::{
    HttpResponse, delete, get, post, put,
    web::{self, Data},
};
use serde_json::json;
use tracing::error;

use crate::{
    AppState,
    error::{AppError, AppResult},
    middleware::auth::AdminAuth,
    schemas::project::{
        Project, ProjectCreate, ProjectDelete, ProjectResponse, ProjectUpdate, Skill,
    },
};

/// Helper function to fetch skills for a project
async fn fetch_project_skills(
    pool: &sqlx::PgPool,
    project_id: i32,
) -> Result<Vec<Skill>, sqlx::Error> {
    sqlx::query_as::<_, Skill>(
        r#"
		SELECT * FROM skills s
		INNER JOIN project_skills ps on s.id = ps.skill_id
		WHERE ps.project_id = $1
		ORDER BY s.display_order
		"#,
    )
    .bind(project_id)
    .fetch_all(pool)
    .await
}

/// Helper function to update project skills in junction table
async fn update_project_skills(
    pool: &sqlx::PgPool,
    project_id: i32,
    skill_ids: &[i32],
) -> Result<(), sqlx::Error> {
    // Delete existing associations
    sqlx::query("DELETE FROM project_skills WHERE project_id = $1")
        .bind(project_id)
        .execute(pool)
        .await?;

    // Insert new associations
    for skill_id in skill_ids {
        sqlx::query("INSERT INTO project_skills (project_id, skill_id) VALUES ($1, $2)")
            .bind(project_id)
            .bind(skill_id)
            .execute(pool)
            .await?;
    }

    Ok(())
}

#[get("")]
pub async fn get_projects(app_state: web::Data<AppState>) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    let project_rows = sqlx::query_as::<_, Project>("SELECT * FROM projects")
        .fetch_all(pool)
        .await?;

    // Fetch skills for each project
    let mut projects = Vec::with_capacity(project_rows.len());
    for row in project_rows {
        let skills = fetch_project_skills(pool, row.id).await?;
        projects.push(ProjectResponse::from_row_with_skills(row, skills));
    }

    Ok(HttpResponse::Ok().json(projects))
}

#[get("/{id}")]
pub async fn get_project(
    app_state: web::Data<AppState>,
    id: web::Path<i32>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;
    let project_id = id.into_inner();

    let row = sqlx::query_as::<_, Project>("SELECT * FROM projects WHERE id = $1")
        .bind(project_id)
        .fetch_one(pool)
        .await?;

    let skills = fetch_project_skills(pool, project_id).await?;
    let project = ProjectResponse::from_row_with_skills(row, skills);

    Ok(HttpResponse::Ok().json(project))
}

#[post("")]
pub async fn create_project(
    _auth: AdminAuth,
    app_state: web::Data<AppState>,
    project: web::Json<ProjectCreate>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    // Start a transaction
    let mut tx = pool.begin().await?;

    // Insert the project
    let row = sqlx::query_as::<_, Project>(
        r#"
        INSERT INTO projects (name, description, image_url, github_url, live_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        "#,
    )
    .bind(&project.name)
    .bind(&project.description)
    .bind(&project.image_url)
    .bind(&project.github_url)
    .bind(&project.live_url)
    .fetch_one(&mut *tx)
    .await?;

    // Insert skill associations
    for skill_id in &project.skill_ids {
        sqlx::query("INSERT INTO project_skills (project_id, skill_id) VALUES ($1, $2)")
            .bind(row.id)
            .bind(skill_id)
            .execute(&mut *tx)
            .await?;
    }

    // Commit transaction
    tx.commit().await?;

    // Fetch the complete project with skills
    let skills = fetch_project_skills(pool, row.id).await?;
    let result = ProjectResponse::from_row_with_skills(row, skills);

    Ok(HttpResponse::Created().json(result))
}

#[put("/{id}")]
pub async fn update_project(
    _auth: AdminAuth,
    app_state: web::Data<AppState>,
    id: web::Path<i32>,
    project: web::Json<ProjectUpdate>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;
    let project_id = id.into_inner();

    let mut tx = pool.begin().await?;

    // Update project fields
    let row = sqlx::query_as::<_, Project>(
        r#"
        UPDATE projects SET
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            image_url = COALESCE($3, image_url),
            github_url = COALESCE($4, github_url),
            live_url = COALESCE($5, live_url)
        WHERE id = $6
        RETURNING *
        "#,
    )
    .bind(&project.name)
    .bind(&project.description)
    .bind(&project.image_url)
    .bind(&project.github_url)
    .bind(&project.live_url)
    .bind(project_id)
    .fetch_one(&mut *tx)
    .await?;

    // Update skills if provided
    if let Some(skill_ids) = &project.skill_ids {
        // Delete existing and insert new
        sqlx::query("DELETE FROM project_skills WHERE project_id = $1")
            .bind(project_id)
            .execute(&mut *tx)
            .await?;

        for skill_id in skill_ids {
            sqlx::query("INSERT INTO project_skills (project_id, skill_id) VALUES ($1, $2)")
                .bind(project_id)
                .bind(skill_id)
                .execute(&mut *tx)
                .await?;
        }
    }

    tx.commit().await?;

    let skills = fetch_project_skills(pool, row.id).await?;
    let result = ProjectResponse::from_row_with_skills(row, skills);

    Ok(HttpResponse::Ok().json(result))
}

#[delete("/{id}")]
pub async fn delete_project(
    _auth: AdminAuth,
    app_state: web::Data<AppState>,
    id: web::Path<i32>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    // Junction table entries are deleted automatically via ON DELETE CASCADE
    sqlx::query("DELETE FROM projects WHERE id = $1")
        .bind(id.into_inner())
        .execute(pool)
        .await?;

    Ok(HttpResponse::NoContent().finish())
}
