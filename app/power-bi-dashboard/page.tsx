'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Bot, BarChart3, Database, Share2, RefreshCw, ExternalLink, Eye, Settings, Calendar, TrendingUp, Activity, FileText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface DashboardMetric {
  name: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
}

interface WorkflowRun {
  id: string;
  runDate: string;
  status: "Success" | "Failed" | "Running";
  duration: string;
  recordsProcessed: number;
}

export default function PowerBIDashboardPage() {
  const searchParams = useSearchParams();
  const [creationStep, setCreationStep] = useState(0);
  const [creationProgress, setCreationProgress] = useState(0);
  const [isDashboardCreated, setIsDashboardCreated] = useState(false);
  const [sharepointConfig, setSharepointConfig] = useState({
    siteUrl: "",
    username: "",
    authenticated: false
  });

  // Mock workflow information
  const workflowInfo = {
    name: "SharePoint to Sage Integration",
    description: "Automated data transfer from SharePoint to Sage accounting system",
    createdDate: "2025-01-22",
    lastRun: "2025-01-22 13:53:37",
    totalRuns: 23,
    successRate: 91.3
  };

  const creationSteps = [
    "Authenticating with SharePoint...",
    "Connecting to PowerBI service...",
    "Analyzing workflow data structure...",
    "Creating dashboard layout...",
    "Generating data visualizations...",
    "Setting up automatic data refresh...",
    "Publishing dashboard to workspace..."
  ];

  const mockMetrics: DashboardMetric[] = [
    { name: "Total Records Processed", value: "1,247", change: "+12%", trend: "up" },
    { name: "Success Rate", value: "91.3%", change: "+2.1%", trend: "up" },
    { name: "Average Processing Time", value: "16s", change: "-3s", trend: "up" },
    { name: "Failed Runs", value: "2", change: "0", trend: "neutral" }
  ];

  const mockWorkflowRuns: WorkflowRun[] = [
    { id: "1", runDate: "2025-01-22 13:53:37", status: "Success", duration: "00:00:16", recordsProcessed: 45 },
    { id: "2", runDate: "2025-01-22 10:22:15", status: "Success", duration: "00:00:18", recordsProcessed: 52 },
    { id: "3", runDate: "2025-01-21 14:35:42", status: "Failed", duration: "00:00:49", recordsProcessed: 0 },
    { id: "4", runDate: "2025-01-21 09:12:33", status: "Success", duration: "00:00:14", recordsProcessed: 38 }
  ];

  useEffect(() => {
    if (!isDashboardCreated) {
      const timer = setInterval(() => {
        setCreationProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsDashboardCreated(true);
            return 100;
          }
          return prev + 2;
        });
        
        setCreationStep(prev => {
          const newStep = Math.floor((creationProgress / 100) * creationSteps.length);
          return Math.min(newStep, creationSteps.length - 1);
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [creationProgress, isDashboardCreated]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success": return "text-success bg-success/10";
      case "Failed": return "text-destructive bg-destructive/10";
      case "Running": return "text-primary bg-primary/10";
      default: return "text-muted-foreground bg-muted/10";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↗️";
      case "down": return "↘️";
      default: return "➡️";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/airflow-dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Airflow</span>
            </Link>
            <div className="text-xl font-bold text-foreground">
              collation.ai - PowerBI Dashboard
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                PowerBI Connected
              </Badge>
              <Badge variant="outline" className="text-xs">
                Auto-Generated
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Creation Progress */}
        {!isDashboardCreated && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-primary" />
                <span>Agentic AI Bot - PowerBI Dashboard Creation</span>
              </CardTitle>
              <CardDescription>
                Creating visualization dashboard for your workflow in Microsoft PowerBI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* SharePoint Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="sharepoint-url">SharePoint Site URL</Label>
                    <Input
                      id="sharepoint-url"
                      placeholder="https://yourcompany.sharepoint.com/sites/finance"
                      value={sharepointConfig.siteUrl}
                      onChange={(e) => setSharepointConfig(prev => ({ ...prev, siteUrl: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="user@yourcompany.com"
                      value={sharepointConfig.username}
                      onChange={(e) => setSharepointConfig(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Dashboard Creation Progress</span>
                      <span className="text-sm text-muted-foreground">{creationProgress}%</span>
                    </div>
                    <Progress value={creationProgress} className="h-2 mb-4" />
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Current Step:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{creationSteps[creationStep]}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PowerBI Dashboard Interface */}
        {isDashboardCreated && (
          <>
            {/* Dashboard Header */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                      <BarChart3 className="w-6 h-6 text-primary" />
                      <span>{workflowInfo.name} - Dashboard</span>
                    </CardTitle>
                    <CardDescription className="mt-2">{workflowInfo.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Refresh Data</span>
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center space-x-2">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </Button>
                    <Button size="sm" className="flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Open in PowerBI</span>
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>📊 Created: {workflowInfo.createdDate}</span>
                  <span>🔄 Last Updated: {workflowInfo.lastRun}</span>
                  <span>✅ Auto-refresh: Every 15 minutes</span>
                </div>
              </CardHeader>
            </Card>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {mockMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-2xl font-bold">{metric.value}</p>
                          <span className="text-sm text-muted-foreground">
                            {getTrendIcon(metric.trend)} {metric.change}
                          </span>
                        </div>
                      </div>
                      <TrendingUp className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="runs" className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Workflow Runs</span>
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>Data Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Reports</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Success Rate Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Success Rate Trend</CardTitle>
                      <CardDescription>Workflow execution success rate over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p>PowerBI Chart: Success Rate Trend</p>
                          <p className="text-xs mt-2">Line chart showing success rate over last 30 days</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Processing Volume */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Processing Volume</CardTitle>
                      <CardDescription>Records processed per day</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p>PowerBI Chart: Daily Volume</p>
                          <p className="text-xs mt-2">Bar chart showing daily record processing volume</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="runs" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Workflow Runs</CardTitle>
                    <CardDescription>Detailed execution history and performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockWorkflowRuns.map((run) => (
                        <div key={run.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Badge className={getStatusColor(run.status)}>
                              {run.status}
                            </Badge>
                            <div>
                              <p className="text-sm font-medium">{run.runDate}</p>
                              <p className="text-xs text-muted-foreground">Duration: {run.duration}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{run.recordsProcessed} records</p>
                            <p className="text-xs text-muted-foreground">processed</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Flow Analysis</CardTitle>
                    <CardDescription>Data transformation and processing insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Database className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p>PowerBI Table: Source Data Analysis</p>
                          <p className="text-xs mt-2">SharePoint file processing statistics</p>
                        </div>
                      </div>
                      <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p>PowerBI Chart: Data Quality Metrics</p>
                          <p className="text-xs mt-2">Validation and error tracking</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Reports</CardTitle>
                    <CardDescription>Automated workflow reports and analytics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Weekly Performance Report</p>
                            <p className="text-xs text-muted-foreground">Generated: 2025-01-22</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Monthly Data Summary</p>
                            <p className="text-xs text-muted-foreground">Generated: 2025-01-15</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Dashboard Configuration */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Dashboard Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-muted-foreground">SharePoint Connection</div>
                    <div className="text-foreground">✅ Connected to workflow data source</div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground">Refresh Schedule</div>
                    <div className="text-foreground">🔄 Every 15 minutes (automatic)</div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground">Data Retention</div>
                    <div className="text-foreground">📅 90 days of historical data</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

