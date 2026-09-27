use actix_web::{get, web, HttpRequest, HttpResponse};
use chrono::{DateTime, Utc};
use sqlx::FromRow;
use tracing::error;

use crate::{AppState, error::AppResult};

#[derive(Debug, FromRow)]
struct SitemapPost {
    slug: String,
    date: DateTime<Utc>,
}

#[get("/sitemap.xml")]
pub async fn sitemap(
    app_state: web::Data<AppState>,
    request: HttpRequest,
) -> AppResult<HttpResponse> {
    let posts = sqlx::query_as::<_, SitemapPost>(
        "SELECT slug, date
         FROM posts
         WHERE published = true
         ORDER BY date DESC",
    )
    .fetch_all(&app_state.db)
    .await
    .map_err(|error| {
        error!("Failed to fetch posts for sitemap: {}", error);
        crate::error::AppError::Internal("Failed to generate sitemap".to_string())
    })?;

    let base_url = std::env::var("PUBLIC_SITE_URL")
        .unwrap_or_else(|_| {
            let connection_info = request.connection_info();

            format!(
                "{}://{}",
                connection_info.scheme(),
                connection_info.host()
            )
        })
        .trim_end_matches('/')
        .to_string();

    let mut sitemap = String::from(
        r#"<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">"#,
    );

    append_url(&mut sitemap, &base_url, None);

    for post in posts {
        let post_url = format!("{}/blog/{}", base_url, escape_xml(&post.slug));
        append_url(&mut sitemap, &post_url, Some(post.date));
    }

    sitemap.push_str("</urlset>");

    Ok(HttpResponse::Ok()
        .content_type("application/xml; charset=utf-8")
        .insert_header(("Cache-Control", "public, max-age=300"))
        .body(sitemap))
}

fn append_url(feed: &mut String, location: &str, last_modified: Option<DateTime<Utc>>) {
    feed.push_str("<url><loc>");
    feed.push_str(location);
    feed.push_str("</loc>");

    if let Some(last_modified) = last_modified {
        feed.push_str("<lastmod>");
        feed.push_str(&last_modified.to_rfc3339());
        feed.push_str("</lastmod>");
    }

    feed.push_str("</url>");
}

fn escape_xml(value: &str) -> String {
    value
        .replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&apos;")
}
