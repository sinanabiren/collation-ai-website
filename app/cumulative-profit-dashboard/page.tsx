'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, DollarSign, BarChart, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from "next/link";

export default function CumulativeProfitDashboardPage() {
  const [activeTab, setActiveTab] = useState('cumulative');

  // Portfolio value vs cumulative profit data matching your screenshots
  const portfolioData = [
    { month: 'Jan 2023', portfolioValue: 50000, cumulativeProfit: 25000 },
    { month: 'Feb 2023', portfolioValue: 65000, cumulativeProfit: 35000 },
    { month: 'Mar 2023', portfolioValue: 58000, cumulativeProfit: 28000 },
    { month: 'Apr 2023', portfolioValue: 85000, cumulativeProfit: 55000 },
    { month: 'May 2023', portfolioValue: 120000, cumulativeProfit: 90000 },
    { month: 'Jun 2023', portfolioValue: 135000, cumulativeProfit: 105000 },
    { month: 'Jul 2023', portfolioValue: 148000, cumulativeProfit: 118000 },
    { month: 'Aug 2023', portfolioValue: 142000, cumulativeProfit: 112000 },
    { month: 'Sep 2023', portfolioValue: 168000, cumulativeProfit: 138000 },
    { month: 'Oct 2023', portfolioValue: 185000, cumulativeProfit: 155000 },
    { month: 'Nov 2023', portfolioValue: 205000, cumulativeProfit: 175000 },
    { month: 'Dec 2023', portfolioValue: 365000, cumulativeProfit: 335000 }
  ];

  // Monthly profit distribution matching your screenshots
  const monthlyData = [
    { month: 'Jan 2023', profit: 25000 },
    { month: 'Feb 2023', profit: 32000 },
    { month: 'Mar 2023', profit: -7000 },
    { month: 'Apr 2023', profit: 43000 },
    { month: 'May 2023', profit: 38000 },
    { month: 'Jun 2023', profit: 27000 },
    { month: 'Jul 2023', profit: 41000 },
    { month: 'Aug 2023', profit: -15000 },
    { month: 'Sep 2023', profit: 55000 },
    { month: 'Oct 2023', profit: 46000 },
    { month: 'Nov 2023', profit: 33000 },
    { month: 'Dec 2023', profit: 38000 }
  ];

  // Category data matching your screenshots
  const categoryData = [
    { category: 'US Equities', profit: 185000, percentage: 50.7 },
    { category: 'International Equities', profit: 95000, percentage: 26.0 },
    { category: 'Fixed Income', profit: 42000, percentage: 11.5 },
    { category: 'Real Estate', profit: 28000, percentage: 7.7 },
    { category: 'Commodities', profit: 15000, percentage: 4.1 }
  ];

  // Quarterly analysis data matching your screenshots
  const quarterlyData = [
    { quarter: 'Q1 2023', profit: 35000, trend: 60000 },
    { quarter: 'Q2 2023', profit: 65000, trend: 80000 },
    { quarter: 'Q3 2023', profit: 45000, trend: 90000 },
    { quarter: 'Q4 2023', profit: 85000, trend: 125000 }
  ];

  // Monthly performance summary table data
  const performanceSummary = [
    { month: 'Jul 2023', monthlyProfit: 42000, cumulativeProfit: 202000, portfolioValue: 1702000 },
    { month: 'Aug 2023', monthlyProfit: -15000, cumulativeProfit: 187000, portfolioValue: 1687000 },
    { month: 'Sep 2023', monthlyProfit: 55000, cumulativeProfit: 242000, portfolioValue: 1742000 },
    { month: 'Oct 2023', monthlyProfit: 48000, cumulativeProfit: 290000, portfolioValue: 1790000 },
    { month: 'Nov 2023', monthlyProfit: 35000, cumulativeProfit: 325000, portfolioValue: 1825000 },
    { month: 'Dec 2023', monthlyProfit: 40000, cumulativeProfit: 365000, portfolioValue: 1865000 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cumulative':
        return (
          <div className="space-y-6">
            {/* Portfolio Value vs Cumulative Profit Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Value vs Cumulative Profit</CardTitle>
                <p className="text-sm text-muted-foreground">Portfolio growth driven by profit generation</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, '']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cumulativeProfit" 
                      stackId="1" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.6}
                      name="Cumulative Profit"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );

      case 'profit':
        return (
          <div className="space-y-6">
            {/* Monthly Profit Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Profit Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">Profit generation by month</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [
                        `$${(value / 1000).toFixed(0)}K`, 
                        'Monthly Profit'
                      ]}
                    />
                    <Bar 
                      dataKey="profit" 
                      fill="hsl(var(--primary))"
                      name="profit"
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Performance Summary Table */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Summary</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed monthly profit breakdown</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Month</span>
                    <span>Monthly Profit</span>
                    <span>Cumulative Profit</span>
                    <span>Portfolio Value</span>
                  </div>
                  {performanceSummary.map((item) => (
                    <div key={item.month} className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.month}</span>
                      <span className={`font-bold ${item.monthlyProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.monthlyProfit > 0 ? '+' : ''}${Math.abs(item.monthlyProfit / 1000).toFixed(0)}K
                      </span>
                      <span className="font-bold">${(item.cumulativeProfit / 1000).toFixed(0)}K</span>
                      <span className="font-bold">${(item.portfolioValue / 1000000).toFixed(2)}M</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'analysis':
        return (
          <div className="space-y-6">
            {/* Profit by Investment Category */}
            <Card>
              <CardHeader>
                <CardTitle>Profit by Investment Category</CardTitle>
                <p className="text-sm text-muted-foreground">Contribution to total profit by asset class</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Performance Details */}
            <Card>
              <CardHeader>
                <CardTitle>Category Performance Details</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed breakdown by investment category</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Category</span>
                    <span>Total Profit</span>
                    <span>% of Total</span>
                    <span>Avg Monthly</span>
                  </div>
                  {[
                    { category: 'US Equities', totalProfit: 185000, percentage: 50.7, avgMonthly: 15417 },
                    { category: 'International Equities', totalProfit: 95000, percentage: 26.0, avgMonthly: 7917 },
                    { category: 'Fixed Income', totalProfit: 42000, percentage: 11.5, avgMonthly: 3500 },
                    { category: 'Real Estate', totalProfit: 28000, percentage: 7.7, avgMonthly: 2333 },
                    { category: 'Commodities', totalProfit: 15000, percentage: 4.1, avgMonthly: 1250 }
                  ].map((item) => (
                    <div key={item.category} className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.category}</span>
                      <span className="font-bold text-green-600">${(item.totalProfit / 1000).toFixed(0)}K</span>
                      <span className="font-bold">{item.percentage}%</span>
                      <span className="font-bold">${(item.avgMonthly / 1000).toFixed(1)}K</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quarterly Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quarterly Profit Analysis</CardTitle>
                  <p className="text-sm text-muted-foreground">Realized vs unrealized gains by quarter</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsBarChart data={quarterlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, '']} />
                      <Bar dataKey="profit" fill="hsl(var(--primary))" name="Quarterly Profit" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profit Trend</CardTitle>
                  <p className="text-sm text-muted-foreground">Quarterly profit progression</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={quarterlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, 'Trend']} />
                      <Line type="monotone" dataKey="trend" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Key Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
                <p className="text-sm text-muted-foreground">Summary metrics</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">Total Profit</span>
                    <p className="font-bold text-green-600">$365,000</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">Profit Margin</span>
                    <p className="font-bold">19.6%</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">Best Quarter</span>
                    <p className="font-bold text-green-600">Q4 2023</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">Consistency</span>
                    <p className="font-bold text-green-600">High</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">Growth Rate</span>
                    <p className="font-bold text-green-600">+24.3%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );


      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          
          <Link href="/build-report"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports Gallery
          </Link>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Cumulative Profit Analysis</h1>
            <p className="text-muted-foreground">Detailed cumulative profit tracking across all investment categories</p>
            <div className="flex space-x-2 mt-2">
              <Badge variant="secondary">Cumulative</Badge>
              <Badge variant="secondary">Profit</Badge>
              <Badge variant="secondary">Analysis</Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Profit</p>
                  <p className="text-2xl font-bold text-green-600">$365,000</p>
                  <p className="text-xs text-muted-foreground">Year to date</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Average</p>
                  <p className="text-2xl font-bold">$30,417</p>
                  <p className="text-xs text-muted-foreground">Average per month</p>
                </div>
                <BarChart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Best Month</p>
                  <p className="text-2xl font-bold text-green-600">$55,000</p>
                  <p className="text-xs text-muted-foreground">Sep 2023</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">83%</p>
                  <p className="text-xs text-muted-foreground">10 of 12 months</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {[
              { id: 'cumulative', label: 'Cumulative Growth' },
              { id: 'profit', label: 'Monthly Breakdown' },
              { id: 'analysis', label: 'By Category' },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="text-sm"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

