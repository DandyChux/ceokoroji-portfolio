-- Add down migration script here
-- Drop posts table and indexes
DROP INDEX IF EXISTS idx_posts_tags;
DROP INDEX IF EXISTS idx_posts_date;
DROP INDEX IF EXISTS idx_posts_slug;
DROP INDEX IF EXISTS idx_posts_category;
DROP INDEX IF EXISTS idx_posts_published;
DROP TABLE IF EXISTS posts;

-- Drop projects table and indexes
DROP INDEX IF EXISTS idx_projects_name;
DROP TABLE IF EXISTS projects;

-- Drop skills table and indexes
DROP INDEX IF EXISTS idx_skills_order;
DROP INDEX IF EXISTS idx_skills_category;
DROP TABLE IF EXISTS skills;

-- Drop skill_category enum type
DROP TYPE IF EXISTS skill_category;
