use crate::handlers::{auth, contact, posts, projects, repositories};
use actix_web::{HttpResponse, http::header, web};

pub fn init(cfg: &mut web::ServiceConfig, api_version: String) {
    // Redirect /swagger-ui to /swagger-ui/index.html
    cfg.route(
        "/swagger-ui",
        web::get().to(|| async {
            HttpResponse::Found()
                .insert_header((header::LOCATION, "/swagger-ui/index.html"))
                .finish()
        }),
    );

    cfg.service(
        web::scope(&format!("/v{}", api_version))
            .service(
                web::resource("/healthcheck").route(web::get().to(|| async { HttpResponse::Ok() })),
            )
            .service(
                web::scope("/posts")
                    .service(posts::get_posts)
                    .service(posts::get_all_posts)
                    .service(posts::get_post_by_slug)
                    .service(posts::create_post)
                    .service(posts::update_post)
                    .service(posts::delete_post),
            )
            .service(web::scope("/contact").service(contact::send_contact_email))
            .service(
                web::scope("/auth")
                    .service(auth::login)
                    .service(auth::logout)
                    .service(auth::verify_session),
            )
            .service(web::scope("/repos").service(repositories::get_repository))
            .service(
                web::scope("/projects")
                    .service(projects::get_skills)
                    .service(projects::get_skills_with_category)
                    .service(projects::create_skill)
                    .service(projects::get_projects)
                    .service(projects::create_project)
                    .service(projects::get_project)
                    .service(projects::update_project)
                    .service(projects::delete_project)
                    .service(projects::get_project_skills),
            ),
    );
}
