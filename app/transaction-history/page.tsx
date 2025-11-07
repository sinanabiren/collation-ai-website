'use client'

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { ArrowLeft, TrendingUp, DollarSign, BarChart3, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

export default function TransactionHistoryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('recent-trades');

  // Sample transaction data
  const recentTransactions = [
    { date: '2024-09-15', type: 'Buy', security: 'AAPL', quantity: 2500, price: '$185.5', value: '$463,750', fees: '$125', strategy: 'Growth' },
    { date: '2024-09-14', type: 'Sell', security: 'MSFT', quantity: 1800, price: '$420.25', value: '$756,450', fees: '$185', strategy: 'Rebalancing' },
    { date: '2024-09-13', type: 'Buy', security: 'GOOGL', quantity: 500, price: '$158.75', value: '$79,375', fees: '$65', strategy: 'Growth' },
    { date: '2024-09-12', type: 'Buy', security: 'TSLA', quantity: 3200, price: '$245.8', value: '$786,560', fees: '$195', strategy: 'Speculative' },
    { date: '2024-09-11', type: 'Sell', security: 'AMZN', quantity: 1200, price: '$142.3', value: '$170,760', fees: '$89', strategy: 'Profit Taking' },
  ];

  const monthlyActivityData = [
    { month: '2024-01', buyTransactions: 89, sellTransactions: 56 },
    { month: '2024-02', buyTransactions: 95, sellTransactions: 62 },
    { month: '2024-03', buyTransactions: 102, sellTransactions: 58 },
    { month: '2024-04', buyTransactions: 85, sellTransactions: 69 },
    { month: '2024-05', buyTransactions: 118, sellTransactions: 48 },
    { month: '2024-06', buyTransactions: 94, sellTransactions: 67 },
    { month: '2024-07', buyTransactions: 106, sellTransactions: 55 },
    { month: '2024-08', buyTransactions: 89, sellTransactions: 72 },
    { month: '2024-09', buyTransactions: 132, sellTransactions: 41 },
  ];

  const monthlyVolumeData = [
    { month: '2024-01', totalVolume: 18.2, netFlow: 12.8 },
    { month: '2024-02', totalVolume: 21.5, netFlow: 15.2 },
    { month: '2024-03', totalVolume: 24.8, netFlow: 18.9 },
    { month: '2024-04', totalVolume: 19.3, netFlow: 8.7 },
    { month: '2024-05', totalVolume: 28.9, netFlow: 22.1 },
    { month: '2024-06', totalVolume: 22.4, netFlow: 14.8 },
    { month: '2024-07', totalVolume: 26.1, netFlow: 19.6 },
    { month: '2024-08', totalVolume: 23.7, netFlow: 11.2 },
    { month: '2024-09', totalVolume: 31.5, netFlow: 24.8 },
  ];

  const sectorData = [
    { sector: 'Technology', volume: 89.6 },
    { sector: 'Healthcare', volume: 54.2 },
    { sector: 'Financial Services', volume: 48.9 },
    { sector: 'Consumer Discretionary', volume: 38.2 },
    { sector: 'Energy', volume: 29.8 },
    { sector: 'Industrial', volume: 24.9 },
  ];

  const sectorSummaryData = [
    { sector: 'Technology', transactions: 485, volume: '$89.6M', avgSize: '$184,742', netDirection: 'Buy' },
    { sector: 'Healthcare', transactions: 312, volume: '$54.2M', avgSize: '$173,718', netDirection: 'Sell' },
    { sector: 'Financial Services', transactions: 289, volume: '$48.9M', avgSize: '$169,204', netDirection: 'Buy' },
    { sector: 'Consumer Discretionary', transactions: 234, volume: '$38.2M', avgSize: '$163,248', netDirection: 'Buy' },
    { sector: 'Energy', transactions: 198, volume: '$29.8M', avgSize: '$150,505', netDirection: 'Sell' },
    { sector: 'Industrial', transactions: 156, volume: '$24.9M', avgSize: '$159,615', netDirection: 'Hold' },
  ];

  const performanceData = [
    { security: 'AAPL', totalReturn: 12.8, portfolioContribution: 0.85 },
    { security: 'MSFT', totalReturn: 18.5, portfolioContribution: 1.24 },
    { security: 'GOOGL', totalReturn: -3.2, portfolioContribution: -0.28 },
    { security: 'TSLA', totalReturn: 28.9, portfolioContribution: 1.89 },
    { security: 'AMZN', totalReturn: 7.4, portfolioContribution: 0.52 },
    { security: 'NVDA', totalReturn: 45.6, portfolioContribution: 2.14 },
  ];

  const securityPerformanceData = [
    { security: 'AAPL', transactions: 45, totalReturn: '+12.8%', portfolioContribution: '+0.85%', totalFees: '$1250' },
    { security: 'MSFT', transactions: 38, totalReturn: '+18.5%', portfolioContribution: '+1.24%', totalFees: '$1085' },
    { security: 'GOOGL', transactions: 29, totalReturn: '-3.2%', portfolioContribution: '-0.28%', totalFees: '$890' },
    { security: 'TSLA', transactions: 52, totalReturn: '+28.9%', portfolioContribution: '+1.89%', totalFees: '$1420' },
    { security: 'AMZN', transactions: 34, totalReturn: '+7.4%', portfolioContribution: '+0.52%', totalFees: '$980' },
    { security: 'NVDA', transactions: 41, totalReturn: '+45.6%', portfolioContribution: '+2.14%', totalFees: '$1180' },
  ];

  const strategyPerformanceData = [
    { strategy: 'Growth', successRate: 68, avgReturn: 14.2 },
    { strategy: 'Value', successRate: 72, avgReturn: 9.8 },
    { strategy: 'Momentum', successRate: 58, avgReturn: 18.5 },
    { strategy: 'Dividend', successRate: 82, avgReturn: 6.1 },
    { strategy: 'Arbitrage', successRate: 89, avgReturn: 4.8 },
  ];

  const chartConfig = {
    buyTransactions: {
      label: "Buy Transactions",
      color: "hsl(var(--primary))",
    },
    sellTransactions: {
      label: "Sell Transactions", 
      color: "hsl(var(--destructive))",
    },
    totalVolume: {
      label: "Total Volume",
      color: "hsl(var(--chart-1))",
    },
    netFlow: {
      label: "Net Flow",
      color: "hsl(var(--chart-2))",
    },
    volume: {
      label: "Volume",
      color: "hsl(var(--chart-1))",
    },
    totalReturn: {
      label: "Total Return %",
      color: "hsl(var(--primary))",
    },
    portfolioContribution: {
      label: "Portfolio Contribution %",
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
            <h1 className="text-3xl font-bold text-foreground">Transaction History</h1>
            <p className="text-muted-foreground">Detailed transaction logs with buy/sell analysis and timing</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Trading Analysis</Badge>
            <Badge variant="secondary">Historical Data</Badge>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,847</div>
              <p className="text-xs text-muted-foreground">+401 net buys</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$285.6M</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$154,723</div>
              <p className="text-xs text-muted-foreground">Per transaction</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Buy/Sell Ratio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.6:1</div>
              <p className="text-xs text-muted-foreground">Favoring buys</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="recent-trades">Recent Trades</TabsTrigger>
            <TabsTrigger value="monthly-activity">Monthly Activity</TabsTrigger>
            <TabsTrigger value="by-sector">By Sector</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
          </TabsList>

          <TabsContent value="recent-trades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transaction History</CardTitle>
                <CardDescription>Latest buy and sell transactions with detailed information</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Security</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Fees</TableHead>
                      <TableHead>Strategy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge variant={transaction.type === 'Buy' ? 'default' : 'destructive'}>
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{transaction.security}</TableCell>
                        <TableCell>{transaction.quantity.toLocaleString()}</TableCell>
                        <TableCell>{transaction.price}</TableCell>
                        <TableCell className={transaction.type === 'Buy' ? 'text-primary' : 'text-destructive'}>
                          {transaction.value}
                        </TableCell>
                        <TableCell>{transaction.fees}</TableCell>
                        <TableCell>{transaction.strategy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Value Distribution</CardTitle>
                <CardDescription>Distribution of transaction values by security</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { security: 'AAPL', value: 463.75 },
                      { security: 'MSFT', value: 756.45 },
                      { security: 'GOOGL', value: 79.375 },
                      { security: 'TSLA', value: 786.56 },
                      { security: 'AMZN', value: 170.76 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="security" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="hsl(var(--chart-1))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly-activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trading Activity</CardTitle>
                <CardDescription>Buy/sell volume and transaction count trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="buyTransactions" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Buy Transactions"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sellTransactions" 
                        stroke="hsl(var(--destructive))" 
                        strokeWidth={2}
                        name="Sell Transactions"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Volume and Net Flow</CardTitle>
                <CardDescription>Total trading volume and net cash flow over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyVolumeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="totalVolume" 
                        stackId="1"
                        stroke="hsl(var(--chart-1))" 
                        fill="hsl(var(--chart-1))"
                        name="Total Volume"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="netFlow" 
                        stackId="2"
                        stroke="hsl(var(--chart-2))" 
                        fill="hsl(var(--chart-2))"
                        name="Net Flow"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="by-sector" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sector Trading Activity</CardTitle>
                <CardDescription>Transaction volume and frequency by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectorData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sector" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="volume" fill="hsl(var(--chart-1))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Trading Summary</CardTitle>
                <CardDescription>Detailed breakdown of trading activity by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sector</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Avg Size</TableHead>
                      <TableHead>Net Direction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sectorSummaryData.map((sector, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{sector.sector}</TableCell>
                        <TableCell>{sector.transactions}</TableCell>
                        <TableCell>{sector.volume}</TableCell>
                        <TableCell>{sector.avgSize}</TableCell>
                        <TableCell>
                          <Badge variant={
                            sector.netDirection === 'Buy' ? 'default' : 
                            sector.netDirection === 'Sell' ? 'destructive' : 'secondary'
                          }>
                            {sector.netDirection}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Performance Impact</CardTitle>
                <CardDescription>How trading activity has contributed to portfolio performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="security" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="totalReturn" fill="hsl(var(--primary))" name="Total Return %" />
                      <Bar dataKey="portfolioContribution" fill="hsl(var(--chart-1))" name="Portfolio Contribution %" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Performance Summary</CardTitle>
                <CardDescription>Individual security performance from trading activity</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Security</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Total Return</TableHead>
                      <TableHead>Portfolio Contribution</TableHead>
                      <TableHead>Total Fees</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityPerformanceData.map((security, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{security.security}</TableCell>
                        <TableCell>{security.transactions}</TableCell>
                        <TableCell className={security.totalReturn.startsWith('+') ? 'text-primary' : 'text-destructive'}>
                          {security.totalReturn}
                        </TableCell>
                        <TableCell className={security.portfolioContribution.startsWith('+') ? 'text-primary' : 'text-destructive'}>
                          {security.portfolioContribution}
                        </TableCell>
                        <TableCell>{security.totalFees}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trading Strategy Performance</CardTitle>
                <CardDescription>Success rates and returns by investment strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={strategyPerformanceData}>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {strategyPerformanceData.map((strategy, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{strategy.strategy}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Success Rate:</span>
                          <span className="font-medium">{strategy.successRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Avg Return:</span>
                          <span className="font-medium text-primary">{strategy.avgReturn}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

