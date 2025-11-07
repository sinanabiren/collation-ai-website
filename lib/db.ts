import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

export async function query(text: string, params?: any[]) {
  const pool = getPool();
  const result = await pool.query(text, params);
  return result;
}

// Initialize users table
export async function initUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      trial_ends_at TIMESTAMP NOT NULL,
      is_active BOOLEAN DEFAULT true
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `;

  try {
    await query(createTableQuery);
    console.log('Users table initialized successfully');
  } catch (error) {
    console.error('Error initializing users table:', error);
    throw error;
  }
}
