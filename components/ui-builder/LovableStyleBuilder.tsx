'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import NDAAcceptance from '@/components/NDAAcceptance';
import DatabaseChoice from '@/components/DatabaseChoice';
import DatabaseBuilder from '@/components/DatabaseBuilder';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
}

interface SchemaInfo {
  table_name: string;
  columns: Array<{
    column_name: string;
    data_type: string;
    is_nullable: string;
  }>;
}

export default function LovableStyleBuilder() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [schema, setSchema] = useState<SchemaInfo[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [error, setError] = useState('');
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [showWorkspace, setShowWorkspace] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Database connection state
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const [dbConfig, setDbConfig] = useState({
    host: '',
    port: '5432',
    database: '',
    username: '',
    password: '',
    ssl: true,
  });

  // Tables modal state
  const [showAllTablesModal, setShowAllTablesModal] = useState(false);

  // Loading animation state
  const [loadingStage, setLoadingStage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTokenUsage, setCurrentTokenUsage] = useState<{ input_tokens: number; output_tokens: number } | null>(null);
  const [generationStartTime, setGenerationStartTime] = useState<number | null>(null);
  const [generationTimeSpent, setGenerationTimeSpent] = useState<number>(0);

  // GitHub sync state
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [githubConfig, setGithubConfig] = useState({
    token: '',
    owner: '',
    repo: '',
    branch: 'main',
    path: 'src/generated',
  });

  // Settings state
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // NDA state
  const { data: session } = useSession();
  const [ndaAccepted, setNdaAccepted] = useState<boolean | null>(null);
  const [isCheckingNDA, setIsCheckingNDA] = useState(true);

  // Database choice state
  const [showDatabaseChoice, setShowDatabaseChoice] = useState(true);
  const [needsDatabaseCreation, setNeedsDatabaseCreation] = useState(false);

  // Table selection state for filtering (to avoid prompt too long error)
  const [selectedTables, setSelectedTables] = useState<Set<string>>(new Set());

  // Search state for filtering tables
  const [tableSearchQuery, setTableSearchQuery] = useState('');

  // Abort controller for cancelling generation
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  useEffect(() => {
    // Check NDA acceptance status
    checkNDAStatus();
    // Check if database is already configured (only after we have session)
    if (session?.user?.id) {
      checkConnection();
    }
  }, [session]);

  const checkNDAStatus = async () => {
    if (!session?.user?.id) {
      setIsCheckingNDA(false);
      return;
    }

    try {
      const response = await fetch(`/api/accept-nda?userId=${session.user.id}`);
      const result = await response.json();

      if (result.success) {
        setNdaAccepted(result.data.ndaAccepted);
      } else {
        setNdaAccepted(false);
      }
    } catch (err) {
      console.error('Error checking NDA status:', err);
      setNdaAccepted(false);
    } finally {
      setIsCheckingNDA(false);
    }
  };

  const handleNDAAccepted = () => {
    setNdaAccepted(true);
  };

  // Initialize selected tables when schema loads - START WITH NONE SELECTED
  useEffect(() => {
    if (schema.length > 0) {
      // Start with no tables selected - user must select explicitly
      setSelectedTables(new Set());
    }
  }, [schema]);

  // Track elapsed time during generation
  useEffect(() => {
    if (!isLoading || !generationStartTime) {
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - generationStartTime;
      setGenerationTimeSpent(elapsed);
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(interval);
  }, [isLoading, generationStartTime]);

  // Filter tables based on search query
  const filteredSchema = schema.filter(table => {
    if (!tableSearchQuery.trim()) return true;
    const searchLower = tableSearchQuery.toLowerCase();

    // Search in table name
    if (table.table_name.toLowerCase().includes(searchLower)) {
      return true;
    }

    // Search in column names
    return table.columns.some(col =>
      col.column_name.toLowerCase().includes(searchLower)
    );
  });

  // Table selection helper functions
  const toggleTableSelection = (tableName: string) => {
    setSelectedTables(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tableName)) {
        newSet.delete(tableName);
      } else {
        newSet.add(tableName);
      }
      return newSet;
    });
  };

  const selectAllTables = () => {
    setSelectedTables(new Set(schema.map(t => t.table_name)));
  };

  const deselectAllTables = () => {
    setSelectedTables(new Set());
  };

  const checkConnection = async () => {
    if (!session?.user?.id) {
      return;
    }

    try {
      // Check if user has configured their database
      const configResponse = await fetch(`/api/check-database-config?userId=${session.user.id}`);
      const configResult = await configResponse.json();

      if (configResult.success && configResult.data.databaseConfigured) {
        // User has a database configured, fetch the schema
        const schemaResponse = await fetch(`/api/get-schema?customerId=${session.user.id}`);
        const schemaResult = await schemaResponse.json();

        if (schemaResult.success) {
          setSchema(schemaResult.data.schema);
          setIsDemoMode(schemaResult.data.isDemoMode || false);
          setIsConnected(true);
        }
      } else {
        // User hasn't configured a database yet
        setIsConnected(false);
        setSchema([]);
      }
    } catch (err) {
      console.error('Connection check failed:', err);
      setIsConnected(false);
    }
  };

  const connectDatabase = async () => {
    setIsConnecting(true);
    setConnectionError('');

    try {
      // First test the connection
      const connectionString = `postgresql://${dbConfig.username}:${encodeURIComponent(dbConfig.password)}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}${dbConfig.ssl ? '?sslmode=require' : ''}`;

      const testResponse = await fetch('/api/test-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionString }),
      });

      const testResult = await testResponse.json();

      if (!testResult.success) {
        setConnectionError(testResult.message);
        setIsConnecting(false);
        return;
      }

      // Save configuration
      const saveResponse = await fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          databaseUrl: connectionString,
          anthropicApiKey: process.env.ANTHROPIC_API_KEY || 'demo-key',
        }),
      });

      const saveResult = await saveResponse.json();

      if (saveResult.success) {
        // Mark user's database as configured
        await fetch('/api/mark-database-configured', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: session?.user?.id,
            connectionString,
          }),
        });

        // Reload to pick up new config
        await checkConnection();
        setIsConnected(true);
        setIsConnecting(false);
      } else {
        setConnectionError('Failed to save configuration');
        setIsConnecting(false);
      }
    } catch (err) {
      setConnectionError('Error: ' + (err as Error).message);
      setIsConnecting(false);
    }
  };

  const loadSchema = async () => {
    if (!session?.user?.id) {
      setError('No user session found');
      return;
    }

    try {
      const response = await fetch(`/api/get-schema?customerId=${session.user.id}`);
      const result = await response.json();

      if (result.success) {
        setSchema(result.data.schema);
        setIsDemoMode(result.data.isDemoMode || false);
      } else {
        setError('Failed to load schema: ' + result.error);
      }
    } catch (err) {
      setError('Error loading schema: ' + (err as Error).message);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setAttachedImages((prev) => [...prev, base64]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setAttachedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    // Only validate table selection when first entering workspace
    // After that, tables remain selected for all follow-up prompts
    if (!showWorkspace && selectedTables.size === 0) {
      setError('Please select at least one table to use for UI generation');
      return;
    }

    setShowWorkspace(true);

    // Save prompt and images but DON'T clear them (so user can tweak)
    const currentPrompt = prompt;
    const currentImages = attachedImages.length > 0 ? [...attachedImages] : undefined;

    // Create abort controller for cancellation
    const controller = new AbortController();
    setAbortController(controller);

    const userMessage: Message = {
      role: 'user',
      content: currentPrompt,
      images: currentImages
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add loading message in chat
    const loadingMessage: Message = {
      role: 'assistant',
      content: '⏳ Generating UI...'
    };
    setMessages((prev) => [...prev, loadingMessage]);

    setIsLoading(true);
    setError('');
    setGenerationStartTime(Date.now());
    setGenerationTimeSpent(0);

    // Loading stages animation
    const stages = [
      { text: 'Thinking...', progress: 15 },
      { text: 'Processing database schema...', progress: 35 },
      { text: 'Analyzing your request...', progress: 50 },
      { text: 'Generating UI components...', progress: 70 },
      { text: 'Optimizing code...', progress: 85 },
      { text: 'Finalizing...', progress: 95 }
    ];

    let currentStage = 0;
    const stageInterval = setInterval(() => {
      if (currentStage < stages.length) {
        setLoadingStage(stages[currentStage].text);
        setLoadingProgress(stages[currentStage].progress);
        currentStage++;
      }
    }, 800);

    try {
      // Send only the current code and new prompt (no conversation history)
      // This is more efficient and prevents token limit errors
      const response = await fetch('/api/generate-ui', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: session?.user?.id || 'unknown',
          userPrompt: currentPrompt,
          currentCode: generatedCode || '', // Send current code as context for iterations
          images: currentImages,
          selectedTables: Array.from(selectedTables), // Only use selected tables to avoid prompt too long error
        }),
      });

      const result = await response.json();

      clearInterval(stageInterval);
      setLoadingProgress(100);
      setLoadingStage('Complete!');

      if (result.success) {
        // Capture token usage if available
        if (result.data.tokenUsage) {
          setCurrentTokenUsage(result.data.tokenUsage);
        }

        const assistantMessage: Message = {
          role: 'assistant',
          content: result.data.explanation,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setGeneratedCode(result.data.generatedCode);
      } else {
        setError('Failed to generate UI: ' + result.error);
      }
    } catch (err) {
      clearInterval(stageInterval);
      // Handle abort vs other errors
      if ((err as Error).name === 'AbortError') {
        // Remove loading message and add cancelled message
        setMessages((prev) => {
          const withoutLoading = prev.filter(m => m.content !== '⏳ Generating UI...');
          return [...withoutLoading, { role: 'assistant', content: '⛔ Generation cancelled by user.' }];
        });
      } else {
        setError('Error: ' + (err as Error).message);
        // Remove loading message on error
        setMessages((prev) => prev.filter(m => m.content !== '⏳ Generating UI...'));
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setLoadingStage('');
        setLoadingProgress(0);
        setAbortController(null);
      }, 500);
    }
  };

  // Stop generation handler
  const handleStopGeneration = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  const syncToGitHub = async () => {
    if (!generatedCode) {
      alert('No code to sync. Please generate some code first.');
      return;
    }

    setIsSyncing(true);

    try {
      // In a real implementation, this would trigger GitHub OAuth flow
      // For now, just copy code to clipboard as a simple solution
      await navigator.clipboard.writeText(generatedCode);
      alert('Code copied to clipboard!\n\nIn production, this would connect via GitHub OAuth like Lovable does.');
      setShowGitHubModal(false);
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    } finally {
      setIsSyncing(false);
    }
  };


  const handleDisconnectDatabase = () => {
    if (confirm('Are you sure you want to disconnect from the database? You will need to reconnect to continue working.')) {
      setIsConnected(false);
      setSchema([]);
      setShowWorkspace(false);
      setShowSettingsModal(false);
      // Reset database config
      setDbConfig({
        host: '',
        port: '5432',
        database: '',
        username: '',
        password: '',
        ssl: true,
      });
    }
  };

  const handleConnectAnotherDatabase = () => {
    if (confirm('Are you sure you want to connect to a different database? Your current connection will be replaced.')) {
      setIsConnected(false);
      setSchema([]);
      setShowWorkspace(false);
      setShowSettingsModal(false);
      // Reset database config
      setDbConfig({
        host: '',
        port: '5432',
        database: '',
        username: '',
        password: '',
        ssl: true,
      });
    }
  };

  // Loading state while checking NDA
  if (isCheckingNDA) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-pink-300 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // NDA Acceptance Page (FIRST SCREEN - if NDA not accepted)
  if (ndaAccepted === false) {
    return <NDAAcceptance onAccepted={handleNDAAccepted} />;
  }

  // Database Choice Page (SECOND SCREEN - after NDA)
  if (ndaAccepted === true && showDatabaseChoice && !isConnected && !showWorkspace) {
    return (
      <DatabaseChoice
        onHaveDatabase={() => setShowDatabaseChoice(false)}
        onNeedDatabase={() => {
          setShowDatabaseChoice(false);
          setNeedsDatabaseCreation(true);
        }}
      />
    );
  }

  // Database Builder (if user needs help creating database)
  if (ndaAccepted === true && needsDatabaseCreation && !isConnected && !showWorkspace) {
    return (
      <DatabaseBuilder
        userId={session?.user?.id}
        onDatabaseCreated={async (connectionString, userPrefix) => {
          // Database created with tables, now mark as configured and load workspace
          if (session?.user?.id) {
            try {
              // Mark database as configured for this user
              await fetch('/api/mark-database-configured', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: session.user.id,
                  connectionString,
                  userPrefix,
                }),
              });

              // Load the schema to show tables (only user's tables with prefix)
              await checkConnection();

              // Hide database choice and builder, show workspace
              setNeedsDatabaseCreation(false);
              setShowDatabaseChoice(false);
              setIsConnected(true);
            } catch (err) {
              console.error('Error configuring database:', err);
              setConnectionError('Failed to configure database');
            }
          }
        }}
        onBack={() => {
          setNeedsDatabaseCreation(false);
          setShowDatabaseChoice(true);
        }}
      />
    );
  }

  // Database Connection Form (THIRD SCREEN - if user has database)
  if (!isConnected && !showWorkspace) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-pink-300 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 w-full max-w-2xl">
          {/* Back Button */}
          <button
            onClick={() => {
              setShowDatabaseChoice(true);
            }}
            className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to options</span>
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Connect Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Database</span>
            </h1>
            <p className="text-xl text-gray-700">
              Paste your Azure PostgreSQL credentials to get started
            </p>
          </div>

          {/* Connection Form Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Server Host <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={dbConfig.host}
                    onChange={(e) => setDbConfig({ ...dbConfig, host: e.target.value })}
                    placeholder="myserver.postgres.database.azure.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Port
                  </label>
                  <input
                    type="text"
                    value={dbConfig.port}
                    onChange={(e) => setDbConfig({ ...dbConfig, port: e.target.value })}
                    placeholder="5432"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Database Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={dbConfig.database}
                    onChange={(e) => setDbConfig({ ...dbConfig, database: e.target.value })}
                    placeholder="ui_builder_db"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={dbConfig.username}
                    onChange={(e) => setDbConfig({ ...dbConfig, username: e.target.value })}
                    placeholder="username@myserver"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={dbConfig.password}
                    onChange={(e) => setDbConfig({ ...dbConfig, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dbConfig.ssl}
                      onChange={(e) => setDbConfig({ ...dbConfig, ssl: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      Use SSL/TLS (Required for Azure)
                    </span>
                  </label>
                </div>
              </div>

              {connectionError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">❌ {connectionError}</p>
                </div>
              )}

              <button
                onClick={connectDatabase}
                disabled={isConnecting || !dbConfig.host || !dbConfig.database || !dbConfig.username || !dbConfig.password}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {isConnecting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connecting...
                  </span>
                ) : (
                  '🚀 Connect & Start Building'
                )}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setIsConnected(true)}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Skip and use demo data
                </button>
              </div>
            </div>
          </div>

          {/* Help text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 inline-block">
              💡 <strong>Where to find:</strong> Azure Portal → PostgreSQL Server → Connection strings
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Landing page (after connected, before workspace)
  if (!showWorkspace) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-pink-300 flex flex-col items-center justify-start px-4 py-8 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-3">
              <span className="bg-white/80 backdrop-blur-sm text-blue-600 text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                Introducing Lovable x thought ✨
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Build something <span className="inline-block">🔥</span> <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Data-Driven</span>
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              Vibe-code custom UIs by chatting with AI—constrained to your real database
            </p>
          </div>

          {/* Database Tables Preview - PROMINENT */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Database Tables</h2>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2 animate-pulse"></span>
                  {schema.length} {schema.length === 1 ? 'table' : 'tables'} available
                  <span className={`ml-2 font-semibold ${selectedTables.size === 0 ? 'text-red-600' : selectedTables.size > 20 ? 'text-orange-600' : 'text-blue-600'}`}>
                    ({selectedTables.size} selected for UI generation)
                  </span>
                </p>
                {selectedTables.size === 0 && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">
                    ⚠️ Please select at least one table to start building UI
                  </p>
                )}
                {selectedTables.size > 20 && (
                  <p className="text-xs text-orange-600 mt-1">
                    ⚠️ Selecting many tables may slow down responses. Consider selecting only the tables you need.
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={selectAllTables}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAllTables}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Deselect All
                </button>
              </div>
            </div>

            {/* Search Box */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={tableSearchQuery}
                  onChange={(e) => setTableSearchQuery(e.target.value)}
                  placeholder="Search tables by name or column name (e.g., 'holdings' or 'account_id')..."
                  className="w-full px-4 py-3 pl-11 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {tableSearchQuery && (
                <p className="text-xs text-gray-500 mt-2">
                  Found {filteredSchema.length} {filteredSchema.length === 1 ? 'table' : 'tables'} matching "{tableSearchQuery}"
                </p>
              )}
            </div>

            {/* Table Grid - Show first 6 filtered tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {filteredSchema.slice(0, 6).map((table, idx) => {
                const isSelected = selectedTables.has(table.table_name);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleTableSelection(table.table_name)}
                    className={`border-2 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleTableSelection(table.table_name)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{table.table_name}</h3>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{table.columns.length} cols</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1 ml-6">
                      {table.columns.slice(0, 3).map((col, colIdx) => (
                        <div key={colIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                          <span className="truncate">{col.column_name}</span>
                        </div>
                      ))}
                      {table.columns.length > 3 && (
                        <div className="text-gray-400 italic">+{table.columns.length - 3} more...</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredSchema.length > 6 && (
              <div className="text-center py-3 text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
                Showing 6 of {filteredSchema.length} tables ({filteredSchema.length - 6} more available) - Use search above to find specific tables
              </div>
            )}
          </div>

          {/* Main input card - ONLY SHOW WHEN TABLES SELECTED */}
          {selectedTables.size > 0 ? (
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 mb-6 animate-fadeIn">
              {/* Big attention-grabbing header */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  ✨ Ready to Build!
                </h2>
                <p className="text-blue-100 text-lg">
                  {selectedTables.size} {selectedTables.size === 1 ? 'table' : 'tables'} selected. Now describe what you want to create.
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6">
                <div className="mb-4 flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-green-800">
                    <strong>You're all set!</strong> Describe what UI you want to build with your selected data. You can also attach a screenshot to replicate an existing design.
                  </p>
                </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (prompt.trim() && !isLoading) {
                        handleSubmit(e as any);
                      }
                    }
                  }}
                  placeholder="Now describe what you want to build with your database... e.g., 'Create a dashboard showing bond_contracts with filters' or attach a screenshot to replicate. Press Enter to submit, Shift+Enter for new line."
                  className="w-full px-4 py-3 text-lg border-0 focus:outline-none focus:ring-0 resize-none bg-transparent"
                  rows={3}
                  disabled={isLoading}
                />

                {/* Attached images preview */}
                {attachedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 px-4">
                    {attachedImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={img}
                          alt={`Attachment ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      Attach Screenshot
                    </button>
                    <span className="text-xs text-gray-500">
                      {attachedImages.length > 0 && `${attachedImages.length} file(s) attached`}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2 shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        Vibe-Code
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Example prompts */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-3">Try these:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPrompt('Create a dashboard showing portfolio performance for all clients')}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                >
                  📊 Portfolio dashboard
                </button>
                <button
                  onClick={() => setPrompt('Build a table displaying holdings with unrealized gains')}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                >
                  📈 Holdings table
                </button>
                <button
                  onClick={() => setPrompt('Design a chart for asset allocation breakdown')}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                >
                  🥧 Asset allocation chart
                </button>
              </div>
            </div>
              </div>
            </div>
          ) : (
            // Show placeholder when no tables selected
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Select Tables to Get Started</h3>
                <p className="text-gray-500 mb-6">
                  Use the search box or click table cards above to select the data you want to use. The prompt box will appear once you've selected at least one table.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> You can search for tables by name or search by column names inside tables (e.g., search "holdings" or "account_id")
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Trust indicators */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Real Data Only</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No Mock Data</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Enterprise Ready</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Workspace view (after messages started)
  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Left sidebar - Chat */}
      <div className={`w-96 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        {/* Header */}
        <div className={`p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Chat</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettingsModal(true)}
                className={`text-xs px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                  theme === 'dark'
                    ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>
            </div>
          </div>
          {isDemoMode && (
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg px-3 py-2">
              <p className="text-xs text-yellow-200">Demo Mode Active</p>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`rounded-lg p-3 ${
              msg.role === 'user'
                ? 'bg-blue-600'
                : theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <div className={`text-xs font-semibold mb-1 flex items-center justify-between ${
                msg.role === 'user'
                  ? 'text-blue-100'
                  : theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
              }`}>
                <span>{msg.role === 'user' ? 'You' : 'AI Assistant'}</span>
                {msg.role === 'assistant' && idx === messages.length - 1 && currentTokenUsage && (
                  <span className={`text-xs font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    {currentTokenUsage.input_tokens.toLocaleString()}↑ / {currentTokenUsage.output_tokens.toLocaleString()}↓ tokens
                    {generationTimeSpent > 0 && ` • ${(generationTimeSpent / 1000).toFixed(1)}s`}
                  </span>
                )}
              </div>
              {msg.images && msg.images.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {msg.images.map((img, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={img}
                      alt={`Attachment ${imgIdx + 1}`}
                      className="w-16 h-16 object-cover rounded border border-slate-600"
                    />
                  ))}
                </div>
              )}
              <div className={`text-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'text-white'
                  : theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className={`rounded-lg p-3 ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <div className={`text-xs font-semibold mb-1 flex items-center justify-between ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
                <span>AI Assistant</span>
                <span className={`text-xs font-mono animate-pulse ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  {Math.floor(loadingProgress * 30)}↑ / {Math.floor(loadingProgress * 10)}↓ tokens
                  {generationTimeSpent > 0 && ` • ${(generationTimeSpent / 1000).toFixed(1)}s`}
                </span>
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>Generating your UI...</div>
            </div>
          )}
          {error && (
            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
              <div className="text-sm text-red-200">{error}</div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className={`p-4 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
          <div className={`rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'}`}>
            {attachedImages.length > 0 && (
              <div className="p-2 flex flex-wrap gap-2 border-b border-slate-600">
                {attachedImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img}
                      alt={`Attachment ${idx + 1}`}
                      className="w-12 h-12 object-cover rounded border border-slate-600"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-end gap-2 p-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded transition-colors ${
                  theme === 'dark'
                    ? 'text-slate-400 hover:text-white hover:bg-slate-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe changes or attach a screenshot..."
                className={`flex-1 px-3 py-2 bg-transparent focus:outline-none ${
                  theme === 'dark'
                    ? 'text-white placeholder-slate-400'
                    : 'text-gray-900 placeholder-gray-500'
                }`}
                disabled={isLoading}
              />
              {isLoading ? (
                <button
                  type="button"
                  onClick={handleStopGeneration}
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                  title="Stop generation"
                >
                  {/* Stop icon - square */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!prompt.trim()}
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  title="Send (or press Enter)"
                >
                  {/* Arrow up icon like Lovable */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Middle - Preview */}
      <div className={`flex-1 flex flex-col ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className={`p-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Live Preview</h2>
          </div>
          {generatedCode && (
            <button
              onClick={() => {
                const element = document.getElementById('preview-container');
                if (element) {
                  element.requestFullscreen?.();
                }
              }}
              className={`text-sm px-3 py-1 rounded transition-colors ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Fullscreen
            </button>
          )}
        </div>
        <div className={`flex-1 overflow-auto ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`} id="preview-container">
          {generatedCode ? (
            <iframe
              key={generatedCode.slice(0, 50)}
              srcDoc={`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: #f9fafb;
    }
    .error-container {
      padding: 20px;
      background: #fee;
      border: 2px solid #c00;
      border-radius: 8px;
      margin: 20px;
    }
    .error-container h3 {
      color: #c00;
      margin-top: 0;
    }
    .error-container pre {
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      overflow: auto;
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    try {
      const { useState, useEffect } = React;

      // Mock fetch for demo purposes
      window.fetch = window.fetch || ((url) => {
        return Promise.resolve({
          json: () => Promise.resolve([])
        });
      });

      // Extract component name and remove export
      const functionMatch = \`${generatedCode}\`.match(/export\\s+default\\s+function\\s+(\\w+)/);
      const constMatch = \`${generatedCode}\`.match(/export\\s+default\\s+(\\w+)/);
      const componentName = functionMatch ? functionMatch[1] : (constMatch ? constMatch[1] : 'Component');

      // Remove TypeScript syntax and exports, fix common bugs
      let processedCode = \`${generatedCode
        // Remove interface declarations (including multi-line)
        .replace(/interface\\s+\\w+\\s*\\{[\\s\\S]*?\\}/g, '')
        // Remove type annotations from parameters: (param: Type) or (param: Type[])
        .replace(/:(\\s*\\w+(\\[\\])?(<[^>]+>)?)(\\s*[,)])/g, '$4')
        // Remove type annotations from variables: const x: Type = or const x: Type[] =
        .replace(/:\\s*\\w+(\\[\\])?(<[^>]+>)?(\\s*=)/g, '$3')
        // Remove React.FC and similar type annotations: const Component: React.FC =
        .replace(/:\\s*React\\.\\w+(<[^>]+>)?\\s*=/g, ' =')
        // Remove generic type parameters from functions: function name<T>
        .replace(new RegExp('<[A-Z]\\\\w*(\\\\s*,\\\\s*[A-Z]\\\\w*)*>(?=\\\\s*\\\\())', 'g'), '')
        // Remove "export default"
        .replace(/export\\s+default\\s+/g, '')
        // AUTO-FIX COMMON BUGS:
        // Fix singular/plural typos
        .replace(/\\bholding\\.map/g, 'holdings.map')
        .replace(new RegExp('\\\\bholding\\\\\\[', 'g'), 'holdings[')
        .replace(/\\bclient\\.map/g, 'clients.map')
        .replace(/\\bdata\\.map/g, 'data?.map')
        // Fix undefined reduce calculations
        .replace(/const\\s+(\\w+)\\s*=\\s*(\\w+)\\.reduce/g, 'const $1 = ($2 || []).reduce')
        // Fix reduce with no return
        .replace(new RegExp('\\\\.reduce\\\\\\(\\\\\\([^)]+\\\\\\)\\\\s*=>\\\\s*\\\\\\{([^}]+)\\\\\\}', 'g'), '.reduce((acc, item) => { return $1 })')
        // Add optional chaining to all map/filter/reduce
        .replace(new RegExp('\\\\.map\\\\\\(', 'g'), '?.map(')
        .replace(new RegExp('\\\\.filter\\\\\\(', 'g'), '?.filter(')
        // Escape backticks and dollar signs
        .replace(/\`/g, '\\\\`')
        .replace(/\\$/g, '\\\\$')}\`;

      // Add Component alias if needed
      if (componentName !== 'Component') {
        processedCode += \`\\nconst Component = \${componentName};\`;
      }

      eval(Babel.transform(processedCode, { presets: ['react'] }).code);

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<Component />);
    } catch (error) {
      document.getElementById('root').innerHTML = \`
        <div class="error-container">
          <h3>Error rendering component</h3>
          <pre>\${error.message}</pre>
          <pre>\${error.stack}</pre>
        </div>
      \`;
      console.error('Preview error:', error);
    }
  </script>
</body>
</html>
              `}
              className="w-full h-full border-0"
              title="Live Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : isLoading ? (
            <div className={`flex flex-col items-center justify-center h-full ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
              {/* Spinning loader */}
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-500">{loadingProgress}%</span>
                </div>
              </div>
              {/* Loading stage text */}
              <p className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{loadingStage}</p>
              {/* Progress bar */}
              <div className={`w-64 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className={`flex flex-col items-center justify-center h-full ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p>Your UI will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar - Code & Actions */}
      <div className={`w-96 border-l flex flex-col ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className={`p-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Code</h2>
          {generatedCode && (
            <button
              onClick={() => setShowGitHubModal(true)}
              className={`text-sm px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Sync to GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          )}
        </div>

        {/* Data Selected */}
        <div className={`p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
          <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Data Selected ({selectedTables.size})
          </h3>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {schema.filter(t => selectedTables.has(t.table_name)).map((table) => (
              <div key={table.table_name} className="text-xs">
                <div className="font-mono text-blue-400 mb-1">{table.table_name}</div>
                <div className={`ml-2 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>
                  {table.columns.slice(0, 3).map((col) => col.column_name).join(', ')}
                  {table.columns.length > 3 && '...'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code */}
        <div className="flex-1 overflow-auto p-4">
          {generatedCode ? (
            <pre className={`text-xs font-mono ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
              <code>{generatedCode}</code>
            </pre>
          ) : isLoading ? (
            <div className={`flex flex-col items-center justify-center h-full ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
              {/* Spinning loader */}
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-500">{loadingProgress}%</span>
                </div>
              </div>
              {/* Loading stage text */}
              <p className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{loadingStage}</p>
              {/* Progress bar */}
              <div className={`w-64 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className={`flex items-center justify-center h-full text-sm ${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}`}>
              Code will appear here
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowSettingsModal(false)}
        >
          <div className={`${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'} rounded-2xl shadow-2xl max-w-lg w-full`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h2 className="text-2xl font-bold">Settings</h2>
                    <p className="text-blue-100 text-sm mt-1">Manage your workspace preferences</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Theme Toggle */}
              <div>
                <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                  Appearance
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      theme === 'light'
                        ? 'border-blue-500 bg-blue-50'
                        : theme === 'dark'
                        ? 'border-slate-600 bg-slate-700 hover:border-slate-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <svg className={`w-8 h-8 ${theme === 'light' ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className={`text-sm font-medium ${theme === 'light' ? 'text-blue-600' : theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
                        Light Mode
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      theme === 'dark'
                        ? 'border-blue-500 bg-blue-900/30'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <svg className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-gray-600'}`}>
                        Dark Mode
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Database Management */}
              <div>
                <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                  Database Connection
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={handleConnectAnotherDatabase}
                    className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                      theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                    <span className="text-sm font-medium">Connect to Another Database</span>
                  </button>
                  <button
                    onClick={handleDisconnectDatabase}
                    className="w-full p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <span className="text-sm font-medium">Disconnect Database</span>
                  </button>
                </div>
              </div>

              {/* Upgrade Section */}
              <div>
                <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                  Subscription
                </h3>
                <button
                  onClick={() => {
                    setShowSettingsModal(false);
                    setShowUpgradeModal(true);
                  }}
                  className="w-full p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-sm font-bold">Upgrade to Pro</div>
                      <div className="text-xs text-blue-100">Get custom pricing and features</div>
                    </div>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Database Tables Modal */}
      {showAllTablesModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAllTablesModal(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Database Tables</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {schema.length} tables connected - {selectedTables.size} selected for UI generation
                  </p>
                </div>
                <button
                  onClick={() => setShowAllTablesModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden flex flex-col p-6">
              {/* Action Buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={selectAllTables}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAllTables}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Deselect All
                </button>
              </div>

              {/* Search Box */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={tableSearchQuery}
                    onChange={(e) => setTableSearchQuery(e.target.value)}
                    placeholder="Search tables by name or column name..."
                    className="w-full px-4 py-3 pl-11 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {tableSearchQuery && (
                  <p className="text-xs text-gray-500 mt-2">
                    Found {filteredSchema.length} {filteredSchema.length === 1 ? 'table' : 'tables'} matching "{tableSearchQuery}"
                  </p>
                )}
              </div>

              {/* Tables List */}
              <div className="flex-1 overflow-y-auto space-y-3">
                {filteredSchema.map((table, idx) => {
                  const isSelected = selectedTables.has(table.table_name);
                  return (
                    <div
                      key={idx}
                      className={`border-2 rounded-lg p-4 transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleTableSelection(table.table_name)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900 text-base">{table.table_name}</h3>
                            <p className="text-xs text-gray-500 mt-1">{table.columns.length} columns</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleTableSelection(table.table_name)}
                          className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </button>
                      </div>

                      {/* Columns */}
                      <div className="ml-8 space-y-1">
                        {table.columns.map((col, colIdx) => (
                          <div key={colIdx} className="flex items-center gap-2 text-xs">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            <span className="font-mono text-gray-700">{col.column_name}</span>
                            <span className="text-gray-400">({col.data_type})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Sync Modal */}
      {showGitHubModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowGitHubModal(false)}
        >
          <div className={`${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'} rounded-2xl shadow-2xl max-w-lg w-full`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <div>
                    <h2 className="text-2xl font-bold">Sync to GitHub</h2>
                    <p className="text-gray-300 text-sm mt-1">Export your generated code to GitHub</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowGitHubModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                  Quick Export
                </h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                  Your generated code will be copied to your clipboard. In production, this would connect via GitHub OAuth similar to Lovable.
                </p>
                <button
                  onClick={syncToGitHub}
                  disabled={isSyncing}
                  className="w-full p-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSyncing ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Syncing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="font-semibold">Copy Code to Clipboard</span>
                    </>
                  )}
                </button>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
                <div className="flex gap-3">
                  <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                    <p className="font-medium mb-1">Coming Soon</p>
                    <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
                      Direct GitHub integration with OAuth will be available in a future update, allowing you to push code directly to your repositories.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowUpgradeModal(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white rounded-t-2xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-2">Upgrade to Pro</h2>
              <p className="text-blue-100">Get custom enterprise solutions</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Contact Our Sales Team</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Interested in custom pricing, contract templates, or a tailored proposal? Our team is ready to help you find the perfect solution for your needs.
                </p>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Email us at</div>
                      <a
                        href="mailto:hello@collation.ai?subject=Upgrade%20Inquiry%20-%20Custom%20Pricing&body=Hi%20Collation%20Team%2C%0A%0AI'm%20interested%20in%20learning%20more%20about%3A%0A-%20Custom%20pricing%0A-%20Contract%20templates%0A-%20Price%20proposals%0A%0APlease%20contact%20me%20at%20your%20earliest%20convenience.%0A%0AThank%20you!"
                        className="text-lg font-bold text-purple-600 hover:text-purple-700"
                      >
                        hello@collation.ai
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Custom pricing tailored to your needs</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Priority support and dedicated account manager</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Advanced features and customization</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex gap-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Maybe Later
              </button>
              <a
                href="mailto:hello@collation.ai?subject=Upgrade%20Inquiry%20-%20Custom%20Pricing&body=Hi%20Collation%20Team%2C%0A%0AI'm%20interested%20in%20learning%20more%20about%3A%0A-%20Custom%20pricing%0A-%20Contract%20templates%0A-%20Price%20proposals%0A%0APlease%20contact%20me%20at%20your%20earliest%20convenience.%0A%0AThank%20you!"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-center font-medium"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
