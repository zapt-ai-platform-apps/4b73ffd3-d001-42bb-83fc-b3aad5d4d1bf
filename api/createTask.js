import { tasks } from '../drizzle/schema.js';
import { authenticateUser, getUserRole } from "./_apiUtils.js";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID,
    },
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    const userRole = await getUserRole(user.id);

    const { title, description, priority, dueDate, assignedTo } = req.body;

    if (!title || !priority || !assignedTo) {
      return res.status(400).json({ error: 'Title, priority, and assignedTo are required' });
    }

    const sql = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(sql);

    // Only admins can assign tasks to others
    if (userRole !== 'admin' && assignedTo !== user.id) {
      return res.status(403).json({ error: 'You do not have permission to assign tasks to other users' });
    }

    const result = await db.insert(tasks).values({ 
      title,
      description,
      priority,
      dueDate,
      status: 'Pending',
      assignedTo,
      assignedBy: user.id,
    }).returning();

    res.status(201).json(result[0]);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error creating task:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error creating task' });
    }
  }
}