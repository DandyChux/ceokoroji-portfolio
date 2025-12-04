use crate::handlers::contact::send_contact_email;
use crate::handlers::{auth, posts, projects, repositories};
use actix_web::{HttpResponse, web};

pub fn init(cfg: &mut web::ServiceConfig, api_version: String) {
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
            .service(web::scope("/contact").route("", web::post().to(send_contact_email)))
            .service(
                web::scope("/auth")
                    .service(auth::login)
                    .service(auth::logout)
                    .service(auth::verify_session),
            )
            .service(web::scope("/repos").service(repositories::get_repository))
            .service(
                web::scope("/projects")
                    .service(projects::get_projects)
                    .service(projects::get_project)
                    .service(projects::create_project)
                    .service(projects::update_project)
                    .service(projects::delete_project),
            ),
    );
}
