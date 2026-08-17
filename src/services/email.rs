use crate::error::{AppError, AppResult};
use base64::Engine;
use handlebars::{DirectorySourceOptions, Handlebars};
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

#[derive(Debug, Clone)]
pub struct MailgunClient {
	api_key: String,
	domain: String,
	client: reqwest::Client
}

impl MailgunClient {
	pub fn new(api_key: String, domain: String) -> Self {
		Self { api_key, domain, client: reqwest::Client::new() }
	}

	pub fn new_message(&self, from: String, subject: String, body: String) -> MailgunMessage {
		MailgunMessage { from, to: Vec::new(), cc: Vec::new(), bcc: Vec::new(), subject, body, attachments: Vec::new() }
	}

	pub async fn send_message(&self, message: MailgunMessage) -> AppResult<()> {
		let url = format!("https://api.mailgun.net/v3/{}/messages", self.domain);
		let mut form = reqwest::multipart::Form::new();

		form = form.text("from", message.from);
		form = form.text("subject", message.subject);
		form = form.text("html", message.body);

		for recipient in message.to {
			form = form.text("to", recipient);
		}

		for recipient in message.cc {
			form = form.text("cc", recipient);
		}

		for recipient in message.bcc {
			form = form.text("bcc", recipient);
		}

		for attachment in message.attachments {
			let filename = attachment.filename;

			let part = reqwest::multipart::Part::file(&attachment.path)
				.await
				.map_err(|e| {
					AppError::Email(format!("Failed to attach '{}': {}", filename, e))
				})?
				.file_name(filename.clone());

			form = form.part("attachment", part);
		}

        let response = self
            .client
            .post(&url)
            .header("Authorization", format!("Basic {}", base64::engine::general_purpose::STANDARD.encode(format!("api:{}", self.api_key))))
			.multipart(form)
			.send()
			.await
			.map_err(|e| AppError::Email(format!("Failed to send Mailgun message: {}", e)))?;

		if !response.status().is_success() {
			let status = response.status();

			let body = response
				.text()
				.await
				.map_err(|e| AppError::Email(format!("Failed to read Mailgun error response: {}", e)))?;

			return Err(AppError::Email(format!(
				"Mailgun request failed ({}): {}",
				status,
				body
			)));
		}
		Ok(())
	}
}

pub struct MailgunAttachment {
	pub filename: String,
	pub path: String
}

pub struct MailgunMessage {
	pub from: String,
	pub to: Vec<String>,
	pub cc: Vec<String>,
	pub bcc: Vec<String>,
	pub subject: String,
	pub body: String,
	pub attachments: Vec<MailgunAttachment>,
}

impl MailgunMessage {
	pub fn add_recipient(&mut self, to: String) {
		self.to.push(to);
	}

	pub fn add_bcc(&mut self, bcc: String) {
		self.bcc.push(bcc);
	}

	pub fn add_cc(&mut self, cc: String) {
		self.cc.push(cc);
	}

	pub fn add_attachment(&mut self, attachment: MailgunAttachment) {
		self.attachments.push(attachment);
	}

	pub fn set_subject(&mut self, subject: String) {
		self.subject = subject;
	}

	pub fn set_html(&mut self, html: String) {
		self.body = html;
	}

	pub fn set_text(&mut self, text: String) {
		self.body = text;
	}
}

#[derive(Serialize)]
pub struct ContactFormData {
    pub name: String,
    pub email: String,
    pub subject: String,
    pub message: String,
}

pub async fn send_contact_form(
	mailgun: &MailgunClient,
	data: ContactFormData
) -> AppResult<()> {
	let admin_email = env::var("ADMIN_EMAIL").unwrap_or_default();

    let body_html = TEMPLATES
        .render("contact-form", &data)
        .map_err(|e| AppError::Email(format!(
            "Failed to render contact form template: {}",
            e
        )))?;

    let mut message = mailgun.new_message(
        data.email.clone(),
        format!("Contact Form: {}", data.subject),
        body_html,
    );

    message.add_recipient(admin_email);

    mailgun.send_message(message).await
}
