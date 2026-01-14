'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Workflow, CheckCircle, Code, Play, Search } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  matchResults?: {
    github?: { repo: string; match: number; description: string };
    airflow?: { dag: string; match: number; description: string };
  };
  showDeploy?: boolean;
  deploying?: boolean;
  deployed?: boolean;
  generatedCode?: string;
}

export default function WorkflowBuilder() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your Workflow Automation Assistant. Describe the workflow you want to build, and I'll search GitHub and Airflow for existing solutions that match your needs."
    }
  ]);
  const [input, setInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const simulateSearch = async (userPrompt: string) => {
    setIsSearching(true);

    // Simulate searching message
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: '🔍 Searching GitHub repositories and Airflow DAGs for matches...'
    }]);

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock results based on common keywords
    const githubMatch = 92 + Math.floor(Math.random() * 7); // 92-98%
    const airflowMatch = 88 + Math.floor(Math.random() * 10); // 88-97%

    setMessages(prev => {
      const newMessages = [...prev];
      newMessages[newMessages.length - 1] = {
        role: 'assistant',
        content: `✅ Found matching workflows!`,
        matchResults: {
          github: {
            repo: 'financial-data/addepar-reconciliation',
            match: githubMatch,
            description: 'Python workflow for pulling Addepar data via API and performing reconciliation'
          },
          airflow: {
            dag: 'addepar_archway_reconciliation_dag',
            match: airflowMatch,
            description: 'Daily scheduled DAG for data reconciliation between Addepar and Archway'
          }
        },
        showDeploy: true
      };
      return newMessages;
    });

    setIsSearching(false);
  };

  const handleDeploy = async (messageIndex: number) => {
    // Update message to show deploying
    setMessages(prev => {
      const newMessages = [...prev];
      newMessages[messageIndex] = {
        ...newMessages[messageIndex],
        deploying: true,
        showDeploy: false
      };
      return newMessages;
    });

    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate missing code
    const missingPercentage = 100 - (messages[messageIndex].matchResults?.github?.match || 95);
    const generatedCode = `# Generated code for remaining ${missingPercentage}%

import requests
from datetime import datetime

def send_completion_email(report_data):
    """Send email notification to client"""
    email_config = {
        'to': 'client@example.com',
        'subject': f'Reconciliation Report - {datetime.now().strftime("%Y-%m-%d")}',
        'body': f'Report completed. {report_data["matched_records"]} records matched.'
    }
    # Email sending logic
    return True

def format_report(addepar_data, archway_data):
    """Format reconciliation report"""
    report = {
        'matched_records': len(addepar_data),
        'discrepancies': [],
        'timestamp': datetime.now()
    }
    return report
`;

    // Show deployed with generated code
    setMessages(prev => {
      const newMessages = [...prev];
      newMessages[messageIndex] = {
        ...newMessages[messageIndex],
        deploying: false,
        deployed: true,
        generatedCode
      };
      return newMessages;
    });

    // Add success message with Airflow UI
    await new Promise(resolve => setTimeout(resolve, 500));
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: '🎉 Workflow deployed successfully! Opening Airflow to trigger your workflow...'
    }]);

    // Show Airflow UI
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.href = '/airflow-ui';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSearching) return;

    const userMessage = input.trim();
    setInput('');

    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage
    }]);

    simulateSearch(userMessage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-4 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <Workflow className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
            <span className="leading-tight">Workflow Automation Assistant</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 px-4">Describe your workflow, and I'll find or build it for you</p>
        </div>

        {/* Chat Container */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
          {/* Messages */}
          <div className="h-[calc(100vh-280px)] sm:h-[600px] overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`w-full sm:max-w-3xl ${message.role === 'user' ? 'bg-blue-600' : 'bg-slate-700'} rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg`}>
                    <p className="text-sm sm:text-base text-white whitespace-pre-wrap break-words">{message.content}</p>

                    {/* Match Results */}
                    {message.matchResults && (
                      <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                        {/* GitHub Match */}
                        <div className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-slate-600">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              <span className="text-sm sm:text-base font-semibold text-white">GitHub Repository</span>
                            </div>
                            <span className="text-xl sm:text-2xl font-bold text-green-400">
                              {message.matchResults.github?.match}% match
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-blue-400 mb-1 break-words">{message.matchResults.github?.repo}</p>
                          <p className="text-xs sm:text-sm text-slate-300 break-words">{message.matchResults.github?.description}</p>
                        </div>

                        {/* Airflow Match */}
                        <div className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-slate-600">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <Workflow className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                              <span className="text-sm sm:text-base font-semibold text-white">Airflow DAG</span>
                            </div>
                            <span className="text-xl sm:text-2xl font-bold text-green-400">
                              {message.matchResults.airflow?.match}% match
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-orange-400 mb-1 break-words">{message.matchResults.airflow?.dag}</p>
                          <p className="text-xs sm:text-sm text-slate-300 break-words">{message.matchResults.airflow?.description}</p>
                        </div>
                      </div>
                    )}

                    {/* Deploy Button */}
                    {message.showDeploy && (
                      <button
                        onClick={() => handleDeploy(index)}
                        className="mt-3 sm:mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 transition-all text-sm sm:text-base"
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Deploy Workflow & Generate Missing Code</span>
                        <span className="sm:hidden">Deploy & Generate Code</span>
                      </button>
                    )}

                    {/* Deploying */}
                    {message.deploying && (
                      <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3 text-yellow-400">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs sm:text-sm">Deploying and generating code...</span>
                      </div>
                    )}

                    {/* Deployed with Generated Code */}
                    {message.deployed && message.generatedCode && (
                      <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-sm sm:text-base font-bold">Deployed Successfully!</span>
                        </div>

                        <div className="bg-slate-900 rounded-lg p-3 sm:p-4 border border-slate-600">
                          <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                            <span className="text-xs sm:text-sm font-semibold text-white">Generated Code</span>
                          </div>
                          <pre className="text-[10px] sm:text-xs text-green-400 overflow-x-auto">
                            <code>{message.generatedCode}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isSearching && (
              <div className="flex items-center gap-2 sm:gap-3 text-slate-400">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <span className="text-xs sm:text-sm">Searching repositories and DAGs...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-slate-700 p-3 sm:p-4 bg-slate-800/80">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your workflow (e.g., 'Pull data from Addepar...')"
                className="flex-1 bg-slate-700 text-white placeholder-slate-400 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                disabled={isSearching}
              />
              <button
                type="submit"
                disabled={isSearching || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
