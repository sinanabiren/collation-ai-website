import { query } from './connection';

export interface ColumnInfo {
  column_name: string;
  data_type: string;
  is_nullable: string;
}

export interface TableInfo {
  table_name: string;
  columns: ColumnInfo[];
}

export interface DataSample {
  table_name: string;
  sample_data: any[];
}

/**
 * Get database schema for a specific customer
 * This returns table structures so the LLM knows what data is available
 * Filters tables by user's table prefix and optionally by selected table names
 */
export async function getCustomerSchema(customerId: string, selectedTables?: string[]): Promise<TableInfo[]> {
  // First, check if this user has a table prefix
  let userPrefix = ''; // no prefix = show all tables
  try {
    const userResult = await query<{ user_prefix: string }>(`
      SELECT user_prefix FROM auth_users WHERE id = $1
    `, [customerId]);

    if (userResult.rows.length > 0 && userResult.rows[0].user_prefix) {
      userPrefix = userResult.rows[0].user_prefix;
    }
  } catch (error) {
    console.log('Could not fetch user prefix, showing all tables:', error);
  }

  // Build table name filter
  let tableNameFilter = '';
  if (selectedTables && selectedTables.length > 0) {
    // If selectedTables is provided, only fetch those specific tables
    const escapedTableNames = selectedTables.map(t => `'${t.replace(/'/g, "''")}'`).join(',');
    tableNameFilter = `AND c.table_name IN (${escapedTableNames})`;
  } else if (userPrefix) {
    // Otherwise, use prefix filter if available
    tableNameFilter = `AND c.table_name LIKE '${userPrefix}%'`;
  }

  const schemaQuery = `
    SELECT
      c.table_name,
      c.column_name,
      c.data_type,
      c.is_nullable
    FROM information_schema.columns c
    INNER JOIN information_schema.tables t
      ON c.table_name = t.table_name AND c.table_schema = t.table_schema
    WHERE t.table_schema = 'public'
      AND t.table_type = 'BASE TABLE'
      AND c.table_name NOT IN ('auth_users')
      ${tableNameFilter}
    ORDER BY c.table_name, c.ordinal_position;
  `;

  const result = await query<{
    table_name: string;
    column_name: string;
    data_type: string;
    is_nullable: string;
  }>(schemaQuery);

  // Group columns by table
  const tablesMap = new Map<string, TableInfo>();

  for (const row of result.rows) {
    if (!tablesMap.has(row.table_name)) {
      tablesMap.set(row.table_name, {
        table_name: row.table_name,
        columns: [],
      });
    }
    tablesMap.get(row.table_name)!.columns.push({
      column_name: row.column_name,
      data_type: row.data_type,
      is_nullable: row.is_nullable,
    });
  }

  return Array.from(tablesMap.values());
}

/**
 * Get sample data from each table (first 5 rows)
 * This gives the LLM context about actual data format and values
 * Optionally filters by selected table names
 */
export async function getSampleData(customerId: string, selectedTables?: string[]): Promise<DataSample[]> {
  const tables = await getCustomerSchema(customerId, selectedTables);
  const samples: DataSample[] = [];

  for (const table of tables) {
    try {
      const sampleQuery = `SELECT * FROM "${table.table_name}" LIMIT 5`;
      const result = await query(sampleQuery);
      samples.push({
        table_name: table.table_name,
        sample_data: result.rows,
      });
    } catch (error) {
      console.error(`Error fetching sample data for ${table.table_name}:`, error);
    }
  }

  return samples;
}

/**
 * Generate a schema description for the LLM prompt
 * This creates a text representation of the database structure
 */
export function generateSchemaDescription(
  tables: TableInfo[],
  samples: DataSample[]
): string {
  let description = '# Available Database Schema\n\n';
  description += 'You have access to the following tables and data:\n\n';

  for (const table of tables) {
    description += `## Table: ${table.table_name}\n`;
    description += 'Columns:\n';

    for (const col of table.columns) {
      description += `- ${col.column_name} (${col.data_type})${
        col.is_nullable === 'YES' ? ' [nullable]' : ''
      }\n`;
    }

    // Add sample data (limit to first 2 rows and use compact JSON)
    const sample = samples.find(s => s.table_name === table.table_name);
    if (sample && sample.sample_data.length > 0) {
      description += '\nSample data:\n';
      description += '```json\n';
      // Only include first 2 rows and use compact JSON (no indentation)
      const limitedSamples = sample.sample_data.slice(0, 2);
      description += JSON.stringify(limitedSamples);
      description += '\n```\n';
    }
    description += '\n';
  }

  description += `
## Important Constraints:
- You MUST only create UI components that use data from these tables
- Do NOT create mock data or use fictional data
- All data references must correspond to actual columns in the schema above
- When generating code, ensure all API calls/queries reference only these tables and columns
`;

  return description;
}
