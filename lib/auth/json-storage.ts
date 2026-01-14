import fs from 'fs/promises';
import path from 'path';
import { User } from './users';

const STORAGE_PATH = path.join(process.cwd(), 'data', 'users.json');

async function ensureDataDir() {
  const dir = path.dirname(STORAGE_PATH);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

async function readUsers(): Promise<User[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(STORAGE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeUsers(users: User[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(STORAGE_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

export async function saveUser(user: User): Promise<void> {
  const users = await readUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);

  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }

  await writeUsers(users);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await readUsers();
  return users.find(u => u.email === email) || null;
}

export async function findUserById(id: string): Promise<User | null> {
  const users = await readUsers();
  return users.find(u => u.id === id) || null;
}

export async function updateUserData(id: string, updates: Partial<User>): Promise<User | null> {
  const users = await readUsers();
  const index = users.findIndex(u => u.id === id);

  if (index < 0) {
    return null;
  }

  users[index] = { ...users[index], ...updates };
  await writeUsers(users);

  return users[index];
}
