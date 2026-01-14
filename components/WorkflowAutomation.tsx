'use client';

import { useState } from 'react';
import {
  Loader2, Search, Code, Layout, Play, CheckCircle, Clock,
  GitBranch, Plus, Trash2, Download, Copy, Settings
} from 'lucide-react';

interface DAG {
  id: string;
  name: string;
  description: string;
  schedule: string;
  tasks: Task[];
  lastRun: string;
  status: 'success' | 'running' | 'failed';
  owner: string;
}

interface Task {
  id: string;
  name: string;
  type: 'PythonOperator' | 'BashOperator' | 'EmailOperator' | 'SQLOperator';
  dependencies: string[];
}

interface WorkflowTask {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
}

type TabType = 'search' | 'generate' | 'build';

export default function WorkflowAutomation() {
  const [activeTab, setActiveTab] = useState<TabType>('search');

  // Search DAGs state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDAG, setSelectedDAG] = useState<DAG | null>(null);

  // Generate DAG state
  const [dagDescription, setDagDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Build Workflow state
  const [workflowTasks, setWorkflowTasks] = useState<WorkflowTask[]>([]);
  const [workflowName, setWorkflowName] = useState('');

  // Mock DAGs data (based on your real Airflow instance)
  const mockDAGs: DAG[] = [
    {
      id: 'alphorn_orion_zoho_to_powerbi',
      name: 'Alphorn Orion Zoho to PowerBI',
      description: 'Take data from Orion SFTP + Zoho and push it to Data Warehouse and then onwards to Power BI',
      schedule: '0 9 * * *',
      tasks: [
        { id: 'show_params', name: 'show_params', type: 'PythonOperator', dependencies: [] },
        { id: 'trigger_orion_sftp', name: 'trigger_orion_sftp', type: 'PythonOperator', dependencies: ['show_params'] },
        { id: 'trigger_zoho', name: 'trigger_zoho', type: 'PythonOperator', dependencies: ['show_params'] },
        { id: 'powerbi_data_refresh', name: 'powerbi_data_refresh', type: 'PythonOperator', dependencies: ['trigger_orion_sftp', 'trigger_zoho'] },
        { id: 'send_completion_email', name: 'send_completion_email', type: 'EmailOperator', dependencies: ['powerbi_data_refresh'] }
      ],
      lastRun: '2025-11-09 21:51:42',
      status: 'success',
      owner: 'collation.ai'
    },
    {
      id: 'client_holdings_refresh',
      name: 'Client Holdings Daily Refresh',
      description: 'Daily refresh of client holdings data from custodians',
      schedule: '0 8 * * *',
      tasks: [
        { id: 'fetch_holdings', name: 'fetch_holdings', type: 'PythonOperator', dependencies: [] },
        { id: 'calculate_values', name: 'calculate_values', type: 'PythonOperator', dependencies: ['fetch_holdings'] },
        { id: 'update_database', name: 'update_database', type: 'SQLOperator', dependencies: ['calculate_values'] },
        { id: 'send_report', name: 'send_report', type: 'EmailOperator', dependencies: ['update_database'] }
      ],
      lastRun: '2025-11-09 08:00:00',
      status: 'success',
      owner: 'data-team'
    },
    {
      id: 'portfolio_reconciliation',
      name: 'Portfolio Reconciliation',
      description: 'Reconcile portfolio positions across all data sources',
      schedule: '0 10 * * 1-5',
      tasks: [
        { id: 'extract_positions', name: 'extract_positions', type: 'PythonOperator', dependencies: [] },
        { id: 'compare_sources', name: 'compare_sources', type: 'PythonOperator', dependencies: ['extract_positions'] },
        { id: 'generate_report', name: 'generate_report', type: 'PythonOperator', dependencies: ['compare_sources'] },
        { id: 'email_discrepancies', name: 'email_discrepancies', type: 'EmailOperator', dependencies: ['generate_report'] }
      ],
      lastRun: '2025-11-08 10:00:00',
      status: 'failed',
      owner: 'operations'
    }
  ];

  const filteredDAGs = mockDAGs.filter(dag =>
    dag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateCode = async () => {
    if (!dagDescription.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const code = `from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.email import EmailOperator

default_args = {
    'owner': 'collation.ai',
    'depends_on_past': False,
    'start_date': datetime(2025, 11, 1),
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'generated_workflow',
    default_args=default_args,
    description='${dagDescription}',
    schedule_interval='0 9 * * *',
    catchup=False,
)

def process_data(**kwargs):
    """Main data processing function"""
    # Your processing logic here
    print("Processing data...")
    return "Processing complete"

def send_notification(**kwargs):
    """Send completion notification"""
    print("Sending notification...")
    return "Notification sent"

# Define tasks
process_task = PythonOperator(
    task_id='process_data',
    python_callable=process_data,
    dag=dag,
)

notify_task = PythonOperator(
    task_id='send_notification',
    python_callable=send_notification,
    dag=dag,
)

# Set dependencies
process_task >> notify_task`;

    setGeneratedCode(code);
    setIsGenerating(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const addTask = () => {
    const newTask: WorkflowTask = {
      id: `task_${Date.now()}`,
      name: `New Task ${workflowTasks.length + 1}`,
      type: 'PythonOperator',
      x: 100,
      y: 100 + (workflowTasks.length * 80),
    };
    setWorkflowTasks([...workflowTasks, newTask]);
  };

  const removeTask = (id: string) => {
    setWorkflowTasks(workflowTasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Workflow Automation Studio
          </h1>
          <p className="text-gray-600 text-lg">
            Search, generate, and build Airflow workflows with AI assistance
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'search'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search className="w-5 h-5" />
              Search DAGs
            </button>
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'generate'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Code className="w-5 h-5" />
              Generate DAG
            </button>
            <button
              onClick={() => setActiveTab('build')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'build'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Layout className="w-5 h-5" />
              Build Workflow
            </button>
          </div>

          <div className="p-6">
            {/* Search DAGs Tab */}
            {activeTab === 'search' && (
              <div>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search workflows by name or description..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* DAG List */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Available DAGs ({filteredDAGs.length})
                    </h3>
                    {filteredDAGs.map((dag) => (
                      <div
                        key={dag.id}
                        onClick={() => setSelectedDAG(dag)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedDAG?.id === dag.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{dag.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{dag.description}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            dag.status === 'success' ? 'bg-green-100 text-green-800' :
                            dag.status === 'running' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {dag.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {dag.schedule}
                          </span>
                          <span>{dag.tasks.length} tasks</span>
                          <span>by {dag.owner}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* DAG Details */}
                  <div>
                    {selectedDAG ? (
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Workflow Details
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <span className="text-sm font-medium text-gray-600">DAG ID:</span>
                            <p className="text-sm font-mono text-gray-900">{selectedDAG.id}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Schedule:</span>
                            <p className="text-sm text-gray-900">{selectedDAG.schedule}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Last Run:</span>
                            <p className="text-sm text-gray-900">{selectedDAG.lastRun}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600 block mb-2">Tasks:</span>
                            <div className="space-y-2">
                              {selectedDAG.tasks.map((task, index) => (
                                <div key={task.id} className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{task.name}</p>
                                    <p className="text-xs text-gray-500">{task.type}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            Use as Template
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                        <GitBranch className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">
                          Select a DAG to view details
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Generate DAG Tab */}
            {activeTab === 'generate' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your workflow
                  </label>
                  <textarea
                    value={dagDescription}
                    onChange={(e) => setDagDescription(e.target.value)}
                    placeholder="Example: I need a workflow that runs daily at 9 AM, fetches data from our API, transforms it, loads it into the database, and sends a summary email to the team..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    disabled={isGenerating}
                  />
                </div>

                <button
                  onClick={handleGenerateCode}
                  disabled={isGenerating || !dagDescription.trim()}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Code...
                    </>
                  ) : (
                    <>
                      <Code className="w-5 h-5" />
                      Generate Airflow Code
                    </>
                  )}
                </button>

                {generatedCode && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Generated DAG Code</h3>
                      <button
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Code
                      </button>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-gray-100 font-mono">
                        <code>{generatedCode}</code>
                      </pre>
                    </div>
                    <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Deploy to Airflow
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Build Workflow Tab */}
            {activeTab === 'build' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Workflow Name
                    </label>
                    <input
                      type="text"
                      value={workflowName}
                      onChange={(e) => setWorkflowName(e.target.value)}
                      placeholder="my_custom_workflow"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={addTask}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add Task
                  </button>
                </div>

                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-[400px]">
                  {workflowTasks.length === 0 ? (
                    <div className="text-center py-12">
                      <Layout className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">
                        Click "Add Task" to start building your workflow
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {workflowTasks.map((task, index) => (
                        <div
                          key={task.id}
                          className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-gray-300 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <input
                                type="text"
                                value={task.name}
                                onChange={(e) => {
                                  const updated = workflowTasks.map(t =>
                                    t.id === task.id ? { ...t, name: e.target.value } : t
                                  );
                                  setWorkflowTasks(updated);
                                }}
                                className="font-medium text-gray-900 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                              />
                              <select
                                value={task.type}
                                onChange={(e) => {
                                  const updated = workflowTasks.map(t =>
                                    t.id === task.id ? { ...t, type: e.target.value } : t
                                  );
                                  setWorkflowTasks(updated);
                                }}
                                className="text-xs text-gray-500 border-none focus:outline-none mt-1"
                              >
                                <option>PythonOperator</option>
                                <option>BashOperator</option>
                                <option>EmailOperator</option>
                                <option>SQLOperator</option>
                              </select>
                            </div>
                          </div>
                          <button
                            onClick={() => removeTask(task.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {workflowTasks.length > 0 && (
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      <Code className="w-5 h-5 inline mr-2" />
                      Export as Code
                    </button>
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      <Play className="w-5 h-5 inline mr-2" />
                      Deploy to Airflow
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Phase 1.5:</strong> This interface demonstrates all workflow automation features with mock data.
            Real Airflow API integration will be added in Phase 2 when credentials are available.
          </p>
        </div>
      </div>
    </div>
  );
}
