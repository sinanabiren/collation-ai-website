import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, connectionString, userPrefix } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Add user_prefix column if it doesn't exist (migration)
    try {
      await query(`
        ALTER TABLE auth_users
        ADD COLUMN IF NOT EXISTS user_prefix TEXT
      `);
    } catch (migrationError) {
      console.log('User prefix column might already exist or migration failed:', migrationError);
    }

    // Mark database as configured for this user and store their table prefix
    await query(
      `UPDATE auth_users
       SET database_configured = true,
           database_connection_string = $1,
           user_prefix = $2
       WHERE id = $3`,
      [connectionString || null, userPrefix || null, userId]
    );

    return NextResponse.json({
      success: true,
      message: 'Database configuration status updated',
    });
  } catch (error: any) {
    console.error('Error updating database config status:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update configuration status: ' + error.message,
      },
      { status: 500 }
    );
  }
}
