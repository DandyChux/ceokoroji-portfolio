-- Create skill_category enum type
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

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category skill_category NOT NULL,
    level VARCHAR(100) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    description VARCHAR(500) NOT NULL,
    color VARCHAR(100),
    icon_url TEXT,
    icon_color VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on skills category for faster filtering
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_order ON skills("order");

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    github_url TEXT NOT NULL,
    live_url TEXT,
    skills TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on projects name for faster searching
CREATE INDEX idx_projects_name ON projects(name);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id VARCHAR(255) PRIMARY KEY,
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

-- Create indexes on posts for faster querying
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_date ON posts(date DESC);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
