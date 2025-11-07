import Anthropic from '@anthropic-ai/sdk';
import { generateSchemaDescription, getCustomerSchema, getSampleData } from './db/schema';
import { DEMO_SCHEMA, DEMO_SAMPLES, getDemoSchemaDescription } from './demo-data';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'demo-key',
});

export interface UIGenerationRequest {
  customerId: string;
  userPrompt: string;
  currentCode?: string; // Current generated code for iterative improvements
  images?: string[]; // base64 encoded images
  selectedTables?: string[]; // Optional list of table names to include (to avoid prompt too long error)
}

export interface UIGenerationResponse {
  generatedCode: string;
  explanation: string;
  dataTablesUsed: string[];
  tokenUsage?: {
    input_tokens: number;
    output_tokens: number;
  };
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
    // Pass selectedTables to only fetch schema for specific tables (avoid prompt too long error)
    schema = await getCustomerSchema(request.customerId, request.selectedTables);
    samples = await getSampleData(request.customerId, request.selectedTables);
    schemaDescription = generateSchemaDescription(schema, samples);

    // CRITICAL: Truncate schema description to avoid token limits
    // Rough estimate: 1 token ~= 4 characters, so 30,000 chars ~= 7,500 tokens
    const MAX_SCHEMA_CHARS = 30000;
    if (schemaDescription.length > MAX_SCHEMA_CHARS) {
      schemaDescription = schemaDescription.substring(0, MAX_SCHEMA_CHARS) +
        '\n\n... (schema truncated due to size - showing first ' +
        Math.floor(MAX_SCHEMA_CHARS / 1000) + 'KB)';
      console.log(`⚠️ Schema description truncated from ${schemaDescription.length} to ${MAX_SCHEMA_CHARS} characters`);
    }
  } catch (error) {
    console.log('Using demo schema for UI generation');
    schema = DEMO_SCHEMA;
    samples = DEMO_SAMPLES;
    schemaDescription = getDemoSchemaDescription();
  }

  // Build the system prompt that constrains the LLM
  let systemPrompt = `You are a UI code generator for a financial data platform serving Registered Investment Advisors and Family Offices.

${schemaDescription}

Your task is to generate React/TypeScript UI components based on user requests. You MUST follow these rules:

1. **Data Constraint**: Only use data from the schema provided above. Do NOT invent, mock, or hallucinate data.
2. **Real Data Only**: All data references must map to actual tables and columns in the schema.
3. **API Integration**: Generate code that fetches real data from the provided tables.
4. **TypeScript**: Use TypeScript with proper types derived from the schema.
5. **Modern Stack**: Use Next.js 14+, React Server Components where appropriate, and Tailwind CSS.
6. **Validation**: Before generating any component, verify that all data fields exist in the schema.

## CODE QUALITY REQUIREMENTS (CRITICAL)

Your generated code must be PRODUCTION-READY and BUG-FREE. Customers expect the same quality as GPT-4 and other leading LLMs.

**Before returning any code, you MUST:**

1. **Variable Name Consistency**: Double-check ALL variable names for singular/plural consistency
   - If you define \`const holdings = ...\`, use \`holdings.map()\`, NOT \`holding.map()\`
   - If you define \`const clients = ...\`, use \`clients.filter()\`, NOT \`client.filter()\`
   - COMMON MISTAKE: Defining plural array but using singular in methods - ALWAYS verify!

2. **Undefined Variable Prevention**:
   - Check that every variable used is properly defined
   - Add optional chaining (\`?.\`) for properties that might be undefined
   - Add null checks before accessing array methods

3. **Logic Verification**:
   - Verify all data fetching logic matches the schema
   - Ensure state management is correct (useState, useEffect dependencies)
   - Check that all callbacks and event handlers are properly defined

4. **Common Mistakes to AVOID**:
   - ❌ Singular/plural mismatches: \`holdings\` defined, but using \`holding.map()\`
   - ❌ Missing null checks: \`data.map()\` when data might be undefined
   - ❌ Typos in property names: \`client.clientName\` when schema has \`client_name\`
   - ❌ Wrong variable references: using variables before they're defined
   - ❌ Missing imports: forgetting to import useState, useEffect, etc.

5. **Self-Review Checklist**:
   - Read through your generated code line by line
   - Verify every variable name is spelled consistently
   - Check that every property access matches the schema exactly
   - Confirm all array operations have proper null handling
   - Test logic mentally: "Would this code actually run without errors?"

**REMEMBER**: Users compare your output to GPT-4. Generate code that works on the first try, with no typos or logic errors.

Format your response as JSON with this structure:
{
  "generatedCode": "// Full React component code here",
  "explanation": "Brief explanation of what was built and which tables/columns are used",
  "dataTablesUsed": ["table1", "table2"]
}
`;

  // If there's current code, add it as context for iterative improvements
  // Extract key components and structure instead of sending full code to avoid token limits
  if (request.currentCode && request.currentCode.trim()) {
    // Extract key information from the code
    const hasReactQuery = request.currentCode.includes('useQuery') || request.currentCode.includes('react-query');
    const hasSWR = request.currentCode.includes('useSWR');
    const interfaces = request.currentCode.match(/interface\s+\w+\s*{[^}]+}/g) || [];
    const componentName = request.currentCode.match(/export default function (\w+)/)?.[1] || 'Component';

    systemPrompt += `

## Current Code Context
The user has an existing component named "${componentName}" that they want to modify.
${hasReactQuery ? '- Uses React Query for data fetching' : ''}
${hasSWR ? '- Uses SWR for data fetching' : ''}
${interfaces.length > 0 ? `- Has ${interfaces.length} TypeScript interfaces defined` : ''}

When the user asks for changes or additions:
1. Maintain the existing component structure and name
2. Keep the same data fetching approach (${hasReactQuery ? 'React Query' : hasSWR ? 'SWR' : 'fetch/useEffect'})
3. Add the requested features to the existing component
4. Preserve existing styling and layout unless specifically asked to change them
`;
  }

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

  // Simple message array with just the current request (no conversation history)
  const messages: Array<{ role: 'user' | 'assistant'; content: any }> = [
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

    // Capture token usage from response
    const tokenUsage = {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
    };
    console.log('📊 Token Usage:', `Input: ${tokenUsage.input_tokens}, Output: ${tokenUsage.output_tokens}, Total: ${tokenUsage.input_tokens + tokenUsage.output_tokens}`);

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    // Parse the JSON response - ULTRA robust parsing
    let rawText = content.text.trim();

    console.log('Raw Claude response (first 500 chars):', rawText.substring(0, 500));
    console.log('Raw Claude response (last 500 chars):', rawText.substring(Math.max(0, rawText.length - 500)));

    // Step 1: Try to extract JSON from markdown code blocks
    let jsonText = rawText;
    const codeBlockMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch) {
      jsonText = codeBlockMatch[1].trim();
      console.log('Extracted from code block');
    }

    // Step 2: Find the outermost JSON object
    const firstBrace = jsonText.indexOf('{');
    const lastBrace = jsonText.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
      console.error('No JSON object found in response');
      console.error('Full response:', rawText);
      throw new Error('No JSON object found in Claude response. Claude may have returned plain text instead of JSON.');
    }

    jsonText = jsonText.substring(firstBrace, lastBrace + 1);

    // Step 3: Try parsing attempts with increasing levels of cleanup
    const attempts = [
      // Attempt 1: Parse as-is
      () => JSON.parse(jsonText),

      // Attempt 2: Fix common JSON issues
      () => {
        let fixed = jsonText
          // Fix unescaped newlines in strings (but not in code blocks)
          .replace(/([^\\])\\n/g, '$1\\\\n')
          // Fix unescaped quotes
          .replace(/([^\\])"/g, (match, p1, offset) => {
            // Check if we're inside a string value
            const before = jsonText.substring(0, offset);
            const quoteCount = (before.match(/"/g) || []).length;
            return quoteCount % 2 === 1 ? `${p1}\\"` : match;
          });
        return JSON.parse(fixed);
      },

      // Attempt 3: Extract fields manually with regex
      () => {
        const codeMatch = jsonText.match(/"generatedCode"\s*:\s*"([\s\S]*?)"(?=\s*,\s*"explanation")/);
        const explanationMatch = jsonText.match(/"explanation"\s*:\s*"([\s\S]*?)"(?=\s*,?\s*"dataTablesUsed")/);
        const tablesMatch = jsonText.match(/"dataTablesUsed"\s*:\s*\[([\s\S]*?)\]/);

        if (!codeMatch || !explanationMatch) {
          throw new Error('Could not extract required fields from response');
        }

        return {
          generatedCode: codeMatch[1],
          explanation: explanationMatch[1],
          dataTablesUsed: tablesMatch ? JSON.parse(`[${tablesMatch[1]}]`) : []
        };
      }
    ];

    let lastError: Error | null = null;
    for (let i = 0; i < attempts.length; i++) {
      try {
        console.log(`Parse attempt ${i + 1}...`);
        const parsed = attempts[i]() as UIGenerationResponse;
        console.log('✓ Successfully parsed response');
        return { ...parsed, tokenUsage };
      } catch (error) {
        console.log(`✗ Attempt ${i + 1} failed:`, (error as Error).message);
        lastError = error as Error;
      }
    }

    // All attempts failed
    console.error('All parsing attempts failed');
    console.error('Final JSON text:', jsonText.substring(0, 1000));
    console.error('Last error:', lastError);
    throw new Error(`Failed to parse Claude response as JSON after ${attempts.length} attempts. Last error: ${lastError?.message}`);
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
