import { NextRequest, NextResponse } from 'next/server';
import { getUserById, updateUser } from '@/lib/auth/users';

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
    await updateUser(userId, {
      ndaAccepted: true,
      ndaAcceptedAt: new Date().toISOString(),
      ndaSignatureName: signatureName,
      ndaIpAddress: ip,
    });

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

    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ndaAccepted: user.ndaAccepted || false,
        ndaAcceptedAt: user.ndaAcceptedAt,
        ndaSignatureName: user.ndaSignatureName,
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
