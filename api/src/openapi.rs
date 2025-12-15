use utoipa::OpenApi;
use utoipa::openapi::{Info, ServerBuilder};

use crate::handlers::{auth, contact, posts, projects, repositories};
use crate::schemas::post::{CreatePost, Post, UpdatePost};
use crate::schemas::project::{
    Project, ProjectCreate, ProjectResponse, ProjectUpdate, Skill, SkillCategory, SkillLevel,
};

#[derive(OpenApi)]
#[openapi(
    paths(
        // Projects
        projects::get_projects,
        projects::get_project,
        projects::create_project,
        projects::update_project,
        projects::delete_project,
        projects::reorder_projects,
        projects::get_project_skills,
        projects::get_skills_with_category,
        projects::get_skills,
        projects::create_skill,
        // Posts
        posts::get_posts,
        posts::get_all_posts,
        posts::get_post_by_slug,
        posts::create_post,
        posts::update_post,
        posts::delete_post,
        // Auth
        auth::login,
        auth::logout,
        auth::verify_session,
        // Contact
        contact::send_contact_email,
        // Repositories
        repositories::get_repository,
    ),
    components(
        schemas(
            Project, ProjectCreate, ProjectUpdate, ProjectResponse,
            Post, CreatePost, UpdatePost,
            Skill, SkillCategory, SkillLevel,
        )
    ),
    tags(
        (name = "Projects", description = "Project management"),
        (name = "Posts", description = "Blog post management"),
        (name = "Auth", description = "Authentication"),
    )
)]
pub struct ApiDoc;

impl ApiDoc {
    pub fn with_version(version: &str) -> utoipa::openapi::OpenApi {
        let mut doc = Self::openapi();

        doc.info = Info::builder()
            .title("Ceokoroji Portfolio API")
            .version(version)
            .description(Some("Personal portfolio API"))
            .build();

        doc.servers = Some(vec![
            ServerBuilder::new()
                .url(format!("/v{}", version))
                .description(Some("API server"))
                .build(),
        ]);

        doc
    }
}
