import { pgTable, serial, text, timestamp, uuid, smallint } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  priority: smallint('priority').notNull(),
  dueDate: timestamp('due_date'),
  status: text('status').notNull(),
  assignedTo: uuid('assigned_to').notNull(),
  assignedBy: uuid('assigned_by').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userRoles = pgTable('user_roles', {
  userId: uuid('user_id').primaryKey(),
  role: text('role').default('user').notNull(),
});