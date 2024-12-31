CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "priority" SMALLINT NOT NULL,
  "due_date" TIMESTAMP,
  "status" TEXT NOT NULL,
  "assigned_to" UUID NOT NULL,
  "assigned_by" UUID NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);