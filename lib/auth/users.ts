import bcrypt from 'bcryptjs';
import { query, initUsersTable } from '../db';
import { saveUser, findUserByEmail, findUserById, updateUserData } from './json-storage';
import { randomUUID } from 'crypto';

export interface User {
  id: string;
  email: string;
  password: string; // hashed
  name: string;
  createdAt: string;
  trialEndsAt: string;
  isActive: boolean;
  ndaAccepted?: boolean;
  ndaAcceptedAt?: string;
  ndaSignatureName?: string;
  ndaIpAddress?: string;
  databaseConfigured?: boolean;
  databaseConnectionString?: string;
  databaseConnections?: {
    host?: string;
    database?: string;
    username?: string;
    // password stored separately/encrypted
  }[];
}

// Track database availability
let useDatabaseStorage = true;
let tableInitialized = false;
let initializationAttempted = false;

async function ensureTable() {
  if (!initializationAttempted && useDatabaseStorage) {
    initializationAttempted = true;
    try {
      await initUsersTable();
      tableInitialized = true;
      console.log('Database connection successful, using database storage');
    } catch (error) {
      console.error('Failed to initialize users table, falling back to JSON storage:', error);
      useDatabaseStorage = false;
      console.log('Using JSON file storage for user data');
    }
  }
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
  await ensureTable();

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Calculate trial end date (7 days from now)
  const now = new Date();
  const trialEndsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  if (!useDatabaseStorage) {
    // Use JSON storage
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user: User = {
      id: randomUUID(),
      email,
      password: hashedPassword,
      name,
      createdAt: now.toISOString(),
      trialEndsAt: trialEndsAt.toISOString(),
      isActive: true,
      databaseConnections: [],
    };

    await saveUser(user);
    return user;
  }

  // Check if user exists
  const existingUser = await query(
    'SELECT id FROM auth_users WHERE email = $1',
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error('User already exists');
  }

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

  if (!useDatabaseStorage) {
    // Use JSON storage
    const user = await findUserByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    return user;
  }

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

  if (!useDatabaseStorage) {
    return await findUserByEmail(email);
  }

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

  if (!useDatabaseStorage) {
    return await findUserById(id);
  }

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

  if (!useDatabaseStorage) {
    return await updateUserData(id, updates);
  }

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

  if (updates.ndaAccepted !== undefined) {
    fields.push(`nda_accepted = $${paramIndex++}`);
    values.push(updates.ndaAccepted);
  }

  if (updates.ndaAcceptedAt !== undefined) {
    fields.push(`nda_accepted_at = $${paramIndex++}`);
    values.push(updates.ndaAcceptedAt);
  }

  if (updates.ndaSignatureName !== undefined) {
    fields.push(`nda_signature_name = $${paramIndex++}`);
    values.push(updates.ndaSignatureName);
  }

  if (updates.ndaIpAddress !== undefined) {
    fields.push(`nda_ip_address = $${paramIndex++}`);
    values.push(updates.ndaIpAddress);
  }

  if (updates.databaseConfigured !== undefined) {
    fields.push(`database_configured = $${paramIndex++}`);
    values.push(updates.databaseConfigured);
  }

  if (updates.databaseConnectionString !== undefined) {
    fields.push(`database_connection_string = $${paramIndex++}`);
    values.push(updates.databaseConnectionString);
  }

  if (fields.length === 0) {
    return getUserById(id);
  }

  values.push(id);

  const result = await query(
    `UPDATE auth_users SET ${fields.join(', ')} WHERE id = $${paramIndex}
     RETURNING id, email, password, name, created_at, trial_ends_at, is_active, nda_accepted, nda_accepted_at, nda_signature_name, nda_ip_address, database_configured, database_connection_string`,
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
    ndaAccepted: row.nda_accepted,
    ndaAcceptedAt: row.nda_accepted_at?.toISOString(),
    ndaSignatureName: row.nda_signature_name,
    ndaIpAddress: row.nda_ip_address,
    databaseConfigured: row.database_configured,
    databaseConnectionString: row.database_connection_string,
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
