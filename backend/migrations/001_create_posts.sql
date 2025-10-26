-- Create categories enum
DO $$ BEGIN
    CREATE TYPE categories AS ENUM (
        'General',
        'Tech',
        'Life',
        'Sports',
        'Music',
        'Games',
        'Movies',
        'Books',
        'Food',
        'Travel'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    description TEXT NOT NULL,
    published BOOLEAN DEFAULT FALSE NOT NULL,
    tags TEXT[],
    category categories DEFAULT 'General' NOT NULL,
    content TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL
);
