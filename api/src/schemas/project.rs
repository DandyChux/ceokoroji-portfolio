use std::{
    fmt::{Display, Formatter},
    str::FromStr,
};

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use utoipa::ToSchema;
use validator::Validate;

/// Enum representing the valid categories for a skill
#[derive(Debug, Clone, Deserialize, Serialize, sqlx::Type, ToSchema, PartialEq, Eq, Hash)]
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

impl SkillCategory {
    pub fn all() -> Vec<SkillCategory> {
        vec![
            SkillCategory::Frontend,
            SkillCategory::Backend,
            SkillCategory::Database,
            SkillCategory::DevOps,
            SkillCategory::Language,
            SkillCategory::Tool,
            SkillCategory::Framework,
            SkillCategory::Other,
        ]
    }

    pub fn to_string(&self) -> String {
        match self {
            SkillCategory::Frontend => "Frontend".to_string(),
            SkillCategory::Backend => "Backend".to_string(),
            SkillCategory::Database => "Database".to_string(),
            SkillCategory::DevOps => "DevOps".to_string(),
            SkillCategory::Language => "Language".to_string(),
            SkillCategory::Tool => "Tool".to_string(),
            SkillCategory::Framework => "Framework".to_string(),
            SkillCategory::Other => "Other".to_string(),
        }
    }
}

impl FromStr for SkillCategory {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "frontend" => Ok(SkillCategory::Frontend),
            "backend" => Ok(SkillCategory::Backend),
            "database" => Ok(SkillCategory::Database),
            "devops" => Ok(SkillCategory::DevOps),
            "language" => Ok(SkillCategory::Language),
            "tool" => Ok(SkillCategory::Tool),
            "framework" => Ok(SkillCategory::Framework),
            "other" => Ok(SkillCategory::Other),
            _ => Err(format!("Invalid skill category: {}", s)),
        }
    }
}

impl Display for SkillCategory {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            SkillCategory::Frontend => write!(f, "Frontend"),
            SkillCategory::Backend => write!(f, "Backend"),
            SkillCategory::Database => write!(f, "Database"),
            SkillCategory::DevOps => write!(f, "DevOps"),
            SkillCategory::Language => write!(f, "Language"),
            SkillCategory::Tool => write!(f, "Tool"),
            SkillCategory::Framework => write!(f, "Framework"),
            SkillCategory::Other => write!(f, "Other"),
        }
    }
}

/// Response structure for a group of skills by category
#[derive(Debug, Serialize, ToSchema)]
pub struct SkillCategoryGroup {
    pub name: String,
    pub skills: Vec<Skill>,
}

/// Response structure for grouped skills endpoint
#[derive(Debug, Serialize, ToSchema)]
pub struct GroupedSkillsResponse {
    pub categories: Vec<SkillCategoryGroup>,
}

/// Enum representing the valid levels for a skill
#[derive(Debug, Clone, Deserialize, Serialize, sqlx::Type, ToSchema)]
#[sqlx(type_name = "skill_level", rename_all = "lowercase")]
pub enum SkillLevel {
    Beginner,
    Intermediate,
    Advanced,
    Expert,
}

impl Display for SkillLevel {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            SkillLevel::Beginner => write!(f, "Beginner"),
            SkillLevel::Intermediate => write!(f, "Intermediate"),
            SkillLevel::Advanced => write!(f, "Advanced"),
            SkillLevel::Expert => write!(f, "Expert"),
        }
    }
}

impl FromStr for SkillLevel {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "beginner" => Ok(SkillLevel::Beginner),
            "intermediate" => Ok(SkillLevel::Intermediate),
            "advanced" => Ok(SkillLevel::Advanced),
            "expert" => Ok(SkillLevel::Expert),
            _ => Err(format!("Invalid skill level: {}", s)),
        }
    }
}

/// Represents a skill in the database
/// Table: skills
#[derive(Debug, FromRow, Deserialize, Serialize, ToSchema)]
pub struct Skill {
    /// The ID of the skill.
    pub id: i32,
    /// The name of the skill.
    pub name: String,
    /// The category of the skill.
    pub category: SkillCategory,
    /// The level of the skill.
    pub level: SkillLevel,
    /// The description of the skill.
    pub description: Option<String>,
    /// The icon URL of the skill.
    pub icon_url: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Validate, ToSchema)]
pub struct SkillCreate {
    #[validate(length(min = 2, max = 100))]
    pub name: String,
    pub category: SkillCategory,
    pub level: SkillLevel,
    #[validate(length(min = 2, max = 100))]
    pub description: Option<String>,
    #[validate(url)]
    pub icon_url: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Validate, ToSchema)]
pub struct SkillUpdate {
    #[validate(length(min = 2, max = 100))]
    pub name: String,
    pub category: SkillCategory,
    pub level: SkillLevel,
    #[validate(length(min = 2, max = 100))]
    pub description: Option<String>,
    #[validate(url)]
    pub icon_url: Option<String>,
}

/// Represents a project in the database.
///
/// Table: projects
#[derive(Debug, FromRow, Deserialize, Serialize, ToSchema)]
pub struct Project {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub image_url: String,
    pub github_url: String,
    pub live_url: Option<String>,
    pub featured: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

/// API response model with skills included
#[derive(Debug, Deserialize, Serialize, ToSchema)]
pub struct ProjectResponse {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub image_url: String,
    pub github_url: String,
    pub live_url: Option<String>,
    pub featured: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub skills: Vec<Skill>,
}

impl ProjectResponse {
    pub fn from_row_with_skills(row: Project, skills: Vec<Skill>) -> Self {
        Self {
            id: row.id,
            name: row.name,
            description: row.description,
            image_url: row.image_url,
            github_url: row.github_url,
            live_url: row.live_url,
            featured: row.featured,
            created_at: row.created_at,
            updated_at: row.updated_at,
            skills,
        }
    }
}

#[derive(Debug, Deserialize, Serialize, Validate, ToSchema)]
pub struct ProjectCreate {
    #[validate(length(min = 2, max = 100))]
    pub name: String,
    #[validate(length(min = 2, max = 100))]
    pub description: Option<String>,
    #[validate(url)]
    pub image_url: String,
    #[validate(url)]
    pub github_url: String,
    #[validate(url)]
    pub live_url: Option<String>,
    pub featured: bool,
    /// List of skill IDs to associate with this project
    pub skill_ids: Vec<i32>,
}

#[derive(Debug, Deserialize, Serialize, Validate, ToSchema)]
pub struct ProjectUpdate {
    #[validate(length(min = 2, max = 100))]
    pub name: String,

    #[validate(length(min = 2, max = 100))]
    pub description: Option<String>,

    #[validate(url)]
    pub image_url: String,

    #[validate(url)]
    pub github_url: String,

    #[validate(url)]
    pub live_url: Option<String>,

    pub skill_ids: Option<Vec<i32>>,

    pub featured: bool,
}

#[derive(Debug, Deserialize, Serialize, Validate, ToSchema)]
pub struct ProjectDelete {
    pub id: i32,
}

#[derive(Debug, Deserialize, Serialize, Validate, ToSchema)]
pub struct ProjectRequestQuery {
    pub featured: bool,
}
