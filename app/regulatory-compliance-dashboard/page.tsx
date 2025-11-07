'use client'

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Clock, FileText, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navigation from "@/components/Navigation";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function RegulatoryComplianceDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Compliance trend data
  const complianceTrendData = [
    { month: "Apr", compliant: 88, underReview: 8, actionRequired: 4 },
    { month: "May", compliant: 88, underReview: 8, actionRequired: 4 },
    { month: "Jun", compliant: 90, underReview: 7, actionRequired: 3 },
    { month: "Jul", compliant: 92, underReview: 6, actionRequired: 2 },
    { month: "Aug", compliant: 93, underReview: 5, actionRequired: 2 },
    { month: "Sep", compliant: 94, underReview: 5, actionRequired: 1 },
  ];

  // Regulatory compliance status data
  const regulatoryStatusData = [
    { regulation: "MiFID II", status: "Compliant", lastReview: "2024-09-15", nextReview: "2024-12-15", riskLevel: "Low" },
    { regulation: "GDPR", status: "Compliant", lastReview: "2024-09-10", nextReview: "2024-12-10", riskLevel: "Low" },
    { regulation: "Basel III", status: "Under Review", lastReview: "2024-08-20", nextReview: "2024-11-20", riskLevel: "Medium" },
    { regulation: "Dodd-Frank", status: "Compliant", lastReview: "2024-09-05", nextReview: "2024-12-05", riskLevel: "Low" },
    { regulation: "FATCA", status: "Action Required", lastReview: "2024-07-15", nextReview: "2024-10-15", riskLevel: "High" },
    { regulation: "CRS", status: "Compliant", lastReview: "2024-09-01", nextReview: "2024-12-01", riskLevel: "Low" },
  ];

  // Violations by quarter data
  const violationsData = [
    { quarter: "Q1 2024", minor: 2, major: 0, critical: 0, resolved: 2 },
    { quarter: "Q2 2024", minor: 1, major: 1, critical: 0, resolved: 2 },
    { quarter: "Q3 2024", minor: 3, major: 0, critical: 1, resolved: 3 },
    { quarter: "Q4 2024", minor: 1, major: 0, critical: 0, resolved: 1 },
  ];

  // Violations summary data
  const violationsSummary = [
    { quarter: "Q1 2024", minor: 2, major: 0, critical: 0, resolved: 2 },
    { quarter: "Q2 2024", minor: 1, major: 1, critical: 0, resolved: 2 },
    { quarter: "Q3 2024", minor: 3, major: 0, critical: 1, resolved: 3 },
    { quarter: "Q4 2024", minor: 1, major: 0, critical: 0, resolved: 1 },
  ];

  // Risk assessment data
  const riskAssessmentData = [
    { area: "Data Privacy", score: 85 },
    { area: "Financial Reporting", score: 92 },
    { area: "Anti-Money Laundering", score: 75 },
    { area: "Market Conduct", score: 88 },
    { area: "Operational Risk", score: 78 },
  ];

  // Risk assessment details
  const riskAssessmentDetails = [
    { area: "Data Privacy", riskLevel: "Low", score: 85, trend: "Improving" },
    { area: "Financial Reporting", riskLevel: "Low", score: 92, trend: "Stable" },
    { area: "Anti-Money Laundering", riskLevel: "Medium", score: 75, trend: "Under Review" },
    { area: "Market Conduct", riskLevel: "Low", score: 88, trend: "Stable" },
    { area: "Operational Risk", riskLevel: "Medium", score: 78, trend: "Improving" },
  ];

  // Recent audit results
  const auditResults = [
    { date: "2024-09-15", auditor: "PwC", scope: "MiFID II Compliance", result: "Pass", findings: 2 },
    { date: "2024-08-20", auditor: "KPMG", scope: "Data Protection", result: "Pass", findings: 1 },
    { date: "2024-07-10", auditor: "EY", scope: "AML Procedures", result: "Pass with Conditions", findings: 4 },
    { date: "2024-06-05", auditor: "Deloitte", scope: "Risk Management", result: "Pass", findings: 0 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Compliance Trend Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Trend Over Time</CardTitle>
                <CardDescription>6-month compliance status progression</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={complianceTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <Area type="monotone" dataKey="compliant" stackId="1" stroke="#10b981" fill="#10b981" name="Compliant %" />
                      <Area type="monotone" dataKey="underReview" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Under Review %" />
                      <Area type="monotone" dataKey="actionRequired" stackId="1" stroke="#ef4444" fill="#ef4444" name="Action Required %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Current Status Distribution and Risk Level Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Compliant</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">4 regulations</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Under Review</span>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">1 regulation</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Action Required</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">1 regulation</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Level Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Low Risk</span>
                      <span className="font-semibold text-green-600">4 areas</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Medium Risk</span>
                      <span className="font-semibold text-orange-600">1 area</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">High Risk</span>
                      <span className="font-semibold text-red-600">1 area</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "regulations":
        return (
          <div className="space-y-6">
            {/* Regulatory Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance Status</CardTitle>
                <CardDescription>Current status of all monitored regulations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Regulation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Review</TableHead>
                      <TableHead>Next Review</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {regulatoryStatusData.map((reg, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{reg.regulation}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={
                              reg.status === "Compliant" ? "bg-blue-100 text-blue-800" :
                              reg.status === "Under Review" ? "bg-gray-100 text-gray-800" :
                              "bg-red-100 text-red-800"
                            }
                          >
                            {reg.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{reg.lastReview}</TableCell>
                        <TableCell>{reg.nextReview}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={
                              reg.riskLevel === "Low" ? "bg-green-100 text-green-800" :
                              reg.riskLevel === "Medium" ? "bg-orange-100 text-orange-800" :
                              "bg-red-100 text-red-800"
                            }
                          >
                            {reg.riskLevel}
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

      case "violations":
        return (
          <div className="space-y-6">
            {/* Violations by Quarter */}
            <Card>
              <CardHeader>
                <CardTitle>Violations by Quarter</CardTitle>
                <CardDescription>Breakdown of violations by severity level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={violationsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <Bar dataKey="minor" fill="#f59e0b" name="Minor" />
                      <Bar dataKey="major" fill="#ef4444" name="Major" />
                      <Bar dataKey="critical" fill="#dc2626" name="Critical" />
                      <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Violations Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Violations Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quarter</TableHead>
                      <TableHead>Minor</TableHead>
                      <TableHead>Major</TableHead>
                      <TableHead>Critical</TableHead>
                      <TableHead>Resolved</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {violationsSummary.map((violation, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{violation.quarter}</TableCell>
                        <TableCell>{violation.minor}</TableCell>
                        <TableCell>{violation.major}</TableCell>
                        <TableCell>{violation.critical}</TableCell>
                        <TableCell>{violation.resolved}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "risk-assessment":
        return (
          <div className="space-y-6">
            {/* Risk Assessment by Area */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment by Area</CardTitle>
                <CardDescription>Current risk levels across different compliance areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskAssessmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="area" stroke="hsl(var(--muted-foreground))" />
                      <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <Bar dataKey="score" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Area</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riskAssessmentDetails.map((risk, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{risk.area}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={
                              risk.riskLevel === "Low" ? "bg-green-100 text-green-800" :
                              risk.riskLevel === "Medium" ? "bg-orange-100 text-orange-800" :
                              "bg-red-100 text-red-800"
                            }
                          >
                            {risk.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>{risk.score}</TableCell>
                        <TableCell>{risk.trend}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "audit-results":
        return (
          <div className="space-y-6">
            {/* Recent Audit Results */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Audit Results</CardTitle>
                <CardDescription>External audit findings and outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Auditor</TableHead>
                      <TableHead>Scope</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Findings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditResults.map((audit, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{audit.date}</TableCell>
                        <TableCell>{audit.auditor}</TableCell>
                        <TableCell>{audit.scope}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={
                              audit.result === "Pass" ? "bg-blue-100 text-blue-800" :
                              "bg-gray-100 text-gray-800"
                            }
                          >
                            {audit.result}
                          </Badge>
                        </TableCell>
                        <TableCell>{audit.findings}</TableCell>
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
              <h1 className="text-4xl font-bold mb-2">Regulatory Compliance Dashboard</h1>
              <p className="text-muted-foreground">Monitor compliance status, risk assessment, and regulatory obligations</p>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>Created: 2024-01-15</span>
                <span>Last Updated: 2024-09-23</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Real-time</Button>
              <Button variant="outline" size="sm">Risk Monitoring</Button>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="regulations">Regulations</TabsTrigger>
              <TabsTrigger value="violations">Violations</TabsTrigger>
              <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
              <TabsTrigger value="audit-results">Audit Results</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Compliance Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-xs text-muted-foreground">+2% from last month</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Action Required</p>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-xs text-muted-foreground">FATCA compliance</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Violations</p>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground">All resolved</p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next Review</p>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-xs text-muted-foreground">days (FATCA)</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
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

