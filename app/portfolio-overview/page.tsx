'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

export default function PortfolioOverview() {
  const router = useRouter();

  const topHoldingsData = [
    { symbol: "AAPL", company: "Apple Inc.", marketValue: 245000, allocation: 10, return: 12.5, shares: 1500 },
    { symbol: "MSFT", company: "Microsoft Corporation", marketValue: 220000, allocation: 9, return: 15.2, shares: 650 },
    { symbol: "NVDA", company: "NVIDIA Corporation", marketValue: 196000, allocation: 8, return: 28.7, shares: 350 },
    { symbol: "GOOGL", company: "Alphabet Inc.", marketValue: 171500, allocation: 7, return: 8.9, shares: 800 },
    { symbol: "AMZN", company: "Amazon.com Inc.", marketValue: 147000, allocation: 6, return: 11.3, shares: 900 },
    { symbol: "TSLA", company: "Tesla Inc.", marketValue: 122500, allocation: 5, return: 22.1, shares: 450 },
    { symbol: "META", company: "Meta Platforms Inc.", marketValue: 98000, allocation: 4, return: 18.6, shares: 280 },
    { symbol: "BRK-B", company: "Berkshire Hathaway", marketValue: 73500, allocation: 3, return: 6.8, shares: 180 }
  ];

  const sectorAllocationData = [
    { name: "Technology", value: 35, amount: 857500, color: "#3b82f6" },
    { name: "Financial Services", value: 18, amount: 441000, color: "#10b981" },
    { name: "Healthcare", value: 12, amount: 294000, color: "#f59e0b" },
    { name: "Consumer Cyclical", value: 10, amount: 245000, color: "#ef4444" },
    { name: "Communication", value: 8, amount: 196000, color: "#8b5cf6" },
    { name: "Industrial", value: 7, amount: 171500, color: "#06b6d4" },
    { name: "Energy", value: 5, amount: 122500, color: "#84cc16" },
    { name: "Other", value: 5, amount: 122500, color: "#6b7280" }
  ];

  const performanceData = [
    { month: "Jan", portfolio: 980000, benchmark: 975000 },
    { month: "Feb", portfolio: 1020000, benchmark: 1010000 },
    { month: "Mar", portfolio: 1180000, benchmark: 1150000 },
    { month: "Apr", portfolio: 1950000, benchmark: 1920000 },
    { month: "May", portfolio: 2400000, benchmark: 2350000 },
    { month: "Jun", portfolio: 2450000, benchmark: 2380000 }
  ];

  const assetAllocationSummary = [
    { name: "Technology", allocation: 35, value: 857500 },
    { name: "Financial Services", allocation: 18, value: 441000 },
    { name: "Healthcare", allocation: 12, value: 294000 },
    { name: "Consumer Cyclical", allocation: 10, value: 245000 },
    { name: "Communication", allocation: 8, value: 196000 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
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
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Overview</h1>
          <p className="text-muted-foreground">Comprehensive overview with market value, allocation, and performance metrics</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,450,000</div>
              <p className="text-xs text-muted-foreground">+$332,000 total gain</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+15.7%</div>
              <p className="text-xs text-muted-foreground">Since inception</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Holdings Count</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Active positions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="top-holdings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="top-holdings">Top Holdings</TabsTrigger>
            <TabsTrigger value="sector-allocation">Sector Allocation</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="top-holdings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Holdings</CardTitle>
                <CardDescription>Largest positions in the portfolio by market value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Symbol</th>
                        <th className="text-left p-3 font-medium">Company</th>
                        <th className="text-left p-3 font-medium">Market Value</th>
                        <th className="text-left p-3 font-medium">Allocation %</th>
                        <th className="text-left p-3 font-medium">Return %</th>
                        <th className="text-left p-3 font-medium">Shares</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topHoldingsData.map((holding, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{holding.symbol}</td>
                          <td className="p-3">{holding.company}</td>
                          <td className="p-3 font-medium">{formatCurrency(holding.marketValue)}</td>
                          <td className="p-3">{holding.allocation}%</td>
                          <td className={`p-3 font-medium ${holding.return > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            +{holding.return}%
                          </td>
                          <td className="p-3">{holding.shares.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sector-allocation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sector Allocation</CardTitle>
                  <CardDescription>Portfolio distribution by sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorAllocationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {sectorAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {sectorAllocationData.map((sector, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: sector.color }}
                        />
                        <span className="text-muted-foreground">{sector.name} {sector.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Allocation by Value</CardTitle>
                  <CardDescription>Dollar amounts by sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sectorAllocationData}
                        layout="horizontal"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip formatter={(value) => [formatCurrency(value as number), 'Value']} />
                        <Bar dataKey="amount" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance vs Benchmark</CardTitle>
                <CardDescription>6-month performance comparison</CardDescription>
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
                          formatCurrency(value as number), 
                          name === 'portfolio' ? 'Portfolio' : 'Benchmark'
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>YTD Return</CardTitle>
                  <CardDescription>Year to date performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+8.3%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Return</CardTitle>
                  <CardDescription>Last month performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+1.2%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Performer</CardTitle>
                  <CardDescription>Top performing holding</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">NVDA</div>
                  <p className="text-sm text-muted-foreground">+28.7% return</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Statistics</CardTitle>
                  <CardDescription>Key portfolio metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Market Value</span>
                      <span className="font-medium">$2,450,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Return</span>
                      <span className="font-medium text-green-600">+15.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Gain/Loss</span>
                      <span className="font-medium text-green-600">+$332,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Number of Holdings</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Largest Position</span>
                      <span className="font-medium">AAPL (10.0%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation Summary</CardTitle>
                  <CardDescription>Top sectors by allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assetAllocationSummary.map((asset, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: sectorAllocationData[index]?.color }}
                          />
                          <span>{asset.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{asset.allocation}%</div>
                          <div className="text-sm text-muted-foreground">{formatCurrency(asset.value)}</div>
                        </div>
                      </div>
                    ))}
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