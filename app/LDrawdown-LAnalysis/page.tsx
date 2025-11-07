'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function DrawdownAnalysisPage() => {
  // Sample data for portfolio NAV
  const navData = [
    { month: '2024-01', nav: 118 },
    { month: '2024-02', nav: 115 },
    { month: '2024-03', nav: 112 },
    { month: '2024-04', nav: 108 },
    { month: '2024-05', nav: 105 },
    { month: '2024-06', nav: 102 },
    { month: '2024-07', nav: 98 },
    { month: '2024-08', nav: 95 },
  ];

  // Sample drawdown data
  const drawdownData = [
    { month: '2024-01', drawdown: 0 },
    { month: '2024-02', drawdown: -2.5 },
    { month: '2024-03', drawdown: -3.8 },
    { month: '2024-04', drawdown: -4.2 },
    { month: '2024-05', drawdown: -5.1 },
    { month: '2024-06', drawdown: -6.2 },
    { month: '2024-07', drawdown: -7.1 },
    { month: '2024-08', drawdown: -8.0 },
  ];

  const chartConfig = {
    nav: {
      label: "Portfolio NAV",
      color: "hsl(var(--primary))",
    },
    drawdown: {
      label: "Drawdown %",
      color: "hsl(var(--destructive))",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Drawdown Analysis</h1>
              <p className="text-muted-foreground mt-2">Interactive dashboard with sample data.</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Created: 2024-02-05</div>
              <div>Last Updated: 2024-09-23</div>
            </div>
          </div>
          
          <Tabs defaultValue="drawdown" className="mt-6">
            <TabsList>
              <TabsTrigger value="drawdown">Drawdown</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="drawdown">
          <TabsContent value="drawdown" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Drawdown Analysis Preview
                    <Badge variant="secondary">Live Data</Badge>
                  </CardTitle>
                  <CardDescription>
                    Visual preview of the drawdown analysis dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Portfolio NAV Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Portfolio NAV</h3>
                        <ChartContainer config={chartConfig} className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={navData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis 
                                dataKey="month" 
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                              />
                              <YAxis 
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                domain={[90, 120]}
                              />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Line 
                                type="monotone" 
                                dataKey="nav" 
                                stroke="var(--color-nav)"
                                strokeWidth={2}
                                dot={{ fill: "var(--color-nav)", r: 3 }}
                                name="NAV"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>

                      {/* Drawdown Chart */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Drawdown (%)</h3>
                        <ChartContainer config={chartConfig} className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={drawdownData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis 
                                dataKey="month" 
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                              />
                              <YAxis 
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                domain={[-10, 0]}
                              />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Area 
                                type="monotone" 
                                dataKey="drawdown" 
                                stroke="var(--color-drawdown)"
                                fill="var(--color-drawdown)"
                                fillOpacity={0.3}
                                strokeWidth={2}
                                name="Drawdown %"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-destructive">-8.0%</div>
                          <p className="text-sm text-muted-foreground">Max Drawdown</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">95</div>
                          <p className="text-sm text-muted-foreground">Current NAV</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">8</div>
                          <p className="text-sm text-muted-foreground">Drawdown Months</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">-4.5%</div>
                          <p className="text-sm text-muted-foreground">Avg Drawdown</p>
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
                <CardTitle>Drawdown Risk Assessment</CardTitle>
                <CardDescription>Analysis of portfolio drawdown patterns and risks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Drawdown Severity</span>
                    <Badge variant="destructive">High</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Recovery Outlook</span>
                    <Badge variant="secondary">Monitoring</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Risk Level</span>
                    <Badge variant="outline">Elevated</Badge>
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
                  Preview of the drawdown analysis dashboard showing portfolio NAV decline and drawdown patterns.
                </p>
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src="/assets/drawdown-analysis-preview.png" 
                    alt="Drawdown Analysis Dashboard Preview" 
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

