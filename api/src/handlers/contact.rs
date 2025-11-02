use actix_web::{HttpResponse, Responder, web};
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};
use serde_json::json;
use tracing::error;
use validator::Validate;

use crate::schemas::contact::ContactForm;

pub async fn send_contact_email(form: web::Json<ContactForm>) -> impl Responder {
    // Validate the form
    if let Err(e) = form.validate() {
        return HttpResponse::BadRequest().json(json!({ "error": e.to_string() }));
    }

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
        Ok(_) => HttpResponse::Ok().json(json!({ "message": "Message sent successfully" })),
        Err(e) => {
            error!("Failed to send email: {:?}", e);
            HttpResponse::InternalServerError().json(json!({ "error": "Failed to send message" }))
        }
    }
}
