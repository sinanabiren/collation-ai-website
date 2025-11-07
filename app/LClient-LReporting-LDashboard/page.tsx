'use client'

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Star, Calendar, FileText, Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navigation from "@/components/Navigation";
import {
  AreaChart,
  Area,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ClientReportingDashboardPage() => {
  // Client performance summary data
  const clientPerformanceData = [
    { client: "Pension Fund ABC", aum: "$485.2", performance: "8.4%", satisfaction: 95, lastReport: "2024-01-15" },
    { client: "Insurance Co XYZ", aum: "$324.8", performance: "7.2%", satisfaction: 92, lastReport: "2024-01-12" },
    { client: "Endowment Foundation", aum: "$275.6", performance: "9.1%", satisfaction: 96, lastReport: "2024-01-18" },
    { client: "Family Office Smith", aum: "$156.3", performance: "6.8%", satisfaction: 88, lastReport: "2024-01-10" },
    { client: "Sovereign Wealth", aum: "$742.1", performance: "8.9%", satisfaction: 94, lastReport: "2024-01-20" },
    { client: "Corporate Treasury", aum: "$198.4", performance: "5.9%", satisfaction: 87, lastReport: "2024-01-14" },
  ];

  // Communication activity data
  const communicationData = [
    { month: "Jan", meetings: 45, emails: 180, reports: 42, calls: 28 },
    { month: "Feb", meetings: 52, emails: 195, reports: 45, calls: 35 },
    { month: "Mar", meetings: 48, emails: 188, reports: 41, calls: 32 },
    { month: "Apr", meetings: 55, emails: 210, reports: 47, calls: 38 },
    { month: "May", meetings: 58, emails: 220, reports: 50, calls: 42 },
    { month: "Jun", meetings: 62, emails: 235, reports: 53, calls: 45 },
  ];

  // Report delivery status data for pie chart
  const reportDeliveryData = [
    { name: "On Time", value: 89, color: "#10b981" },
    { name: "Late", value: 8, color: "#f59e0b" },
    { name: "Pending", value: 3, color: "#ef4444" },
  ];

  // Communication metrics summary
  const communicationMetrics = [
    { metric: "Email Response Time", value: "2.3 hours", target: "< 4 hours", status: "On Target" },
    { metric: "Meeting Satisfaction", value: "94.2%", target: "> 90%", status: "Above Target" },
    { metric: "Report Accuracy", value: "99.1%", target: "> 98%", status: "Above Target" },
    { metric: "Client Retention", value: "96.8%", target: "> 95%", status: "Above Target" },
  ];

  // Recent client feedback
  const clientFeedback = [
    { client: "Pension Fund ABC", rating: 5, comment: "Excellent reporting quality and timely delivery", date: "2024-01-15" },
    { client: "Insurance Co XYZ", rating: 4, comment: "Good analysis, would like more frequent updates", date: "2024-01-12" },
    { client: "Endowment Foundation", rating: 5, comment: "Outstanding performance and communication", date: "2024-01-18" },
    { client: "Corporate Treasury", rating: 3, comment: "Reports are comprehensive but sometimes late", date: "2024-01-14" },
  ];

  // Upcoming report deadlines
  const upcomingDeadlines = [
    { type: "Monthly Performance", frequency: "Monthly", clients: 47, nextDue: "2024-02-28", status: "On Track" },
    { type: "Quarterly Review", frequency: "Quarterly", clients: 47, nextDue: "2024-04-15", status: "On Track" },
    { type: "Annual Report", frequency: "Annually", clients: 47, nextDue: "2024-12-31", status: "On Track" },
    { type: "ESG Impact Report", frequency: "Semi-Annual", clients: 22, nextDue: "2024-06-30", status: "On Track" },
    { type: "Risk Assessment", frequency: "Quarterly", clients: 47, nextDue: "2024-04-10", status: "Due Soon" },
    { type: "Benchmark Analysis", frequency: "Monthly", clients: 35, nextDue: "2024-02-25", status: "On Track" },
  ];

  // Client feedback scores by category
  const feedbackScores = [
    { category: "Report Quality", score: 4.7, comment: "Excellent detail and clarity", progress: 94 },
    { category: "Timeliness", score: 4.5, comment: "Always on schedule", progress: 90 },
    { category: "Customization", score: 4.8, comment: "Tailored to our needs", progress: 96 },
    { category: "Accessibility", score: 4.6, comment: "Easy to understand format", progress: 92 },
    { category: "Support", score: 4.9, comment: "Responsive and helpful", progress: 98 },
    { category: "Technology", score: 4.4, comment: "Great digital platform", progress: 88 },
  ];

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
              <h1 className="text-4xl font-bold mb-2">Client Reporting Dashboard</h1>
              <p className="text-muted-foreground">Monitor client communication, report delivery, and satisfaction metrics</p>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>Created: 2024-02-01</span>
                <span>Last Updated: 2024-09-23</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Replicate
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-xs text-muted-foreground">+3 this month</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
                  <p className="text-2xl font-bold">94.5%</p>
                  <p className="text-xs text-muted-foreground">+1.2% vs last quarter</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-xs text-muted-foreground">42/47 reports</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reports</p>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-xs text-muted-foreground">Due soon: 0</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Performance Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Client Performance Summary</CardTitle>
            <CardDescription>Key metrics and satisfaction scores by client</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>AUM ($M)</TableHead>
                  <TableHead>Performance (%)</TableHead>
                  <TableHead>Satisfaction</TableHead>
                  <TableHead>Last Report</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientPerformanceData.map((client, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{client.client}</TableCell>
                    <TableCell>{client.aum}</TableCell>
                    <TableCell className={client.performance.startsWith('6') || client.performance.startsWith('5') ? 'text-red-600' : 'text-green-600'}>
                      {client.performance}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-blue-500 rounded-full" 
                            style={{ width: `${client.satisfaction}%` }}
                          />
                        </div>
                        <span className="text-sm">{client.satisfaction}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{client.lastReport}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Communication Activity and Report Delivery Status */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Communication Activity</CardTitle>
              <CardDescription>Monthly client communication metrics and satisfaction trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={communicationData}>
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
                    <Area type="monotone" dataKey="meetings" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Meetings" />
                    <Area type="monotone" dataKey="emails" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Emails" />
                    <Area type="monotone" dataKey="reports" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Reports" />
                    <Area type="monotone" dataKey="calls" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Calls" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Delivery Status</CardTitle>
              <CardDescription>Current status of report deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                    <PieChart data={reportDeliveryData} cx="50%" cy="50%" innerRadius={60} outerRadius={120}>
                      {reportDeliveryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </PieChart>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {reportDeliveryData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium">{item.name}: {item.value}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Metrics and Client Feedback Scores */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Communication Metrics</CardTitle>
              <CardDescription>Key performance indicators for client communication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communicationMetrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{metric.metric}</div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">Target: {metric.target}</div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {metric.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Feedback Scores</CardTitle>
              <CardDescription>Average satisfaction scores by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackScores.map((feedback, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{feedback.category}</div>
                        <div className="text-sm text-muted-foreground italic">"{feedback.comment}"</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{feedback.score}</div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                          {feedback.score >= 4.5 ? 'Excellent' : feedback.score >= 4.0 ? 'Good' : 'Fair'}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${feedback.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Report Schedule and Recent Client Feedback */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Report Schedule</CardTitle>
              <CardDescription>Schedule and status of upcoming client reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{schedule.type}</div>
                      <div className="text-sm text-muted-foreground">
                        Frequency: {schedule.frequency}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Clients: {schedule.clients}
                      </div>
                      <div className="text-sm font-semibold">Next Due: {schedule.nextDue}</div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={
                        schedule.status === "On Track" ? "bg-blue-100 text-blue-800" :
                        schedule.status === "Due Soon" ? "bg-orange-100 text-orange-800" :
                        "bg-green-100 text-green-800"
                      }
                    >
                      {schedule.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Client Feedback</CardTitle>
              <CardDescription>Latest client reviews and satisfaction scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientFeedback.map((feedback, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{feedback.client}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">{feedback.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Client Feedback Details */}
        <Card>
          <CardHeader>
            <CardTitle>Client Feedback Analysis</CardTitle>
            <CardDescription>Detailed feedback trends and improvement areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4.7</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-muted-foreground">Would Recommend</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

