'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function VolatilityAnalysisPage() {
  // Sample data for rolling volatility
  const volatilityData = [
    { month: '2024-01', volatility: 9.2 },
    { month: '2024-02', volatility: 10.1 },
    { month: '2024-03', volatility: 11.8 },
    { month: '2024-04', volatility: 10.5 },
    { month: '2024-05', volatility: 9.8 },
    { month: '2024-06', volatility: 10.3 },
  ];

  const chartConfig = {
    volatility: {
      label: "Volatility %",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Volatility Analysis</h1>
              <p className="text-muted-foreground mt-2">Interactive dashboard with sample data.</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Created: 2024-02-01</div>
              <div>Last Updated: 2024-09-23</div>
            </div>
          </div>
          
          <Tabs defaultValue="volatility" className="mt-6">
            <TabsList>
              <TabsTrigger value="volatility">Volatility</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="volatility">
          <TabsContent value="volatility" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Volatility Analysis Preview
                    <Badge variant="secondary">Live Data</Badge>
                  </CardTitle>
                  <CardDescription>
                    Visual preview of the volatility analysis dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Rolling Volatility Chart */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Rolling Volatility (annualized %)</h3>
                      <ChartContainer config={chartConfig} className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={volatilityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="month" 
                              tick={{ fontSize: 12 }}
                              tickLine={false}
                            />
                            <YAxis 
                              tick={{ fontSize: 12 }}
                              tickLine={false}
                              domain={[8, 13]}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line 
                              type="monotone" 
                              dataKey="volatility" 
                              stroke="var(--color-volatility)"
                              strokeWidth={2}
                              dot={{ fill: "var(--color-volatility)", r: 4 }}
                              name="Fund A"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-primary">10.3%</div>
                          <p className="text-sm text-muted-foreground">Current Volatility</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">11.8%</div>
                          <p className="text-sm text-muted-foreground">Peak Volatility</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">9.2%</div>
                          <p className="text-sm text-muted-foreground">Min Volatility</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">10.3%</div>
                          <p className="text-sm text-muted-foreground">Average Volatility</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Volatility-based risk analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Volatility Trend</span>
                    <Badge variant="secondary">Moderate</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Risk Level</span>
                    <Badge variant="outline">Medium</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Volatility Cluster</span>
                    <Badge variant="destructive">Detected</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Preview</CardTitle>
                <CardDescription>This dashboard is a static preview image, not interactive.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Preview of the volatility analysis dashboard showing rolling volatility trends over time.
                </p>
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src="/assets/volatility-analysis-preview.png" 
                    alt="Volatility Analysis Dashboard Preview" 
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

