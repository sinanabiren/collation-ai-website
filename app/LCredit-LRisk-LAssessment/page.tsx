'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreditRiskAssessmentPage() => {
  const exposureData = [
    { rating: "AAA", exposure: 12 },
    { rating: "AA", exposure: 19 },
    { rating: "A", exposure: 28 },
    { rating: "BBB", exposure: 22 },
    { rating: "BB", exposure: 13 },
    { rating: "B", exposure: 5 },
    { rating: "CCC", exposure: 1 }
  ];

  const pdTrendData = [
    { month: "2024-01", pd: 0.35 },
    { month: "2024-02", pd: 0.42 },
    { month: "2024-03", pd: 0.38 },
    { month: "2024-04", pd: 0.45 },
    { month: "2024-05", pd: 0.52 },
    { month: "2024-06", pd: 0.48 }
  ];

  const chartConfig = {
    exposure: {
      label: "Exposure (%)",
      color: "hsl(var(--chart-1))",
    },
    pd: {
      label: "PD (%)",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/build-report"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reports Gallery
          </Link>
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Credit Risk Assessment</h1>
          <p className="text-muted-foreground">Interactive dashboard with sample data.</p>
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <span>Created Today</span>
            <span>•</span>
            <span>Last updated: Just now</span>
          </div>
        </div>

        <Tabs defaultValue="credit-risk" className="space-y-4">
          <TabsList>
            <TabsTrigger value="credit-risk">Credit Risk</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="credit-risk" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exposure by Rating</CardTitle>
                  <CardDescription>Portfolio exposure across credit ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={exposureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rating" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="exposure" fill="var(--color-exposure)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Portfolio PD Trend</CardTitle>
                  <CardDescription>Probability of default over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pdTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="pd" stroke="var(--color-pd)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">28%</div>
                  <p className="text-xs text-muted-foreground">Investment Grade</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">0.48%</div>
                  <p className="text-xs text-muted-foreground">Portfolio PD</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">BBB+</div>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">2.3</div>
                  <p className="text-xs text-muted-foreground">Credit Score</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assessment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Credit Risk Assessment</CardTitle>
                <CardDescription>Current portfolio credit risk evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Credit Quality</span>
                  <Badge variant="secondary">Investment Grade</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Concentration Risk</span>
                  <Badge variant="outline">Moderate</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Default Risk</span>
                  <Badge variant="destructive">Low</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Credit Outlook</span>
                  <Badge variant="default">Stable</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Credit Risk Assessment Preview</CardTitle>
                <CardDescription>Visual preview of the credit risk assessment dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src="/assets/credit-risk-assessment-preview.png" 
                  alt="Credit Risk Assessment Dashboard Preview" 
                  className="w-full h-auto rounded-lg border"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

