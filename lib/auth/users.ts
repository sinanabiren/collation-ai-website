import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

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

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

async function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readUsers(): Promise<User[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeUsers(users: User[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const users = await readUsers();

  // Check if user exists
  if (users.find(u => u.email === email)) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Calculate trial end date (7 days from now)
  const now = new Date();
  const trialEndsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const user: User = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    name,
    createdAt: now.toISOString(),
    trialEndsAt: trialEndsAt.toISOString(),
    isActive: true,
    databaseConnections: [],
  };

  users.push(user);
  await writeUsers(users);

  return user;
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const users = await readUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await readUsers();
  return users.find(u => u.email === email) || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await readUsers();
  return users.find(u => u.id === id) || null;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const users = await readUsers();
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return null;
  }

  users[index] = { ...users[index], ...updates };
  await writeUsers(users);

  return users[index];
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
