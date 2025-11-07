'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Bot, 
  Play, 
  Pause, 
  RotateCcw, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Code2, 
  Activity, 
  BarChart3, 
  FileText,
  Settings
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface DAGRun {
  id: string;
  runId: string;
  state: "success" | "failed" | "running" | "queued";
  startDate: string;
  endDate?: string;
  duration: string;
}

interface TaskInstance {
  taskId: string;
  state: "success" | "failed" | "running" | "queued" | "upstream_failed";
  startDate: string;
  endDate?: string;
  duration: string;
  operator: string;
}

export default function AirflowDashboardPage() {
  console.log("AirflowDashboard component loaded successfully");
  const searchParams = useSearchParams();
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [isDeployed, setIsDeployed] = useState(false);

  // Mock DAG information
  const dagInfo = {
    dagId: "01_Post_JE_FROM_SharePoint_To_Sage",
    description: "Download a file from SharePoint using a URL",
    schedule: "None",
    nextRun: "None",
    isActive: true,
    totalRuns: 23,
    successfulRuns: 21,
    failedRuns: 2,
    firstRunDate: "2025-04-01, 09:55:24 UTC",
    lastRunDate: "2025-05-11, 13:53:37 UTC",
    maxDuration: "00:00:49",
    meanDuration: "00:00:16",
    minDuration: "00:00:04",
    totalTasks: 4,
    pythonOperators: 4
  };

  const deploymentSteps = [
    "Generating DAG Python code...",
    "Creating Airflow DAG structure...",
    "Configuring task dependencies...",
    "Setting up data connections...",
    "Deploying to Airflow cluster...",
    "Validating DAG configuration...",
    "Starting initial test run..."
  ];

  const mockDAGRuns: DAGRun[] = [
    { id: "1", runId: "manual__2025-05-11T13:53:37+00:00", state: "success", startDate: "2025-05-11 13:53:37", endDate: "2025-05-11 13:53:53", duration: "00:00:16" },
    { id: "2", runId: "manual__2025-05-10T10:22:15+00:00", state: "success", startDate: "2025-05-10 10:22:15", endDate: "2025-05-10 10:22:31", duration: "00:00:16" },
    { id: "3", runId: "manual__2025-05-09T14:35:42+00:00", state: "failed", startDate: "2025-05-09 14:35:42", endDate: "2025-05-09 14:36:31", duration: "00:00:49" },
    { id: "4", runId: "manual__2025-05-08T09:12:33+00:00", state: "success", startDate: "2025-05-08 09:12:33", endDate: "2025-05-08 09:12:37", duration: "00:00:04" }
  ];

  const mockTasks: TaskInstance[] = [
    { taskId: "download_file", state: "success", startDate: "13:53:37", endDate: "13:53:42", duration: "00:00:05", operator: "PythonOperator" },
    { taskId: "convert_csv_to_xml", state: "success", startDate: "13:53:42", endDate: "13:53:47", duration: "00:00:05", operator: "PythonOperator" },
    { taskId: "login_to_sage", state: "success", startDate: "13:53:47", endDate: "13:53:50", duration: "00:00:03", operator: "PythonOperator" },
    { taskId: "send_xml_to_sage", state: "success", startDate: "13:53:50", endDate: "13:53:53", duration: "00:00:03", operator: "PythonOperator" }
  ];

  useEffect(() => {
    if (!isDeployed) {
      const timer = setInterval(() => {
        setDeploymentProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsDeployed(true);
            return 100;
          }
          return prev + 2;
        });
        
        setDeploymentStep(prev => {
          const newStep = Math.floor((deploymentProgress / 100) * deploymentSteps.length);
          return Math.min(newStep, deploymentSteps.length - 1);
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [deploymentProgress, isDeployed]);

  const getStateColor = (state: string) => {
    switch (state) {
      case "success": return "text-success bg-success/10";
      case "failed": return "text-destructive bg-destructive/10";
      case "running": return "text-primary bg-primary/10";
      case "queued": return "text-warning bg-warning/10";
      default: return "text-muted-foreground bg-muted/10";
    }
  };

  const getStateIcon = (state: string) => {
    switch (state) {
      case "success": return CheckCircle;
      case "failed": return XCircle;
      case "running": return Play;
      case "queued": return Clock;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/workflow-analysis" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Analysis</span>
            </Link>
            <div className="text-xl font-bold text-foreground">
              collation.ai - Airflow Dashboard
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Airflow v2.5.0
              </Badge>
              <Badge variant="outline" className="text-xs">
                13:49 UTC
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* DAG Deployment Progress */}
        {!isDeployed && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-primary" />
                <span>Agentic AI Bot - DAG Deployment</span>
              </CardTitle>
              <CardDescription>
                Creating and deploying your workflow DAG to Collation.AI Airflow cluster
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Deployment Progress</span>
                    <span className="text-sm text-muted-foreground">{deploymentProgress}%</span>
                  </div>
                  <Progress value={deploymentProgress} className="h-2 mb-4" />
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Current Step:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{deploymentSteps[deploymentStep]}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* DAG Header */}
        {isDeployed && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                      <div className="w-4 h-4 bg-success rounded-full"></div>
                      <span>DAG: {dagInfo.dagId}</span>
                    </CardTitle>
                    <CardDescription className="mt-2">{dagInfo.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                    <Link href="/powerbi-dashboard">
                      <Button size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  19.09.2025 ⏰ 13:47:22 • Auto-refresh: 25s
                </div>
              </CardHeader>
            </Card>

            {/* DAG Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{dagInfo.totalRuns}</div>
                  <div className="text-xs text-muted-foreground">Total Runs</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-success">{dagInfo.successfulRuns}</div>
                  <div className="text-xs text-muted-foreground">Successful</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-destructive">{dagInfo.failedRuns}</div>
                  <div className="text-xs text-muted-foreground">Failed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{dagInfo.totalTasks}</div>
                  <div className="text-xs text-muted-foreground">Total Tasks</div>
                </CardContent>
              </Card>
            </div>

            {/* DAG Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="details" className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>Details</span>
                </TabsTrigger>
                <TabsTrigger value="graph" className="flex items-center space-x-1">
                  <Activity className="w-4 h-4" />
                  <span>Graph</span>
                </TabsTrigger>
                <TabsTrigger value="gantt" className="flex items-center space-x-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>Gantt</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center space-x-1">
                  <Code2 className="w-4 h-4" />
                  <span>Code</span>
                </TabsTrigger>
                <TabsTrigger value="event-log">Event Log</TabsTrigger>
                <TabsTrigger value="run-duration">Run Duration</TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Calendar</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* DAG Runs Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>DAG Runs Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-muted-foreground">Total Runs Displayed</div>
                          <div className="text-lg font-semibold">{dagInfo.totalRuns}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Total Success</div>
                          <div className="text-lg font-semibold text-success">{dagInfo.successfulRuns}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Total Failed</div>
                          <div className="text-lg font-semibold text-destructive">{dagInfo.failedRuns}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">First Run Start</div>
                          <div className="text-sm">{dagInfo.firstRunDate}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Last Run Start</div>
                          <div className="text-sm">{dagInfo.lastRunDate}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Max Run Duration</div>
                          <div className="text-sm">{dagInfo.maxDuration}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Mean Run Duration</div>
                          <div className="text-sm">{dagInfo.meanDuration}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Min Run Duration</div>
                          <div className="text-sm">{dagInfo.minDuration}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* DAG Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>DAG Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-muted-foreground">Total Tasks</div>
                          <div className="text-lg font-semibold">{dagInfo.totalTasks}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">PythonOperators</div>
                          <div className="text-lg font-semibold">{dagInfo.pythonOperators}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent DAG Runs */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Recent DAG Runs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockDAGRuns.map((run) => {
                        const StateIcon = getStateIcon(run.state);
                        return (
                          <div key={run.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <StateIcon className={`w-4 h-4 ${getStateColor(run.state).split(' ')[0]}`} />
                              <div>
                                <div className="text-sm font-medium">{run.runId}</div>
                                <div className="text-xs text-muted-foreground">
                                  Started: {run.startDate} • Duration: {run.duration}
                                </div>
                              </div>
                            </div>
                            <Badge className={getStateColor(run.state)}>
                              {run.state}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="graph" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>DAG Graph View</CardTitle>
                    <CardDescription>Task dependency visualization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 p-8">
                      {mockTasks.map((task, index) => {
                        const StateIcon = getStateIcon(task.state);
                        return (
                          <div key={task.taskId} className="text-center">
                            <div className={`w-16 h-16 mx-auto mb-2 rounded-lg border-2 ${getStateColor(task.state)} flex items-center justify-center`}>
                              <StateIcon className="w-6 h-6" />
                            </div>
                            <div className="text-xs font-medium">{task.taskId}</div>
                            <div className="text-xs text-muted-foreground">{task.operator}</div>
                            {index < mockTasks.length - 1 && (
                              <div className="mt-2">
                                <div className="w-8 h-0.5 bg-border mx-auto"></div>
                                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border mx-auto"></div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gantt" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Gantt Chart</CardTitle>
                    <CardDescription>Task execution timeline</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-8 bg-muted/10 rounded-lg">
                      <div className="text-center text-muted-foreground">
                        <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Gantt chart visualization would be displayed here</p>
                        <p className="text-xs mt-2">Shows task execution timeline and dependencies</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated DAG Code</CardTitle>
                    <CardDescription>Auto-generated Python code for your workflow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/20 p-4 rounded-lg font-mono text-sm">
                      <pre className="text-muted-foreground">
{`from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.dummy import DummyOperator

# Generated by Collation.AI Agentic Bot
default_args = {
    'owner': 'collation-ai',
    'depends_on_past': False,
    'start_date': datetime(2025, 4, 1),
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5)
}

dag = DAG(
    '01_Post_JE_FROM_SharePoint_To_Sage',
    default_args=default_args,
    description='Download a file from SharePoint using a URL',
    schedule_interval=None,
    catchup=False
)

# Task definitions
download_file = PythonOperator(
    task_id='download_file',
    python_callable=download_sharepoint_file,
    dag=dag
)

convert_csv_to_xml = PythonOperator(
    task_id='convert_csv_to_xml', 
    python_callable=convert_data_format,
    dag=dag
)

login_to_sage = PythonOperator(
    task_id='login_to_sage',
    python_callable=authenticate_sage,
    dag=dag
)

send_xml_to_sage = PythonOperator(
    task_id='send_xml_to_sage',
    python_callable=upload_to_sage,
    dag=dag
)

# Task dependencies
download_file >> convert_csv_to_xml >> login_to_sage >> send_xml_to_sage`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

