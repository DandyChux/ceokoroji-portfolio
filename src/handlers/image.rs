use actix_web::{
    get,
    http::header,
    web::{self, Data},
    HttpResponse,
};
use base64::{engine::general_purpose::URL_SAFE_NO_PAD, Engine as _};
use hmac::{Hmac, KeyInit, Mac};
use serde::Deserialize;
use sha2::Sha256;
use url::Url;

use crate::AppState;

type HmacSha256 = Hmac<Sha256>;

#[derive(Deserialize)]
struct ImageQuery {
    src: Option<String>,
    format: Option<String>,
    quality: Option<String>,
}

#[get("/{width}")]
pub async fn redirect_image(
    app_state: Data<AppState>,
    width: web::Path<String>,
    query: web::Query<ImageQuery>,
) -> HttpResponse {
    let width = match width.parse::<u32>() {
        Ok(width) if (1..=2400).contains(&width) => width,
        _ => return HttpResponse::BadRequest().body("Unsupported image width"),
    };

    let format = query
        .format
        .as_deref()
        .filter(|value| !value.is_empty())
        .unwrap_or("webp");

    if !matches!(format, "webp" | "avif") {
        return HttpResponse::BadRequest().body("Unsupported image format");
    }

    let quality = match query.quality.as_deref().filter(|value| !value.is_empty()) {
        Some(raw) => match raw.parse::<u8>() {
            Ok(quality) if (1..=100).contains(&quality) => quality,
            _ => return HttpResponse::BadRequest().body("Quality must be between 1 and 100"),
        },
        None => 85,
    };

    let source = match query.src.as_deref() {
        Some(source) if !source.is_empty() && source.len() <= 4096 => source,
        _ => return HttpResponse::BadRequest().body("Invalid image URL"),
    };

    let mut image_url = match Url::parse(source) {
        Ok(url) => url,
        Err(_) => return HttpResponse::BadRequest().body("Invalid image URL"),
    };

    // Reject userinfo, including an empty username such as https://@host/.
    let has_userinfo = image_url
        .as_str()
        .split_once("://")
        .and_then(|(_, rest)| rest.split(['/', '?', '#']).next())
        .is_some_and(|authority| authority.contains('@'));

    if image_url.scheme() != "https" || image_url.host_str().is_none() || has_userinfo {
        return HttpResponse::BadRequest().body("Invalid image URL");
    }

    let hostname = image_url.host_str().unwrap().to_ascii_lowercase();
    let config = &app_state.env.imgproxy;

    if !config.allowed_hosts.contains(&hostname) {
        return HttpResponse::BadRequest().body("Image host is not allowed");
    }

    image_url.set_fragment(None);
    let source = image_url.as_str();
    let encoded_source = URL_SAFE_NO_PAD.encode(source.as_bytes());

    let path = format!(
        "/rs:fill:{width}:0/q:{quality}/f:{format}/{encoded_source}.{format}"
    );

    let mut mac = HmacSha256::new_from_slice(&config.key)
        .expect("HMAC accepts keys of any length");
    mac.update(&config.salt);
    mac.update(path.as_bytes());

    let signature = URL_SAFE_NO_PAD.encode(mac.finalize().into_bytes());
    let signed_url = format!("{}/{signature}{path}", config.endpoint);

    HttpResponse::Found()
        .insert_header((header::CACHE_CONTROL, "public, max-age=3600"))
        .insert_header((header::LOCATION, signed_url))
        .finish()
}
