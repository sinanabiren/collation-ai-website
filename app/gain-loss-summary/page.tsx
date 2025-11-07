'use client'

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { ArrowLeft, TrendingUp, DollarSign, Calculator, Receipt } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

export default function GainLossSummaryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('realized-gl');

  // Sample data for realized gains/losses
  const realizedGainsData = [
    { security: 'AAPL', purchases: 5, sales: 3, costBasis: '$1,250,000', proceeds: '$1,735,000', realizedGL: '+$485,000', holdingPeriod: '12 months', taxType: 'Long-term' },
    { security: 'MSFT', purchases: 8, sales: 4, costBasis: '$1,800,000', proceeds: '$2,420,000', realizedGL: '+$620,000', holdingPeriod: '18 months', taxType: 'Long-term' },
    { security: 'GOOGL', purchases: 3, sales: 2, costBasis: '$950,000', proceeds: '$825,000', realizedGL: '-$125,000', holdingPeriod: '8 months', taxType: 'Short-term' },
    { security: 'TSLA', purchases: 12, sales: 8, costBasis: '$2,100,000', proceeds: '$2,990,000', realizedGL: '+$890,000', holdingPeriod: '24 months', taxType: 'Long-term' },
    { security: 'AMZN', purchases: 4, sales: 3, costBasis: '$1,400,000', proceeds: '$1,740,000', realizedGL: '+$340,000', holdingPeriod: '15 months', taxType: 'Long-term' },
  ];

  const realizedGainsChart = [
    { security: 'AAPL', gain: 485 },
    { security: 'MSFT', gain: 620 },
    { security: 'GOOGL', gain: -125 },
    { security: 'TSLA', gain: 890 },
    { security: 'AMZN', gain: 340 },
  ];

  // Sample data for unrealized gains/losses
  const unrealizedGainsData = [
    { security: 'NVDA', shares: 2500, costBasis: '$125.5', currentPrice: '$185.75', marketValue: '$464,375', unrealizedGL: '+$150,625', percentage: '+48%' },
    { security: 'META', shares: 1800, costBasis: '$245.8', currentPrice: '$312.4', marketValue: '$562,320', unrealizedGL: '+$119,880', percentage: '+27.1%' },
    { security: 'NFLX', shares: 900, costBasis: '$380.25', currentPrice: '$425.6', marketValue: '$383,040', unrealizedGL: '+$40,815', percentage: '+11.9%' },
    { security: 'AMD', shares: 3200, costBasis: '$95.4', currentPrice: '$118.3', marketValue: '$378,560', unrealizedGL: '+$73,280', percentage: '+24%' },
    { security: 'CRM', shares: 1200, costBasis: '$185.6', currentPrice: '$165.8', marketValue: '$198,960', unrealizedGL: '-$23,760', percentage: '-10.7%' },
  ];

  const unrealizedGainsChart = [
    { security: 'NVDA', gain: 150.625 },
    { security: 'META', gain: 119.88 },
    { security: 'NFLX', gain: 40.815 },
    { security: 'AMD', gain: 73.28 },
    { security: 'CRM', gain: -23.76 },
  ];

  // Tax analysis data
  const taxAnalysisData = [
    { year: '2024', shortTermGains: 1.3, longTermGains: 8.2, taxLiability: 2.0 },
    { year: '2023', shortTermGains: 0.9, longTermGains: 6.8, taxLiability: 1.7 },
    { year: '2022', shortTermGains: 1.4, longTermGains: 4.5, taxLiability: 1.4 },
    { year: '2021', shortTermGains: 0.8, longTermGains: 9.2, taxLiability: 2.1 },
  ];

  const taxSummaryData = [
    { year: '2024', shortTermGains: '$1.3M', longTermGains: '$8.2M', avgTaxRate: '37%', taxLiability: '$2.0M' },
    { year: '2023', shortTermGains: '$0.9M', longTermGains: '$6.8M', avgTaxRate: '35%', taxLiability: '$1.7M' },
    { year: '2022', shortTermGains: '$1.4M', longTermGains: '$4.5M', avgTaxRate: '37%', taxLiability: '$1.4M' },
    { year: '2021', shortTermGains: '$0.8M', longTermGains: '$9.2M', avgTaxRate: '35%', taxLiability: '$2.1M' },
  ];

  // Performance attribution data
  const attributionData = [
    { category: 'Technology Stocks', realizedGains: 2.9, unrealizedGains: 5.8 },
    { category: 'Growth Stocks', realizedGains: 2.1, unrealizedGains: 4.2 },
    { category: 'Large Cap', realizedGains: 1.9, unrealizedGains: 3.1 },
    { category: 'International', realizedGains: 1.0, unrealizedGains: 1.2 },
    { category: 'Small Cap', realizedGains: 0.6, unrealizedGains: 0.8 },
    { category: 'Fixed Income', realizedGains: 0.3, unrealizedGains: 0.4 },
  ];

  const attributionSummaryData = [
    { category: 'Technology Stocks', realizedGains: '$2.9M', unrealizedGains: '$5.6M', totalContribution: '$8.5M', portfolioPercent: '35.8%' },
    { category: 'Growth Stocks', realizedGains: '$2.1M', unrealizedGains: '$4.2M', totalContribution: '$6.3M', portfolioPercent: '26.6%' },
    { category: 'Large Cap', realizedGains: '$1.9M', unrealizedGains: '$3.1M', totalContribution: '$5.0M', portfolioPercent: '20.9%' },
    { category: 'International', realizedGains: '$1.0M', unrealizedGains: '$1.2M', totalContribution: '$2.2M', portfolioPercent: '9.2%' },
    { category: 'Small Cap', realizedGains: '$0.6M', unrealizedGains: '$0.8M', totalContribution: '$1.4M', portfolioPercent: '6%' },
    { category: 'Fixed Income', realizedGains: '$0.3M', unrealizedGains: '$0.4M', totalContribution: '$0.8M', portfolioPercent: '3.2%' },
  ];

  // Strategy performance data
  const strategyData = [
    { strategy: 'Growth', transactions: 542, successRate: 67.8, avgReturn: 14.2, volume: '$98.5M', rating: 'Good' },
    { strategy: 'Value', transactions: 398, successRate: 72.4, avgReturn: 9.8, volume: '$76.2M', rating: 'Good' },
    { strategy: 'Momentum', transactions: 312, successRate: 58.9, avgReturn: 18.7, volume: '$62.8M', rating: 'Fair' },
    { strategy: 'Dividend', transactions: 289, successRate: 81.2, avgReturn: 6.4, volume: '$28.9M', rating: 'Excellent' },
    { strategy: 'Arbitrage', transactions: 156, successRate: 89.7, avgReturn: 3.2, volume: '$19.2M', rating: 'Excellent' },
  ];

  const strategyChartData = [
    { strategy: 'Growth', successRate: 68, avgReturn: 14.2 },
    { strategy: 'Value', successRate: 72, avgReturn: 9.8 },
    { strategy: 'Momentum', successRate: 58, avgReturn: 18.7 },
    { strategy: 'Dividend', successRate: 81, avgReturn: 6.4 },
    { strategy: 'Arbitrage', successRate: 90, avgReturn: 3.2 },
  ];

  // Monthly trends data
  const monthlyTrendsData = [
    { month: '2024-01', realizedGL: 0.6, unrealizedGL: 2.4, netGL: 3.0 },
    { month: '2024-02', realizedGL: 0.7, unrealizedGL: 2.5, netGL: 3.2 },
    { month: '2024-03', realizedGL: 0.6, unrealizedGL: 2.4, netGL: 3.0 },
    { month: '2024-04', realizedGL: 0.4, unrealizedGL: 1.8, netGL: 2.2 },
    { month: '2024-05', realizedGL: 0.9, unrealizedGL: 3.0, netGL: 3.9 },
    { month: '2024-06', realizedGL: 0.42, unrealizedGL: 1.65, netGL: 2.07 },
    { month: '2024-07', realizedGL: 0.7, unrealizedGL: 2.6, netGL: 3.3 },
    { month: '2024-08', realizedGL: 0.5, unrealizedGL: 1.9, netGL: 2.4 },
    { month: '2024-09', realizedGL: 0.8, unrealizedGL: 2.9, netGL: 3.7 },
  ];

  // YTD Performance Summary data
  const ytdSummaryData = [
    { metric: 'Total Realized Gains', value: '$9.4M', color: 'text-primary' },
    { metric: 'Total Unrealized Gains', value: '$14.3M', color: 'text-chart-1' },
    { metric: 'Net Portfolio Gains', value: '$23.7M', color: 'text-foreground' },
    { metric: 'Estimated Tax Liability', value: '$2.0M', color: 'text-destructive' },
  ];

  // Tax Efficiency Metrics data
  const taxEfficiencyData = [
    { metric: 'Long-term vs Short-term', value: '6.6:1 ratio', color: 'text-primary' },
    { metric: 'Effective Tax Rate', value: '25.0%', color: 'text-foreground' },
    { metric: 'Tax Alpha', value: '+2.3%', color: 'text-primary' },
    { metric: 'After-tax Return', value: '+18.2%', color: 'text-primary' },
  ];

  const chartConfig = {
    gain: {
      label: "Gain/Loss",
      color: "hsl(var(--chart-1))",
    },
    shortTermGains: {
      label: "Short-term Gains",
      color: "hsl(var(--destructive))",
    },
    longTermGains: {
      label: "Long-term Gains", 
      color: "hsl(var(--primary))",
    },
    taxLiability: {
      label: "Tax Liability",
      color: "hsl(var(--chart-3))",
    },
    realizedGains: {
      label: "Realized Gains",
      color: "hsl(var(--primary))",
    },
    unrealizedGains: {
      label: "Unrealized Gains",
      color: "hsl(var(--chart-1))",
    },
    successRate: {
      label: "Success Rate %",
      color: "hsl(var(--primary))",
    },
    avgReturn: {
      label: "Avg Return %",
      color: "hsl(var(--chart-1))",
    },
    realizedGL: {
      label: "Realized G/L",
      color: "hsl(var(--primary))",
    },
    unrealizedGL: {
      label: "Unrealized G/L",
      color: "hsl(var(--chart-2))",
    },
    netGL: {
      label: "Net G/L",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/investment-reporting')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports Gallery
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gain/Loss Summary</h1>
            <p className="text-muted-foreground">Comprehensive gain and loss analysis with tax implications</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Tax Analysis</Badge>
            <Badge variant="secondary">Performance</Badge>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Realized Gains</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$9.4M</div>
              <p className="text-xs text-muted-foreground">Crystallized gains</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Unrealized Gains</CardTitle>
              <TrendingUp className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">$14.3M</div>
              <p className="text-xs text-muted-foreground">Paper gains</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Net Gains</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$23.7M</div>
              <p className="text-xs text-muted-foreground">Combined gains</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tax Liability</CardTitle>
              <Receipt className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">$2.0M</div>
              <p className="text-xs text-muted-foreground">Estimated taxes owed</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="realized-gl">Realized G/L</TabsTrigger>
            <TabsTrigger value="unrealized-gl">Unrealized G/L</TabsTrigger>
            <TabsTrigger value="tax-analysis">Tax Analysis</TabsTrigger>
            <TabsTrigger value="attribution">Attribution</TabsTrigger>
            <TabsTrigger value="monthly-trends">Monthly Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="realized-gl" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Realized Gains and Losses</CardTitle>
                <CardDescription>Completed transactions with actual gains/losses realized</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Security</TableHead>
                      <TableHead>Purchases</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Cost Basis</TableHead>
                      <TableHead>Proceeds</TableHead>
                      <TableHead>Realized G/L</TableHead>
                      <TableHead>Holding Period</TableHead>
                      <TableHead>Tax Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {realizedGainsData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.security}</TableCell>
                        <TableCell>{item.purchases}</TableCell>
                        <TableCell>{item.sales}</TableCell>
                        <TableCell>{item.costBasis}</TableCell>
                        <TableCell>{item.proceeds}</TableCell>
                        <TableCell className={item.realizedGL.startsWith('+') ? 'text-primary' : 'text-destructive'}>
                          {item.realizedGL}
                        </TableCell>
                        <TableCell>{item.holdingPeriod}</TableCell>
                        <TableCell>
                          <Badge variant={item.taxType === 'Long-term' ? 'default' : 'destructive'}>
                            {item.taxType}
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
                <CardTitle>Realized Gains by Security</CardTitle>
                <CardDescription>Visual breakdown of realized gains and losses</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={realizedGainsChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="security" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="gain" 
                        fill="hsl(var(--chart-1))"
                        name="Realized Gain/Loss ($K)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trading Strategy Performance</CardTitle>
                <CardDescription>Success rates and returns by investment strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={strategyChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="strategy" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="successRate" fill="hsl(var(--primary))" name="Success Rate %" />
                      <Bar dataKey="avgReturn" fill="hsl(var(--chart-1))" name="Avg Return %" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strategy Analysis</CardTitle>
                <CardDescription>Detailed performance metrics for each trading strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Strategy</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Avg Return</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {strategyData.map((strategy, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{strategy.strategy}</TableCell>
                        <TableCell>{strategy.transactions}</TableCell>
                        <TableCell>
                          <Badge variant={strategy.successRate > 70 ? 'default' : 'secondary'}>
                            {strategy.successRate}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-primary">+{strategy.avgReturn}%</TableCell>
                        <TableCell>{strategy.volume}</TableCell>
                        <TableCell>
                          <Badge variant={
                            strategy.rating === 'Excellent' ? 'default' :
                            strategy.rating === 'Good' ? 'secondary' : 'outline'
                          }>
                            {strategy.rating}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unrealized-gl" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Unrealized Gains and Losses</CardTitle>
                <CardDescription>Current positions showing paper gains and losses</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Security</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Cost Basis</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Market Value</TableHead>
                      <TableHead>Unrealized G/L</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unrealizedGainsData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.security}</TableCell>
                        <TableCell>{item.shares.toLocaleString()}</TableCell>
                        <TableCell>{item.costBasis}</TableCell>
                        <TableCell>{item.currentPrice}</TableCell>
                        <TableCell>{item.marketValue}</TableCell>
                        <TableCell className={item.unrealizedGL.startsWith('+') ? 'text-primary' : 'text-destructive'}>
                          {item.unrealizedGL}
                        </TableCell>
                        <TableCell className={item.percentage.startsWith('+') ? 'text-primary' : 'text-destructive'}>
                          {item.percentage}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unrealized Gains Distribution</CardTitle>
                <CardDescription>Visual breakdown of unrealized gains and losses by security</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={unrealizedGainsChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="security" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="gain" 
                        fill="hsl(var(--chart-2))"
                        name="Unrealized Gain/Loss ($K)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax-analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Analysis by Year</CardTitle>
                <CardDescription>Tax implications and liability calculations</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={taxAnalysisData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="shortTermGains" 
                        stroke="hsl(var(--destructive))" 
                        strokeWidth={2}
                        name="Short-term Gains"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="longTermGains" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Long-term Gains"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="taxLiability" 
                        stroke="hsl(var(--chart-3))" 
                        strokeWidth={2}
                        name="Tax Liability"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Summary</CardTitle>
                <CardDescription>Annual tax breakdown by gain type and liability</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Short-term Gains</TableHead>
                      <TableHead>Long-term Gains</TableHead>
                      <TableHead>Avg Tax Rate</TableHead>
                      <TableHead>Tax Liability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxSummaryData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.year}</TableCell>
                        <TableCell className="text-destructive">{item.shortTermGains}</TableCell>
                        <TableCell className="text-primary">{item.longTermGains}</TableCell>
                        <TableCell>{item.avgTaxRate}</TableCell>
                        <TableCell className="text-destructive">{item.taxLiability}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attribution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Attribution Analysis</CardTitle>
                <CardDescription>Gain/loss contribution by investment category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="realizedGains" fill="hsl(var(--primary))" name="Realized Gains" />
                      <Bar dataKey="unrealizedGains" fill="hsl(var(--chart-1))" name="Unrealized Gains" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attribution Summary</CardTitle>
                <CardDescription>Detailed breakdown of performance contribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Realized Gains</TableHead>
                      <TableHead>Unrealized Gains</TableHead>
                      <TableHead>Total Contribution</TableHead>
                      <TableHead>Portfolio %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attributionSummaryData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell className="text-primary">{item.realizedGains}</TableCell>
                        <TableCell className="text-chart-1">{item.unrealizedGains}</TableCell>
                        <TableCell className="font-medium">{item.totalContribution}</TableCell>
                        <TableCell>{item.portfolioPercent}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly-trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Gain/Loss Trends</CardTitle>
                <CardDescription>Evolution of realized and unrealized gains over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="realizedGL" 
                        stackId="1"
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))"
                        name="Realized Gains"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="unrealizedGL" 
                        stackId="1"
                        stroke="hsl(var(--chart-1))" 
                        fill="hsl(var(--chart-1))"
                        name="Unrealized Gains"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>YTD Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ytdSummaryData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{item.metric}</span>
                      <span className={`font-medium ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Efficiency Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {taxEfficiencyData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{item.metric}</span>
                      <span className={`font-medium ${item.color}`}>
                        {item.metric === 'Long-term vs Short-term' ? (
                          <Badge variant="default">{item.value}</Badge>
                        ) : (
                          item.value
                        )}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Key insights from monthly performance trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Best Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">May 2024</div>
                      <p className="text-sm text-muted-foreground">$3.9M net gains</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Avg Monthly Gains</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$3.0M</div>
                      <p className="text-sm text-muted-foreground">9-month average</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Consistency Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <p className="text-sm text-muted-foreground">Positive months</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

