use actix_web::Error;
use actix_web::HttpRequest;
use actix_web::error::ErrorTooManyRequests;
use std::collections::HashMap;
use std::net::IpAddr;
use std::sync::Arc;
use std::time::{Duration, Instant};
use tokio::sync::RwLock;
use tracing::{debug, info};

use crate::AppState;
use crate::error::AppError;

#[derive(Clone)]
pub struct RateLimiterConfig {
    pub max_requests: u32,
    pub window_secs: u64,
}

impl Default for RateLimiterConfig {
    fn default() -> Self {
        Self {
            max_requests: 5,
            window_secs: 60,
        }
    }
}

#[derive(Clone)]
struct RequestRecord {
    count: u32,
    window_start: Instant,
}

pub struct RateLimiter {
    records: Arc<RwLock<HashMap<IpAddr, RequestRecord>>>,
    config: RateLimiterConfig,
}

impl RateLimiter {
    pub fn new(config: RateLimiterConfig) -> Self {
        let limiter = Self {
            records: Arc::new(RwLock::new(HashMap::new())),
            config: config.clone(),
        };

        // Spawn cleanup task to prevent memory leaks
        let records = limiter.records.clone();
        let window_duration = Duration::from_secs(config.window_secs);

        tokio::spawn(async move {
            let mut interval = tokio::time::interval(Duration::from_secs(60));
            loop {
                interval.tick().await;
                let mut records = records.write().await;
                records.retain(|_, record| record.window_start.elapsed() < window_duration);
            }
        });

        limiter
    }

    pub async fn check_rate_limit(&self, ip: IpAddr) -> Result<(), Error> {
        let mut records = self.records.write().await;
        let now = Instant::now();
        let window_duration = Duration::from_secs(self.config.window_secs);

        match records.get_mut(&ip) {
            Some(record) => {
                // Check if we're still in the same time window
                if record.window_start.elapsed() < window_duration {
                    // Still in the same window
                    if record.count >= self.config.max_requests {
                        let retry_after = window_duration
                            .checked_sub(record.window_start.elapsed())
                            .unwrap_or(Duration::from_secs(0))
                            .as_secs();

                        debug!(
                            "Rate limit exceeded for IP {}: {}/{} requests",
                            ip, record.count, self.config.max_requests
                        );

                        return Err(ErrorTooManyRequests(format!(
                            "Rate limit exceeded. Try again in {} seconds",
                            retry_after
                        )));
                    }
                    record.count += 1;
                    debug!("IP {} request count: {}", ip, record.count);
                } else {
                    // New window, reset counter
                    record.count = 1;
                    record.window_start = now;
                    debug!("IP {} window reset, count: 1", ip);
                }
            }
            None => {
                // First request from this IP
                records.insert(
                    ip,
                    RequestRecord {
                        count: 1,
                        window_start: now,
                    },
                );
                debug!("IP {} first request recorded", ip);
            }
        }

        Ok(())
    }

    pub async fn reset(&self, ip: IpAddr) {
        let mut records = self.records.write().await;
        records.remove(&ip);
    }

    pub async fn get_stats(&self, ip: IpAddr) -> Option<(u32, Duration)> {
        let records = self.records.read().await;
        records
            .get(&ip)
            .map(|record| (record.count, record.window_start.elapsed()))
    }
}

impl Clone for RateLimiter {
    fn clone(&self) -> Self {
        Self {
            records: self.records.clone(),
            config: self.config.clone(),
        }
    }
}

/// Helper function that can be reused across handlers
pub async fn extract_and_check_rate_limit(
    req: &HttpRequest,
    state: &AppState,
) -> Result<IpAddr, AppError> {
    let ip = req
        .peer_addr()
        .map(|addr| addr.ip())
        .unwrap_or(IpAddr::from([127, 0, 0, 1]));

    state.rate_limiter.check_rate_limit(ip).await.map_err(|_| {
        AppError::TooManyRequests("Too many requests. Please try again later.".to_string())
    })?;

    Ok(ip)
}
