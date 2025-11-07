'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Database, 
  TrendingUp, 
  RefreshCw, 
  Download, 
  FileText,
  Activity,
  HardDrive,
  Wifi,
  Bot,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Users,
  BarChart3,
  Settings,
  Lock,
  Shield,
  FileCheck,
  Table,
  Code,
  Eye,
  X,
  Plus,
  ChevronUp,
  ChevronDown,
  Grid,
  List,
  Filter,
  Star,
  MoreHorizontal,
  Edit,
  Trash2,
  Search
} from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function DataWarehousePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTable, setSelectedTable] = useState("");
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM table_name WHERE condition...");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [viewName, setViewName] = useState("");
  const [viewDescription, setViewDescription] = useState("");
  const [dataSourceType, setDataSourceType] = useState("table");
  const [selectedDataTable, setSelectedDataTable] = useState("");
  const [filters, setFilters] = useState([]);
  const [columns, setColumns] = useState([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [myViewsOnly, setMyViewsOnly] = useState(false);
  const [viewType, setViewType] = useState("list");

  const databaseStats = {
    totalRecords: "209,850",
    databaseSize: "34.7 GB",
    dataIngestionRate: "2.3K records/min",
    storageUsed: "34.7 GB / 100 GB",
    activeConnections: "5 / 10"
  };

  const quickActions = [
    { name: "Refresh All Data", icon: RefreshCw },
    { name: "Export Data", icon: Download },
    { name: "Generate Report", icon: FileText }
  ];

  const connectedSources = [
    { name: "Addepar", lastSync: "2 mins ago", records: "45,230", status: "Connected" },
    { name: "Orion", lastSync: "5 mins ago", records: "32,140", status: "Connected" },
    { name: "Black Diamond", lastSync: "1 min ago", records: "67,890", status: "Connected" },
    { name: "Schwab", lastSync: "3 mins ago", records: "23,450", status: "Connected" },
    { name: "Fidelity", lastSync: "4 mins ago", records: "41,120", status: "Connected" }
  ];

  const databaseTables = [
    { name: "public.allvue_sftp_account_groups_raw_download", type: "table" },
    { name: "public.asset_classifications_with_ranco", type: "view" },
    { name: "public.mv_allvue_general_ledger_optimized", type: "materialized_view" },
    { name: "public.portfolios", type: "table" },
    { name: "public.holdings", type: "table" },
    { name: "public.transactions", type: "table" },
    { name: "public.securities", type: "table" },
    { name: "public.performance_data", type: "table" }
  ];

  const tabs = [
    "Overview",
    "Data Sources", 
    "Browse Tables",
    "Custom SQL",
    "Filtered Views",
    "DB Description",
    "Documentation",
    "Data Lineage",
    "Data Quality",
    "Monitoring",
    "Settings"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/data-connections"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Data Connections
            </Link>
            <div className="flex items-center space-x-3">
              <Database className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">API Data Extraction & Warehousing</h1>
            </div>
          </div>
          <Badge className="bg-success/10 text-success hover:bg-success/20">
            Data Hub Pro - Active
          </Badge>
        </div>

        {/* Database Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Data Hub Pro</h2>
              <p className="text-muted-foreground">PostgreSQL Database - Investment Data Warehouse</p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center justify-end space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{databaseStats.totalRecords}</div>
                  <div className="text-sm text-muted-foreground">Total Records</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-success">{databaseStats.databaseSize}</div>
                  <div className="text-sm text-muted-foreground">Database Size</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-11 h-auto p-1">
            {tabs.map((tab, index) => (
              <TabsTrigger 
                key={index}
                value={tab.toLowerCase().replace(/\s+/g, '-')}
                className="text-xs px-2 py-2"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Database Activity */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Database Activity</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Data Ingestion Rate</span>
                          <span className="text-lg font-bold text-primary">{databaseStats.dataIngestionRate}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Storage Used</span>
                          <span className="text-lg font-bold text-warning">{databaseStats.storageUsed}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Active Connections</span>
                          <span className="text-lg font-bold text-success">{databaseStats.activeConnections}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Ingestion AI Bot */}
                <Card className="border-l-4 border-l-success">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                          <Bot className="w-6 h-6 text-success" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Data Ingestion AI Bot</h3>
                          <p className="text-sm text-muted-foreground">
                            Automated data extraction and ingestion into "Data Hub Pro"
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-success/10 text-success">Ready</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="bg-success/5">
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                          <div className="text-2xl font-bold text-foreground">0%</div>
                          <div className="text-xs text-muted-foreground">Complete</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-secondary/50">
                        <CardContent className="p-4 text-center">
                          <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-2xl font-bold text-foreground">0</div>
                          <div className="text-xs text-muted-foreground">Records</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-warning/5">
                        <CardContent className="p-4 text-center">
                          <Activity className="w-8 h-8 text-warning mx-auto mb-2" />
                          <div className="text-2xl font-bold text-foreground">0</div>
                          <div className="text-xs text-muted-foreground">Sources</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/50">
                        <CardContent className="p-4 text-center">
                          <Database className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <div className="text-lg font-bold text-foreground">Data Hub Pro</div>
                          <div className="text-xs text-muted-foreground">Database</div>
                        </CardContent>
                      </Card>
                    </div>

                     <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                       <p className="text-sm text-muted-foreground flex items-center">
                         <Activity className="w-4 h-4 mr-2" />
                         Please configure vendor credentials in the Integration Credentials section to enable data ingestion
                       </p>
                     </div>

                     <div className="flex space-x-2 mt-4">
                       <Button className="bg-success hover:bg-success/90 text-white">
                         <Play className="w-4 h-4 mr-2" />
                         Start Data Ingestion
                       </Button>
                       <Button variant="outline">
                         <Pause className="w-4 h-4 mr-2" />
                         Pause Ingestion
                       </Button>
                       <Button variant="outline">
                         <RotateCcw className="w-4 h-4 mr-2" />
                         Retry Failed
                       </Button>
                     </div>

                     <div className="mt-6 p-4 bg-background rounded-lg border">
                       <p className="text-sm text-muted-foreground mb-2">
                         <Settings className="w-4 h-4 inline mr-2" />
                         <strong>Backend Integration Required:</strong> The Data Ingestion AI Bot requires backend functionality to connect to vendor APIs and process real data. Connect to Supabase to enable full automated data ingestion capabilities.
                       </p>
                     </div>
                   </CardContent>
                 </Card>

                 {/* Database Table Population */}
                 <Card className="border-l-4 border-l-warning">
                   <CardContent className="p-6">
                     <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                           <Table className="w-6 h-6 text-warning" />
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-foreground">Table Population AI Bot</h3>
                           <p className="text-sm text-muted-foreground">
                             Automated data generation and table population for "Data Hub Pro"
                           </p>
                         </div>
                       </div>
                       <Badge className="bg-warning/10 text-warning">Ready</Badge>
                     </div>

                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <Card className="bg-warning/5">
                         <CardContent className="p-4 text-center">
                           <TrendingUp className="w-8 h-8 text-warning mx-auto mb-2" />
                           <div className="text-2xl font-bold text-foreground">0%</div>
                           <div className="text-xs text-muted-foreground">Complete</div>
                         </CardContent>
                       </Card>
                       
                       <Card className="bg-secondary/50">
                         <CardContent className="p-4 text-center">
                           <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                           <div className="text-2xl font-bold text-foreground">0</div>
                           <div className="text-xs text-muted-foreground">Records Generated</div>
                         </CardContent>
                       </Card>
                       
                       <Card className="bg-success/5">
                         <CardContent className="p-4 text-center">
                           <Table className="w-8 h-8 text-success mx-auto mb-2" />
                           <div className="text-2xl font-bold text-foreground">0</div>
                           <div className="text-xs text-muted-foreground">Tables</div>
                         </CardContent>
                       </Card>
                       
                       <Card className="bg-muted/50">
                         <CardContent className="p-4 text-center">
                           <Database className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                           <div className="text-lg font-bold text-foreground">Data Hub Pro</div>
                           <div className="text-xs text-muted-foreground">Database</div>
                         </CardContent>
                       </Card>
                     </div>

                     <div className="flex space-x-2 mt-4">
                       <Button className="bg-warning hover:bg-warning/90 text-white">
                         <Play className="w-4 h-4 mr-2" />
                         Populate All Tables
                       </Button>
                       <Button variant="outline">
                         <Pause className="w-4 h-4 mr-2" />
                         Pause Population
                       </Button>
                       <Button variant="outline">
                         <RotateCcw className="w-4 h-4 mr-2" />
                         Regenerate Data
                       </Button>
                     </div>
                   </CardContent>
                 </Card>
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                 {/* Quick Actions */}
                 <Card>
                   <CardContent className="p-6">
                     <div className="flex items-center space-x-2 mb-4">
                       <Activity className="w-5 h-5 text-warning" />
                       <h3 className="font-semibold text-foreground">Quick Actions</h3>
                     </div>
                     <div className="space-y-2">
                       {quickActions.map((action, index) => (
                         <Button key={index} variant="outline" className="w-full justify-start">
                           <action.icon className="w-4 h-4 mr-2" />
                           {action.name}
                         </Button>
                       ))}
                     </div>
                   </CardContent>
                 </Card>
               </div>
             </div>
           </TabsContent>

           {/* Data Sources Tab */}
           <TabsContent value="data-sources" className="mt-6">
             <Card>
               <CardContent className="p-6">
                 <div className="flex items-center space-x-2 mb-6">
                   <Users className="w-5 h-5 text-primary" />
                   <h3 className="text-lg font-semibold text-foreground">Connected Data Sources</h3>
                 </div>

                 <div className="space-y-4">
                   {connectedSources.map((source, index) => (
                     <Card key={index}>
                       <CardContent className="p-4">
                         <div className="flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                             <div className="w-2 h-2 bg-success rounded-full"></div>
                             <div>
                               <h4 className="font-medium text-foreground">{source.name}</h4>
                               <p className="text-sm text-muted-foreground">Last sync: {source.lastSync}</p>
                             </div>
                           </div>
                           <div className="text-right">
                             <div className="text-lg font-bold text-foreground">{source.records} records</div>
                             <Badge className="bg-success/10 text-success">{source.status}</Badge>
                           </div>
                         </div>
                       </CardContent>
                     </Card>
                   ))}
                 </div>
               </CardContent>
             </Card>
           </TabsContent>

           {/* Browse Tables Tab */}
           <TabsContent value="browse-tables" className="mt-6">
             <div className="space-y-6">
               <Card>
                 <CardContent className="p-6">
                   <div className="flex items-center justify-between mb-6">
                     <h3 className="text-lg font-semibold text-foreground">Browse Tables</h3>
                     <Button variant="outline">
                       <Eye className="w-4 h-4 mr-2" />
                       Show Documentation
                     </Button>
                   </div>

                   <div className="space-y-4">
                     <div>
                       <p className="text-sm text-muted-foreground mb-2">Select Table, View, or Materialized View</p>
                       <Select value={selectedTable} onValueChange={setSelectedTable}>
                         <SelectTrigger className="w-full max-w-md">
                           <SelectValue placeholder="▼ Select a table/view" />
                         </SelectTrigger>
                         <SelectContent>
                           {databaseTables.map((table, index) => (
                             <SelectItem key={index} value={table.name}>
                               <div className="flex items-center space-x-2">
                                 <span className={`text-xs px-2 py-1 rounded ${
                                   table.type === 'table' ? 'bg-orange-100 text-orange-800' :
                                   table.type === 'view' ? 'bg-green-100 text-green-800' :
                                   'bg-purple-100 text-purple-800'
                                 }`}>
                                   {table.type === 'table' ? 'table' : 
                                    table.type === 'view' ? 'view' : 'materialized_view'}
                                 </span>
                                 <span>{table.name}</span>
                               </div>
                             </SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                     </div>

                     {!selectedTable && (
                       <div className="text-center py-12">
                         <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                         <h4 className="text-lg font-medium text-foreground mb-2">Select a Table</h4>
                         <p className="text-muted-foreground">Choose a table or view from the dropdown above to browse its data.</p>
                       </div>
                     )}
                   </div>
                 </CardContent>
               </Card>

               {selectedTable && (
                 <Card>
                   <CardContent className="p-6">
                     <div className="text-center py-8">
                       <Table className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                       <h4 className="text-lg font-medium text-foreground mb-2">Table Data Preview</h4>
                       <p className="text-muted-foreground">Data preview for {selectedTable} would appear here.</p>
                     </div>
                   </CardContent>
                 </Card>
               )}

               <Card>
                 <CardContent className="p-6">
                   <div className="flex items-center space-x-2 mb-4">
                     <Settings className="w-4 h-4 text-muted-foreground" />
                     <span className="text-sm text-muted-foreground">
                       <strong>Data Source:</strong> This data is generated by the Table Population AI Bot and represents realistic investment and financial data for demonstration purposes. Connect to Supabase for real database integration.
                     </span>
                   </div>
                 </CardContent>
               </Card>
             </div>
           </TabsContent>

           {/* Custom SQL Tab */}
           <TabsContent value="custom-sql" className="mt-6">
             <div className="space-y-6">
               <Card>
                 <CardContent className="p-6">
                   <div className="flex items-center justify-between mb-6">
                     <div>
                       <h3 className="text-lg font-semibold text-foreground">Custom SQL Query</h3>
                       <p className="text-sm text-muted-foreground">Enter a SELECT query in the text area below to explore your data.</p>
                     </div>
                     <Button variant="outline">
                       <Code className="w-4 h-4 mr-2" />
                       Generate Sample SQL Queries
                     </Button>
                   </div>

                   <div className="space-y-4">
                     <div>
                       <label className="text-sm font-medium text-foreground mb-2 block">
                         Enter SQL Query (SELECT statements only)
                       </label>
                       <Textarea
                         value={sqlQuery}
                         onChange={(e) => setSqlQuery(e.target.value)}
                         className="min-h-[200px] font-mono text-sm"
                         placeholder="SELECT * FROM table_name WHERE condition..."
                       />
                     </div>

                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                         <Database className="w-4 h-4" />
                         <span>Connected to: Data Hub Pro</span>
                       </div>
                       <Button className="bg-primary hover:bg-primary/90">
                         <Play className="w-4 h-4 mr-2" />
                         Execute Query
                       </Button>
                     </div>
                   </div>
                 </CardContent>
               </Card>

               <Card>
                 <CardContent className="p-8 text-center">
                   <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                   <h4 className="text-lg font-medium text-foreground mb-2">Write Your SQL Query</h4>
                   <p className="text-muted-foreground">Enter a SELECT query in the text area above to explore your data.</p>
                 </CardContent>
               </Card>
             </div>
           </TabsContent>

            {/* Filtered Views Tab */}
            <TabsContent value="filtered-views" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Filtered Views</h3>
                        <p className="text-sm text-muted-foreground">Create and manage filtered views to enable dynamic data filtering and sharing</p>
                      </div>
                      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                        <DialogTrigger asChild>
                          <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="w-4 h-4 mr-2" />
                            Create New View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <div className="flex items-center justify-between">
                              <DialogTitle>Create New Filtered View</DialogTitle>
                              <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </DialogHeader>

                          {/* Progress Steps */}
                          <div className="flex items-center justify-between mb-8">
                            {[1, 2, 3, 4].map((step, index) => (
                              <div key={step} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                  step <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                }`}>
                                  {step}
                                </div>
                                {index < 3 && (
                                  <div className={`w-16 h-0.5 mx-2 ${
                                    step < currentStep ? 'bg-primary' : 'bg-muted'
                                  }`}></div>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between mb-6 text-sm">
                            <span className={currentStep === 1 ? 'font-medium text-foreground' : 'text-muted-foreground'}>Data Source</span>
                            <span className={currentStep === 2 ? 'font-medium text-foreground' : 'text-muted-foreground'}>Filters</span>
                            <span className={currentStep === 3 ? 'font-medium text-foreground' : 'text-muted-foreground'}>Columns</span>
                            <span className={currentStep === 4 ? 'font-medium text-foreground' : 'text-muted-foreground'}>Save & Share</span>
                          </div>

                          {/* Step 1: Data Source */}
                          {currentStep === 1 && (
                            <div className="space-y-6">
                              <h3 className="text-xl font-semibold">Step 1: Data Source</h3>
                              
                              <div>
                                <Label htmlFor="view-name">View Name *</Label>
                                <Input
                                  id="view-name"
                                  placeholder="e.g. Monthly Sales Report"
                                  value={viewName}
                                  onChange={(e) => setViewName(e.target.value)}
                                  className="mt-1"
                                />
                              </div>

                              <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  placeholder="Brief description of this view..."
                                  value={viewDescription}
                                  onChange={(e) => setViewDescription(e.target.value)}
                                  className="mt-1"
                                  rows={3}
                                />
                              </div>

                              <div>
                                <Label className="text-sm font-medium">Data Source Type</Label>
                                <RadioGroup value={dataSourceType} onValueChange={setDataSourceType} className="mt-2">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="table" id="table" />
                                    <Label htmlFor="table">Select Table</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sql" id="sql" />
                                    <Label htmlFor="sql">Custom SQL Query</Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              {dataSourceType === "table" && (
                                <div>
                                  <Label htmlFor="select-table">Select Table</Label>
                                  <Select value={selectedDataTable} onValueChange={setSelectedDataTable}>
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Select a table..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="public.client_transactions_with_details">public.client_transactions_with_details</SelectItem>
                                      <SelectItem value="public.client_demographics_with_transactions">public.client_demographics_with_transactions</SelectItem>
                                      <SelectItem value="public.client_balances_and_accounts">public.client_balances_and_accounts</SelectItem>
                                      <SelectItem value="public.client_details_general_ledger_optimized">public.client_details_general_ledger_optimized</SelectItem>
                                      <SelectItem value="public.account_signup_row_download">public.account_signup_row_download</SelectItem>
                                      <SelectItem value="investments_table">investments_table</SelectItem>
                                      <SelectItem value="transactions_table">transactions_table</SelectItem>
                                      <SelectItem value="portfolios_table">portfolios_table</SelectItem>
                                      <SelectItem value="clients_table">clients_table</SelectItem>
                                      <SelectItem value="assets_table">assets_table</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Step 2: Configure Filters */}
                          {currentStep === 2 && (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">Step 2: Configure Filters</h3>
                                <Button onClick={() => setFilters([...filters, { id: Date.now(), column: '', operator: '', value: '', label: '' }])}>
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Filter
                                </Button>
                              </div>

                              {filters.length === 0 ? (
                                <div className="text-center py-12 bg-muted/20 rounded-lg">
                                  <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                  <h4 className="text-lg font-medium mb-2">No filters configured yet</h4>
                                  <p className="text-muted-foreground mb-4">Add filters to allow users to dynamically filter the data in this view</p>
                                  <Button variant="outline" onClick={() => setFilters([{ id: Date.now(), column: '', operator: '', value: '', label: '' }])}>
                                    Add Your First Filter
                                  </Button>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  {filters.map((filter, index) => (
                                    <Card key={filter.id}>
                                      <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                          <h4 className="font-medium">Filter {index + 1}</h4>
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => setFilters(filters.filter(f => f.id !== filter.id))}
                                          >
                                            <X className="w-4 h-4 text-destructive" />
                                          </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <Label>Column</Label>
                                            <Select>
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select column..." />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="amount">Amount</SelectItem>
                                                <SelectItem value="date">Date</SelectItem>
                                                <SelectItem value="client_id">Client ID</SelectItem>
                                                <SelectItem value="portfolio">Portfolio</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div>
                                            <Label>Display Label</Label>
                                            <Input placeholder="Label for users" />
                                          </div>
                                          <div>
                                            <Label>Operator</Label>
                                            <Select>
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select operator..." />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="equals">Equals</SelectItem>
                                                <SelectItem value="not_equals">Not Equals</SelectItem>
                                                <SelectItem value="greater_than">Greater Than</SelectItem>
                                                <SelectItem value="less_than">Less Than</SelectItem>
                                                <SelectItem value="contains">Contains</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div>
                                            <Label>Default Value</Label>
                                            <Input placeholder="Default value..." />
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Step 3: Configure Columns */}
                          {currentStep === 3 && (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">Step 3: Configure Columns</h3>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">Show All Columns</Button>
                                  <Button variant="outline" size="sm">Hide All Columns</Button>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 mb-4">
                                <Checkbox id="customize" />
                                <Label htmlFor="customize">Customize column display</Label>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-4">
                                Choose which columns to display, their order, and how to format them
                              </p>

                              <div className="border rounded-lg overflow-hidden">
                                <table className="w-full">
                                  <thead className="bg-muted/50">
                                    <tr>
                                      <th className="text-left p-3 text-sm font-medium">Column Name</th>
                                      <th className="text-left p-3 text-sm font-medium">Display As</th>
                                      <th className="text-left p-3 text-sm font-medium">Visible</th>
                                      <th className="text-left p-3 text-sm font-medium">Format</th>
                                      <th className="text-left p-3 text-sm font-medium">Order</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {[
                                      { name: 'row_id', display: 'row_id' },
                                      { name: 'sql_user', display: 'sql_user' },
                                      { name: 'database_entry_created_at', display: 'database_entry_created_at' },
                                      { name: 'file_name', display: 'file_name' },
                                      { name: 'account_group_code', display: 'account_group_code' }
                                    ].map((column, index) => (
                                      <tr key={index} className="border-t">
                                        <td className="p-3 font-medium">{column.name}</td>
                                        <td className="p-3">
                                          <Input defaultValue={column.display} className="w-full" />
                                        </td>
                                        <td className="p-3">
                                          <Checkbox defaultChecked />
                                        </td>
                                        <td className="p-3">
                                          <Select defaultValue="auto">
                                            <SelectTrigger className="w-32">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="auto">Auto-detect</SelectItem>
                                              <SelectItem value="text">Text</SelectItem>
                                              <SelectItem value="number">Number</SelectItem>
                                              <SelectItem value="date">Date</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </td>
                                        <td className="p-3">
                                          <div className="flex space-x-1">
                                            <Button variant="ghost" size="sm">
                                              <ChevronUp className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                              <ChevronDown className="w-4 h-4" />
                                            </Button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* Step 4: Save & Share */}
                          {currentStep === 4 && (
                            <div className="space-y-6">
                              <h3 className="text-xl font-semibold">Step 4: Save & Share</h3>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox id="public" />
                                <Label htmlFor="public">Make this view public to all users in the organization</Label>
                              </div>

                              <div>
                                <h4 className="font-medium mb-3">Permissions</h4>
                                <Button variant="outline" size="sm">
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Permission
                                </Button>
                              </div>

                              <div className="bg-muted/20 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                  <Database className="w-5 h-5 text-muted-foreground" />
                                  <span className="text-sm">This view will be created in your <strong>Data Hub Pro</strong> database and will be immediately available to authorized users.</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Navigation Buttons */}
                          <div className="flex justify-between pt-6 border-t">
                            <Button 
                              variant="outline" 
                              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                              disabled={currentStep === 1}
                            >
                              Previous
                            </Button>
                            <div className="flex space-x-2">
                              {currentStep < 4 ? (
                                <Button 
                                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                                  disabled={currentStep === 1 && !viewName}
                                >
                                  Next
                                </Button>
                              ) : (
                                <Button 
                                  className="bg-primary hover:bg-primary/90"
                                  onClick={() => {
                                    // Save view logic here
                                    setShowCreateModal(false);
                                    setCurrentStep(1);
                                    setViewName("");
                                    setViewDescription("");
                                  }}
                                >
                                  <Database className="w-4 h-4 mr-2" />
                                  Save View
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            placeholder="Search views..."
                            className="w-64 pl-10"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="favorites" 
                            checked={favoritesOnly}
                            onCheckedChange={(checked) => setFavoritesOnly(checked === true)}
                          />
                          <Label htmlFor="favorites" className="text-sm text-muted-foreground">Favorites only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="myviews" 
                            checked={myViewsOnly}
                            onCheckedChange={(checked) => setMyViewsOnly(checked === true)}
                          />
                          <Label htmlFor="myviews" className="text-sm text-muted-foreground">My views only</Label>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant={viewType === "tiles" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setViewType("tiles")}
                        >
                          <Grid className="w-4 h-4 mr-2" />
                          Tiles
                        </Button>
                        <Button 
                          variant={viewType === "list" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setViewType("list")}
                        >
                          <List className="w-4 h-4 mr-2" />
                          List
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        Folders
                      </div>
                      <div className="text-sm text-primary mb-4 cursor-pointer hover:underline">All Views</div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-left p-3 text-sm font-medium">NAME</th>
                              <th className="text-left p-3 text-sm font-medium">TYPE</th>
                              <th className="text-left p-3 text-sm font-medium">OWNER</th>
                              <th className="text-left p-3 text-sm font-medium">LAST UPDATED</th>
                              <th className="text-left p-3 text-sm font-medium">VIEWS</th>
                              <th className="text-left p-3 text-sm font-medium">ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-3">
                                <div className="flex items-center space-x-2">
                                  <Table className="w-4 h-4" />
                                  <span className="font-medium">High Value Portfolios</span>
                                </div>
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">Table</td>
                              <td className="p-3 text-sm text-muted-foreground">sinan.biren@collation.ai</td>
                              <td className="p-3 text-sm text-muted-foreground">Just now</td>
                              <td className="p-3 text-sm text-muted-foreground">0</td>
                              <td className="p-3">
                                <div className="flex items-center space-x-1">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3">
                                <div className="flex items-center space-x-2">
                                  <Table className="w-4 h-4" />
                                  <span className="font-medium">i</span>
                                </div>
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">Table</td>
                              <td className="p-3 text-sm text-muted-foreground">sinan.biren@collation.ai</td>
                              <td className="p-3 text-sm text-muted-foreground">Just now</td>
                              <td className="p-3 text-sm text-muted-foreground">0</td>
                              <td className="p-3">
                                <div className="flex items-center space-x-1">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

           {/* DB Description Tab */}
           <TabsContent value="db-description" className="mt-6">
             <Card>
               <CardContent className="p-6">
                 <div className="flex items-center space-x-2 mb-6">
                   <Table className="w-5 h-5 text-primary" />
                   <h3 className="text-lg font-semibold text-foreground">Database Schema Overview</h3>
                 </div>

                 <div className="border rounded-lg overflow-hidden">
                   <table className="w-full">
                     <thead className="bg-muted/50">
                       <tr>
                         <th className="text-left p-3 text-sm font-medium">Object Name</th>
                         <th className="text-left p-3 text-sm font-medium">Type</th>
                         <th className="text-left p-3 text-sm font-medium">Size</th>
                         <th className="text-left p-3 text-sm font-medium">Description</th>
                       </tr>
                     </thead>
                     <tbody>
                       {[
                         { name: "portfolios", type: "BASE TABLE", size: "2.8 GB", description: "Master list for investment portfolio data" },
                         { name: "holdings", type: "BASE TABLE", size: "5.2 GB", description: "Portfolio position and allocation data" },
                         { name: "transactions", type: "BASE TABLE", size: "12.1 GB", description: "Complete transaction and trade history" },
                         { name: "performance", type: "BASE TABLE", size: "3.4 GB", description: "Investment performance and attribution metrics" },
                         { name: "securities", type: "BASE TABLE", size: "1.9 GB", description: "Security master data with pricing information" },
                         { name: "accounts", type: "BASE TABLE", size: "856 MB", description: "Client account and entity master data" },
                         { name: "cash_flows", type: "BASE TABLE", size: "4.7 GB", description: "Cash movement and dividend payment records" },
                         { name: "benchmarks", type: "BASE TABLE", size: "1.2 GB", description: "Performance benchmark and index data" }
                       ].map((table, index) => (
                         <tr key={index} className="border-t">
                           <td className="p-3 font-medium">{table.name}</td>
                           <td className="p-3 text-sm text-muted-foreground">{table.type}</td>
                           <td className="p-3 text-sm text-muted-foreground">{table.size}</td>
                           <td className="p-3 text-sm text-muted-foreground">{table.description}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </CardContent>
             </Card>
           </TabsContent>

           {/* Documentation Tab */}
           <TabsContent value="documentation" className="mt-6">
             <div className="space-y-6">
               <Card>
                 <CardContent className="p-6">
                   <div className="flex items-center space-x-2 mb-6">
                     <FileText className="w-5 h-5 text-primary" />
                     <h3 className="text-lg font-semibold text-foreground">Database Documentation</h3>
                   </div>

                   <div className="flex space-x-2 mb-6">
                     <Button variant="default" size="sm">AI Documentation Bot</Button>
                     <Button variant="outline" size="sm">Manual Editor</Button>
                   </div>

                   <Card className="border-2">
                     <CardContent className="p-6">
                       <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                             <Bot className="w-6 h-6 text-primary" />
                           </div>
                           <div>
                             <h4 className="text-lg font-semibold text-foreground">Database Documentation AI Bot</h4>
                             <p className="text-sm text-muted-foreground">
                               Automated PostgreSQL schema documentation for "Data Hub Pro"
                             </p>
                           </div>
                         </div>
                         <Badge className="bg-primary/10 text-primary">Ready</Badge>
                       </div>

                       <Button className="bg-primary hover:bg-primary/90">
                         <Play className="w-4 h-4 mr-2" />
                         Generate Documentation
                       </Button>
                     </CardContent>
                   </Card>

                   <Card className="mt-4">
                     <CardContent className="p-4">
                       <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                         <Settings className="w-4 h-4" />
                         <span>
                           <strong>Enhanced with Supabase:</strong> Connect to Supabase to enable real-time database schema analysis and AI-powered documentation generation for your PostgreSQL database.
                         </span>
                       </div>
                     </CardContent>
                   </Card>
                 </CardContent>
               </Card>
             </div>
           </TabsContent>

           {/* Data Lineage Tab */}
           <TabsContent value="data-lineage" className="mt-6">
             <Card>
               <CardContent className="p-6">
                 <div className="flex items-center space-x-2 mb-6">
                   <Activity className="w-5 h-5 text-primary" />
                   <h3 className="text-lg font-semibold text-foreground">Data Flow & Lineage</h3>
                 </div>

                 <div className="mb-4">
                   <p className="text-sm text-muted-foreground flex items-center">
                     <Settings className="w-4 h-4 mr-2" />
                     Data lineage tracking shows the complete flow from source systems to the data warehouse.
                   </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                   <div className="text-center">
                     <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                       <Database className="w-8 h-8 text-primary" />
                     </div>
                     <h4 className="text-lg font-semibold text-foreground mb-2">Source Systems</h4>
                     <p className="text-sm text-muted-foreground">Addepar, Orion, Black Diamond, Custodian Banks</p>
                   </div>

                   <div className="text-center">
                     <div className="w-16 h-16 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                       <Activity className="w-8 h-8 text-warning" />
                     </div>
                     <h4 className="text-lg font-semibold text-foreground mb-2">AI Bots</h4>
                     <p className="text-sm text-muted-foreground">Data extraction and transformation</p>
                   </div>

                   <div className="text-center">
                     <div className="w-16 h-16 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                       <HardDrive className="w-8 h-8 text-success" />
                     </div>
                     <h4 className="text-lg font-semibold text-foreground mb-2">Data Warehouse</h4>
                     <p className="text-sm text-muted-foreground">Data Hub Pro PostgreSQL</p>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </TabsContent>

           {/* Data Quality Tab */}
           <TabsContent value="data-quality" className="mt-6">
             <Card>
               <CardContent className="p-6">
                 <div className="flex items-center space-x-2 mb-6">
                   <CheckCircle className="w-5 h-5 text-primary" />
                   <h3 className="text-lg font-semibold text-foreground">Data Quality Metrics</h3>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <span className="text-sm text-muted-foreground">Data Completeness</span>
                       <span className="text-2xl font-bold text-success">98.7%</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-sm text-muted-foreground">Data Accuracy</span>
                       <span className="text-2xl font-bold text-success">99.2%</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-sm text-muted-foreground">Data Freshness</span>
                       <span className="text-lg font-bold text-primary">Real-time</span>
                     </div>
                   </div>

                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <span className="text-sm text-muted-foreground">Duplicate Records</span>
                       <span className="text-2xl font-bold text-warning">0.3%</span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-sm text-muted-foreground">Failed Validations</span>
                       <span className="text-2xl font-bold text-warning">12</span>
                     </div>
                   </div>

                   <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <span className="text-sm text-muted-foreground">Data Quality Score</span>
                       <span className="text-2xl font-bold text-success">97.8%</span>
                     </div>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </TabsContent>

           {/* Monitoring Tab */}
           <TabsContent value="monitoring" className="mt-6">
             <Card>
               <CardContent className="p-6">
                 <div className="flex items-center space-x-2 mb-6">
                   <BarChart3 className="w-5 h-5 text-primary" />
                   <h3 className="text-lg font-semibold text-foreground">System Monitoring</h3>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <Card>
                     <CardContent className="p-6 text-center">
                       <div className="text-4xl font-bold text-success mb-2">99.9%</div>
                       <div className="text-sm text-muted-foreground">Uptime</div>
                     </CardContent>
                   </Card>

                   <Card>
                     <CardContent className="p-6 text-center">
                       <div className="text-4xl font-bold text-primary mb-2">2.3ms</div>
                       <div className="text-sm text-muted-foreground">Avg Response</div>
                     </CardContent>
                   </Card>

                   <Card>
                     <CardContent className="p-6 text-center">
                       <div className="text-4xl font-bold text-warning mb-2">45%</div>
                       <div className="text-sm text-muted-foreground">CPU Usage</div>
                     </CardContent>
                   </Card>
                 </div>
               </CardContent>
             </Card>
           </TabsContent>

           {/* Settings Tab */}
           <TabsContent value="settings" className="mt-6">
             <Card>
               <CardContent className="p-6">
                 <div className="flex items-center space-x-2 mb-6">
                   <Settings className="w-5 h-5 text-primary" />
                   <h3 className="text-lg font-semibold text-foreground">Database Configuration</h3>
                 </div>

                 <div className="space-y-6">
                   <div>
                     <label className="text-sm font-medium text-foreground mb-2 block">Backup Frequency</label>
                     <Select defaultValue="daily">
                       <SelectTrigger className="w-64">
                         <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="daily">Daily at 2:00 AM</SelectItem>
                         <SelectItem value="hourly">Every Hour</SelectItem>
                         <SelectItem value="weekly">Weekly</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>

                   <div>
                     <label className="text-sm font-medium text-foreground mb-2 block">Data Retention Policy</label>
                     <Select defaultValue="7years">
                       <SelectTrigger className="w-64">
                         <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="7years">7 years</SelectItem>
                         <SelectItem value="5years">5 years</SelectItem>
                         <SelectItem value="10years">10 years</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>

                   <div>
                     <label className="text-sm font-medium text-foreground mb-2 block">Access Controls</label>
                     <Textarea 
                       defaultValue="Role-based access with encryption"
                       className="w-full max-w-2xl"
                       rows={3}
                     />
                   </div>

                   <Button className="bg-primary hover:bg-primary/90">
                     Save Configuration
                   </Button>
                 </div>
               </CardContent>
             </Card>
           </TabsContent>

           {/* Other remaining tabs */}
           {tabs.slice(4).filter(tab => !['Filtered Views', 'DB Description', 'Documentation', 'Data Lineage', 'Data Quality', 'Monitoring', 'Settings'].includes(tab)).map((tab, index) => (
             <TabsContent key={index} value={tab.toLowerCase().replace(/\s+/g, '-')}>
               <Card>
                 <CardContent className="p-8 text-center">
                   <h3 className="text-lg font-semibold text-foreground mb-2">{tab}</h3>
                   <p className="text-muted-foreground">This section is under development.</p>
                 </CardContent>
               </Card>
             </TabsContent>
           ))}
        </Tabs>
      </div>
    </div>
  );
};


