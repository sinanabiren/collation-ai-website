'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RiskAttributionAnalysisPage() {
  const riskFactorData = [
    { factor: "Market", contribution: 42 },
    { factor: "Size", contribution: 14 },
    { factor: "Value", contribution: 11 },
    { factor: "Momentum", contribution: 18 },
    { factor: "Quality", contribution: 9 }
  ];

  const chartConfig = {
    contribution: {
      label: "Contribution (%)",
      color: "hsl(var(--chart-1))",
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
          <h1 className="text-3xl font-bold">Risk Attribution Analysis</h1>
          <p className="text-muted-foreground">Interactive dashboard with sample data.</p>
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <span>Created Today</span>
            <span>•</span>
            <span>Last updated: Just now</span>
          </div>
        </div>

        <Tabs defaultValue="risk-attribution" className="space-y-4">
          <TabsList>
            <TabsTrigger value="risk-attribution">Risk Attribution</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="risk-attribution" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Contribution by Factor</CardTitle>
                <CardDescription>Portfolio risk attribution across different factors</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskFactorData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="factor" width={80} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="contribution" fill="var(--color-contribution)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">42%</div>
                  <p className="text-xs text-muted-foreground">Market Risk</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">18%</div>
                  <p className="text-xs text-muted-foreground">Momentum Factor</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">14%</div>
                  <p className="text-xs text-muted-foreground">Size Factor</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Active Factors</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Risk Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Market Factor</span>
                      <span className="text-sm font-medium">42.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Momentum Factor</span>
                      <span className="text-sm font-medium">18.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Size Factor</span>
                      <span className="text-sm font-medium">14.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Value Factor</span>
                      <span className="text-sm font-medium">11.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quality Factor</span>
                      <span className="text-sm font-medium">9.0%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Decomposition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Systematic Risk</span>
                      <span className="text-sm font-medium">76.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Idiosyncratic Risk</span>
                      <span className="text-sm font-medium">23.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Risk</span>
                      <span className="text-sm font-medium">4.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tracking Error</span>
                      <span className="text-sm font-medium">2.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Attribution Analysis</CardTitle>
                <CardDescription>Current portfolio risk attribution evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Factor Concentration</span>
                  <Badge variant="secondary">Market Heavy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Diversification</span>
                  <Badge variant="outline">Good</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active Risk</span>
                  <Badge variant="default">Moderate</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Factor Stability</span>
                  <Badge variant="destructive">Stable</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Risk Attribution Analysis Preview</CardTitle>
                <CardDescription>Visual preview of the risk attribution analysis dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src="/assets/risk-attribution-analysis-preview.png" 
                  alt="Risk Attribution Analysis Dashboard Preview" 
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

