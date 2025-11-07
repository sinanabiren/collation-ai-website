import { NextRequest, NextResponse } from 'next/server';
import { getCustomerSchema } from '@/lib/db/schema';
import { DEMO_SCHEMA } from '@/lib/demo-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');

    if (!customerId) {
      return NextResponse.json(
        { success: false, error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    // Try to get real schema
    let schema;
    let isDemoMode = false;

    try {
      if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_')) {
        throw new Error('Database not configured');
      }
      schema = await getCustomerSchema(customerId);
    } catch (error) {
      console.log('Using demo schema:', error);
      schema = DEMO_SCHEMA;
      isDemoMode = true;
    }

    return NextResponse.json({
      success: true,
      data: {
        schema,
        isDemoMode,
      },
    });
  } catch (error) {
    console.error('Schema fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
