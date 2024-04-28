DO $$ BEGIN
 CREATE TYPE "categories" AS ENUM('General', 'Tech', 'Life', 'Sports', 'Music', 'Games', 'Movies', 'Books', 'Food', 'Travel');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"description" text NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"tags" text[],
	"category" "categories" DEFAULT 'General' NOT NULL,
	"content" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);