'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Building2, DollarSign, TrendingUp, Users, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export default function EntityLevelFinancialSummaryPage() => {
  const router = useRouter();
  const [selectedView, setSelectedView] = useState("multi-entity");

  const entityData = {
    totalAssets: 45.6,
    netWorth: 36.7,
    annualRevenue: 12.4,
    activeEntities: 10,
    totalEntities: 12
  };

  // Entity distribution data
  const entityDistributionData = [
    { name: "Entity A LLC", value: 15.2, percentage: 41.4 },
    { name: "Entity B LP", value: 11.8, percentage: 32.1 },
    { name: "Entity C Holdings", value: 6.9, percentage: 18.8 },
    { name: "Entity D Ventures", value: 1.8, percentage: 4.9 },
    { name: "Entity E LLC", value: 1.0, percentage: 2.7 }
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff88'];

  // Financial position summary
  const financialPosition = [
    { item: "Total Assets", value: 45.6, color: "text-blue-600" },
    { item: "Total Liabilities", value: -8.9, color: "text-red-600" },
    { item: "Net Worth", value: 36.7, color: "text-green-600" },
    { item: "Debt-to-Equity Ratio", value: "24.3%", color: "text-gray-600" }
  ];

  // Operating performance
  const operatingPerformance = [
    { item: "Total Revenue", value: 12.4, color: "text-blue-600" },
    { item: "Net Income", value: 3.2, color: "text-green-600" },
    { item: "Operating Cash Flow", value: 4.1, color: "text-green-600" },
    { item: "Net Margin", value: "25.8%", color: "text-green-600" }
  ];

  // Entity breakdown data
  const entityBreakdown = [
    { 
      entity: "Primary Holdings LLC", 
      totalAssets: 18.5, 
      liabilities: 3.2,
      netWorth: 15.3, 
      revenue: 4.8, 
      netIncome: 1.20,
      roe: "7.8%",
      debtEquity: "20.9%"
    },
    { 
      entity: "Investment Partners LP", 
      totalAssets: 12.8, 
      liabilities: 2.1,
      netWorth: 10.7, 
      revenue: 3.2, 
      netIncome: 0.85,
      roe: "7.9%",
      debtEquity: "19.6%"
    },
    { 
      entity: "Real Estate Holdings", 
      totalAssets: 8.9, 
      liabilities: 1.8,
      netWorth: 7.1, 
      revenue: 2.1, 
      netIncome: 0.65,
      roe: "9.2%",
      debtEquity: "25.4%"
    },
    { 
      entity: "Technology Ventures", 
      totalAssets: 3.2, 
      liabilities: 0.9,
      netWorth: 2.3, 
      revenue: 1.4, 
      netIncome: 0.38,
      roe: "16.5%",
      debtEquity: "39.1%"
    },
    { 
      entity: "Energy Assets LLC", 
      totalAssets: 2.2, 
      liabilities: 0.9,
      netWorth: 1.3, 
      revenue: 0.9, 
      netIncome: 0.12,
      roe: "9.2%",
      debtEquity: "69.2%"
    }
  ];

  // Performance metrics by entity
  const performanceMetrics = [
    { entity: "Primary Holdings LLC", roe: 7.8, roa: 6.5, grossMargin: 28.5, netMargin: 25.0 },
    { entity: "Investment Partners LP", roe: 7.9, roa: 6.6, grossMargin: 27.8, netMargin: 26.6 },
    { entity: "Real Estate Holdings", roe: 9.2, roa: 7.3, grossMargin: 33.3, netMargin: 31.0 },
    { entity: "Technology Ventures", roe: 16.5, roa: 11.9, grossMargin: 35.0, netMargin: 27.1 },
    { entity: "Energy Assets LLC", roe: 9.2, roa: 5.5, grossMargin: 22.2, netMargin: 13.3 }
  ];

  // Quarterly performance data
  const quarterlyData = [
    { quarter: "Q1 2024", revenue: 2.8, expenses: 2.1, netIncome: 0.7 },
    { quarter: "Q2 2024", revenue: 3.1, expenses: 2.3, netIncome: 0.8 },
    { quarter: "Q3 2024", revenue: 3.2, expenses: 2.4, netIncome: 0.8 },
    { quarter: "Q4 2024", revenue: 3.3, expenses: 2.5, netIncome: 0.8 }
  ];

  // Return ratios over time
  const returnRatiosData = [
    { quarter: "Q1 2024", roa: 6.2, roe: 12.1 },
    { quarter: "Q2 2024", roa: 6.8, roe: 13.2 },
    { quarter: "Q3 2024", roa: 7.1, roe: 13.8 },
    { quarter: "Q4 2024", roa: 7.5, roe: 14.2 }
  ];

  // Asset allocation data
  const assetAllocationData = [
    { name: "Real Estate", value: 18.5, percentage: 40.6, allocation: "Major" },
    { name: "Securities", value: 12.8, percentage: 28.1, allocation: "Major" },
    { name: "Private Equity", value: 8.9, percentage: 19.5, allocation: "Moderate" },
    { name: "Cash & Equivalents", value: 3.2, percentage: 7.0, allocation: "Minor" },
    { name: "Other Assets", value: 2.2, percentage: 4.8, allocation: "Minor" }
  ];

  // Cash flow data
  const cashFlowData = [
    { month: "Jan", operating: 420, investing: -180, financing: -120, netCashFlow: 120 },
    { month: "Feb", operating: 380, investing: -220, financing: 150, netCashFlow: 310 },
    { month: "Mar", operating: 450, investing: -150, financing: -80, netCashFlow: 220 },
    { month: "Apr", operating: 520, investing: -300, financing: 200, netCashFlow: 420 },
    { month: "May", operating: 480, investing: -180, financing: -100, netCashFlow: 200 },
    { month: "Jun", operating: 540, investing: -250, financing: -90, netCashFlow: 200 }
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
            <h1 className="text-3xl font-bold">Entity Level Financial Summary</h1>
            <div className="flex gap-2">
              <Button variant={selectedView === "multi-entity" ? "default" : "outline"} size="sm" onClick={() => setSelectedView("multi-entity")}>
                Multi-Entity
              </Button>
              <Button variant={selectedView === "consolidated" ? "default" : "outline"} size="sm" onClick={() => setSelectedView("consolidated")}>
                Consolidated
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Comprehensive financial overview across all entities with consolidated metrics
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${entityData.totalAssets}M</div>
              <p className="text-sm text-muted-foreground">Across {entityData.totalEntities} entities</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Net Worth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${entityData.netWorth}M</div>
              <p className="text-sm text-muted-foreground">80.5% of total assets</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Annual Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${entityData.annualRevenue}M</div>
              <p className="text-sm text-muted-foreground">25.8% ROA</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Active Entities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{entityData.activeEntities}</div>
              <p className="text-sm text-muted-foreground">of {entityData.totalEntities} total</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="entities">By Entity</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial Position Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Position Summary</CardTitle>
                  <p className="text-sm text-muted-foreground">Consolidated balance sheet overview</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {financialPosition.map((item) => (
                    <div key={item.item} className="flex justify-between items-center">
                      <span className="font-medium">{item.item}</span>
                      <span className={`font-bold ${item.color}`}>
                        {typeof item.value === 'number' ? 
                          (item.value < 0 ? `-$${Math.abs(item.value)}M` : `$${item.value}M`) : 
                          item.value
                        }
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Operating Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Operating Performance</CardTitle>
                  <p className="text-sm text-muted-foreground">Key performance indicators</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {operatingPerformance.map((item) => (
                    <div key={item.item} className="flex justify-between items-center">
                      <span className="font-medium">{item.item}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${item.color}`}>
                          {typeof item.value === 'number' ? `$${item.value}M` : item.value}
                        </span>
                        {item.item === "Total Revenue" && (
                          <Badge variant="outline">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            0
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Entity Distribution by Net Worth */}
            <Card>
              <CardHeader>
                <CardTitle>Entity Distribution by Net Worth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={entityDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, "Net Worth"]} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entities" className="space-y-6">
            {/* Entity Breakdown Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Entity Financial Breakdown
                  <Badge variant="outline" className="ml-2">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    0
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">Detailed financial position by entity</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entity</TableHead>
                      <TableHead className="text-right">Assets</TableHead>
                      <TableHead className="text-right">Liabilities</TableHead>
                      <TableHead className="text-right">Net Worth</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Net Income</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entityBreakdown.map((entity) => (
                      <TableRow key={entity.entity}>
                        <TableCell className="font-medium">{entity.entity}</TableCell>
                        <TableCell className="text-right">${entity.totalAssets}M</TableCell>
                        <TableCell className="text-right">${entity.liabilities}M</TableCell>
                        <TableCell className="text-right text-green-600">${entity.netWorth}M</TableCell>
                        <TableCell className="text-right">${entity.revenue}M</TableCell>
                        <TableCell className="text-right text-green-600">${entity.netIncome}M</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Entity Revenue Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Entity Revenue Comparison</CardTitle>
                <p className="text-sm text-muted-foreground">
                  <Badge variant="outline" className="mr-2">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    0
                  </Badge>
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={entityBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="entity" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, ""]} />
                    <Bar dataKey="revenue" fill="#22c55e" name="Revenue" />
                    <Bar dataKey="netIncome" fill="#3b82f6" name="Net Income" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Net Income</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Quarterly Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Performance Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Revenue, expenses, and profitability analysis</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={quarterlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, ""]} />
                    <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                    <Line type="monotone" dataKey="netIncome" stroke="#3b82f6" strokeWidth={2} name="Net Income" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Expenses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Net Income</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Return Ratios */}
            <Card>
              <CardHeader>
                <CardTitle>Return Ratios</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={returnRatiosData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Line type="monotone" dataKey="roa" stroke="#8b5cf6" strokeWidth={2} name="ROA %" />
                    <Line type="monotone" dataKey="roe" stroke="#22c55e" strokeWidth={2} name="ROE %" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm">ROA %</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">ROE %</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics Table */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics by Entity</CardTitle>
                <p className="text-sm text-muted-foreground">Return ratios and profitability metrics</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entity</TableHead>
                      <TableHead className="text-right">ROE %</TableHead>
                      <TableHead className="text-right">ROA %</TableHead>
                      <TableHead className="text-right">Gross Margin %</TableHead>
                      <TableHead className="text-right">Net Margin %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceMetrics.map((metric) => (
                      <TableRow key={metric.entity}>
                        <TableCell className="font-medium">{metric.entity}</TableCell>
                        <TableCell className="text-right">{metric.roe}%</TableCell>
                        <TableCell className="text-right">{metric.roa}%</TableCell>
                        <TableCell className="text-right">{metric.grossMargin}%</TableCell>
                        <TableCell className="text-right">{metric.netMargin}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            {/* Asset Allocation Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation Overview</CardTitle>
                <p className="text-sm text-muted-foreground">Distribution of assets across categories</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={assetAllocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, percentage}) => `${name}: ${percentage}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {assetAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}M`, "Value"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <Badge variant="outline" className="mr-2">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    0
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Asset Category Details */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Category Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                      <TableHead className="text-right">Allocation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetAllocationData.map((asset) => (
                      <TableRow key={asset.name}>
                        <TableCell className="font-medium">{asset.name}</TableCell>
                        <TableCell className="text-right">${asset.value}M</TableCell>
                        <TableCell className="text-right">{asset.percentage}%</TableCell>
                        <TableCell className="text-right">
                          <Badge className={
                            asset.allocation === "Major" ? "bg-blue-600 text-white" :
                            asset.allocation === "Moderate" ? "bg-orange-500 text-white" :
                            "bg-gray-500 text-white"
                          }>
                            {asset.allocation}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cashflow" className="space-y-6">
            {/* Cash Flow Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Operating, investing, and financing cash flows</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}K`, ""]} />
                    <Bar dataKey="operating" fill="#22c55e" name="Operating" />
                    <Bar dataKey="investing" fill="#f97316" name="Investing" />
                    <Bar dataKey="financing" fill="#3b82f6" name="Financing" />
                    <Bar dataKey="netCashFlow" fill="#8b5cf6" name="Net Cash Flow" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Operating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm">Investing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Financing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm">Net Cash Flow</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Cash Flow Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Cash Flow Summary</CardTitle>
                <p className="text-sm text-muted-foreground">
                  <Badge variant="outline" className="mr-2">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    0
                  </Badge>
                </p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Operating</TableHead>
                      <TableHead className="text-right">Investing</TableHead>
                      <TableHead className="text-right">Financing</TableHead>
                      <TableHead className="text-right">Net Cash Flow</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cashFlowData.map((flow) => (
                      <TableRow key={flow.month}>
                        <TableCell className="font-medium">{flow.month}</TableCell>
                        <TableCell className="text-right text-green-600">${flow.operating}K</TableCell>
                        <TableCell className="text-right text-red-600">${flow.investing}K</TableCell>
                        <TableCell className="text-right text-blue-600">${flow.financing > 0 ? '+' : ''}${flow.financing}K</TableCell>
                        <TableCell className="text-right text-green-600">${flow.netCashFlow}K</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

