use crate::error::{AppError, AppResult};
use handlebars::{DirectorySourceOptions, Handlebars};
use lettre::{
    AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor,
    message::{Mailbox, MultiPart, SinglePart, header::ContentType},
    transport::smtp::{
        authentication::Credentials,
        client::{Tls, TlsParameters},
    },
};
use serde::Serialize;
use std::{env, path::Path, sync::LazyLock};

// We use LazyLock to initialize the template engine once globally
static TEMPLATES: LazyLock<Handlebars<'static>> = LazyLock::new(|| {
    let mut hbars = Handlebars::new();

    let contact_form_template = r#"
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9fafb; padding: 30px; margin-top: 20px; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #4b5563; }
                .value { margin-top: 5px; padding: 10px; background-color: white; border-radius: 4px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Contact Form Submission</h1>
                </div>
                <div class="content">
                    <div class="field"><div class="label">Name:</div><div class="value">{{name}}</div></div>
                    <div class="field"><div class="label">Email:</div><div class="value">{{email}}</div></div>
                    <div class="field"><div class="label">Subject:</div><div class="value">{{subject}}</div></div>
                    <div class="field"><div class="label">Message:</div><div class="value">{{message}}</div></div>
                </div>
            </div>
        </body>
        </html>
    "#;

    hbars
        .register_template_string("contact-form", contact_form_template)
        .expect("Failed to register built-in contact-form template");

    // Attempt to load from directory if it exists
    if Path::new("templates/email").exists() {
        let mut options = DirectorySourceOptions::default();
        options.tpl_extension = ".html".to_string();

        if let Err(e) = hbars.register_templates_directory(".html", options) {
            eprintln!("Warning: Failed to load email templates from dir: {}", e);
        }
    }

    hbars
});

pub struct EmailConfig {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
    pub from: String,
}

impl EmailConfig {
    pub fn from_env() -> Self {
        let username = env::var("EMAIL_USERNAME").unwrap_or_default();
        let from = env::var("EMAIL_FROM").unwrap_or_else(|_| username.clone());
        let host = env::var("EMAIL_HOST").unwrap_or_else(|_| "smtp.gmail.com".to_string());

        let port = env::var("EMAIL_PORT")
            .unwrap_or_else(|_| "587".to_string())
            .parse::<u16>()
            .unwrap_or(587);

        Self {
            host,
            port,
            username,
            password: env::var("EMAIL_PASSWORD").unwrap_or_default(),
            from,
        }
    }
}

#[derive(Serialize)]
pub struct ContactFormData {
    pub name: String,
    pub email: String,
    pub subject: String,
    pub message: String,
}

pub struct EmailMessage {
    pub to: Vec<String>,
    pub cc: Vec<String>,
    pub bcc: Vec<String>,
    pub subject: String,
    pub reply_to: Option<String>,
    pub body_html: Option<String>,
    pub body_text: Option<String>,
}

pub async fn send_email(msg: EmailMessage) -> AppResult<()> {
    let config = EmailConfig::from_env();

    if config.username.is_empty() || config.password.is_empty() {
        return Err(AppError::Config(
            "Missing email configuration (username/password)".into(),
        ));
    }

    let from_address: Mailbox = config
        .from
        .parse()
        .map_err(|_| AppError::Email("Invalid 'From' address".into()))?;

    let mut builder = Message::builder()
        .from(from_address)
        .reply_to(msg.reply_to.unwrap_or_default().parse().unwrap())
        .subject(msg.subject);

    for to in msg.to {
        let to_addr: Mailbox = to
            .parse()
            .map_err(|_| AppError::Email(format!("Invalid 'To' address: {}", to)))?;
        builder = builder.to(to_addr);
    }

    for cc in msg.cc {
        let cc_addr: Mailbox = cc
            .parse()
            .map_err(|_| AppError::Email(format!("Invalid 'Cc' address: {}", cc)))?;
        builder = builder.cc(cc_addr);
    }

    let email_message = match (msg.body_html, msg.body_text) {
        (Some(html), Some(text)) => {
            builder.multipart(MultiPart::alternative_plain_html(text, html))
        }
        (Some(html), None) => builder.singlepart(
            SinglePart::builder()
                .header(ContentType::TEXT_HTML)
                .body(html),
        ),
        (None, Some(text)) => builder.singlepart(
            SinglePart::builder()
                .header(ContentType::TEXT_PLAIN)
                .body(text),
        ),
        (None, None) => return Err(AppError::Email("No email body provided".into())),
    }
    .map_err(|e| AppError::Email(format!("Failed to build email body: {}", e)))?;

    let creds = Credentials::new(config.username, config.password);

    // Build the TLS parameters using your host (smtp.gmail.com)
    let tls_params = TlsParameters::builder(config.host.clone())
        .build()
        .map_err(|e| AppError::Email(format!("Failed to build TLS parameters: {}", e)))?;

    // Determine the correct TLS mode based on the port
    // 465 = Implicit TLS (Wrapper), 587 = Explicit TLS (Required/STARTTLS)
    let tls_mode = if config.port == 465 {
        Tls::Wrapper(tls_params)
    } else {
        Tls::Required(tls_params)
    };

    let mailer: AsyncSmtpTransport<Tokio1Executor> =
        AsyncSmtpTransport::<Tokio1Executor>::builder_dangerous(&config.host)
            .port(config.port)
            .credentials(creds)
            .tls(tls_mode)
            .build();

    mailer
        .send(email_message)
        .await
        .map_err(|e| AppError::Email(format!("Failed to send email via SMTP: {}", e)))?;

    Ok(())
}

pub async fn send_contact_form(data: ContactFormData) -> AppResult<()> {
    let admin_email = env::var("ADMIN_EMAIL").unwrap_or_default();

    let body_html = TEMPLATES
        .render("contact-form", &data)
        .map_err(|e| AppError::Email(format!("Failed to render contact form template: {}", e)))?;

    let msg = EmailMessage {
        to: vec![admin_email],
        cc: vec![],
        bcc: vec![],
        reply_to: Some(data.email.clone()),
        subject: format!("Contact Form: {}", data.subject),
        body_html: Some(body_html),
        body_text: Some(format!(
            "Name: {}\nEmail: {}\nMessage: {}",
            data.name, data.email, data.message
        )),
    };

    send_email(msg).await
}

pub async fn send_subscription_notification(subscriber_email: &str) -> AppResult<()> {
    let admin_email = env::var("ADMIN_EMAIL").unwrap_or_default();

    let html = format!(
        "<h2>New Subscription</h2><p>A new user has subscribed:</p><p><strong>Email:</strong> {}</p>",
        subscriber_email
    );

    let msg = EmailMessage {
        to: vec![admin_email],
        cc: vec![],
        bcc: vec![],
        reply_to: None,
        subject: "New Subscription".to_string(),
        body_html: Some(html),
        body_text: Some(format!("New subscriber: {}", subscriber_email)),
    };

    send_email(msg).await
}
