use actix_web::{HttpResponse, Responder, post, web};
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};
use serde_json::json;
use tracing::error;
use validator::Validate;

use crate::error::{AppError, AppResult};
use crate::schemas::contact::ContactForm;

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
pub async fn send_contact_email(form: web::Json<ContactForm>) -> AppResult<HttpResponse> {
    // Validate the form
    form.validate()?;

    let sendgrid_api_key = std::env::var("SENDGRID_API_KEY").expect("SENDGRID_API_KEY must be set");

    let msg_text = format!(
        "Name: {}\nEmail: {}\nMessage: {}",
        form.name, form.email, form.message
    );

    let email = Message::builder()
        .from("dandychux@gmail.com".parse().unwrap())
        .to("ceo.okoroji@outlook.com".parse().unwrap())
        .subject("New Message from Contact Form")
        .body(msg_text.clone())
        .unwrap();

    // Use SendGrid SMTP
    let creds = Credentials::new("apikey".to_string(), sendgrid_api_key);
    let mailer = SmtpTransport::relay("smtp.sendgrid.net")
        .unwrap()
        .credentials(creds)
        .build();

    match mailer.send(&email) {
        Ok(_) => Ok(HttpResponse::Ok().json(json!({ "message": "Message sent successfully" }))),
        Err(e) => {
            error!("Failed to send email: {:?}", e);
            Err(AppError::Internal(e.to_string()))
        }
    }
}
