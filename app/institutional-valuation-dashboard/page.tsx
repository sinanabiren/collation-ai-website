'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Users, Star, BarChart3, PieChart, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";

export default function InstitutionalValuationDashboardPage() {
  const router = useRouter();
  const [selectedView, setSelectedView] = useState("institutional");

  const summaryData = {
    totalValuation: 3.20,
    quarterlyGrowth: 8.5,
    institutionalClients: 45,
    avgClientValue: 0.83,
    unrealizedGains: 485,
    gainsPercentage: 15.2,
    sharpeRatio: 1.85,
    riskAdjustedReturn: 12.3
  };

  // Sector allocation data
  const sectorAllocationData = [
    { name: "Technology", value: 35, color: "#8b5cf6" },
    { name: "Healthcare", value: 22, color: "#22c55e" },
    { name: "Financial Services", value: 18, color: "#f59e0b" },
    { name: "Consumer Goods", value: 12, color: "#ef4444" },
    { name: "Energy", value: 8, color: "#06d6a0" },
    { name: "Real Estate", value: 5, color: "#60a5fa" }
  ];

  // Client portfolio data
  const clientPortfolioData = [
    {
      client: "Pension Fund Alpha",
      aum: 450,
      currentValuation: 520,
      irr: 14.2,
      vintage: 2019,
      riskLevel: "Medium"
    },
    {
      client: "University Endowment",
      aum: 380,
      currentValuation: 425,
      irr: 11.8,
      vintage: 2020,
      riskLevel: "Low"
    },
    {
      client: "Insurance Corp",
      aum: 320,
      currentValuation: 365,
      irr: 13.5,
      vintage: 2018,
      riskLevel: "Medium"
    },
    {
      client: "Sovereign Wealth",
      aum: 280,
      currentValuation: 335,
      irr: 15.8,
      vintage: 2019,
      riskLevel: "High"
    },
    {
      client: "Family Office",
      aum: 250,
      currentValuation: 285,
      irr: 12.1,
      vintage: 2021,
      riskLevel: "Low"
    }
  ];

  // Portfolio summary data
  const portfolioSummaryData = [
    { metric: "Total AUM", value: "$2.85B" },
    { metric: "Current Valuation", value: "$3.20B" },
    { metric: "Unrealized Gains", value: "$485M" },
    { metric: "Portfolio Multiple", value: "1.12x" }
  ];

  // Performance highlights data
  const performanceHighlightsData = [
    { metric: "Risk-Adjusted Return", value: "12.3%", type: "percentage" },
    { metric: "Sharpe Ratio", value: "1.85", type: "ratio" },
    { metric: "Quarterly Growth", value: "+8.5%", type: "growth" },
    { metric: "Client Count", value: "45 institutions", type: "count" }
  ];

  // Valuation methodology data
  const valuationMethodologyData = [
    { method: "Discounted Cash Flow", usage: 35, accuracy: 92 },
    { method: "Market Comparables", usage: 28, accuracy: 88 },
    { method: "Asset-Based Valuation", usage: 18, accuracy: 95 },
    { method: "Earnings Multiple", usage: 12, accuracy: 85 },
    { method: "Risk-Adjusted NPV", usage: 7, accuracy: 90 }
  ];

  // Valuation method details
  const valuationMethodDetails = [
    { method: "Discounted Cash Flow", usage: "35%", accuracy: "92%", assetsValued: "$1.12B", rating: "High" },
    { method: "Market Comparables", usage: "28%", accuracy: "88%", assetsValued: "$0.90B", rating: "Good" },
    { method: "Asset-Based Valuation", usage: "18%", accuracy: "95%", assetsValued: "$0.58B", rating: "High" },
    { method: "Earnings Multiple", usage: "12%", accuracy: "85%", assetsValued: "$0.38B", rating: "Good" },
    { method: "Risk-Adjusted NPV", usage: "7%", accuracy: "90%", assetsValued: "$0.22B", rating: "Good" }
  ];

  // Quarterly performance data
  const quarterlyPerformanceData = [
    { quarter: "Q1 2024", irr: 11.2, multiple: 1.24, tvpi: 1.42 },
    { quarter: "Q2 2024", irr: 11.8, multiple: 1.28, tvpi: 1.5 },
    { quarter: "Q3 2024", irr: 12.3, multiple: 1.32, tvpi: 1.57 },
    { quarter: "Q4 2024E", irr: 12.8, multiple: 1.36, tvpi: 1.64 }
  ];

  // Performance metrics summary
  const performanceMetricsSummary = [
    { quarter: "Q1 2024", nav: "$2.65B", irr: "11.2%", multiple: "1.24x", dpi: "0.18", tvpi: "1.42x" },
    { quarter: "Q2 2024", nav: "$2.75B", irr: "11.8%", multiple: "1.28x", dpi: "0.22", tvpi: "1.5x" },
    { quarter: "Q3 2024", nav: "$2.85B", irr: "12.3%", multiple: "1.32x", dpi: "0.25", tvpi: "1.57x" },
    { quarter: "Q4 2024E", nav: "$2.95B", irr: "12.8%", multiple: "1.36x", dpi: "0.28", tvpi: "1.64x" }
  ];

  // Risk metrics data
  const riskMetricsData = [
    { metric: "Portfolio Beta", portfolio: 1.15, benchmark: 1 },
    { metric: "Value at Risk (95%)", portfolio: 2.8, benchmark: 3.5 },
    { metric: "Maximum Drawdown", portfolio: 8.2, benchmark: 12 },
    { metric: "Volatility", portfolio: 14.5, benchmark: 18 },
    { metric: "Correlation to Market", portfolio: 0.72, benchmark: 0.85 }
  ];

  // Risk assessment summary
  const riskAssessmentSummary = [
    { metric: "Portfolio Beta", portfolioValue: "1.15", benchmark: "1", rating: "Medium", status: "Above Benchmark" },
    { metric: "Value at Risk (95%)", portfolioValue: "2.8%", benchmark: "3.5%", rating: "Low", status: "Below Benchmark" },
    { metric: "Maximum Drawdown", portfolioValue: "8.2%", benchmark: "12%", rating: "Low", status: "Below Benchmark" },
    { metric: "Volatility", portfolioValue: "14.5%", benchmark: "18%", rating: "Low", status: "Below Benchmark" },
    { metric: "Correlation to Market", portfolioValue: "0.72", benchmark: "0.85", rating: "Medium", status: "Below Benchmark" }
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "High":
        return "bg-blue-100 text-blue-800";
      case "Good":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            <h1 className="text-3xl font-bold">Institutional Valuation Dashboard</h1>
            <div className="flex gap-2">
              <Button variant={selectedView === "institutional" ? "default" : "outline"} size="sm" onClick={() => setSelectedView("institutional")}>
                Institutional
              </Button>
              <Button variant={selectedView === "valuation" ? "default" : "outline"} size="sm" onClick={() => setSelectedView("valuation")}>
                Valuation
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Advanced valuation metrics and analysis for institutional investments
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Valuation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryData.totalValuation}B</div>
              <p className="text-sm text-muted-foreground">+{summaryData.quarterlyGrowth}% this quarter</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Institutional Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.institutionalClients}</div>
              <p className="text-sm text-muted-foreground">Avg: ${summaryData.avgClientValue}M each</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Star className="h-4 w-4" />
                Unrealized Gains
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryData.unrealizedGains}M</div>
              <p className="text-sm text-muted-foreground">{summaryData.gainsPercentage}% of total valuation</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Sharpe Ratio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.sharpeRatio}</div>
              <p className="text-sm text-muted-foreground">Risk-adjusted return: {summaryData.riskAdjustedReturn}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Client Portfolio</TabsTrigger>
            <TabsTrigger value="methods">Valuation Methods</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Sector Allocation & Valuation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Sector Allocation & Valuation
                  <Badge variant="outline" className="ml-2">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    0
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">Portfolio distribution across sectors with valuation metrics</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height={400}>
                      <RechartsPieChart>
                        <Pie
                          data={sectorAllocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sectorAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Portfolio Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioSummaryData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{item.metric}</span>
                        <span className="font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceHighlightsData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{item.metric}</span>
                        <span className={`font-bold ${
                          item.type === 'growth' ? 'text-green-600' : 
                          item.type === 'percentage' ? 'text-blue-600' : 
                          item.type === 'ratio' ? 'text-purple-600' : ''
                        }`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Portfolio Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Individual client performance and valuation metrics</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Client</th>
                        <th className="text-left py-3 px-4">AUM</th>
                        <th className="text-left py-3 px-4">Current Valuation</th>
                        <th className="text-left py-3 px-4">
                          IRR %
                          <Badge variant="outline" className="ml-2">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            0
                          </Badge>
                        </th>
                        <th className="text-left py-3 px-4">Vintage</th>
                        <th className="text-left py-3 px-4">Risk Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientPortfolioData.map((client, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{client.client}</td>
                          <td className="py-3 px-4">${client.aum}M</td>
                          <td className="py-3 px-4 font-semibold text-green-600">${client.currentValuation}M</td>
                          <td className="py-3 px-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {client.irr}%
                            </span>
                          </td>
                          <td className="py-3 px-4">{client.vintage}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${getRiskLevelColor(client.riskLevel)}`}>
                              {client.riskLevel}
                            </span>
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
                <CardTitle>Client Valuation Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={clientPortfolioData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="client" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="aum" fill="#94a3b8" name="Initial AUM" />
                    <Bar dataKey="currentValuation" fill="#22c55e" name="Current Valuation" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methods" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Valuation Methodology Breakdown</CardTitle>
                <p className="text-sm text-muted-foreground">Distribution of valuation methods and their accuracy</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={valuationMethodologyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="method" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#8b5cf6" name="Usage %" />
                    <Bar dataKey="accuracy" fill="#22c55e" name="Accuracy %" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm">Usage %</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Accuracy %</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valuation Method Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Method</th>
                        <th className="text-left py-3 px-4">Usage %</th>
                        <th className="text-left py-3 px-4">Accuracy %</th>
                        <th className="text-left py-3 px-4">Assets Valued</th>
                        <th className="text-left py-3 px-4">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {valuationMethodDetails.map((method, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{method.method}</td>
                          <td className="py-3 px-4">{method.usage}</td>
                          <td className="py-3 px-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {method.accuracy}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold">{method.assetsValued}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${getRatingColor(method.rating)}`}>
                              {method.rating}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Performance Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Key performance indicators across quarters</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={quarterlyPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="irr" stroke="#22c55e" strokeWidth={2} name="IRR %" />
                    <Line type="monotone" dataKey="multiple" stroke="#3b82f6" strokeWidth={2} name="Multiple" />
                    <Line type="monotone" dataKey="tvpi" stroke="#f59e0b" strokeWidth={2} name="TVPI" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">IRR %</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Multiple</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm">TVPI</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Quarter</th>
                        <th className="text-left py-3 px-4">NAV</th>
                        <th className="text-left py-3 px-4">IRR %</th>
                        <th className="text-left py-3 px-4">Multiple</th>
                        <th className="text-left py-3 px-4">DPI</th>
                        <th className="text-left py-3 px-4">TVPI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {performanceMetricsSummary.map((quarter, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{quarter.quarter}</td>
                          <td className="py-3 px-4">{quarter.nav}</td>
                          <td className="py-3 px-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {quarter.irr}
                            </span>
                          </td>
                          <td className="py-3 px-4">{quarter.multiple}</td>
                          <td className="py-3 px-4">{quarter.dpi}</td>
                          <td className="py-3 px-4">{quarter.tvpi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Portfolio risk assessment vs benchmarks</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={riskMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="portfolio" fill="#ef4444" name="Portfolio" />
                    <Bar dataKey="benchmark" fill="#64748b" name="Benchmark" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Portfolio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-500 rounded"></div>
                    <span className="text-sm">Benchmark</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Risk Metric</th>
                        <th className="text-left py-3 px-4">Portfolio Value</th>
                        <th className="text-left py-3 px-4">Benchmark</th>
                        <th className="text-left py-3 px-4">Rating</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskAssessmentSummary.map((risk, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{risk.metric}</td>
                          <td className="py-3 px-4">{risk.portfolioValue}</td>
                          <td className="py-3 px-4">{risk.benchmark}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${getRiskLevelColor(risk.rating)}`}>
                              {risk.rating}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${
                              risk.status.includes("Below") ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                            }`}>
                              {risk.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

