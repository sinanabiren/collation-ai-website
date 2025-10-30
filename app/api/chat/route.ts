import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { SYSTEM_PROMPT } from '@/lib/knowledge/product-info'

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(req: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured. Please add ANTHROPIC_API_KEY to your .env.local file.' },
        { status: 500 }
      )
    }

    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format. Expected messages array.' },
        { status: 400 }
      )
    }

    // Call Claude API with prompt caching
    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' }, // Enable prompt caching
        },
      ],
      messages: messages,
    })

    // Extract the response text
    const assistantMessage = response.content[0]
    const text = assistantMessage.type === 'text' ? assistantMessage.text : ''

    return NextResponse.json({
      message: text,
      usage: response.usage, // Include usage stats for monitoring
    })
  } catch (error: any) {
    console.error('Chat API error:', error)

    // Handle specific Anthropic API errors
    if (error.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your ANTHROPIC_API_KEY.' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process chat request. Please try again.' },
      { status: 500 }
    )
  }
}

// Optional: Add rate limiting
export const runtime = 'nodejs'
