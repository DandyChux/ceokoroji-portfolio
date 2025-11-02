use crate::config::ENV_CONFIG;
use crate::handlers::{
    contact::send_contact_email,
    posts::{create_post, get_post_by_id, get_posts},
};
use actix_web::{HttpResponse, web};

pub fn init(app: &mut web::ServiceConfig) {
    app.service(
        web::scope(&format!("/api/v{}", ENV_CONFIG.api_version))
            .service(web::resource("/healthcheck").route(web::get().to(|| HttpResponse::Ok())))
            .service(
                web::scope("/posts")
                    .service(
                        web::resource("/")
                            .route(web::get().to(get_posts))
                            .route(web::post().to(create_post)),
                    )
                    .service(web::resource("/{id}").route(web::get().to(get_post_by_id))),
            )
            .service(
                web::scope("/contact")
                    .service(web::resource("/").route(web::post().to(send_contact_email))),
            ),
    );
}
