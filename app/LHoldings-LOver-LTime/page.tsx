'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar, TrendingUp, BarChart3, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function HoldingsOverTime() {
  const router = useRouter();

  const assetEvolutionData = [
    { quarter: "Q1 2022", equities: 40, fixedIncome: 25, alternatives: 15, cash: 20 },
    { quarter: "Q2 2022", equities: 42, fixedIncome: 23, alternatives: 17, cash: 18 },
    { quarter: "Q3 2022", equities: 45, fixedIncome: 22, alternatives: 18, cash: 15 },
    { quarter: "Q4 2022", equities: 48, fixedIncome: 20, alternatives: 20, cash: 12 },
    { quarter: "Q1 2023", equities: 50, fixedIncome: 19, alternatives: 21, cash: 10 },
    { quarter: "Q2 2023", equities: 52, fixedIncome: 18, alternatives: 22, cash: 8 },
    { quarter: "Q3 2023", equities: 55, fixedIncome: 17, alternatives: 23, cash: 5 },
    { quarter: "Q4 2023", equities: 58, fixedIncome: 16, alternatives: 24, cash: 2 }
  ];

  const marketCapData = [
    { quarter: "Q1 2022", largeCap: 45, midCap: 25, smallCap: 20, international: 10 },
    { quarter: "Q2 2022", largeCap: 47, midCap: 24, smallCap: 19, international: 10 },
    { quarter: "Q3 2022", largeCap: 48, midCap: 23, smallCap: 19, international: 10 },
    { quarter: "Q4 2022", largeCap: 50, midCap: 22, smallCap: 18, international: 10 },
    { quarter: "Q1 2023", largeCap: 52, midCap: 21, smallCap: 17, international: 10 },
    { quarter: "Q2 2023", largeCap: 53, midCap: 20, smallCap: 17, international: 10 },
    { quarter: "Q3 2023", largeCap: 55, midCap: 19, smallCap: 16, international: 10 },
    { quarter: "Q4 2023", largeCap: 56, midCap: 18, smallCap: 16, international: 10 }
  ];

  const sectorEvolutionData = [
    { quarter: "Q1 2022", technology: 18, healthcare: 12, financials: 15, consumer: 10, industrials: 8, other: 37 },
    { quarter: "Q2 2022", technology: 19, healthcare: 13, financials: 14, consumer: 11, industrials: 8, other: 35 },
    { quarter: "Q3 2022", technology: 21, healthcare: 13, financials: 13, consumer: 10, industrials: 8, other: 35 },
    { quarter: "Q4 2022", technology: 22, healthcare: 14, financials: 12, consumer: 10, industrials: 8, other: 34 },
    { quarter: "Q1 2023", technology: 23, healthcare: 14, financials: 12, consumer: 9, industrials: 8, other: 34 },
    { quarter: "Q2 2023", technology: 25, healthcare: 15, financials: 11, consumer: 9, industrials: 8, other: 32 },
    { quarter: "Q3 2023", technology: 26, healthcare: 15, financials: 10, consumer: 9, industrials: 8, other: 32 },
    { quarter: "Q4 2023", technology: 28, healthcare: 16, financials: 10, consumer: 8, industrials: 8, other: 30 }
  ];

  const performanceAttributionData = [
    { quarter: "Q1 2022", portfolio: 3.2, benchmark: 2.8, allocation: -0.1 },
    { quarter: "Q2 2022", portfolio: -5.8, benchmark: -6.2, allocation: 0.2 },
    { quarter: "Q3 2022", portfolio: -2.1, benchmark: -3.5, allocation: 0.8 },
    { quarter: "Q4 2022", portfolio: 8.5, benchmark: 7.8, allocation: 0.3 },
    { quarter: "Q1 2023", portfolio: 12.1, benchmark: 11.2, allocation: 0.5 },
    { quarter: "Q2 2023", portfolio: 6.8, benchmark: 6.1, allocation: 0.4 },
    { quarter: "Q3 2023", portfolio: 4.2, benchmark: 3.8, allocation: 0.2 },
    { quarter: "Q4 2023", portfolio: 9.8, benchmark: 8.9, allocation: 0.6 }
  ];

  const quarterlyPerformanceData = [
    { quarter: "Q1 2022", portfolio: 3.2, benchmark: 2.8, allocation: 0.1, selection: 0.5, alpha: 0.4 },
    { quarter: "Q2 2022", portfolio: -5.8, benchmark: -6.2, allocation: 0.2, selection: 0.2, alpha: 0.4 },
    { quarter: "Q3 2022", portfolio: -2.1, benchmark: -3.5, allocation: 0.8, selection: 0.6, alpha: 1.4 },
    { quarter: "Q4 2022", portfolio: 8.5, benchmark: 7.8, allocation: 0.3, selection: 0.4, alpha: 0.7 },
    { quarter: "Q1 2023", portfolio: 12.1, benchmark: 11.2, allocation: 0.5, selection: 0.4, alpha: 0.9 },
    { quarter: "Q2 2023", portfolio: 6.8, benchmark: 6.1, allocation: 0.4, selection: 0.3, alpha: 0.7 },
    { quarter: "Q3 2023", portfolio: 4.2, benchmark: 3.8, allocation: 0.2, selection: 0.2, alpha: 0.4 },
    { quarter: "Q4 2023", portfolio: 9.8, benchmark: 8.9, allocation: 0.6, selection: 0.3, alpha: 0.9 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/build-report')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Reports Gallery
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Allocation Over Time</h1>
          <p className="text-muted-foreground">Historical allocation trends with stacked bar charts and time series data</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Time Period</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8 Quarters</div>
              <p className="text-xs text-muted-foreground">Q1 2022 - Q4 2023</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Biggest Change</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+15%</div>
              <p className="text-xs text-muted-foreground">US Equities increase</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rebalancing Events</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Strategic adjustments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Allocation</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Optimized</div>
              <p className="text-xs text-muted-foreground">On target</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="asset-evolution" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="asset-evolution">Asset Evolution</TabsTrigger>
            <TabsTrigger value="sector-trends">Sector Trends</TabsTrigger>
            <TabsTrigger value="performance-impact">Performance Impact</TabsTrigger>
            <TabsTrigger value="allocation-changes">Allocation Changes</TabsTrigger>
          </TabsList>

          <TabsContent value="asset-evolution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Class Allocation Evolution</CardTitle>
                <CardDescription>Historical progression of asset class allocations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={assetEvolutionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Area 
                        type="monotone" 
                        dataKey="equities" 
                        stackId="1" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        name="Equities"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="fixedIncome" 
                        stackId="1" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        name="Fixed Income"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="alternatives" 
                        stackId="1" 
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                        name="Alternatives"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cash" 
                        stackId="1" 
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        name="Cash"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Cap Allocation Trends</CardTitle>
                <CardDescription>Evolution of market capitalization allocations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marketCapData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Area 
                        type="monotone" 
                        dataKey="largeCap" 
                        stackId="1" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        name="Large Cap"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="midCap" 
                        stackId="1" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        name="Mid Cap"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="smallCap" 
                        stackId="1" 
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                        name="Small Cap"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="international" 
                        stackId="1" 
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        name="International"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sector-trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sector Allocation Evolution</CardTitle>
                <CardDescription>Historical sector allocation changes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sectorEvolutionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Area 
                        type="monotone" 
                        dataKey="technology" 
                        stackId="1" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        name="Technology"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="healthcare" 
                        stackId="1" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        name="Healthcare"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="financials" 
                        stackId="1" 
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                        name="Financials"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="consumer" 
                        stackId="1" 
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        name="Consumer"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="industrials" 
                        stackId="1" 
                        stroke="#8b5cf6" 
                        fill="#8b5cf6" 
                        name="Industrials"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="other" 
                        stackId="1" 
                        stroke="#6b7280" 
                        fill="#6b7280" 
                        name="Other"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Trend Analysis</CardTitle>
                <CardDescription>Individual sector allocation trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sectorEvolutionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Line 
                        type="monotone" 
                        dataKey="technology" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Technology"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="healthcare" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Healthcare"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="financials" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Financials"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="consumer" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Consumer"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="industrials" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Industrials"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="other" 
                        stroke="#6b7280" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Other"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance-impact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Attribution Over Time</CardTitle>
                <CardDescription>Portfolio vs benchmark performance with allocation impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceAttributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip 
                        formatter={(value, name) => [
                          `${value}%`, 
                          name === 'portfolio' ? 'Portfolio' : name === 'benchmark' ? 'Benchmark' : 'Allocation Effect'
                        ]} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="portfolio" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Portfolio"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="benchmark" 
                        stroke="#6b7280" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                        name="Benchmark"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quarterly Performance Summary</CardTitle>
                <CardDescription>Performance metrics and attribution analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Quarter</th>
                        <th className="text-left p-2 font-medium">Portfolio Return</th>
                        <th className="text-left p-2 font-medium">Benchmark</th>
                        <th className="text-left p-2 font-medium">Allocation Effect</th>
                        <th className="text-left p-2 font-medium">Selection Effect</th>
                        <th className="text-left p-2 font-medium">Total Alpha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quarterlyPerformanceData.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{row.quarter}</td>
                          <td className={`p-2 font-medium ${row.portfolio > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {row.portfolio > 0 ? '+' : ''}{row.portfolio.toFixed(1)}%
                          </td>
                          <td className={`p-2 ${row.benchmark > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {row.benchmark > 0 ? '+' : ''}{row.benchmark.toFixed(1)}%
                          </td>
                          <td className="p-2 text-blue-600">+{row.allocation.toFixed(1)}%</td>
                          <td className="p-2 text-blue-600">+{row.selection.toFixed(1)}%</td>
                          <td className="p-2 font-medium text-green-600">+{row.alpha.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation-changes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Major Allocation Changes</CardTitle>
                <CardDescription>Significant allocation shifts and their rationale</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Asset Class</th>
                        <th className="text-left p-3 font-medium">Allocation Change</th>
                        <th className="text-left p-3 font-medium">Reason</th>
                        <th className="text-left p-3 font-medium">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">US Equities</td>
                        <td className="p-3 text-green-600 font-medium">+15%</td>
                        <td className="p-3">Market outperformance</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Positive</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">International Equities</td>
                        <td className="p-3 text-red-600 font-medium">-7%</td>
                        <td className="p-3">Underperformance</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800">Rebalancing</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Fixed Income</td>
                        <td className="p-3 text-red-600 font-medium">-10%</td>
                        <td className="p-3">Rising rates</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800">Risk reduction</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Alternatives</td>
                        <td className="p-3 text-green-600 font-medium">+6%</td>
                        <td className="p-3">Diversification</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Positive</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Cash</td>
                        <td className="p-3 text-red-600 font-medium">-4%</td>
                        <td className="p-3">Full investment</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800">Efficiency</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Allocation Strategy Summary</CardTitle>
                  <CardDescription>Key strategic moves over the period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Risk Reduction</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">✓ Completed</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Growth Tilt</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">✓ Implemented</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Diversification</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">✓ Enhanced</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cash Optimization</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">✓ Achieved</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Performance Impact</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">+2.8% Alpha</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Future Allocation Targets</CardTitle>
                  <CardDescription>Planned allocation adjustments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>US Equities</span>
                      <span className="font-medium">50% → 48%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>International Equities</span>
                      <span className="font-medium">15% → 18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Alternatives</span>
                      <span className="font-medium">18% → 22%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Fixed Income</span>
                      <span className="font-medium">15% → 12%</span>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center font-medium">
                        <span>Target Date</span>
                        <span>Q2 2024</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
