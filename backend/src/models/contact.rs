use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Deserialize, Serialize, Validate)]
pub struct ContactForm {
    #[validate(length(min = 1, message = "Name is required"))]
    pub name: String,
    
    #[validate(email(message = "Invalid email address"))]
    pub email: String,
    
    #[validate(length(max = 250, message = "Message must be less than 250 characters"))]
    pub message: String,
}
