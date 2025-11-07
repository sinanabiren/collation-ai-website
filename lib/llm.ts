import Anthropic from '@anthropic-ai/sdk';
import { generateSchemaDescription, getCustomerSchema, getSampleData } from './db/schema';
import { DEMO_SCHEMA, DEMO_SAMPLES, getDemoSchemaDescription } from './demo-data';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'demo-key',
});

export interface UIGenerationRequest {
  customerId: string;
  userPrompt: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
  images?: string[]; // base64 encoded images
}

export interface UIGenerationResponse {
  generatedCode: string;
  explanation: string;
  dataTablesUsed: string[];
}

/**
 * Generate UI code using Claude, constrained to customer's database schema
 */
export async function generateDataConstrainedUI(
  request: UIGenerationRequest
): Promise<UIGenerationResponse> {
  // Get the customer's database schema (with demo fallback)
  let schema, samples, schemaDescription;

  try {
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_')) {
      throw new Error('Database not configured - using demo mode');
    }
    schema = await getCustomerSchema(request.customerId);
    samples = await getSampleData(request.customerId);
    schemaDescription = generateSchemaDescription(schema, samples);
  } catch (error) {
    console.log('Using demo schema for UI generation');
    schema = DEMO_SCHEMA;
    samples = DEMO_SAMPLES;
    schemaDescription = getDemoSchemaDescription();
  }

  // Build the system prompt that constrains the LLM
  const systemPrompt = `You are a UI code generator for a financial data platform serving Registered Investment Advisors and Family Offices.

${schemaDescription}

Your task is to generate React/TypeScript UI components based on user requests. You MUST follow these rules:

1. **Data Constraint**: Only use data from the schema provided above. Do NOT invent, mock, or hallucinate data.
2. **Real Data Only**: All data references must map to actual tables and columns in the schema.
3. **API Integration**: Generate code that fetches real data from the provided tables.
4. **TypeScript**: Use TypeScript with proper types derived from the schema.
5. **Modern Stack**: Use Next.js 14+, React Server Components where appropriate, and Tailwind CSS.
6. **Validation**: Before generating any component, verify that all data fields exist in the schema.

Format your response as JSON with this structure:
{
  "generatedCode": "// Full React component code here",
  "explanation": "Brief explanation of what was built and which tables/columns are used",
  "dataTablesUsed": ["table1", "table2"]
}
`;

  // Build conversation history with vision support
  const conversationMessages = (request.conversationHistory || []).map(msg => ({
    role: msg.role as 'user' | 'assistant',
    content: msg.content,
  }));

  // Build the current user message with optional images
  const currentMessageContent: any[] = [];

  // Add images if provided
  if (request.images && request.images.length > 0) {
    request.images.forEach(base64Image => {
      // Extract media type and base64 data
      const matches = base64Image.match(/^data:image\/(png|jpeg|jpg|gif|webp);base64,(.+)$/);
      if (matches) {
        currentMessageContent.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: `image/${matches[1]}`,
            data: matches[2],
          },
        });
      }
    });
  }

  // Add text prompt
  currentMessageContent.push({
    type: 'text',
    text: request.userPrompt + '\n\nIf screenshots are provided, replicate the UI design shown while using ONLY the data from the schema above. Match the visual style, layout, and components from the screenshot.',
  });

  const messages: Array<{ role: 'user' | 'assistant'; content: any }> = [
    ...conversationMessages,
    {
      role: 'user',
      content: currentMessageContent,
    },
  ];

  try {
    // Check if we have a real API key
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.includes('your_')) {
      console.log('No API key configured - returning demo response');

      // Return a demo response based on the prompt
      const demoResponse: UIGenerationResponse = {
        generatedCode: `'use client';

import { useEffect, useState } from 'react';

interface Client {
  id: number;
  client_name: string;
  account_number: string;
  account_type: string;
  total_market_value: number;
  status: string;
}

export default function ClientDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch clients data
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => {
        setClients(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{client.client_name}</h2>
            <p className="text-gray-600 text-sm mb-4">{client.account_type}</p>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Account:</span>
                <span className="font-mono">{client.account_number}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Market Value:</span>
                <span className="font-semibold text-green-600">
                  $\{client.total_market_value.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {client.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This is a demo component. Configure your Anthropic API key
          to generate custom UIs based on your prompts.
        </p>
      </div>
    </div>
  );
}`,
        explanation: `Created a Client Dashboard component that displays all clients from the 'clients' table.

The component:
- Fetches data from the clients table
- Displays client name, account type, account number, total market value, and status
- Uses a responsive grid layout (1-3 columns based on screen size)
- Styled with Tailwind CSS

Tables used: clients

**DEMO MODE**: To get AI-generated custom components, add your Anthropic API key to .env.local`,
        dataTablesUsed: ['clients']
      };

      return demoResponse;
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 4096,
      system: systemPrompt,
      messages,
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    // Parse the JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON response from Claude');
    }

    const parsed = JSON.parse(jsonMatch[0]) as UIGenerationResponse;

    return parsed;
  } catch (error) {
    console.error('Error generating UI with Claude:', error);
    throw new Error('Failed to generate UI: ' + (error as Error).message);
  }
}

/**
 * Validate that generated code only references tables in the schema
 */
export function validateDataReferences(
  code: string,
  allowedTables: string[]
): { isValid: boolean; violations: string[] } {
  const violations: string[] = [];

  // Simple validation: check if code references any table names
  const tablePattern = /FROM\s+(\w+)|\.(\w+)\s+WHERE|table:\s*['"](\w+)['"]/gi;
  let match;

  while ((match = tablePattern.exec(code)) !== null) {
    const tableName = match[1] || match[2] || match[3];
    if (tableName && !allowedTables.includes(tableName.toLowerCase())) {
      violations.push(`Reference to non-existent table: ${tableName}`);
    }
  }

  return {
    isValid: violations.length === 0,
    violations,
  };
}
