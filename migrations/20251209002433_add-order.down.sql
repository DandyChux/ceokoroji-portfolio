-- Drop index
DROP INDEX IF EXISTS idx_projects_order;

-- Remove default value
ALTER TABLE projects ALTER COLUMN "order" DROP DEFAULT;

-- Drop sequence
DROP SEQUENCE IF EXISTS projects_order_seq;

-- Drop the order column
ALTER TABLE projects DROP COLUMN "order";
