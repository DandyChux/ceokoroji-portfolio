use actix_web::{HttpResponse, post, web};
use serde_json::json;
use tracing::error;
use validator::Validate;

use crate::AppState;
use crate::error::{AppError, AppResult};
use crate::models::contact::ContactForm;
use crate::services::email::{ContactFormData, send_contact_form};

#[utoipa::path(
    post,
    path = "/contact",
    request_body = ContactForm,
    responses(
        (status = 200, description = "Message sent successfully"),
        (status = 500, description = "Internal server error")
    )
)]
#[post("")]
pub async fn send_contact_email(
	state: web::Data<AppState>,
	form: web::Json<ContactForm>
) -> AppResult<HttpResponse> {
    // Validate the form
    form.validate()?;

    let data = ContactFormData {
        name: form.name.clone(),
        email: form.email.clone(),
        subject: "New Message from Contact Form".to_string(),
        message: form.message.clone(),
    };

    match send_contact_form(&state.mailgun, data).await {
        Ok(_) => Ok(HttpResponse::Ok().json(json!({ "message": "Message sent successfully" }))),
        Err(e) => {
            error!("Failed to send email: {:?}", e);
            Err(e)
        }
    }
}
