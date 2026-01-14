'use client';

import { useState } from 'react';
import { Play, Check, XCircle, Clock, BarChart3, Calendar as CalendarIcon } from 'lucide-react';

export default function AirflowUI() {
  const [isRunning, setIsRunning] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [activeTab, setActiveTab] = useState('details');

  const tasks = [
    { name: 'download_data_from_archway_to_database', status: 'success', duration: 45 },
    { name: 'download_data_from_addepar_to_database', status: 'success', duration: 52 },
    { name: 'tax_lot_recon_between_archway_and_addepar', status: 'success', duration: 38 },
    { name: 'powerbi_data_refresh', status: 'success', duration: 28 },
    { name: 'send_completion_email', status: 'success', duration: 12 }
  ];

  const runHistory = [
    { date: '2025-11-06, 23:54:58', duration: 35, status: 'failed' },
    { date: '2025-11-07, 00:09:16', duration: 140, status: 'success' },
    { date: '2025-11-07, 00:11:06', duration: 150, status: 'success' }
  ];

  const eventLogData = [
    { when: '2025-11-10, 01:39:18', runId: 'manual__2025-11-10T01:39:18', taskId: 'send_completion_email', mapIndex: '-', tryNumber: '1', event: 'Task succeeded', user: 'admin', details: 'Task completed successfully' },
    { when: '2025-11-10, 01:39:10', runId: 'manual__2025-11-10T01:39:18', taskId: 'powerbi_data_refresh', mapIndex: '-', tryNumber: '1', event: 'Task succeeded', user: 'admin', details: 'Task completed successfully' },
    { when: '2025-11-10, 01:38:58', runId: 'manual__2025-11-10T01:39:18', taskId: 'tax_lot_recon_between_archway_and_addepar', mapIndex: '-', tryNumber: '1', event: 'Task succeeded', user: 'admin', details: 'Task completed successfully' },
    { when: '2025-11-10, 01:38:42', runId: 'manual__2025-11-10T01:39:18', taskId: 'download_data_from_addepar_to_database', mapIndex: '-', tryNumber: '1', event: 'Task succeeded', user: 'admin', details: 'Task completed successfully' },
    { when: '2025-11-10, 01:38:32', runId: 'manual__2025-11-10T01:39:18', taskId: 'download_data_from_archway_to_database', mapIndex: '-', tryNumber: '1', event: 'Task succeeded', user: 'admin', details: 'Task completed successfully' },
    { when: '2025-11-10, 01:38:32', runId: 'manual__2025-11-10T01:39:18', taskId: '-', mapIndex: '-', tryNumber: '-', event: 'DAG Run started', user: 'admin', details: 'Triggered manually' },
  ];

  const pythonCode = `from sqlite3 import connect
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.models.param import Param
from datetime import datetime, timedelta
from office365.runtime.auth.client_credential import ClientCredential
from office365.sharepoint.client_context import ClientContext
from office365.sharepoint.files.file import File
import requests
import csv
import os
import pandas as pd
import io
from azure_keyvault_hook import AzureKeyVaultHook
from airflow.hooks.base import BaseHook
import xmltodict
import json
import logging
from dotenv import load_dotenv
import openpyxl
import psycopg2

# Configuration
SHAREPOINT_SITE = "https://collation.sharepoint.com/sites/DataProcessing"
DATABASE_CONN_ID = "postgres_default"

def download_data_from_archway_to_database(**context):
    """Download Archway data via web scraping"""
    logging.info("Starting Archway data download...")
    # Archway web scraping logic here
    return "Archway data downloaded successfully"

def download_data_from_addepar_to_database(**context):
    """Download Addepar data via API"""
    logging.info("Starting Addepar data download...")
    # Addepar API logic here
    return "Addepar data downloaded successfully"

def tax_lot_recon_between_archway_and_addepar(**context):
    """Reconcile tax lots between Archway and Addepar"""
    logging.info("Starting reconciliation...")
    # Reconciliation logic here
    return "Reconciliation completed"

def powerbi_data_refresh(**context):
    """Refresh PowerBI dataset"""
    logging.info("Refreshing PowerBI...")
    # PowerBI refresh logic here
    return "PowerBI refreshed"

def send_completion_email(**context):
    """Send completion email to client"""
    logging.info("Sending email...")
    # Email logic here
    return "Email sent"

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2025, 11, 1),
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    'your_trial_workflow_automation_project',
    default_args=default_args,
    description='Sync and reconcile data between Addepar and Archway',
    schedule_interval=None,
    catchup=False,
    tags=['trial', 'workflow', 'automation'],
) as dag:

    task_download_archway = PythonOperator(
        task_id='download_data_from_archway_to_database',
        python_callable=download_data_from_archway_to_database,
        provide_context=True,
    )

    task_download_addepar = PythonOperator(
        task_id='download_data_from_addepar_to_database',
        python_callable=download_data_from_addepar_to_database,
        provide_context=True,
    )

    task_reconciliation = PythonOperator(
        task_id='tax_lot_recon_between_archway_and_addepar',
        python_callable=tax_lot_recon_between_archway_and_addepar,
        provide_context=True,
    )

    task_powerbi = PythonOperator(
        task_id='powerbi_data_refresh',
        python_callable=powerbi_data_refresh,
        provide_context=True,
    )

    task_email = PythonOperator(
        task_id='send_completion_email',
        python_callable=send_completion_email,
        provide_context=True,
    )

    # Define task dependencies
    [task_download_archway, task_download_addepar] >> task_reconciliation >> task_powerbi >> task_email`;

  const handleTrigger = () => {
    setIsRunning(true);
    setCompletedTasks(0);

    const interval = setInterval(() => {
      setCompletedTasks(prev => {
        if (prev >= tasks.length) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white px-4 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">DAG:</span>
                <span className="text-sm sm:text-base font-bold break-words">Your Trial Workflow Automation Project</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Sync and reconcile data between Addepar and Archway</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-gray-600">Schedule:</span>
              <span className="font-semibold">None</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-gray-600">Next Run ID:</span>
              <span className="font-semibold">None</span>
            </div>
            <button
              onClick={handleTrigger}
              disabled={isRunning}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-gray-400 text-white px-6 py-2 rounded flex items-center justify-center gap-2 transition-all touch-manipulation"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Trigger DAG'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs + Filters */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
            <span>10.11.2025</span>
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
            <span>00:13:33</span>
          </div>
          <select className="w-full sm:w-auto text-xs sm:text-sm border border-gray-300 rounded px-3 py-1.5">
            <option>All Run Types</option>
          </select>
          <select className="w-full sm:w-auto text-xs sm:text-sm border border-gray-300 rounded px-3 py-1.5">
            <option>All Run States</option>
          </select>
          <button className="text-xs sm:text-sm text-blue-600 hover:underline touch-manipulation">Clear Filters</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar - Tasks */}
        <div className="w-full md:w-96 md:border-r border-b md:border-b-0 border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Duration</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">00:02:04</div>
          </div>

          <div className="p-4 space-y-2">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-3 py-2">
                <div className="flex items-center gap-2 flex-shrink-0">
                  {completedTasks > index ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : isRunning && completedTasks === index ? (
                    <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-green-600 rounded" />
                  )}
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-orange-500 rounded" />
                    <div className="w-3 h-3 bg-green-600 rounded" />
                    <div className="w-3 h-3 bg-green-600 rounded" />
                  </div>
                </div>
                <span className="text-xs text-gray-700 break-words">{task.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Content Area */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="border-b border-gray-200 bg-white">
            <div className="flex px-6">
              {['Details', 'Graph', 'Gantt', 'Code', 'Event Log', 'Run Duration', 'Task Duration', 'Calendar'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.toLowerCase().replace(' ', '-')
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 bg-gray-50 min-h-[600px]">
            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">DAG Runs Summary</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Total Runs Displayed</span>
                        <span className="font-semibold">3</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600 flex items-center gap-2">
                          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                          Total success
                        </span>
                        <span className="font-semibold text-green-600">2</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600 flex items-center gap-2">
                          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                          Total failed
                        </span>
                        <span className="font-semibold text-red-600">1</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">First Run Start</span>
                        <span className="font-semibold">2025-11-06, 23:55:13 UTC</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Last Run Start</span>
                        <span className="font-semibold">2025-11-07, 00:11:16 UTC</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Max Run Duration</span>
                        <span className="font-semibold">00:02:04</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Mean Run Duration</span>
                        <span className="font-semibold">00:01:19</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Min Run Duration</span>
                        <span className="font-semibold">00:00:26</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">DAG Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Total Tasks</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">PythonOperators</span>
                      <span className="font-semibold">5</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">DAG Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Dag display name</span>
                      <span className="font-semibold">Your Trial Workflow Automation Project</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Dag id</span>
                      <span className="font-semibold">your_trial_workflow_automation_project</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Description</span>
                      <span className="font-semibold">Sync and reconcile data between Addepar and Archway</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Fileloc</span>
                      <span className="font-semibold">/opt/airflow/collation/dags/airflow-dags/trial_workflow.py</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Has import errors</span>
                      <span className="font-semibold">false</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Has task concurrency limits</span>
                      <span className="font-semibold">false</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Is active</span>
                      <span className="font-semibold">true</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Is paused</span>
                      <span className="font-semibold">false</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Last expired</span>
                      <span className="font-semibold">null</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Last parsed time</span>
                      <span className="font-semibold">2025-11-10T01:37:50.633327+00:00</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Last pickled</span>
                      <span className="font-semibold">null</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Max active runs</span>
                      <span className="font-semibold">16</span>
                    </div>
                    <div className="flex py-2 border-b">
                      <span className="text-gray-600 w-48">Max active tasks</span>
                      <span className="font-semibold">8</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Graph Tab */}
            {activeTab === 'graph' && (
              <div className="bg-white rounded-lg shadow p-8 min-h-[500px]">
                <div className="flex justify-end mb-4">
                  <select className="text-sm border border-gray-300 rounded px-3 py-1">
                    <option>Layout: Left -&gt; Right</option>
                  </select>
                </div>
                <div className="relative h-[400px] flex items-center justify-center overflow-x-auto">
                  <svg className="min-w-full h-full" viewBox="0 0 1800 300" preserveAspectRatio="xMidYMid meet">
                    {/* Task boxes */}
                    <g>
                      <rect x="50" y="100" width="280" height="100" fill="white" stroke="#cbd5e1" strokeWidth="2" rx="4"/>
                      <foreignObject x="60" y="110" width="260" height="80">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="text-xs text-gray-700 font-medium text-center px-2 leading-tight">download_data_from_<br/>archway_to_database</div>
                          <div className="text-xs text-blue-600 mt-1">PythonOperator</div>
                        </div>
                      </foreignObject>
                    </g>
                    <g>
                      <rect x="380" y="100" width="280" height="100" fill="white" stroke="#cbd5e1" strokeWidth="2" rx="4"/>
                      <foreignObject x="390" y="110" width="260" height="80">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="text-xs text-gray-700 font-medium text-center px-2 leading-tight">download_data_from_<br/>addepar_to_database</div>
                          <div className="text-xs text-blue-600 mt-1">PythonOperator</div>
                        </div>
                      </foreignObject>
                    </g>
                    <g>
                      <rect x="710" y="100" width="280" height="100" fill="white" stroke="#cbd5e1" strokeWidth="2" rx="4"/>
                      <foreignObject x="720" y="110" width="260" height="80">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="text-xs text-gray-700 font-medium text-center px-2 leading-tight">tax_lot_recon_between_<br/>archway_and_addepar</div>
                          <div className="text-xs text-blue-600 mt-1">PythonOperator</div>
                        </div>
                      </foreignObject>
                    </g>
                    <g>
                      <rect x="1040" y="100" width="280" height="100" fill="white" stroke="#cbd5e1" strokeWidth="2" rx="4"/>
                      <foreignObject x="1050" y="110" width="260" height="80">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="text-xs text-gray-700 font-medium text-center px-2 leading-tight">powerbi_data_refresh</div>
                          <div className="text-xs text-blue-600 mt-1">PythonOperator</div>
                        </div>
                      </foreignObject>
                    </g>
                    <g>
                      <rect x="1370" y="100" width="280" height="100" fill="white" stroke="#cbd5e1" strokeWidth="2" rx="4"/>
                      <foreignObject x="1380" y="110" width="260" height="80">
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="text-xs text-gray-700 font-medium text-center px-2 leading-tight">send_completion_email</div>
                          <div className="text-xs text-blue-600 mt-1">PythonOperator</div>
                        </div>
                      </foreignObject>
                    </g>

                    {/* Arrows */}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
                      </marker>
                    </defs>
                    <line x1="330" y1="150" x2="375" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    <line x1="660" y1="150" x2="705" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    <line x1="990" y1="150" x2="1035" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    <line x1="1320" y1="150" x2="1365" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  </svg>
                </div>
              </div>
            )}

            {/* Gantt Tab */}
            {activeTab === 'gantt' && (
              <div className="bg-white rounded-lg shadow p-8">
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-orange-800 font-medium">Please select a dag run in order to see a gantt chart</span>
                  </div>
                </div>
                <div className="mt-8 h-64 bg-gray-50 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400">Gantt chart will appear here when a run is selected</span>
                </div>
              </div>
            )}

            {/* Code Tab */}
            {activeTab === 'code' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-gray-300">Parsed at: 2025-11-10, 01:37:50 UTC</span>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Toggle Wrap
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-6 overflow-x-auto text-xs leading-relaxed font-mono max-h-[600px] overflow-y-auto">
                  <code>{pythonCode}</code>
                </pre>
              </div>
            )}

            {/* Event Log Tab */}
            {activeTab === 'event-log' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Show Logs After</span>
                    <input type="date" defaultValue="2025-11-10" className="text-sm border border-gray-300 rounded px-2 py-1"/>
                    <input type="time" defaultValue="01:39:18" className="text-sm border border-gray-300 rounded px-2 py-1"/>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Show Logs Before</span>
                    <input type="date" defaultValue="2025-11-10" className="text-sm border border-gray-300 rounded px-2 py-1"/>
                    <input type="time" defaultValue="01:39:18" className="text-sm border border-gray-300 rounded px-2 py-1"/>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-gray-600">Events to</span>
                    <label className="flex items-center gap-1">
                      <input type="radio" name="events" defaultChecked/>
                      <span className="text-sm">Include</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input type="radio" name="events"/>
                      <span className="text-sm">Exclude</span>
                    </label>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">WHEN</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">RUN ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">TASK ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">MAP INDEX</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">TRY NUMBER</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">EVENT</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">USER</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">DETAILS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {eventLogData.map((log, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{log.when}</td>
                          <td className="px-4 py-3 text-blue-600 font-mono text-xs">{log.runId}</td>
                          <td className="px-4 py-3 text-gray-700">{log.taskId}</td>
                          <td className="px-4 py-3 text-gray-500 text-center">{log.mapIndex}</td>
                          <td className="px-4 py-3 text-gray-500 text-center">{log.tryNumber}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              log.event.includes('succeeded') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {log.event}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{log.user}</td>
                          <td className="px-4 py-3 text-gray-600">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Run Duration Tab */}
            {activeTab === 'run-duration' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Duration (seconds)</h3>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="landing-times" className="rounded" defaultChecked />
                    <label htmlFor="landing-times" className="text-sm text-gray-600">Show Landing Times</label>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="relative h-96 flex items-end gap-16 px-8">
                  {runHistory.map((run, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex items-end" style={{ height: '350px' }}>
                        <div
                          className={`w-full rounded-t-lg transition-all duration-1000 ${
                            run.status === 'success' ? 'bg-green-600' : 'bg-red-500'
                          }`}
                          style={{
                            height: `${(run.duration / 150) * 100}%`
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-2 text-center whitespace-nowrap">
                        {run.date}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Execution Date</div>
                    </div>
                  ))}

                  {isRunning && completedTasks === tasks.length && (
                    <div className="flex-1 flex flex-col items-center animate-in">
                      <div className="w-full flex items-end" style={{ height: '350px' }}>
                        <div className="w-full bg-green-600 rounded-t-lg animate-grow" style={{ height: '95%' }} />
                      </div>
                      <div className="text-xs text-gray-600 mt-2 text-center whitespace-nowrap">
                        2025-11-10, 00:15:20
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Execution Date</div>
                    </div>
                  )}
                </div>

                {/* Y-axis labels */}
                <div className="flex justify-start mt-4 text-sm text-gray-600">
                  <div className="flex gap-8">
                    <span>0</span>
                    <span>30</span>
                    <span>60</span>
                    <span>90</span>
                    <span>120</span>
                    <span>150</span>
                  </div>
                </div>
              </div>
            )}

            {/* Task Duration Tab */}
            {activeTab === 'task-duration' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Task Duration Over Time</h3>
                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{task.name}</span>
                        <span className="text-sm text-gray-500">{task.duration}s avg</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(task.duration / 60) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex gap-6">
                  {/* Left side - Gradient scale */}
                  <div className="flex flex-col items-center">
                    <div className="relative h-64 w-12">
                      {/* Gradient bar */}
                      <div className="absolute inset-0 rounded" style={{
                        background: 'linear-gradient(to bottom, #22c55e 0%, #84cc16 25%, #eab308 50%, #f97316 75%, #ef4444 100%)'
                      }}></div>
                      {/* Scale labels */}
                      <div className="absolute -left-8 top-0 text-xs font-semibold">100</div>
                      <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-xs">S</div>
                      <div className="absolute -left-8 bottom-0 text-xs">0</div>
                    </div>
                    <div className="text-xs font-semibold mt-2 whitespace-nowrap">% Success</div>
                    <div className="mt-4 text-sm font-bold" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      2025
                    </div>
                  </div>

                  {/* Right side - Calendar grids */}
                  <div className="flex-1">
                    <div className="flex gap-8">
                      {/* November */}
                      <div className="flex-1">
                        <div className="text-center font-semibold mb-3">Nov</div>
                        <div className="grid grid-cols-7 gap-1">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                            <div key={i} className="text-center text-xs font-semibold text-gray-500 h-6 flex items-center justify-center">
                              {day}
                            </div>
                          ))}
                          {/* November days - starting on Friday (index 5) */}
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-8"></div>
                          ))}
                          {Array.from({ length: 30 }, (_, i) => {
                            const day = i + 1;
                            let bgColor = 'bg-gray-100';
                            if (day === 6) bgColor = 'bg-red-500'; // Failed run
                            if (day === 7 || day === 8) bgColor = 'bg-green-500'; // Successful runs
                            return (
                              <div
                                key={day}
                                className={`h-8 border border-gray-300 flex items-center justify-center text-xs ${bgColor}`}
                              >
                                {day === 6 || day === 7 || day === 8 ? '' : day}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* December */}
                      <div className="flex-1">
                        <div className="text-center font-semibold mb-3">Dec</div>
                        <div className="grid grid-cols-7 gap-1">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                            <div key={i} className="text-center text-xs font-semibold text-gray-500 h-6 flex items-center justify-center">
                              {day}
                            </div>
                          ))}
                          {/* December days - starting on Sunday (index 0) */}
                          {Array.from({ length: 31 }, (_, i) => {
                            const day = i + 1;
                            return (
                              <div
                                key={day}
                                className="h-8 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs"
                              >
                                {day}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
