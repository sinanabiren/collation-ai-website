'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, DollarSign, PieChart, Target } from 'lucide-react';
import { LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from "next/link";

export default function ExplainerDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const performanceData = [
    { date: 'Jan', portfolio: 102000, benchmark: 101000 },
    { date: 'Feb', portfolio: 105000, benchmark: 103000 },
    { date: 'Mar', portfolio: 108000, benchmark: 104000 },
    { date: 'Apr', portfolio: 112000, benchmark: 107000 },
    { date: 'May', portfolio: 118000, benchmark: 109000 },
    { date: 'Jun', portfolio: 125000, benchmark: 111000 },
  ];

  const allocationData = [
    { name: 'Equities', value: 60, color: '#3b82f6' },
    { name: 'Fixed Income', value: 25, color: '#10b981' },
    { name: 'Alternatives', value: 10, color: '#f59e0b' },
    { name: 'Cash', value: 5, color: '#ef4444' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
                      <p className="text-2xl font-bold">$1,250,000</p>
                      <p className="text-xs text-green-600">+12.5% from last year</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Return</p>
                      <p className="text-2xl font-bold">12.5%</p>
                      <p className="text-xs text-muted-foreground">Outperforming benchmark by 4.3%</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                      <p className="text-xl font-bold">Moderate</p>
                      <p className="text-xs text-muted-foreground">14.2% volatility</p>
                    </div>
                    <Target className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Holdings</p>
                      <p className="text-2xl font-bold">47</p>
                      <p className="text-xs text-muted-foreground">Across 4 asset classes</p>
                    </div>
                    <PieChart className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance vs Benchmark and Asset Allocation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance vs Benchmark</CardTitle>
                  <p className="text-sm text-muted-foreground">Portfolio performance compared to market benchmark</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                      <Line type="monotone" dataKey="portfolio" stroke="hsl(var(--primary))" strokeWidth={2} name="Portfolio" />
                      <Line type="monotone" dataKey="benchmark" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={2} name="Benchmark" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <p className="text-sm text-muted-foreground">Current portfolio allocation by asset class</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={allocationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, '']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {allocationData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed performance metrics with explanations</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="portfolio" stroke="hsl(var(--primary))" strokeWidth={3} />
                    <Line type="monotone" dataKey="benchmark" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );

      case 'allocation':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation Breakdown</CardTitle>
                  <p className="text-sm text-muted-foreground">Current allocation percentages</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={140}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Allocation Details</CardTitle>
                  <p className="text-sm text-muted-foreground">Breakdown by asset class</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {allocationData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="text-lg font-bold">{item.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Return Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Return</span>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">12.5%</p>
                      <p className="text-xs text-muted-foreground">Portfolio</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">8.2%</p>
                      <p className="text-xs text-muted-foreground">Benchmark</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Annualized Return</span>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">8.7%</p>
                      <p className="text-xs text-muted-foreground">Portfolio</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">6.1%</p>
                      <p className="text-xs text-muted-foreground">Benchmark</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Volatility</span>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">14.2%</p>
                      <p className="text-xs text-muted-foreground">Portfolio</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">16.8%</p>
                      <p className="text-xs text-muted-foreground">Benchmark</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sharpe Ratio</span>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">0.61</p>
                      <p className="text-xs text-muted-foreground">Portfolio</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">0.36</p>
                      <p className="text-xs text-muted-foreground">Benchmark</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Max Drawdown</span>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">-8.3%</p>
                      <p className="text-xs text-muted-foreground">Portfolio</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">-12.1%</p>
                      <p className="text-xs text-muted-foreground">Benchmark</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Alpha</span>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">2.6%</p>
                      <p className="text-xs text-muted-foreground">Portfolio</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">0.0%</p>
                      <p className="text-xs text-muted-foreground">Benchmark</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
            <h1 className="text-3xl font-bold">Explainer Dashboard</h1>
            <p className="text-muted-foreground">Interactive dashboard explaining all financial calculations and metrics</p>
            <div className="flex space-x-2 mt-2">
              <Badge variant="secondary">Educational</Badge>
              <Badge variant="secondary">Calculations</Badge>
              <Badge variant="secondary">Interactive</Badge>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'performance', label: 'Performance' },
              { id: 'allocation', label: 'Allocation' },
              { id: 'metrics', label: 'Key Metrics' },
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

