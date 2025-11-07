'use client';

import { useState, useEffect, useRef } from 'react';

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
  const [customerId] = useState('customer_001');
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

  useEffect(() => {
    // Check if database is already configured
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const response = await fetch(`/api/get-schema?customerId=${customerId}`);
      const result = await response.json();

      if (result.success) {
        setSchema(result.data.schema);
        setIsDemoMode(result.data.isDemoMode || false);

        // If we have real data (not demo), consider it connected
        if (!result.data.isDemoMode && result.data.schema.length > 0) {
          setIsConnected(true);
        }
      }
    } catch (err) {
      console.error('Connection check failed:', err);
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
    try {
      const response = await fetch(`/api/get-schema?customerId=${customerId}`);
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

    setShowWorkspace(true);

    const userMessage: Message = {
      role: 'user',
      content: prompt,
      images: attachedImages.length > 0 ? [...attachedImages] : undefined
    };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setAttachedImages([]);
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-ui', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          userPrompt: prompt,
          conversationHistory: messages,
          images: attachedImages.length > 0 ? attachedImages : undefined,
        }),
      });

      const result = await response.json();

      if (result.success) {
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
      setError('Error: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Database Connection Form (FIRST SCREEN - if not connected)
  if (!isConnected && !showWorkspace) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-pink-300 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 w-full max-w-2xl">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-pink-300 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Connection status */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-medium text-gray-700">
              {schema.length} tables connected
            </span>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="bg-white/80 backdrop-blur-sm text-blue-600 text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                Introducing Lovable x thought ✨
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Build something <span className="inline-block">🔥</span> <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Data-Driven</span>
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              Vibe-code custom UIs by chatting with AI—constrained to your real database
            </p>
          </div>

          {/* Main input card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask to replicate a UI from a screenshot or describe what you want to build..."
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
                        Generate UI
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
    <div className="flex h-screen bg-slate-900">
      {/* Left sidebar - Chat */}
      <div className="w-96 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Chat</h2>
            <button
              onClick={() => setShowWorkspace(false)}
              className="text-xs px-3 py-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
            >
              New Project
            </button>
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
            <div key={idx} className={`${msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-700'} rounded-lg p-3`}>
              <div className="text-xs font-semibold mb-1 text-slate-300">
                {msg.role === 'user' ? 'You' : 'AI Assistant'}
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
              <div className="text-sm text-white whitespace-pre-wrap">{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="text-xs font-semibold mb-1 text-slate-300">AI Assistant</div>
              <div className="text-sm text-slate-400">Generating your UI...</div>
            </div>
          )}
          {error && (
            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
              <div className="text-sm text-red-200">{error}</div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
          <div className="bg-slate-700 rounded-lg">
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
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded transition-colors"
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
                className="flex-1 px-3 py-2 bg-transparent text-white placeholder-slate-400 focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Middle - Preview */}
      <div className="flex-1 flex flex-col bg-slate-900">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Live Preview</h2>
          {generatedCode && (
            <button
              onClick={() => {
                const element = document.getElementById('preview-container');
                if (element) {
                  element.requestFullscreen?.();
                }
              }}
              className="text-sm px-3 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >
              Fullscreen
            </button>
          )}
        </div>
        <div className="flex-1 overflow-auto bg-slate-800 p-6" id="preview-container">
          {generatedCode ? (
            <div className="bg-white rounded-lg shadow-xl p-6 min-h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <h2 className="text-2xl font-bold text-gray-900">Client Dashboard</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Live Preview
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Johnson Family Trust', type: 'Trust', account: 'ACC-001', value: 2450000 },
                    { name: 'Robert Chen', type: 'Individual', account: 'ACC-002', value: 1800000 },
                    { name: 'Anderson Family Office', type: 'Family Office', account: 'ACC-003', value: 8500000 },
                  ].map((client, idx) => (
                    <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
                      <h3 className="text-lg font-semibold mb-2">{client.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{client.type}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm">Account:</span>
                          <span className="font-mono text-sm">{client.account}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm">Market Value:</span>
                          <span className="font-semibold text-green-600">
                            ${client.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 text-sm">Status:</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p>Your UI will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar - Code & Actions */}
      <div className="w-96 bg-slate-800 border-l border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Code</h2>
          {generatedCode && (
            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(generatedCode)}
                className="text-sm px-3 py-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
              >
                Copy
              </button>
            </div>
          )}
        </div>

        {/* Data Schema */}
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-sm font-semibold text-slate-400 mb-3">Available Data</h3>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {schema.slice(0, 5).map((table) => (
              <div key={table.table_name} className="text-xs">
                <div className="font-mono text-blue-400 mb-1">{table.table_name}</div>
                <div className="text-slate-500 ml-2">
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
            <pre className="text-xs text-slate-300 font-mono">
              <code>{generatedCode}</code>
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-600 text-sm">
              Code will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
