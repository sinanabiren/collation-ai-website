import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { databaseUrl, anthropicApiKey } = body;

    if (!databaseUrl) {
      return NextResponse.json(
        { success: false, message: 'Database URL is required' },
        { status: 400 }
      );
    }

    // Update .env.local file
    const envPath = path.join(process.cwd(), '.env.local');

    let envContent = '';
    try {
      envContent = await fs.readFile(envPath, 'utf-8');
    } catch {
      // File doesn't exist, start fresh
      envContent = '';
    }

    // Parse existing env vars
    const envVars: Record<string, string> = {};
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    });

    // Update DATABASE_URL
    envVars['DATABASE_URL'] = databaseUrl;

    // Keep existing ANTHROPIC_API_KEY if present, or use provided one
    if (!envVars['ANTHROPIC_API_KEY'] && anthropicApiKey) {
      envVars['ANTHROPIC_API_KEY'] = anthropicApiKey;
    }

    // Rebuild env file content
    const newEnvContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Write back to file
    await fs.writeFile(envPath, newEnvContent, 'utf-8');

    // Note: In production, you'd need to restart the server for env vars to take effect
    // For now, we'll update process.env
    process.env.DATABASE_URL = databaseUrl;

    return NextResponse.json({
      success: true,
      message: 'Configuration saved! Please note: You may need to restart the server for changes to take full effect.',
    });
  } catch (error: any) {
    console.error('Save config error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to save configuration: ' + error.message,
      },
      { status: 500 }
    );
  }
}
