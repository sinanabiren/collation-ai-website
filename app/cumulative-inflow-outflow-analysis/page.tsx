'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, BarChart3, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function CumulativeInflowOutflowAnalysisPage() {
  const router = useRouter();
  const [selectedView, setSelectedView] = useState("cash-flow");

  const summaryData = {
    totalInflows: 40.9,
    inflowGrowthRate: 12.5,
    totalOutflows: 17.8,
    outflowRedemptionRate: 3.2,
    netInflows: 23.1,
    netFlowRate: 56.5,
    avgMonthly: 4.5
  };

  // Cumulative cash flow data
  const cumulativeCashFlowData = [
    { month: "2024-01", monthlyInflows: 4.2, monthlyOutflows: 1.8, cumulativeNetFlow: 2.4 },
    { month: "2024-02", monthlyInflows: 3.8, monthlyOutflows: 2.2, cumulativeNetFlow: 4.0 },
    { month: "2024-03", monthlyInflows: 4.5, monthlyOutflows: 1.5, cumulativeNetFlow: 7.0 },
    { month: "2024-04", monthlyInflows: 5.2, monthlyOutflows: 3.0, cumulativeNetFlow: 9.2 },
    { month: "2024-05", monthlyInflows: 4.8, monthlyOutflows: 1.8, cumulativeNetFlow: 12.2 },
    { month: "2024-06", monthlyInflows: 5.4, monthlyOutflows: 2.5, cumulativeNetFlow: 15.1 },
    { month: "2024-07", monthlyInflows: 4.6, monthlyOutflows: 2.0, cumulativeNetFlow: 17.7 },
    { month: "2024-08", monthlyInflows: 5.1, monthlyOutflows: 1.9, cumulativeNetFlow: 20.9 },
    { month: "2024-09", monthlyInflows: 4.8, monthlyOutflows: 1.1, cumulativeNetFlow: 24.6 }
  ];

  // Monthly net flow trends
  const monthlyNetFlowData = [
    { month: "2024-01", netFlow: 3.4 },
    { month: "2024-02", netFlow: 1.6 },
    { month: "2024-03", netFlow: 3.0 },
    { month: "2024-04", netFlow: 1.2 },
    { month: "2024-05", netFlow: 3.6 },
    { month: "2024-06", netFlow: 1.9 },
    { month: "2024-07", netFlow: 2.6 },
    { month: "2024-08", netFlow: 3.5 },
    { month: "2024-09", netFlow: 1.9 }
  ];

  // Inflow sources data
  const inflowSourcesData = [
    { source: "Institutional Investors", amount: 18.5, percentage: 45.2 },
    { source: "High Net Worth", amount: 12.8, percentage: 31.3 },
    { source: "Corporate Treasury", amount: 6.2, percentage: 15.1 },
    { source: "Pension Funds", amount: 2.1, percentage: 5.1 },
    { source: "Endowments", amount: 1.3, percentage: 3.2 }
  ];

  // Outflow analysis data (redemption reasons)
  const outflowAnalysisData = [
    { category: "Liquidity Needs", amount: 6.8, percentage: 42.1 },
    { category: "Rebalancing", amount: 4.2, percentage: 26.0 },
    { category: "Tax Planning", amount: 2.9, percentage: 18.0 },
    { category: "Strategic Exit", amount: 1.5, percentage: 9.3 },
    { category: "Emergency", amount: 0.8, percentage: 4.6 }
  ];

  // Quarterly trends data
  const quarterlyTrendsData = [
    { quarter: "Q1 2024", inflows: 12.5, outflows: 5.5, netFlow: 7.0 },
    { quarter: "Q2 2024", inflows: 15.4, outflows: 7.3, netFlow: 8.1 },
    { quarter: "Q3 2024", inflows: 14.5, outflows: 5.0, netFlow: 9.5 },
    { quarter: "Q4 2024", inflows: 13.8, outflows: 4.8, netFlow: 9.0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => router.push(-1)} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Reports Gallery
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Cumulative Inflow/Outflow Analysis</h1>
            <div className="flex gap-2">
              <Button variant={selectedView === "cash-flow" ? "default" : "outline"} size="sm" onClick={() => setSelectedView("cash-flow")}>
                Cash Flow
              </Button>
              <Button variant={selectedView === "cumulative" ? "default" : "outline"} size="sm" onClick={() => setSelectedView("cumulative")}>
                Cumulative
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Detailed cash flow analysis tracking all investment inflows and outflows
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Inflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryData.totalInflows}M</div>
              <p className="text-sm text-muted-foreground">+{summaryData.inflowGrowthRate}% growth rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Total Outflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryData.totalOutflows}M</div>
              <p className="text-sm text-muted-foreground">{summaryData.outflowRedemptionRate}% redemption rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Net Inflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${summaryData.netInflows}M</div>
              <p className="text-sm text-muted-foreground">{summaryData.netFlowRate}% net flow rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Avg Monthly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryData.avgMonthly}M</div>
              <p className="text-sm text-muted-foreground">inflow per month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sources">Inflow Sources</TabsTrigger>
            <TabsTrigger value="analysis">Outflow Analysis</TabsTrigger>
            <TabsTrigger value="trends">Quarterly Trends</TabsTrigger>
            <TabsTrigger value="metrics">Flow Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Cumulative Cash Flow Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Cumulative Cash Flow Analysis
                  <Badge variant="outline" className="ml-2">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    0
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">Monthly inflows, outflows, and cumulative net flows</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={cumulativeCashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, ""]} />
                    <Area type="monotone" dataKey="monthlyInflows" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="monthlyOutflows" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="cumulativeNetFlow" stackId="3" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Monthly Inflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Monthly Outflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm">Cumulative Net Flow</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Net Flow Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Net Flow Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyNetFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, "Net Flow"]} />
                    <Bar dataKey="netFlow" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inflow Source Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Breakdown of capital sources and contribution patterns</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={inflowSourcesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, ""]} />
                    <Bar dataKey="amount" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Source Contribution Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Source</th>
                        <th className="text-left py-3 px-4">Total Inflows</th>
                        <th className="text-left py-3 px-4">Percentage</th>
                        <th className="text-left py-3 px-4">Transactions</th>
                        <th className="text-left py-3 px-4">Avg Ticket Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Institutional Investors</td>
                        <td className="py-3 px-4 font-semibold">$18.5M</td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">45.2%</span>
                        </td>
                        <td className="py-3 px-4">12</td>
                        <td className="py-3 px-4">$1.54M</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">High Net Worth</td>
                        <td className="py-3 px-4 font-semibold">$12.8M</td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">31.3%</span>
                        </td>
                        <td className="py-3 px-4">28</td>
                        <td className="py-3 px-4">$0.46M</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Corporate Treasury</td>
                        <td className="py-3 px-4 font-semibold">$6.2M</td>
                        <td className="py-3 px-4">15.1%</td>
                        <td className="py-3 px-4">8</td>
                        <td className="py-3 px-4">$0.78M</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Pension Funds</td>
                        <td className="py-3 px-4 font-semibold">$2.1M</td>
                        <td className="py-3 px-4">5.1%</td>
                        <td className="py-3 px-4">4</td>
                        <td className="py-3 px-4">$0.53M</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Endowments</td>
                        <td className="py-3 px-4 font-semibold">$1.3M</td>
                        <td className="py-3 px-4">3.2%</td>
                        <td className="py-3 px-4">6</td>
                        <td className="py-3 px-4">$0.22M</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Outflow Reason Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Understanding redemption patterns and motivations</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={outflowAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Redemption Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Reason</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Percentage</th>
                        <th className="text-left py-3 px-4">Frequency</th>
                        <th className="text-left py-3 px-4">Avg Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Liquidity Needs</td>
                        <td className="py-3 px-4 font-semibold">$6.8M</td>
                        <td className="py-3 px-4">
                          <span className="bg-destructive/10 text-destructive px-2 py-1 rounded text-sm">42.1%</span>
                        </td>
                        <td className="py-3 px-4">15</td>
                        <td className="py-3 px-4">$0.45M</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Rebalancing</td>
                        <td className="py-3 px-4 font-semibold">$4.2M</td>
                        <td className="py-3 px-4">
                          <span className="bg-destructive/10 text-destructive px-2 py-1 rounded text-sm">26%</span>
                        </td>
                        <td className="py-3 px-4">8</td>
                        <td className="py-3 px-4">$0.53M</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Tax Planning</td>
                        <td className="py-3 px-4 font-semibold">$2.9M</td>
                        <td className="py-3 px-4">18%</td>
                        <td className="py-3 px-4">12</td>
                        <td className="py-3 px-4">$0.24M</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Strategic Exit</td>
                        <td className="py-3 px-4 font-semibold">$1.5M</td>
                        <td className="py-3 px-4">9.3%</td>
                        <td className="py-3 px-4">3</td>
                        <td className="py-3 px-4">$0.50M</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Emergency</td>
                        <td className="py-3 px-4 font-semibold">$0.8M</td>
                        <td className="py-3 px-4">4.6%</td>
                        <td className="py-3 px-4">2</td>
                        <td className="py-3 px-4">$0.38M</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Flow Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Quarterly comparison of inflows, outflows, and net flows</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={quarterlyTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, ""]} />
                    <Bar dataKey="inflows" fill="#22c55e" name="Inflows" />
                    <Bar dataKey="outflows" fill="#ef4444" name="Outflows" />
                    <Bar dataKey="netFlow" fill="#3b82f6" name="Net Flow" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Inflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Outflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Net Flow</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Flow Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Net Inflows</span>
                      <span className="font-bold text-green-600">$23.1M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Inflow Growth Rate</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Redemption Rate</span>
                      <span className="text-muted-foreground">3.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Peak Monthly Inflow</span>
                      <span className="text-muted-foreground">$6.2M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Peak Monthly Outflow</span>
                      <span className="text-muted-foreground">$2.4M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Flow Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Avg Monthly Inflow</span>
                      <span className="font-bold text-green-600">$4.5M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Avg Monthly Outflow</span>
                      <span className="font-bold text-red-600">$2.0M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Flow Ratio</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">2.3:1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Net Flow Rate</span>
                      <span className="font-bold text-blue-600">56.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Flow Volatility</span>
                      <span className="text-muted-foreground">Low</span>
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
};

