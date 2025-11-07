import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { userId, signatureName } = await req.json();

    if (!userId || !signatureName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get client IP address
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';

    // Update user's NDA acceptance
    await query(
      `UPDATE auth_users
       SET nda_accepted = true,
           nda_accepted_at = CURRENT_TIMESTAMP,
           nda_signature_name = $1,
           nda_ip_address = $2
       WHERE id = $3`,
      [signatureName, ip, userId]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error accepting NDA:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get NDA acceptance status
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Missing userId' },
        { status: 400 }
      );
    }

    const result = await query(
      'SELECT nda_accepted, nda_accepted_at, nda_signature_name FROM auth_users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ndaAccepted: result.rows[0].nda_accepted,
        ndaAcceptedAt: result.rows[0].nda_accepted_at,
        ndaSignatureName: result.rows[0].nda_signature_name,
      },
    });
  } catch (error: any) {
    console.error('Error checking NDA status:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
