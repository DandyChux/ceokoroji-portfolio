use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use validator::Validate;

/// Enum representing the valid categories for a skill
#[derive(Debug, Clone, Deserialize, Serialize, sqlx::Type)]
#[sqlx(type_name = "skill_category", rename_all = "lowercase")]
pub enum SkillCategory {
    Frontend,
    Backend,
    Database,
    DevOps,
    Language,
    Tool,
    Framework,
    Other,
}

/// Represents a skill in the database
/// Table: skills
#[derive(Debug, FromRow, Deserialize, Serialize)]
pub struct Skill {
    /// The ID of the skill.
    pub id: i32,
    /// The name of the skill.
    pub name: String,
    /// The category of the skill.
    pub category: SkillCategory,
    /// The level of the skill.
    pub level: String,
    /// The order of the skill.
    pub order: i32,
    /// The description of the skill.
    pub description: String,
    /// The color of the skill.
    pub color: Option<String>,
    /// The icon URL of the skill.
    pub icon_url: Option<String>,
    /// The icon color of the skill.
    pub icon_color: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Validate)]
pub struct SkillCreate {
    #[validate(length(min = 2, max = 100))]
    pub name: String,

    pub category: SkillCategory,

    #[validate(length(min = 2, max = 100))]
    pub level: String,

    #[validate(length(min = 2, max = 100))]
    pub description: String,

    #[validate(length(min = 2, max = 100))]
    pub color: Option<String>,

    #[validate(url)]
    pub icon_url: Option<String>,

    #[validate(url)]
    pub icon_color: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Validate)]
pub struct SkillUpdate {
    #[validate(length(min = 2, max = 100))]
    pub name: String,

    #[validate(length(min = 2, max = 100))]
    pub category: String,

    #[validate(length(min = 2, max = 100))]
    pub level: String,

    #[validate(length(min = 2, max = 100))]
    pub description: String,

    #[validate(length(min = 2, max = 100))]
    pub color: Option<String>,

    #[validate(url)]
    pub icon_url: Option<String>,

    #[validate(url)]
    pub icon_color: Option<String>,
}

/// Represents a project in the database.
/// Table: projects
#[derive(Debug, FromRow, Deserialize, Serialize)]
pub struct Project {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub image_url: String,
    pub github_url: String,
    pub live_url: Option<String>,
    pub skills: Vec<Skill>,
}

#[derive(Debug, Deserialize, Serialize, Validate)]
pub struct ProjectCreate {
    #[validate(length(min = 2, max = 100))]
    pub name: String,

    #[validate(length(min = 2, max = 100))]
    pub description: String,

    #[validate(url)]
    pub image_url: String,

    #[validate(url)]
    pub github_url: String,

    #[validate(url)]
    pub live_url: Option<String>,

    pub skills: Vec<Skill>,
}

#[derive(Debug, Deserialize, Serialize, Validate)]
pub struct ProjectUpdate {
    #[validate(length(min = 2, max = 100))]
    pub name: String,

    #[validate(length(min = 2, max = 100))]
    pub description: String,

    #[validate(url)]
    pub image_url: String,

    #[validate(url)]
    pub github_url: String,

    #[validate(url)]
    pub live_url: Option<String>,

    pub skills: Vec<Skill>,
}

#[derive(Debug, Deserialize, Serialize, Validate)]
pub struct ProjectDelete {
    pub id: i32,
}
