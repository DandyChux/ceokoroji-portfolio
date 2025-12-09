use std::collections::{HashMap, HashSet};

use actix_web::{
    HttpResponse, delete, get, post, put,
    web::{self, Data},
};
use tracing::error;

use crate::{
    AppState,
    error::{AppError, AppResult},
    middleware::auth::AdminAuth,
    schemas::project::{
        GroupedSkillsResponse, Project, ProjectCreate, ProjectDelete, ProjectRequestQuery,
        ProjectResponse, ProjectUpdate, Skill, SkillCategory, SkillCategoryGroup, SkillCreate,
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

/// Get all projects
#[utoipa::path(
    get,
    path = "/projects",
    responses(
        (status = 200, description = "Projects retrieved"),
        (status = 401, description = "Unauthorized")
    ),
    tag = "Projects",
    security(("session" = []))
)]
#[get("")]
pub async fn get_projects(
    app_state: web::Data<AppState>,
    query: web::Query<ProjectRequestQuery>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    let query_str = match query.featured {
        Some(true) => "SELECT * FROM projects WHERE featured = true",
        _ => "SELECT * FROM projects",
    };

    let project_rows = sqlx::query_as::<_, Project>(query_str)
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

#[utoipa::path(
    get,
    path = "/projects/{id}",
    responses(
        (status = 200, description = "Project retrieved"),
        (status = 401, description = "Unauthorized"),
        (status = 404, description = "Project not found")
    ),
    params(
        ("id" = i32, Path, description = "Project ID")
    ),
    tag = "Projects",
    security(("session" = []))
)]
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

#[utoipa::path(
    post,
    path = "/projects",
    responses(
        (status = 201, description = "Project created"),
        (status = 401, description = "Unauthorized"),
        (status = 409, description = "Project already exists")
    ),
    request_body(
        content = ProjectCreate,
        description = "Project data"
    ),
    tag = "Projects",
    security(("session" = []))
)]
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
        INSERT INTO projects (name, description, image_url, github_url, live_url, featured)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        "#,
    )
    .bind(&project.name)
    .bind(&project.description)
    .bind(&project.image_url)
    .bind(&project.github_url)
    .bind(&project.live_url)
    .bind(project.featured)
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

#[utoipa::path(
    put,
    path = "/projects/{id}",
    responses(
        (status = 200, description = "Project updated"),
        (status = 401, description = "Unauthorized"),
        (status = 404, description = "Project not found")
    ),
    request_body(
        content = ProjectUpdate,
        description = "Project data"
    ),
    tag = "Projects",
    security(("session" = []))
)]
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

#[utoipa::path(
    delete,
    path = "/projects/{id}",
    responses(
        (status = 204, description = "Project deleted"),
        (status = 401, description = "Unauthorized"),
        (status = 404, description = "Project not found")
    ),
    params(
        ("id" = i32, Path, description = "Project ID")
    ),
    tag = "Projects",
    security(("session" = []))
)]
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

#[utoipa::path(
    get,
    path = "/projects/skill-categories",
    responses(
        (status = 200, description = "Skills retrieved", body = [Skill]),
        (status = 401, description = "Unauthorized")
    ),
    tag = "Skills",
    security(("session" = []))
)]
#[get("/skill-categories")]
pub async fn get_skills_with_category(
    _auth: AdminAuth,
    app_state: web::Data<AppState>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    let skills = sqlx::query_as::<_, Skill>("SELECT * FROM skills ORDER BY name ASC")
        .fetch_all(pool)
        .await?;

    let category_order = SkillCategory::all();

    let mut category_map: HashMap<SkillCategory, Vec<Skill>> = HashMap::new();

    for skill in skills {
        category_map
            .entry(skill.category.clone())
            .or_insert_with(Vec::new)
            .push(skill);
    }

    let mut categories: Vec<SkillCategoryGroup> = Vec::new();

    for category in category_order {
        if let Some(skills) = category_map.remove(&category) {
            categories.push(SkillCategoryGroup {
                name: category.to_string(),
                skills,
            });
        }
    }

    let response = GroupedSkillsResponse { categories };

    Ok(HttpResponse::Ok().json(response))
}

#[utoipa::path(
    get,
    path = "/projects/skills",
    responses(
        (status = 200, description = "Skills retrieved", body = [Skill]),
        (status = 401, description = "Unauthorized")
    ),
    tag = "Skills",
    security(("session" = []))
)]
#[get("/skills")]
pub async fn get_skills(
    _auth: AdminAuth,
    app_state: web::Data<AppState>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    let result = sqlx::query_as::<_, Skill>("SELECT * FROM skills ORDER BY name ASC")
        .fetch_all(pool)
        .await?;

    Ok(HttpResponse::Ok().json(result))
}

#[utoipa::path(
    get,
    path = "/{id}/skills",
    responses(
        (status = 200, description = "Project skills retrieved", body = [Skill]),
        (status = 401, description = "Unauthorized"),
        (status = 404, description = "Project not found")
    ),
    params(
        ("id" = i32, Path, description = "Project ID")
    ),
    tag = "Projects",
    security(("session" = []))
)]
#[get("/{id}/skills")]
pub async fn get_project_skills(
    app_state: web::Data<AppState>,
    id: web::Path<i32>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    let skills = fetch_project_skills(pool, id.into_inner()).await?;

    Ok(HttpResponse::Ok().json(skills))
}

#[utoipa::path(
    post,
    path = "/projects/skill",
    responses(
        (status = 201, description = "Skill created", body = Skill),
        (status = 401, description = "Unauthorized")
    ),
    request_body = SkillCreate,
    tag = "Skills",
    security(("session" = []))
)]
#[post("/skill")]
pub async fn create_skill(
    _auth: AdminAuth,
    app_state: web::Data<AppState>,
    skill: web::Json<SkillCreate>,
) -> AppResult<HttpResponse> {
    let pool = &app_state.db;

    let result = sqlx::query_as::<_, Skill>("INSERT INTO skills (name, description, level, category, icon_url) VALUES ($1, $2, $3, $4, $5) RETURNING *")
        .bind(&skill.name)
        .bind(&skill.description)
        .bind(&skill.level)
        .bind(&skill.category)
        .bind(&skill.icon_url)
        .fetch_one(pool)
        .await;

    match result {
        Ok(skill) => Ok(HttpResponse::Created().json(skill)),
        Err(e) => {
            tracing::error!("Failed to create skill: {:?}", e);
            Err(AppError::Database(e))
        }
    }
}
