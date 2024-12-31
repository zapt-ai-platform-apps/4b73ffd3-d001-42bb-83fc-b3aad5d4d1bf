CREATE TABLE "user_roles" (
  "user_id" UUID PRIMARY KEY,
  "role" TEXT NOT NULL DEFAULT 'user' CHECK ("role" IN ('user', 'admin'))
);