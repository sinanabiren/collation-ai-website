import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

interface TableData {
  name: string;
  columns: string[];
  rows: any[][];
}

// Helper function to infer column type from data
function inferColumnType(values: any[]): string {
  const nonEmptyValues = values.filter(v => v !== null && v !== undefined && v !== '');

  if (nonEmptyValues.length === 0) return 'TEXT';

  // Check if all values are numbers
  const allNumbers = nonEmptyValues.every(v => !isNaN(Number(v)));
  if (allNumbers) {
    const hasDecimals = nonEmptyValues.some(v => String(v).includes('.'));
    return hasDecimals ? 'DECIMAL' : 'INTEGER';
  }

  // Check if values look like dates
  const allDates = nonEmptyValues.every(v => {
    const date = new Date(v);
    return date.toString() !== 'Invalid Date';
  });
  if (allDates) return 'TIMESTAMP';

  // Check if values are boolean-like
  const allBooleans = nonEmptyValues.every(v =>
    ['true', 'false', '1', '0', 'yes', 'no'].includes(String(v).toLowerCase())
  );
  if (allBooleans) return 'BOOLEAN';

  // Default to TEXT with appropriate length
  const maxLength = Math.max(...nonEmptyValues.map(v => String(v).length));
  return maxLength > 255 ? 'TEXT' : 'VARCHAR(255)';
}

// Helper function to convert value to appropriate type
function convertValue(value: any, columnType: string): any {
  if (value === null || value === undefined || value === '') return null;

  if (columnType === 'INTEGER') return parseInt(String(value));
  if (columnType === 'DECIMAL') return parseFloat(String(value));
  if (columnType === 'BOOLEAN') {
    const str = String(value).toLowerCase();
    return ['true', '1', 'yes'].includes(str);
  }
  if (columnType === 'TIMESTAMP') return new Date(value).toISOString();

  return String(value);
}

export async function POST(req: NextRequest) {
  try {
    const { tables, userId }: { tables: TableData[]; userId?: string } = await req.json();

    if (!tables || tables.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No tables provided' },
        { status: 400 }
      );
    }

    // Create connection string (using environment variable or creating new Neon database)
    const connectionString = process.env.DATABASE_URL || '';

    if (!connectionString) {
      return NextResponse.json(
        { success: false, error: 'Database connection not configured' },
        { status: 500 }
      );
    }

    const pool = new Pool({ connectionString });

    try {
      // Use table prefix instead of schema (Azure user lacks CREATE SCHEMA permission)
      const userPrefix = userId ? `u${userId.substring(0, 8)}_` : `u${Date.now()}_`;

      // Create tables and insert data
      for (const table of tables) {
        // Add user prefix to table name for isolation
        const tableName = `${userPrefix}${table.name}`;
        const columns = table.columns;
        const rows = table.rows;

        // Infer column types from data
        const columnTypes = columns.map((_, colIdx) => {
          const columnValues = rows.map(row => row[colIdx]);
          return inferColumnType(columnValues);
        });

        // Create table SQL
        const columnDefinitions = columns.map((col, idx) =>
          `"${col}" ${columnTypes[idx]}`
        ).join(', ');

        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS "${tableName}" (
            id SERIAL PRIMARY KEY,
            ${columnDefinitions},
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;

        await pool.query(createTableSQL);

        // Insert data
        if (rows.length > 0) {
          const placeholders = rows.map((_, rowIdx) => {
            const valuePlaceholders = columns.map((_, colIdx) =>
              `$${rowIdx * columns.length + colIdx + 1}`
            ).join(', ');
            return `(${valuePlaceholders})`;
          }).join(', ');

          const values = rows.flatMap((row, rowIdx) =>
            columns.map((_, colIdx) => convertValue(row[colIdx], columnTypes[colIdx]))
          );

          const columnNames = columns.map(col => `"${col}"`).join(', ');
          const insertSQL = `
            INSERT INTO "${tableName}" (${columnNames})
            VALUES ${placeholders};
          `;

          await pool.query(insertSQL, values);
        }
      }

      await pool.end();

      return NextResponse.json({
        success: true,
        connectionString,
        userPrefix,
        message: `Successfully created ${tables.length} table(s) with prefix ${userPrefix}`,
      });
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      await pool.end();
      return NextResponse.json(
        { success: false, error: 'Failed to create tables: ' + dbError.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in create-database:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
