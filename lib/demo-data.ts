// Mock data for demo mode (no database required)

export const DEMO_SCHEMA = [
  {
    table_name: 'clients',
    columns: [
      { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
      { column_name: 'client_name', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'account_number', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'account_type', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'total_market_value', data_type: 'numeric', is_nullable: 'YES' },
      { column_name: 'status', data_type: 'character varying', is_nullable: 'YES' },
    ],
  },
  {
    table_name: 'holdings',
    columns: [
      { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
      { column_name: 'client_id', data_type: 'integer', is_nullable: 'YES' },
      { column_name: 'security_symbol', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'security_name', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'asset_class', data_type: 'character varying', is_nullable: 'YES' },
      { column_name: 'quantity', data_type: 'numeric', is_nullable: 'YES' },
      { column_name: 'market_value', data_type: 'numeric', is_nullable: 'YES' },
      { column_name: 'unrealized_gain_loss', data_type: 'numeric', is_nullable: 'YES' },
    ],
  },
  {
    table_name: 'transactions',
    columns: [
      { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
      { column_name: 'client_id', data_type: 'integer', is_nullable: 'YES' },
      { column_name: 'transaction_date', data_type: 'date', is_nullable: 'NO' },
      { column_name: 'transaction_type', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'security_symbol', data_type: 'character varying', is_nullable: 'YES' },
      { column_name: 'amount', data_type: 'numeric', is_nullable: 'YES' },
    ],
  },
  {
    table_name: 'performance',
    columns: [
      { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
      { column_name: 'client_id', data_type: 'integer', is_nullable: 'YES' },
      { column_name: 'period_end_date', data_type: 'date', is_nullable: 'NO' },
      { column_name: 'total_return_pct', data_type: 'numeric', is_nullable: 'YES' },
      { column_name: 'benchmark_return_pct', data_type: 'numeric', is_nullable: 'YES' },
    ],
  },
  {
    table_name: 'asset_allocation',
    columns: [
      { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
      { column_name: 'client_id', data_type: 'integer', is_nullable: 'YES' },
      { column_name: 'asset_class', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'market_value', data_type: 'numeric', is_nullable: 'YES' },
      { column_name: 'actual_percentage', data_type: 'numeric', is_nullable: 'YES' },
    ],
  },
];

export const DEMO_SAMPLES = [
  {
    table_name: 'clients',
    sample_data: [
      {
        id: 1,
        client_name: 'Johnson Family Trust',
        account_number: 'ACC-001',
        account_type: 'Trust',
        total_market_value: 2450000.0,
        status: 'Active',
      },
      {
        id: 2,
        client_name: 'Robert Chen',
        account_number: 'ACC-002',
        account_type: 'Individual',
        total_market_value: 1800000.0,
        status: 'Active',
      },
      {
        id: 3,
        client_name: 'Anderson Family Office',
        account_number: 'ACC-003',
        account_type: 'Family Office',
        total_market_value: 8500000.0,
        status: 'Active',
      },
    ],
  },
  {
    table_name: 'holdings',
    sample_data: [
      {
        id: 1,
        client_id: 1,
        security_symbol: 'AAPL',
        security_name: 'Apple Inc',
        asset_class: 'Equity',
        quantity: 1200.0,
        market_value: 210000.0,
        unrealized_gain_loss: 30000.0,
      },
      {
        id: 2,
        client_id: 1,
        security_symbol: 'MSFT',
        security_name: 'Microsoft Corporation',
        asset_class: 'Equity',
        quantity: 800.0,
        market_value: 320000.0,
        unrealized_gain_loss: 40000.0,
      },
    ],
  },
  {
    table_name: 'transactions',
    sample_data: [
      {
        id: 1,
        client_id: 1,
        transaction_date: '2024-10-15',
        transaction_type: 'Buy',
        security_symbol: 'AAPL',
        amount: 17550.0,
      },
      {
        id: 2,
        client_id: 1,
        transaction_date: '2024-10-20',
        transaction_type: 'Dividend',
        security_symbol: 'MSFT',
        amount: 2400.0,
      },
    ],
  },
];

export function getDemoSchemaDescription(): string {
  let description = '# Available Database Schema (DEMO MODE)\n\n';
  description += 'You have access to the following tables and data:\n\n';

  for (const table of DEMO_SCHEMA) {
    description += `## Table: ${table.table_name}\n`;
    description += 'Columns:\n';

    for (const col of table.columns) {
      description += `- ${col.column_name} (${col.data_type})${
        col.is_nullable === 'YES' ? ' [nullable]' : ''
      }\n`;
    }

    const sample = DEMO_SAMPLES.find((s) => s.table_name === table.table_name);
    if (sample && sample.sample_data.length > 0) {
      description += '\nSample data:\n';
      description += '```json\n';
      description += JSON.stringify(sample.sample_data, null, 2);
      description += '\n```\n';
    }
    description += '\n';
  }

  description += `
## Important Constraints:
- You MUST only create UI components that use data from these tables
- Do NOT create mock data or use fictional data
- All data references must correspond to actual columns in the schema above
`;

  return description;
}
