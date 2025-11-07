import { NextRequest, NextResponse } from 'next/server';
import { generateDataConstrainedUI, UIGenerationRequest } from '@/lib/llm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as UIGenerationRequest;

    const result = await generateDataConstrainedUI(body);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('UI Generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
