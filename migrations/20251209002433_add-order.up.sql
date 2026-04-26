-- Add order column to projects table
ALTER TABLE projects ADD COLUMN "order" INTEGER;

-- Set order values for existing rows based on row number
WITH numbered_projects AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id) as rn
  FROM projects
)
UPDATE projects
SET "order" = numbered_projects.rn
FROM numbered_projects
WHERE projects.id = numbered_projects.id;

-- Make order column NOT NULL after setting values
ALTER TABLE projects ALTER COLUMN "order" SET NOT NULL;

-- Create sequence for auto-increment
CREATE SEQUENCE projects_order_seq;

-- Set the sequence to start after the highest current value
SELECT setval('projects_order_seq', COALESCE(MAX("order"), 0) + 1) FROM projects;

-- Set default value to use the sequence
ALTER TABLE projects ALTER COLUMN "order" SET DEFAULT nextval('projects_order_seq');

-- Add index on order column for better query performance
CREATE INDEX idx_projects_order ON projects("order");
