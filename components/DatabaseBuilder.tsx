'use client';

import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

interface TableData {
  name: string;
  columns: string[];
  rows: any[][];
}

interface DatabaseBuilderProps {
  onDatabaseCreated: (connectionString: string, userPrefix?: string) => void;
  onBack: () => void;
  userId?: string;
}

export default function DatabaseBuilder({ onDatabaseCreated, onBack, userId }: DatabaseBuilderProps) {
  const [step, setStep] = useState<'choice' | 'excel' | 'spreadsheet' | 'creating'>('choice');
  const [tables, setTables] = useState<TableData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Spreadsheet state
  const [currentTable, setCurrentTable] = useState('');
  const [spreadsheetData, setSpreadsheetData] = useState<{
    columns: string[];
    rows: string[][];
  }>({
    columns: ['Column 1', 'Column 2', 'Column 3'],
    rows: [['', '', '']],
  });

  const handleExcelUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError('');

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);

      const parsedTables: TableData[] = [];

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length > 0) {
          const columns = jsonData[0].map((col: any, idx: number) =>
            col ? String(col).trim() : `column_${idx + 1}`
          );
          const rows = jsonData.slice(1).filter(row => row.some(cell => cell !== undefined && cell !== ''));

          parsedTables.push({
            name: sheetName.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
            columns,
            rows,
          });
        }
      });

      setTables(parsedTables);
      setStep('creating');
      await createDatabaseWithTables(parsedTables);
    } catch (err) {
      setError('Failed to parse Excel file. Please make sure it\'s a valid Excel file.');
      console.error('Excel parsing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const addSpreadsheetColumn = () => {
    setSpreadsheetData({
      ...spreadsheetData,
      columns: [...spreadsheetData.columns, `Column ${spreadsheetData.columns.length + 1}`],
      rows: spreadsheetData.rows.map(row => [...row, '']),
    });
  };

  const addSpreadsheetRow = () => {
    setSpreadsheetData({
      ...spreadsheetData,
      rows: [...spreadsheetData.rows, Array(spreadsheetData.columns.length).fill('')],
    });
  };

  const updateColumnName = (index: number, value: string) => {
    const newColumns = [...spreadsheetData.columns];
    newColumns[index] = value;
    setSpreadsheetData({ ...spreadsheetData, columns: newColumns });
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...spreadsheetData.rows];
    newRows[rowIndex][colIndex] = value;
    setSpreadsheetData({ ...spreadsheetData, rows: newRows });
  };

  const handleSpreadsheetSubmit = async () => {
    if (!currentTable.trim()) {
      setError('Please enter a table name');
      return;
    }

    const validRows = spreadsheetData.rows.filter(row =>
      row.some(cell => cell && cell.trim() !== '')
    );

    if (validRows.length === 0) {
      setError('Please add at least one row of data');
      return;
    }

    const tableData: TableData = {
      name: currentTable.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
      columns: spreadsheetData.columns.map(col => col.toLowerCase().replace(/[^a-z0-9_]/g, '_')),
      rows: validRows,
    };

    setStep('creating');
    await createDatabaseWithTables([tableData]);
  };

  const createDatabaseWithTables = async (tablesToCreate: TableData[]) => {
    setIsProcessing(true);
    setError('');

    try {
      // Call API to create database and tables
      const response = await fetch('/api/create-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tables: tablesToCreate, userId }),
      });

      const result = await response.json();

      if (result.success) {
        // Pass the connection string and user prefix back
        onDatabaseCreated(result.connectionString, result.userPrefix);
      } else {
        setError(result.error || 'Failed to create database');
        setStep('choice');
      }
    } catch (err) {
      setError('Error creating database: ' + (err as Error).message);
      setStep('choice');
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 'creating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-pink-300 flex items-center justify-center px-4">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-purple-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Creating Your Database...</h2>
          <p className="text-gray-600 mb-6">
            We're setting up your database and creating tables with your data. This will only take a moment.
          </p>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-green-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Provisioning database instance...</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-green-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Creating tables and schema...</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-green-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Importing your data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'spreadsheet') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-pink-300 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 w-full max-w-6xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Build Your Spreadsheet</h1>
            <p className="text-gray-700">Create your table structure and add data</p>
          </div>

          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6">
            {/* Table Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Table Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentTable}
                onChange={(e) => setCurrentTable(e.target.value)}
                placeholder="e.g., customers, products, orders"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Spreadsheet Grid */}
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {spreadsheetData.columns.map((col, idx) => (
                      <th key={idx} className="border-2 border-gray-300 bg-gray-50 p-0">
                        <input
                          type="text"
                          value={col}
                          onChange={(e) => updateColumnName(idx, e.target.value)}
                          className="w-full px-3 py-2 font-semibold text-sm text-center bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {spreadsheetData.rows.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((cell, colIdx) => (
                        <td key={colIdx} className="border-2 border-gray-300 p-0">
                          <input
                            type="text"
                            value={cell}
                            onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                            className="w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={addSpreadsheetColumn}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Column
              </button>
              <button
                onClick={addSpreadsheetRow}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Row
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep('choice')}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSpreadsheetSubmit}
                disabled={isProcessing}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isProcessing ? 'Creating...' : 'Create Database'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-pink-300 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">How Would You Like to Add Data?</h1>
          <p className="text-lg text-gray-700">Choose the method that works best for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Upload Excel */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="group bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 hover:shadow-3xl hover:scale-105 transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  Upload Excel File
                </h2>
                <p className="text-gray-600">Import data from your existing spreadsheet</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Supports .xlsx, .xls, and .csv files
            </div>
          </button>

          {/* Manual Spreadsheet */}
          <button
            onClick={() => setStep('spreadsheet')}
            disabled={isProcessing}
            className="group bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 hover:shadow-3xl hover:scale-105 transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Create Spreadsheet
                </h2>
                <p className="text-gray-600">Build your data table from scratch</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Perfect for starting fresh or small datasets
            </div>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleExcelUpload}
          className="hidden"
        />

        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={onBack}
            className="text-gray-700 hover:text-gray-900 font-medium underline"
          >
            ← Back to database options
          </button>
        </div>
      </div>
    </div>
  );
}
