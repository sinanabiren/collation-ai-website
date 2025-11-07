'use client'

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Activity, Clock, AlertTriangle, BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navigation from "@/components/Navigation";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function OperationalMetricsDashboardPage() {
  const [activeTab, setActiveTab] = useState("performance-trends");

  // Performance trends data
  const performanceTrendsData = [
    { month: "Jan", settlementRate: 98.2, systemUptime: 99.7 },
    { month: "Feb", settlementRate: 98.8, systemUptime: 99.8 },
    { month: "Mar", settlementRate: 98.5, systemUptime: 99.6 },
    { month: "Apr", settlementRate: 98.9, systemUptime: 99.8 },
    { month: "May", settlementRate: 98.7, systemUptime: 99.9 },
    { month: "Jun", settlementRate: 98.5, systemUptime: 99.8 },
  ];

  // Processing time and error rate data
  const processingErrorData = [
    { month: "Jan", processingTime: 2.8, errorRate: 0.25 },
    { month: "Feb", processingTime: 2.6, errorRate: 0.18 },
    { month: "Mar", processingTime: 2.7, errorRate: 0.22 },
    { month: "Apr", processingTime: 2.5, errorRate: 0.15 },
    { month: "May", processingTime: 2.4, errorRate: 0.12 },
    { month: "Jun", processingTime: 2.4, errorRate: 0.15 },
  ];

  // Department performance data
  const departmentData = [
    { department: "Trading", efficiency: 94 },
    { department: "Operations", efficiency: 91 },
    { department: "Compliance", efficiency: 88 },
    { department: "Technology", efficiency: 96 },
    { department: "Client Services", efficiency: 92 },
  ];

  // Department metrics table data
  const departmentMetrics = [
    { department: "Trading", efficiency: "94%", volume: "12,500", cost: "$485,000" },
    { department: "Operations", efficiency: "91%", volume: "8,900", cost: "$320,000" },
    { department: "Compliance", efficiency: "88%", volume: "2,400", cost: "$180,000" },
    { department: "Technology", efficiency: "96%", volume: "15,000", cost: "$890,000" },
    { department: "Client Services", efficiency: "92%", volume: "6,700", cost: "$275,000" },
  ];

  // Operational metrics summary data
  const operationalMetrics = [
    { metric: "Trade Settlement Rate", current: "98.5%", target: "98%", status: "Above Target", trend: "+0.3%" },
    { metric: "Cash Processing Time", current: "2.4 hrs", target: "3 hrs", status: "Above Target", trend: "-0.2 hours" },
    { metric: "Account Opening Time", current: "1.8 hrs", target: "2 hrs", status: "Above Target", trend: "-0.3 days" },
    { metric: "Error Rate", current: "0.15%", target: "0.2%", status: "Above Target", trend: "-0.02%" },
    { metric: "Client Response Time", current: "4.2 hrs", target: "6 hrs", status: "Above Target", trend: "-0.5 hours" },
    { metric: "System Uptime", current: "99.8%", target: "99.5%", status: "Above Target", trend: "+0.1%" },
  ];

  // SLA performance data for pie chart
  const slaData = [
    { name: "Trade Execution", value: 99.2, color: "hsl(var(--primary))" },
    { name: "Client Reporting", value: 96.8, color: "hsl(var(--secondary))" },
    { name: "Settlement", value: 98.5, color: "hsl(var(--accent))" },
    { name: "Risk Management", value: 97.3, color: "#ff7300" },
    { name: "Compliance", value: 99.1, color: "#00d9ff" },
  ];

  // SLA performance table data
  const slaPerformanceData = [
    { category: "Trade Execution", current: "99.2%", target: "98.5%", performance: "Met" },
    { category: "Client Reporting", current: "96.8%", target: "95%", performance: "Met" },
    { category: "Settlement", current: "98.5%", target: "98%", performance: "Met" },
    { category: "Risk Management", current: "97.3%", target: "97%", performance: "Met" },
    { category: "Compliance", current: "99.1%", target: "99%", performance: "Met" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "performance-trends":
        return (
          <div className="space-y-6">
            {/* 6-Month Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>6-Month Performance Trends</CardTitle>
                <CardDescription>Track key operational metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis domain={[95, 100]} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="settlementRate" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Settlement Rate %"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="systemUptime" 
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={2}
                        name="System Uptime %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Processing Time & Error Rate Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Processing Time & Error Rate Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={processingErrorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="processingTime" 
                        stackId="1"
                        stroke="#ffb347" 
                        fill="#ffb347"
                        fillOpacity={0.6}
                        name="Processing Time (hrs)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="errorRate" 
                        stackId="2"
                        stroke="#ff6b47" 
                        fill="#ff6b47"
                        fillOpacity={0.6}
                        name="Error Rate %"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "detailed-metrics":
        return (
          <div className="space-y-6">
            {/* Operational Metrics Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Operational Metrics Summary</CardTitle>
                <CardDescription>Current performance vs targets</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {operationalMetrics.map((metric, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{metric.metric}</TableCell>
                        <TableCell>{metric.current}</TableCell>
                        <TableCell>{metric.target}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {metric.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-green-600">{metric.trend}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "by-department":
        return (
          <div className="space-y-6">
            {/* Department Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Efficiency and cost metrics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="department" stroke="hsl(var(--muted-foreground))" />
                      <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <Bar dataKey="efficiency" fill="hsl(var(--primary))" name="Efficiency %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Department Metrics Table */}
            <Card>
              <CardHeader>
                <CardTitle>Department Metrics Table</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Efficiency %</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Cost ($)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentMetrics.map((dept, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{dept.department}</TableCell>
                        <TableCell>{dept.efficiency}</TableCell>
                        <TableCell>{dept.volume}</TableCell>
                        <TableCell>{dept.cost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "sla-tracking":
        return (
          <div className="space-y-6">
            {/* SLA Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>SLA Performance Overview</CardTitle>
                <CardDescription>Service level agreement compliance by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                        formatter={(value, name) => [`${value}%`, name]}
                      />
                      <RechartsPieChart data={slaData} cx="50%" cy="50%" innerRadius={60} outerRadius={120}>
                        {slaData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div className="grid grid-cols-5 gap-4 mt-4">
                  {slaData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm font-medium">{item.name}: {item.value}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SLA Performance vs Targets */}
            <Card>
              <CardHeader>
                <CardTitle>SLA Performance vs Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Current %</TableHead>
                      <TableHead>Target %</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {slaPerformanceData.map((sla, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{sla.category}</TableCell>
                        <TableCell>{sla.current}</TableCell>
                        <TableCell>{sla.target}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {sla.performance}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Back to Reports Gallery */}
        <Link href="/build-report"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Reports Gallery
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Operational Metrics Dashboard</h1>
              <p className="text-muted-foreground">Monitor key operational performance indicators and efficiency metrics</p>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>Created: 2024-03-10</span>
                <span>Last Updated: 2024-09-23</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Real-time</Button>
              <Button variant="outline" size="sm">SLA Tracking</Button>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="performance-trends">Performance Trends</TabsTrigger>
              <TabsTrigger value="detailed-metrics">Detailed Metrics</TabsTrigger>
              <TabsTrigger value="by-department">By Department</TabsTrigger>
              <TabsTrigger value="sla-tracking">SLA Tracking</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Settlement Rate</p>
                  <p className="text-2xl font-bold">98.5%</p>
                  <p className="text-xs text-muted-foreground">+0.3% from last month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                  <p className="text-2xl font-bold">99.8%</p>
                  <p className="text-xs text-muted-foreground">Above target (99.5%)</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Processing Time</p>
                  <p className="text-2xl font-bold">2.4 hrs</p>
                  <p className="text-xs text-muted-foreground">-0.2 hrs from target</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Error Rate</p>
                  <p className="text-2xl font-bold">0.15%</p>
                  <p className="text-xs text-muted-foreground">Below target (0.20%)</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

