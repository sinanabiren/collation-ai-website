'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function SectorConcentrationRiskPage() {
  // Sample data for sector weights
  const sectorData = [
    { sector: 'Technology', weight: 22, limit: 25 },
    { sector: 'Healthcare', weight: 18, limit: 25 },
    { sector: 'Financials', weight: 24, limit: 25 },
    { sector: 'Energy', weight: 12, limit: 25 },
    { sector: 'Industrials', weight: 15, limit: 25 },
    { sector: 'Consumer', weight: 19, limit: 25 },
  ];

  const chartConfig = {
    weight: {
      label: "Weight (%)",
      color: "hsl(var(--primary))",
    },
    limit: {
      label: "Limit (%)",
      color: "hsl(var(--muted-foreground))",
    },
  };

  const getRiskLevel = (weight: number, limit: number) => {
    const ratio = weight / limit;
    if (ratio > 0.9) return { level: "High", variant: "destructive" as const };
    if (ratio > 0.7) return { level: "Medium", variant: "secondary" as const };
    return { level: "Low", variant: "outline" as const };
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Sector Concentration Risk</h1>
              <p className="text-muted-foreground mt-2">Interactive dashboard with sample data.</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Created: 2024-01-30</div>
              <div>Last Updated: 2024-09-23</div>
            </div>
          </div>
          
          <Tabs defaultValue="concentration" className="mt-6">
            <TabsList>
              <TabsTrigger value="concentration">Concentration</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="concentration">
          <TabsContent value="concentration" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Sector Concentration Risk Preview
                    <Badge variant="secondary">Live Data</Badge>
                  </CardTitle>
                  <CardDescription>
                    Visual preview of the sector concentration risk dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Sector Weights Chart */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Sector Weights vs Limit (25%)</h3>
                      <ChartContainer config={chartConfig} className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={sectorData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="sector" 
                              tick={{ fontSize: 12 }}
                              tickLine={false}
                              angle={-45}
                              textAnchor="end"
                              height={60}
                            />
                            <YAxis 
                              tick={{ fontSize: 12 }}
                              tickLine={false}
                              domain={[0, 30]}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar 
                              dataKey="weight" 
                              fill="var(--color-weight)"
                              name="Weight (%)"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>

                    {/* Sector Risk Table */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Sector Risk Analysis</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-3 text-left border">Sector</th>
                              <th className="p-3 text-center border">Current Weight</th>
                              <th className="p-3 text-center border">Limit</th>
                              <th className="p-3 text-center border">Utilization</th>
                              <th className="p-3 text-center border">Risk Level</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sectorData.map((sector) => {
                              const utilization = (sector.weight / sector.limit * 100).toFixed(0);
                              const risk = getRiskLevel(sector.weight, sector.limit);
                              
                              return (
                                <tr key={sector.sector}>
                                  <td className="p-3 border font-medium">{sector.sector}</td>
                                  <td className="p-3 text-center border">{sector.weight}%</td>
                                  <td className="p-3 text-center border">{sector.limit}%</td>
                                  <td className="p-3 text-center border">{utilization}%</td>
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
                          <div className="text-2xl font-bold text-primary">24%</div>
                          <p className="text-sm text-muted-foreground">Highest Concentration</p>
                          <p className="text-xs text-muted-foreground">Financials</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">96%</div>
                          <p className="text-sm text-muted-foreground">Max Utilization</p>
                          <p className="text-xs text-muted-foreground">Financials Sector</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">18.3%</div>
                          <p className="text-sm text-muted-foreground">Avg Weight</p>
                          <p className="text-xs text-muted-foreground">All Sectors</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">6</div>
                          <p className="text-sm text-muted-foreground">Total Sectors</p>
                          <p className="text-xs text-muted-foreground">Diversification</p>
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
                <CardTitle>Concentration Risk Assessment</CardTitle>
                <CardDescription>Analysis of sector concentration and related risks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Overall Concentration Risk</span>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Sector Diversification</span>
                    <Badge variant="outline">Good</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Limit Breach Risk</span>
                    <Badge variant="destructive">Financials Alert</Badge>
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
                  Preview of the sector concentration risk dashboard showing sector weights against limits.
                </p>
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src="/assets/sector-concentration-risk-preview.png" 
                    alt="Sector Concentration Risk Dashboard Preview" 
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

