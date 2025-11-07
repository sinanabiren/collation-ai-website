import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Migration endpoint to add database configuration columns to existing users table
export async function POST(req: NextRequest) {
  try {
    // Add database configuration columns if they don't exist
    await query(`
      ALTER TABLE auth_users
      ADD COLUMN IF NOT EXISTS database_configured BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS database_connection_string TEXT;
    `);

    return NextResponse.json({
      success: true,
      message: 'Database configuration columns added successfully',
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Migration failed',
      },
      { status: 500 }
    );
  }
}
