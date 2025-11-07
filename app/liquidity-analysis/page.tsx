'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function LiquidityAnalysisPage() {
  // Sample data for liquidity buckets
  const liquidityData = [
    { bucket: 'T+1', percentage: 20, amount: 2000000 },
    { bucket: 'T+3', percentage: 26, amount: 2600000 },
    { bucket: 'T+7', percentage: 18, amount: 1800000 },
    { bucket: '30d+', percentage: 22, amount: 2200000 },
    { bucket: '>90d', percentage: 14, amount: 1400000 },
  ];

  const chartConfig = {
    percentage: {
      label: "Portfolio %",
      color: "hsl(var(--primary))",
    },
  };

  const getLiquidityRisk = (bucket: string) => {
    if (bucket === 'T+1' || bucket === 'T+3') return { level: "Low", variant: "outline" as const };
    if (bucket === 'T+7' || bucket === '30d+') return { level: "Medium", variant: "secondary" as const };
    return { level: "High", variant: "destructive" as const };
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Liquidity Analysis</h1>
              <p className="text-muted-foreground mt-2">Interactive dashboard with sample data.</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Created: 2024-02-10</div>
              <div>Last Updated: 2024-09-23</div>
            </div>
          </div>
          
          <Tabs defaultValue="liquidity" className="mt-6">
            <TabsList>
              <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="liquidity">
          <TabsContent value="liquidity" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Liquidity Analysis Preview
                    <Badge variant="secondary">Live Data</Badge>
                  </CardTitle>
                  <CardDescription>
                    Visual preview of the liquidity analysis dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Liquidity Buckets Chart */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Liquidity Buckets (% of portfolio)</h3>
                      <ChartContainer config={chartConfig} className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={liquidityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="bucket" 
                              tick={{ fontSize: 12 }}
                              tickLine={false}
                            />
                            <YAxis 
                              tick={{ fontSize: 12 }}
                              tickLine={false}
                              domain={[0, 30]}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar 
                              dataKey="percentage" 
                              fill="var(--color-percentage)"
                              name="Fund A"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>

                    {/* Liquidity Analysis Table */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Liquidity Breakdown</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-3 text-left border">Time Bucket</th>
                              <th className="p-3 text-center border">Portfolio %</th>
                              <th className="p-3 text-center border">Amount ($)</th>
                              <th className="p-3 text-center border">Liquidity Risk</th>
                            </tr>
                          </thead>
                          <tbody>
                            {liquidityData.map((item) => {
                              const risk = getLiquidityRisk(item.bucket);
                              
                              return (
                                <tr key={item.bucket}>
                                  <td className="p-3 border font-medium">{item.bucket}</td>
                                  <td className="p-3 text-center border">{item.percentage}%</td>
                                  <td className="p-3 text-center border">
                                    ${(item.amount / 1000000).toFixed(1)}M
                                  </td>
                                  <td className="p-3 text-center border">
                                    <Badge variant={risk.variant}>{risk.level}</Badge>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-primary">46%</div>
                          <p className="text-sm text-muted-foreground">Highly Liquid</p>
                          <p className="text-xs text-muted-foreground">T+1 & T+3</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">40%</div>
                          <p className="text-sm text-muted-foreground">Medium Liquidity</p>
                          <p className="text-xs text-muted-foreground">T+7 & 30d+</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-destructive">14%</div>
                          <p className="text-sm text-muted-foreground">Low Liquidity</p>
                          <p className="text-xs text-muted-foreground">&gt;90 days</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">$10M</div>
                          <p className="text-sm text-muted-foreground">Total Portfolio</p>
                          <p className="text-xs text-muted-foreground">All Buckets</p>
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
                <CardTitle>Liquidity Risk Assessment</CardTitle>
                <CardDescription>Analysis of portfolio liquidity risks and constraints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Overall Liquidity Risk</span>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Illiquid Holdings</span>
                    <Badge variant="destructive">14% Alert</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Redemption Capacity</span>
                    <Badge variant="outline">Good (46%)</Badge>
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
                  Preview of the liquidity analysis dashboard showing portfolio liquidity distribution across time buckets.
                </p>
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src="/assets/liquidity-analysis-preview.png" 
                    alt="Liquidity Analysis Dashboard Preview" 
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

