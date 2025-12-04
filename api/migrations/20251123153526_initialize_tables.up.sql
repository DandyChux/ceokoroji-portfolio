-- Create skill_category enum type
DO $$ BEGIN
    CREATE TYPE skill_category AS ENUM (
        'frontend',
        'backend',
        'database',
        'devops',
        'language',
        'tool',
        'framework',
        'other'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create skill_level enum type
DO $$ BEGIN
    CREATE TYPE skill_level AS ENUM (
        'beginner',
        'intermediate',
        'advanced',
        'expert'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category skill_category NOT NULL,
    level skill_level NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    description VARCHAR(500) NOT NULL,
    color VARCHAR(100),
    icon_url TEXT,
    icon_color VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on skills category for faster filtering
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills("order");

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    github_url TEXT NOT NULL,
    live_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on projects name for faster searching
CREATE INDEX IF NOT EXISTS idx_projects_name ON projects(name);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    description TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT false,
    tags TEXT[],
    category VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- junction table
CREATE TABLE IF NOT EXISTS project_skills (
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY(project_id, skill_id)
);

-- Create indexes on posts for faster querying
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_date ON posts(date DESC);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX idx_project_skills_project_id ON project_skills(project_id);
CREATE INDEX idx_project_skills_skill_id ON project_skills(skill_id);
