'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Layers, TrendingUp, PieChart as PieChartIcon, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function HoldingsDecomposition() {
  const router = useRouter();

  const assetClassData = [
    { name: "Equities", value: 65, color: "#ef4444" },
    { name: "Fixed Income", value: 20, color: "#10b981" },
    { name: "Alternatives", value: 10, color: "#3b82f6" },
    { name: "Cash & Equivalents", value: 5, color: "#8b5cf6" }
  ];

  const performanceByAssetClass = [
    { assetClass: "Equities", performance: 12.8 },
    { assetClass: "Fixed Income", performance: 4.2 },
    { assetClass: "Alternatives", performance: 16.5 },
    { assetClass: "Cash & Equivalents", performance: 2.1 }
  ];

  const assetClassSummary = [
    {
      assetClass: "Equities",
      allocation: "65%",
      marketValue: "$97.5M",
      ytdPerformance: "+12.8%",
      subClasses: 5
    },
    {
      assetClass: "Fixed Income",
      allocation: "20%",
      marketValue: "$30.0M",
      ytdPerformance: "+4.2%",
      subClasses: 5
    },
    {
      assetClass: "Alternatives",
      allocation: "10%",
      marketValue: "$15.0M",
      ytdPerformance: "+16.5%",
      subClasses: 4
    },
    {
      assetClass: "Cash & Equivalents",
      allocation: "5%",
      marketValue: "$7.5M",
      ytdPerformance: "+2.1%",
      subClasses: 2
    }
  ];

  const subAssetClassData = [
    {
      subAssetClass: "Private Equity",
      parentClass: "Alternatives",
      allocation: "4%",
      marketValue: "$6.0M",
      performance: "+22.3%"
    },
    {
      subAssetClass: "Growth Stocks",
      parentClass: "Equities",
      allocation: "4%",
      marketValue: "$6.0M",
      performance: "+22.1%"
    },
    {
      subAssetClass: "Emerging Markets",
      parentClass: "Equities",
      allocation: "10%",
      marketValue: "$15.0M",
      performance: "+18.6%"
    },
    {
      subAssetClass: "US Small Cap",
      parentClass: "Equities",
      allocation: "8%",
      marketValue: "$12.0M",
      performance: "+15.8%"
    },
    {
      subAssetClass: "Commodities",
      parentClass: "Alternatives",
      allocation: "1%",
      marketValue: "$1.5M",
      performance: "+15.2%"
    },
    {
      subAssetClass: "Hedge Funds",
      parentClass: "Alternatives",
      allocation: "3%",
      marketValue: "$4.5M",
      performance: "+12.1%"
    },
    {
      subAssetClass: "US Large Cap",
      parentClass: "Equities",
      allocation: "25%",
      marketValue: "$37.5M",
      performance: "+11.2%"
    },
    {
      subAssetClass: "International Developed",
      parentClass: "Equities",
      allocation: "18%",
      marketValue: "$27.0M",
      performance: "+9.4%"
    },
    {
      subAssetClass: "Corporate Bonds",
      parentClass: "Fixed Income",
      allocation: "6%",
      marketValue: "$9.0M",
      performance: "+4.8%"
    },
    {
      subAssetClass: "Government Bonds",
      parentClass: "Fixed Income",
      allocation: "8%",
      marketValue: "$12.0M",
      performance: "+3.1%"
    },
    {
      subAssetClass: "International Bonds",
      parentClass: "Fixed Income",
      allocation: "2%",
      marketValue: "$3.0M",
      performance: "+2.9%"
    },
    {
      subAssetClass: "Money Market",
      parentClass: "Cash & Equivalents",
      allocation: "3%",
      marketValue: "$4.5M",
      performance: "+2.3%"
    },
    {
      subAssetClass: "Treasury Bills",
      parentClass: "Fixed Income",
      allocation: "1%",
      marketValue: "$1.5M",
      performance: "+2.1%"
    },
    {
      subAssetClass: "Cash",
      parentClass: "Cash & Equivalents",
      allocation: "2%",
      marketValue: "$3.0M",
      performance: "+1.8%"
    }
  ];

  const performanceComparisonData = [
    { period: "1 Month", equities: "+2.1%", fixedIncome: "+0.3%", alternatives: "+3.2%", cash: "+0.2%" },
    { period: "3 Months", equities: "+6.8%", fixedIncome: "+1.1%", alternatives: "+8.9%", cash: "+0.6%" },
    { period: "6 Months", equities: "+12.8%", fixedIncome: "+2.1%", alternatives: "+16.5%", cash: "+1.2%" },
    { period: "1 Year", equities: "+18.4%", fixedIncome: "+4.2%", alternatives: "+24.1%", cash: "+2.1%" },
    { period: "3 Years", equities: "+45.2%", fixedIncome: "+12.8%", alternatives: "+58.9%", cash: "+6.5%" }
  ];

  const assetClassRiskMetrics = [
    { assetClass: "Equities", volatility: "16.8%", sharpeRatio: 1.12, maxDrawdown: "-12.5%", beta: 1.05 },
    { assetClass: "Fixed Income", volatility: "4.2%", sharpeRatio: 0.68, maxDrawdown: "-3.1%", beta: 0.15 },
    { assetClass: "Alternatives", volatility: "22.1%", sharpeRatio: 0.89, maxDrawdown: "-18.2%", beta: 0.75 },
    { assetClass: "Cash & Equivalents", volatility: "0.5%", sharpeRatio: 0.42, maxDrawdown: "0%", beta: 0.01 }
  ];

  const riskReturnData = [
    { assetClass: "Equities", risk: 16.8, return: 18.4 },
    { assetClass: "Fixed Income", risk: 4.2, return: 4.2 },
    { assetClass: "Alternatives", risk: 22.1, return: 24.1 },
    { assetClass: "Cash & Equivalents", risk: 0.5, return: 2.1 }
  ];

  const riskMetrics = [
    { metric: "Sharpe Ratio", value: "1.24", status: "Good" },
    { metric: "Volatility", value: "14.2%", status: "Moderate" },
    { metric: "Max Drawdown", value: "-8.5%", status: "Low" },
    { metric: "Beta", value: "0.89", status: "Conservative" }
  ];

  const getPerformanceBadgeColor = (performance: string) => {
    const value = parseFloat(performance.replace("+", "").replace("%", ""));
    if (value >= 15) return "bg-green-100 text-green-800 hover:bg-green-100";
    if (value >= 8) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    return "bg-red-100 text-red-800 hover:bg-red-100";
  };

  const getRiskStatusColor = (status: string) => {
    switch (status) {
      case "Good": case "Low": case "Conservative": 
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Moderate": 
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default: 
        return "bg-red-100 text-red-800 hover:bg-red-100";
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
          <h1 className="text-3xl font-bold tracking-tight">Asset Class & Sub-Asset Class</h1>
          <p className="text-muted-foreground">Detailed breakdown by asset classes and sub-categories with performance data</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Asset Classes</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Primary categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sub-Asset Classes</CardTitle>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">Sub-categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Best Performer</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Growth</div>
              <p className="text-xs text-muted-foreground">22.1% return</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$150M</div>
              <p className="text-xs text-muted-foreground">Portfolio value</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Asset Class Overview</TabsTrigger>
            <TabsTrigger value="sub-asset">Sub-Asset Classes</TabsTrigger>
            <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
            <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
            <TabsTrigger value="comprehensive">Comprehensive</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Class Allocation</CardTitle>
                  <CardDescription>Primary asset class distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetClassData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name} ${value}%`}
                        >
                          {assetClassData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance by Asset Class</CardTitle>
                  <CardDescription>YTD performance comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceByAssetClass}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="assetClass" 
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
                        <Bar dataKey="performance" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Asset Class Summary</CardTitle>
                <CardDescription>Detailed breakdown of primary asset classes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset Class</TableHead>
                      <TableHead className="text-right">Allocation</TableHead>
                      <TableHead className="text-right">Market Value</TableHead>
                      <TableHead className="text-right">YTD Performance</TableHead>
                      <TableHead className="text-center">Sub-Classes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetClassSummary.map((asset) => (
                      <TableRow key={asset.assetClass}>
                        <TableCell className="font-medium">{asset.assetClass}</TableCell>
                        <TableCell className="text-right">{asset.allocation}</TableCell>
                        <TableCell className="text-right">{asset.marketValue}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary" className={getPerformanceBadgeColor(asset.ytdPerformance)}>
                            {asset.ytdPerformance}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{asset.subClasses}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sub-asset" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sub-Asset Class Distribution</CardTitle>
                <CardDescription>Detailed breakdown of all sub-asset classes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sub-Asset Class</TableHead>
                      <TableHead>Parent Class</TableHead>
                      <TableHead className="text-right">Allocation</TableHead>
                      <TableHead className="text-right">Market Value</TableHead>
                      <TableHead className="text-right">Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subAssetClassData.map((subAsset) => (
                      <TableRow key={subAsset.subAssetClass}>
                        <TableCell className="font-medium">{subAsset.subAssetClass}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{subAsset.parentClass}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{subAsset.allocation}</TableCell>
                        <TableCell className="text-right">{subAsset.marketValue}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary" className={getPerformanceBadgeColor(subAsset.performance)}>
                            {subAsset.performance}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sub-Asset Class Treemap</CardTitle>
                <CardDescription>Visual representation of allocation sizes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subAssetClassData.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="subAssetClass" 
                        angle={-45}
                        textAnchor="end"
                        height={120}
                        fontSize={12}
                      />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip 
                        formatter={(value, name) => [`${value}`, 'Allocation']}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Bar 
                        dataKey={(entry) => parseFloat(entry.allocation.replace('%', ''))} 
                        fill="#3b82f6" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison Across Time Periods</CardTitle>
                <CardDescription>Asset class performance over different time horizons</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead className="text-right">Equities</TableHead>
                      <TableHead className="text-right">Fixed Income</TableHead>
                      <TableHead className="text-right">Alternatives</TableHead>
                      <TableHead className="text-right">Cash</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceComparisonData.map((period) => (
                      <TableRow key={period.period}>
                        <TableCell className="font-medium">{period.period}</TableCell>
                        <TableCell className="text-right text-green-600 font-medium">{period.equities}</TableCell>
                        <TableCell className="text-right text-green-600 font-medium">{period.fixedIncome}</TableCell>
                        <TableCell className="text-right text-green-600 font-medium">{period.alternatives}</TableCell>
                        <TableCell className="text-right text-green-600 font-medium">{period.cash}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Sub-Classes</CardTitle>
                  <CardDescription>Best performers by return</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subAssetClassData
                      .sort((a, b) => parseFloat(b.performance.replace("+", "").replace("%", "")) - parseFloat(a.performance.replace("+", "").replace("%", "")))
                      .slice(0, 5)
                      .map((subAsset, index) => (
                        <div key={subAsset.subAssetClass} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="text-sm font-medium">#{index + 1}</div>
                            <div className="font-medium">{subAsset.subAssetClass}</div>
                            <div className="text-sm text-muted-foreground">{subAsset.allocation} allocation</div>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {subAsset.performance}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asset Class Contribution</CardTitle>
                  <CardDescription>Performance contribution to portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium">Equities</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">+8.32%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium">Fixed Income</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">+0.84%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium">Alternatives</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">+1.65%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium">Cash & Equivalents</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">+0.11%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics by Asset Class</CardTitle>
                <CardDescription>Comprehensive risk analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset Class</TableHead>
                      <TableHead className="text-right">Volatility</TableHead>
                      <TableHead className="text-right">Sharpe Ratio</TableHead>
                      <TableHead className="text-right">Max Drawdown</TableHead>
                      <TableHead className="text-right">Beta</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetClassRiskMetrics.map((risk) => (
                      <TableRow key={risk.assetClass}>
                        <TableCell className="font-medium">{risk.assetClass}</TableCell>
                        <TableCell className="text-right">{risk.volatility}</TableCell>
                        <TableCell className="text-right">{risk.sharpeRatio}</TableCell>
                        <TableCell className="text-right text-red-600">{risk.maxDrawdown}</TableCell>
                        <TableCell className="text-right">{risk.beta}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk vs Return Profile</CardTitle>
                <CardDescription>Volatility compared to performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskReturnData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="assetClass"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="risk" fill="#ef4444" name="Risk (Volatility %)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comprehensive" className="space-y-6">
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Comprehensive Allocation Dashboard</h2>
              <p className="text-muted-foreground">Multi-dimensional allocation view with pie charts across all categories</p>
            </div>

            <Tabs defaultValue="multi-view" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="multi-view">Multi-View Allocations</TabsTrigger>
                <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
                <TabsTrigger value="diversification">Diversification</TabsTrigger>
                <TabsTrigger value="portfolio-radar">Portfolio Radar</TabsTrigger>
              </TabsList>

              <TabsContent value="multi-view" className="space-y-6">
                {/* Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Diversification Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">78/100</div>
                      <p className="text-xs text-muted-foreground">Well diversified</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Risk Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">85/100</div>
                      <p className="text-xs text-muted-foreground">Moderate risk</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Performance Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">92/100</div>
                      <p className="text-xs text-muted-foreground">Strong performance</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Efficiency Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">88/100</div>
                      <p className="text-xs text-muted-foreground">Cost efficient</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Multi-View Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Asset Class Allocation</CardTitle>
                      <CardDescription>Primary asset allocation breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "US Equities", value: 35, color: "#3b82f6" },
                                { name: "International Equities", value: 25, color: "#10b981" },
                                { name: "Fixed Income", value: 20, color: "#f59e0b" },
                                { name: "Alternatives", value: 15, color: "#ef4444" },
                                { name: "Cash", value: 5, color: "#8b5cf6" }
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, value }) => `${name} ${value}%`}
                            >
                              {[
                                { name: "US Equities", value: 35, color: "#3b82f6" },
                                { name: "International Equities", value: 25, color: "#10b981" },
                                { name: "Fixed Income", value: 20, color: "#f59e0b" },
                                { name: "Alternatives", value: 15, color: "#ef4444" },
                                { name: "Cash", value: 5, color: "#8b5cf6" }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Geographic Allocation</CardTitle>
                      <CardDescription>Geographic distribution of investments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "North America", value: 60, color: "#3b82f6" },
                                { name: "Europe", value: 20, color: "#10b981" },
                                { name: "Asia Pacific", value: 15, color: "#f59e0b" },
                                { name: "Emerging Markets", value: 5, color: "#ef4444" }
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, value }) => `${name} ${value}%`}
                            >
                              {[
                                { name: "North America", value: 60, color: "#3b82f6" },
                                { name: "Europe", value: 20, color: "#10b981" },
                                { name: "Asia Pacific", value: 15, color: "#f59e0b" },
                                { name: "Emerging Markets", value: 5, color: "#ef4444" }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sector Allocation</CardTitle>
                      <CardDescription>Sector-wise investment distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Technology", value: 22, color: "#3b82f6" },
                                { name: "Healthcare", value: 15, color: "#10b981" },
                                { name: "Financial Services", value: 12, color: "#f59e0b" },
                                { name: "Consumer Discretionary", value: 10, color: "#ef4444" },
                                { name: "Industrials", value: 8, color: "#8b5cf6" },
                                { name: "Other", value: 33, color: "#6b7280" }
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, value }) => `${name} ${value}%`}
                            >
                              {[
                                { name: "Technology", value: 22, color: "#3b82f6" },
                                { name: "Healthcare", value: 15, color: "#10b981" },
                                { name: "Financial Services", value: 12, color: "#f59e0b" },
                                { name: "Consumer Discretionary", value: 10, color: "#ef4444" },
                                { name: "Industrials", value: 8, color: "#8b5cf6" },
                                { name: "Other", value: 33, color: "#6b7280" }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Investment Style</CardTitle>
                      <CardDescription>Growth vs Value allocation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Growth", value: 45, color: "#3b82f6" },
                                { name: "Value", value: 30, color: "#10b981" },
                                { name: "Blend", value: 25, color: "#f59e0b" }
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, value }) => `${name} ${value}%`}
                            >
                              {[
                                { name: "Growth", value: 45, color: "#3b82f6" },
                                { name: "Value", value: 30, color: "#10b981" },
                                { name: "Blend", value: 25, color: "#f59e0b" }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="diversification" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Diversification Analysis</CardTitle>
                    <CardDescription>Portfolio diversification across multiple dimensions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Asset Class</div>
                          <div className="text-sm text-muted-foreground">Well diversified across asset classes</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">85/100</div>
                          <div className="w-40 bg-muted rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Geographic</div>
                          <div className="text-sm text-muted-foreground">Good international exposure</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">72/100</div>
                          <div className="w-40 bg-muted rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Sector</div>
                          <div className="text-sm text-muted-foreground">Balanced sector allocation</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">78/100</div>
                          <div className="w-40 bg-muted rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Style</div>
                          <div className="text-sm text-muted-foreground">Moderate style diversification</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">68/100</div>
                          <div className="w-40 bg-muted rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Market Cap</div>
                          <div className="text-sm text-muted-foreground">Good cap size distribution</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">82/100</div>
                          <div className="w-40 bg-muted rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Currency</div>
                          <div className="text-sm text-muted-foreground">Adequate currency exposure</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">75/100</div>
                          <div className="w-40 bg-muted rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Diversification Score Breakdown</CardTitle>
                    <CardDescription>Scores across different diversification dimensions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { dimension: "Asset Class", score: 85 },
                            { dimension: "Geographic", score: 72 },
                            { dimension: "Sector", score: 78 },
                            { dimension: "Style", score: 68 },
                            { dimension: "Market Cap", score: 82 },
                            { dimension: "Currency", score: 75 }
                          ]}
                          layout="horizontal"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="dimension" type="category" width={80} />
                          <Tooltip />
                          <Bar dataKey="score" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio-radar" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Performance Radar</CardTitle>
                    <CardDescription>Multi-dimensional portfolio assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 flex items-center justify-center">
                      <div className="relative w-80 h-80">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                          {/* Radar Chart Background */}
                          <g transform="translate(100, 100)">
                            {/* Grid circles */}
                            {[20, 40, 60, 80].map((radius) => (
                              <circle key={radius} cx="0" cy="0" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="1" />
                            ))}
                            
                            {/* Grid lines */}
                            {[0, 60, 120, 180, 240, 300].map((angle) => (
                              <line 
                                key={angle}
                                x1="0" y1="0" 
                                x2={80 * Math.cos((angle - 90) * Math.PI / 180)} 
                                y2={80 * Math.sin((angle - 90) * Math.PI / 180)}
                                stroke="#e5e7eb" 
                                strokeWidth="1"
                              />
                            ))}
                            
                            {/* Data polygon */}
                            <polygon
                              points={[
                                [75 * Math.cos(-90 * Math.PI / 180), 75 * Math.sin(-90 * Math.PI / 180)], // Diversification: 75
                                [85 * Math.cos(-30 * Math.PI / 180), 85 * Math.sin(-30 * Math.PI / 180)], // Risk Control: 85
                                [78 * Math.cos(30 * Math.PI / 180), 78 * Math.sin(30 * Math.PI / 180)], // Return Generation: 78
                                [88 * Math.cos(90 * Math.PI / 180), 88 * Math.sin(90 * Math.PI / 180)], // Cost Efficiency: 88
                                [82 * Math.cos(150 * Math.PI / 180), 82 * Math.sin(150 * Math.PI / 180)], // Liquidity: 82
                                [72 * Math.cos(210 * Math.PI / 180), 72 * Math.sin(210 * Math.PI / 180)] // ESG Score: 72
                              ].map(point => `${point[0]},${point[1]}`).join(' ')}
                              fill="rgba(59, 130, 246, 0.3)"
                              stroke="#3b82f6"
                              strokeWidth="2"
                            />
                            
                            {/* Data points */}
                            {[
                              { angle: -90, value: 75, label: "Diversification" },
                              { angle: -30, value: 85, label: "Risk Control" },
                              { angle: 30, value: 78, label: "Return Generation" },
                              { angle: 90, value: 88, label: "Cost Efficiency" },
                              { angle: 150, value: 82, label: "Liquidity" },
                              { angle: 210, value: 72, label: "ESG Score" }
                            ].map((point, index) => (
                              <circle
                                key={index}
                                cx={point.value * Math.cos(point.angle * Math.PI / 180)}
                                cy={point.value * Math.sin(point.angle * Math.PI / 180)}
                                r="3"
                                fill="#3b82f6"
                              />
                            ))}
                          </g>
                          
                          {/* Labels */}
                          <text x="100" y="15" textAnchor="middle" className="text-xs fill-current">Diversification</text>
                          <text x="170" y="45" textAnchor="middle" className="text-xs fill-current">Risk Control</text>
                          <text x="170" y="165" textAnchor="middle" className="text-xs fill-current">Return Generation</text>
                          <text x="100" y="195" textAnchor="middle" className="text-xs fill-current">Cost Efficiency</text>
                          <text x="30" y="165" textAnchor="middle" className="text-xs fill-current">Liquidity</text>
                          <text x="30" y="45" textAnchor="middle" className="text-xs fill-current">ESG Score</text>
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                    <CardDescription>Current vs target performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-green-600 mb-3">Above Target</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Risk Control</span>
                            <span className="font-medium text-green-600">+10</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Return Generation</span>
                            <span className="font-medium text-green-600">+7</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Liquidity</span>
                            <span className="font-medium text-green-600">+5</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>ESG Score</span>
                            <span className="font-medium text-green-600">+2</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-yellow-600 mb-3">Below Target</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Diversification</span>
                            <span className="font-medium text-yellow-600">-2</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Cost Efficiency</span>
                            <span className="font-medium text-yellow-600">-2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}