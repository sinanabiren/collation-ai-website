import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Migration endpoint to add NDA columns to existing users table
export async function POST(req: NextRequest) {
  try {
    // Add NDA columns if they don't exist
    await query(`
      ALTER TABLE auth_users
      ADD COLUMN IF NOT EXISTS nda_accepted BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS nda_accepted_at TIMESTAMP,
      ADD COLUMN IF NOT EXISTS nda_signature_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS nda_ip_address VARCHAR(50);
    `);

    return NextResponse.json({
      success: true,
      message: 'NDA columns added successfully',
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
