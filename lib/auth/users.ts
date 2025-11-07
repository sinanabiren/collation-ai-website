import bcrypt from 'bcryptjs';
import { query, initUsersTable } from '../db';

export interface User {
  id: string;
  email: string;
  password: string; // hashed
  name: string;
  createdAt: string;
  trialEndsAt: string;
  isActive: boolean;
  databaseConnections?: {
    host?: string;
    database?: string;
    username?: string;
    // password stored separately/encrypted
  }[];
}

// Initialize table on first import
let tableInitialized = false;
async function ensureTable() {
  if (!tableInitialized) {
    try {
      await initUsersTable();
      tableInitialized = true;
    } catch (error) {
      console.error('Failed to initialize users table:', error);
    }
  }
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
  await ensureTable();

  // Check if user exists
  const existingUser = await query(
    'SELECT id FROM auth_users WHERE email = $1',
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Calculate trial end date (7 days from now)
  const now = new Date();
  const trialEndsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const result = await query(
    `INSERT INTO auth_users (email, password, name, trial_ends_at, is_active)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, email, name, created_at, trial_ends_at, is_active`,
    [email, hashedPassword, name, trialEndsAt, true]
  );

  const row = result.rows[0];

  return {
    id: row.id,
    email: row.email,
    password: hashedPassword,
    name: row.name,
    createdAt: row.created_at.toISOString(),
    trialEndsAt: row.trial_ends_at.toISOString(),
    isActive: row.is_active,
    databaseConnections: [],
  };
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  await ensureTable();

  const result = await query(
    'SELECT id, email, password, name, created_at, trial_ends_at, is_active FROM auth_users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  const isValid = await bcrypt.compare(password, row.password);

  if (!isValid) {
    return null;
  }

  return {
    id: row.id,
    email: row.email,
    password: row.password,
    name: row.name,
    createdAt: row.created_at.toISOString(),
    trialEndsAt: row.trial_ends_at.toISOString(),
    isActive: row.is_active,
    databaseConnections: [],
  };
}

export async function getUserByEmail(email: string): Promise<User | null> {
  await ensureTable();

  const result = await query(
    'SELECT id, email, password, name, created_at, trial_ends_at, is_active FROM auth_users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return {
    id: row.id,
    email: row.email,
    password: row.password,
    name: row.name,
    createdAt: row.created_at.toISOString(),
    trialEndsAt: row.trial_ends_at.toISOString(),
    isActive: row.is_active,
    databaseConnections: [],
  };
}

export async function getUserById(id: string): Promise<User | null> {
  await ensureTable();

  const result = await query(
    'SELECT id, email, password, name, created_at, trial_ends_at, is_active FROM auth_users WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return {
    id: row.id,
    email: row.email,
    password: row.password,
    name: row.name,
    createdAt: row.created_at.toISOString(),
    trialEndsAt: row.trial_ends_at.toISOString(),
    isActive: row.is_active,
    databaseConnections: [],
  };
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  await ensureTable();

  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (updates.name !== undefined) {
    fields.push(`name = $${paramIndex++}`);
    values.push(updates.name);
  }

  if (updates.email !== undefined) {
    fields.push(`email = $${paramIndex++}`);
    values.push(updates.email);
  }

  if (updates.isActive !== undefined) {
    fields.push(`is_active = $${paramIndex++}`);
    values.push(updates.isActive);
  }

  if (fields.length === 0) {
    return getUserById(id);
  }

  values.push(id);

  const result = await query(
    `UPDATE auth_users SET ${fields.join(', ')} WHERE id = $${paramIndex}
     RETURNING id, email, password, name, created_at, trial_ends_at, is_active`,
    values
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return {
    id: row.id,
    email: row.email,
    password: row.password,
    name: row.name,
    createdAt: row.created_at.toISOString(),
    trialEndsAt: row.trial_ends_at.toISOString(),
    isActive: row.is_active,
    databaseConnections: [],
  };
}

export function isTrialActive(user: User): boolean {
  const trialEnd = new Date(user.trialEndsAt);
  return new Date() < trialEnd;
}

export function getTrialDaysRemaining(user: User): number {
  const trialEnd = new Date(user.trialEndsAt);
  const now = new Date();
  const diff = trialEnd.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
