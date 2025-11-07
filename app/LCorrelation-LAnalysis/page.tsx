'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function CorrelationAnalysisPage() => {
  // Sample correlation matrix data
  const correlationMatrix = [
    { asset: 'Fund A', fundA: 1.00, fundB: 0.85, fundC: 0.40, index: 0.70 },
    { asset: 'Fund B', fundA: 0.85, fundB: 1.00, fundC: 0.50, index: 0.60 },
    { asset: 'Fund C', fundA: 0.40, fundB: 0.50, fundC: 1.00, index: 0.30 },
    { asset: 'Index', fundA: 0.70, fundB: 0.60, fundC: 0.30, index: 1.00 },
  ];

  const getCorrelationColor = (value: number) => {
    if (value === 1.00) return 'bg-primary text-primary-foreground';
    if (value >= 0.80) return 'bg-blue-600 text-white';
    if (value >= 0.60) return 'bg-blue-500 text-white';
    if (value >= 0.40) return 'bg-blue-400 text-white';
    if (value >= 0.20) return 'bg-blue-300';
    return 'bg-blue-200';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Correlation Analysis</h1>
              <p className="text-muted-foreground mt-2">Interactive dashboard with sample data.</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Created: 2024-01-25</div>
              <div>Last Updated: 2024-09-23</div>
            </div>
          </div>
          
          <Tabs defaultValue="correlation" className="mt-6">
            <TabsList>
              <TabsTrigger value="correlation">Correlation</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="correlation">
          <TabsContent value="correlation" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Correlation Analysis Preview
                    <Badge variant="secondary">Live Data</Badge>
                  </CardTitle>
                  <CardDescription>
                    Visual preview of the correlation analysis dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Correlation Matrix */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Correlation Matrix</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="p-3 text-left border"></th>
                              <th className="p-3 text-center border bg-muted">Fund A</th>
                              <th className="p-3 text-center border bg-muted">Fund B</th>
                              <th className="p-3 text-center border bg-muted">Fund C</th>
                              <th className="p-3 text-center border bg-muted">Index</th>
                            </tr>
                          </thead>
                          <tbody>
                            {correlationMatrix.map((row) => (
                              <tr key={row.asset}>
                                <td className="p-3 font-medium border bg-muted">{row.asset}</td>
                                <td className={`p-3 text-center border ${getCorrelationColor(row.fundA)}`}>
                                  {row.fundA.toFixed(2)}
                                </td>
                                <td className={`p-3 text-center border ${getCorrelationColor(row.fundB)}`}>
                                  {row.fundB.toFixed(2)}
                                </td>
                                <td className={`p-3 text-center border ${getCorrelationColor(row.fundC)}`}>
                                  {row.fundC.toFixed(2)}
                                </td>
                                <td className={`p-3 text-center border ${getCorrelationColor(row.index)}`}>
                                  {row.index.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-primary">0.85</div>
                          <p className="text-sm text-muted-foreground">Highest Correlation</p>
                          <p className="text-xs text-muted-foreground">Fund A vs Fund B</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">0.30</div>
                          <p className="text-sm text-muted-foreground">Lowest Correlation</p>
                          <p className="text-xs text-muted-foreground">Fund C vs Index</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">0.56</div>
                          <p className="text-sm text-muted-foreground">Average Correlation</p>
                          <p className="text-xs text-muted-foreground">Portfolio Average</p>
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
                <CardTitle>Correlation Risk Assessment</CardTitle>
                <CardDescription>Analysis of portfolio correlation risks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Diversification Level</span>
                    <Badge variant="secondary">Moderate</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Concentration Risk</span>
                    <Badge variant="outline">Medium</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <span className="font-medium">Market Correlation</span>
                    <Badge variant="default">0.53 Average</Badge>
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
                  Preview of the correlation analysis dashboard showing correlation matrix between funds and indices.
                </p>
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src="/assets/correlation-analysis-preview.png" 
                    alt="Correlation Analysis Dashboard Preview" 
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

