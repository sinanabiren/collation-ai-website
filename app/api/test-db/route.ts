import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { connectionString } = body;

    if (!connectionString) {
      return NextResponse.json(
        { success: false, message: 'Connection string is required' },
        { status: 400 }
      );
    }

    // Test the connection
    const pool = new Pool({
      connectionString,
      max: 1,
      idleTimeoutMillis: 5000,
      connectionTimeoutMillis: 10000,
    });

    try {
      // Try to connect
      const client = await pool.connect();

      // Test a simple query
      await client.query('SELECT 1');

      client.release();
      await pool.end();

      return NextResponse.json({
        success: true,
        message: 'Connection successful!',
      });
    } catch (error: any) {
      await pool.end();

      return NextResponse.json({
        success: false,
        message: `Connection failed: ${error.message}`,
      });
    }
  } catch (error: any) {
    console.error('Test DB error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to test connection: ' + error.message,
      },
      { status: 500 }
    );
  }
}
