'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, DollarSign, TrendingUp, BarChart3, Calendar, Target, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from "recharts";

export default function InvestmentSummary() {
  const router = useRouter();

  const performanceData = [
    { month: "Jan", portfolioValue: 2120000, benchmark: 2100000, return: 2.1 },
    { month: "Feb", portfolioValue: 2180000, benchmark: 2140000, return: 2.8 },
    { month: "Mar", portfolioValue: 2250000, benchmark: 2200000, return: 3.2 },
    { month: "Apr", portfolioValue: 2320000, benchmark: 2260000, return: 3.1 },
    { month: "May", portfolioValue: 2400000, benchmark: 2340000, return: 3.4 },
    { month: "Jun", portfolioValue: 2450000, benchmark: 2380000, return: 2.1 }
  ];

  const assetAllocationData = [
    { category: "US Equities", current: 45, target: 50, variance: -5 },
    { category: "International Equities", current: 22, target: 20, variance: 2 },
    { category: "Fixed Income", current: 18, target: 20, variance: -2 },
    { category: "Alternatives", current: 12, target: 8, variance: 4 },
    { category: "Cash", current: 3, target: 2, variance: 1 }
  ];

  const riskMetrics = [
    { metric: "Sharpe Ratio", value: "1.42", benchmark: "1.18", status: "outperform" },
    { metric: "Volatility", value: "14.2%", benchmark: "16.8%", status: "outperform" },
    { metric: "Max Drawdown", value: "-8.3%", benchmark: "-12.1%", status: "outperform" },
    { metric: "Beta", value: "0.95", benchmark: "1.00", status: "neutral" },
    { metric: "Alpha", value: "2.8%", benchmark: "0.0%", status: "outperform" }
  ];

  const topPerformers = [
    { symbol: "NVDA", name: "NVIDIA Corporation", return: 28.7, contribution: 1.8 },
    { symbol: "TSLA", name: "Tesla Inc.", return: 22.1, contribution: 1.1 },
    { symbol: "META", name: "Meta Platforms", return: 18.6, contribution: 0.7 },
    { symbol: "MSFT", name: "Microsoft Corp", return: 15.2, contribution: 1.4 },
    { symbol: "AAPL", name: "Apple Inc.", return: 12.5, contribution: 1.3 }
  ];

  const rebalancingNeeds = [
    { category: "US Equities", action: "Buy", amount: 122500, urgency: "medium" },
    { category: "Fixed Income", action: "Buy", amount: 49000, urgency: "low" },
    { category: "Alternatives", action: "Sell", amount: 98000, urgency: "high" },
    { category: "Cash", action: "Sell", amount: 24500, urgency: "low" }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "outperform": return "text-green-600";
      case "underperform": return "text-red-600";
      default: return "text-muted-foreground";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Investment Summary</h1>
          <p className="text-muted-foreground">Comprehensive investment analysis with performance metrics, allocation, and rebalancing recommendations</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,450,000</div>
              <p className="text-xs text-muted-foreground">+2.1% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">YTD Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+15.7%</div>
              <p className="text-xs text-muted-foreground">vs benchmark +12.9%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Allocation Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">B+</div>
              <p className="text-xs text-muted-foreground">Minor rebalancing needed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Risk Level</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">Moderate</div>
              <p className="text-xs text-muted-foreground">14.2% volatility</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
            <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
            <TabsTrigger value="rebalancing">Rebalancing</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance Trend</CardTitle>
                <CardDescription>6-month portfolio value progression vs benchmark</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'return' ? `${value}%` : formatCurrency(value as number), 
                          name === 'portfolioValue' ? 'Portfolio Value' : name === 'benchmark' ? 'Benchmark Value' : 'Monthly Return'
                        ]} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="portfolioValue" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        name="portfolioValue"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="benchmark" 
                        stroke="#6b7280" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                        name="benchmark"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Returns</CardTitle>
                  <CardDescription>Portfolio monthly return percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Monthly Return']} />
                        <Bar dataKey="return" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Return</span>
                      <span className="font-medium text-green-600">+15.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Annualized Return</span>
                      <span className="font-medium">+12.4%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Best Month</span>
                      <span className="font-medium text-green-600">+3.4% (May)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Worst Month</span>
                      <span className="font-medium text-red-600">+2.1% (Jun)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Outperformance</span>
                      <span className="font-medium text-green-600">+2.8% vs benchmark</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation Analysis</CardTitle>
                <CardDescription>Current allocation vs target with variance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Asset Category</th>
                        <th className="text-left p-3 font-medium">Current %</th>
                        <th className="text-left p-3 font-medium">Target %</th>
                        <th className="text-left p-3 font-medium">Variance</th>
                        <th className="text-left p-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assetAllocationData.map((asset, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{asset.category}</td>
                          <td className="p-3">{asset.current}%</td>
                          <td className="p-3">{asset.target}%</td>
                          <td className={`p-3 font-medium ${asset.variance > 0 ? 'text-red-600' : asset.variance < 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {asset.variance > 0 ? '+' : ''}{asset.variance}%
                          </td>
                          <td className="p-3">
                            {Math.abs(asset.variance) <= 1 ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">On Target</Badge>
                            ) : Math.abs(asset.variance) <= 3 ? (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Minor Drift</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-red-100 text-red-800">Needs Rebalancing</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk-analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics Comparison</CardTitle>
                <CardDescription>Portfolio risk metrics vs benchmark</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Risk Metric</th>
                        <th className="text-left p-3 font-medium">Portfolio</th>
                        <th className="text-left p-3 font-medium">Benchmark</th>
                        <th className="text-left p-3 font-medium">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskMetrics.map((risk, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{risk.metric}</td>
                          <td className="p-3">{risk.value}</td>
                          <td className="p-3 text-muted-foreground">{risk.benchmark}</td>
                          <td className="p-3">
                            <Badge 
                              variant="secondary" 
                              className={
                                risk.status === 'outperform' ? 'bg-green-100 text-green-800' : 
                                risk.status === 'underperform' ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'
                              }
                            >
                              {risk.status === 'outperform' ? 'Outperform' : 
                               risk.status === 'underperform' ? 'Underperform' : 'Neutral'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Portfolio risk profile and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Risk Strengths</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Lower volatility than benchmark</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Strong risk-adjusted returns</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Controlled maximum drawdown</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Risk Considerations</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Technology sector concentration</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">International exposure below target</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="top-performers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Holdings</CardTitle>
                <CardDescription>Best performers by return and contribution to portfolio performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Symbol</th>
                        <th className="text-left p-3 font-medium">Company Name</th>
                        <th className="text-left p-3 font-medium">Return</th>
                        <th className="text-left p-3 font-medium">Portfolio Contribution</th>
                        <th className="text-left p-3 font-medium">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topPerformers.map((performer, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{performer.symbol}</td>
                          <td className="p-3">{performer.name}</td>
                          <td className="p-3 font-medium text-green-600">+{performer.return}%</td>
                          <td className="p-3 font-medium text-green-600">+{performer.contribution}%</td>
                          <td className="p-3">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Excellent
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rebalancing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rebalancing Recommendations</CardTitle>
                <CardDescription>Suggested portfolio adjustments to maintain target allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Asset Category</th>
                        <th className="text-left p-3 font-medium">Action</th>
                        <th className="text-left p-3 font-medium">Amount</th>
                        <th className="text-left p-3 font-medium">Urgency</th>
                        <th className="text-left p-3 font-medium">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rebalancingNeeds.map((rebal, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{rebal.category}</td>
                          <td className="p-3">
                            <Badge 
                              variant="secondary" 
                              className={rebal.action === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                            >
                              {rebal.action}
                            </Badge>
                          </td>
                          <td className="p-3 font-medium">{formatCurrency(rebal.amount)}</td>
                          <td className="p-3">
                            <Badge variant="secondary" className={getUrgencyColor(rebal.urgency)}>
                              {rebal.urgency.charAt(0).toUpperCase() + rebal.urgency.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {rebal.urgency === 'high' ? 'Significant drift' : 
                             rebal.urgency === 'medium' ? 'Moderate drift' : 'Minor adjustment'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rebalancing Summary</CardTitle>
                <CardDescription>Total rebalancing requirements and timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">$98,000</div>
                    <p className="text-sm text-muted-foreground">To Sell</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">$171,500</div>
                    <p className="text-sm text-muted-foreground">To Buy</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">7 Days</div>
                    <p className="text-sm text-muted-foreground">Recommended Timeline</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}