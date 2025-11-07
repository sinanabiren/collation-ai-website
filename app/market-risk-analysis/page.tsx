'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MarketRiskAnalysisPage() {
  const varData = [
    { month: "2024-01", var: 3.2 },
    { month: "2024-02", var: 3.8 },
    { month: "2024-03", var: 3.5 },
    { month: "2024-04", var: 4.1 },
    { month: "2024-05", var: 3.9 },
    { month: "2024-06", var: 3.6 }
  ];

  const betaData = [
    { month: "2024-01", beta: 0.85 },
    { month: "2024-02", beta: 0.92 },
    { month: "2024-03", beta: 0.88 },
    { month: "2024-04", beta: 0.95 },
    { month: "2024-05", beta: 0.91 },
    { month: "2024-06", beta: 0.87 }
  ];

  const chartConfig = {
    var: {
      label: "VaR (%)",
      color: "hsl(var(--chart-1))",
    },
    beta: {
      label: "Beta",
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
          <h1 className="text-3xl font-bold">Market Risk Analysis</h1>
          <p className="text-muted-foreground">Interactive dashboard with sample data.</p>
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <span>Created Today</span>
            <span>•</span>
            <span>Last updated: Just now</span>
          </div>
        </div>

        <Tabs defaultValue="market-risk" className="space-y-4">
          <TabsList>
            <TabsTrigger value="market-risk">Market Risk</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="market-risk" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>VaR over Time</CardTitle>
                  <CardDescription>Value at Risk trend analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={varData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="var" stroke="var(--color-var)" fill="var(--color-var)" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Beta vs Index</CardTitle>
                  <CardDescription>Portfolio beta relative to market index</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={betaData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="beta" stroke="var(--color-beta)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">3.6%</div>
                  <p className="text-xs text-muted-foreground">Current VaR</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">0.87</div>
                  <p className="text-xs text-muted-foreground">Portfolio Beta</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">4.1%</div>
                  <p className="text-xs text-muted-foreground">Max VaR</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">Confidence Level</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Risk Analysis</CardTitle>
                <CardDescription>Current portfolio market risk evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Market Sensitivity</span>
                  <Badge variant="secondary">Moderate</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>VaR Level</span>
                  <Badge variant="outline">Acceptable</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Beta Stability</span>
                  <Badge variant="default">Stable</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Risk Outlook</span>
                  <Badge variant="destructive">Cautious</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Market Risk Analysis Preview</CardTitle>
                <CardDescription>Visual preview of the market risk analysis dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src="/assets/market-risk-analysis-preview.png" 
                  alt="Market Risk Analysis Dashboard Preview" 
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

