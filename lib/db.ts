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
  try {
    // Try to create table (using auth_users to avoid conflicts)
    await query(`
      CREATE TABLE IF NOT EXISTS auth_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        trial_ends_at TIMESTAMP NOT NULL,
        is_active BOOLEAN DEFAULT true,
        nda_accepted BOOLEAN DEFAULT false,
        nda_accepted_at TIMESTAMP,
        nda_signature_name VARCHAR(255),
        nda_ip_address VARCHAR(50),
        database_configured BOOLEAN DEFAULT false,
        database_connection_string TEXT
      );
    `);

    // Try to create index (may fail if not owner, that's ok)
    try {
      await query(`CREATE INDEX IF NOT EXISTS idx_auth_users_email ON auth_users(email);`);
    } catch (indexError) {
      // Silently ignore index creation errors (table likely already exists with index)
      console.log('Index already exists or cannot be created (this is fine)');
    }

    console.log('Auth users table initialized successfully');
  } catch (error: any) {
    // Only throw if it's not a permission error on existing table
    if (error?.code !== '42501') {
      console.error('Error initializing auth users table:', error);
      throw error;
    }
    // If permission error, table likely exists, so we can continue
    console.log('Auth users table already exists');
  }
}
