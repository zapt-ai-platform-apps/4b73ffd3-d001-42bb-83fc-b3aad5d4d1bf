import { initializeZapt } from '@zapt/zapt-js';

const { supabase } = initializeZapt(process.env.VITE_PUBLIC_APP_ID);

import { userRoles } from '../drizzle/schema.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';

export async function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error('Invalid token');
  }

  return user;
}

export async function getUserRole(userId) {
  const sql = postgres(process.env.COCKROACH_DB_URL);
  const db = drizzle(sql);

  const result = await db.select()
    .from(userRoles)
    .where(eq(userRoles.userId, userId));

  if (result.length > 0) {
    return result[0].role;
  } else {
    return 'user';
  }
}