'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Target, BarChart, PieChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, AreaChart, Area, Pie } from 'recharts';
import Link from "next/link";

export default function InstitutionalPLDashboardPage() => {
  const [activeTab, setActiveTab] = useState('pl-summary');

  // P&L Summary by Fund data
  const plSummaryData = [
    { fund: 'Institutional Fund A', realizedPL: 125.0, unrealizedPL: 89.0, totalPL: 214.0, plMargin: 8.5, performance: 'up' },
    { fund: 'Institutional Fund B', realizedPL: 98.0, unrealizedPL: 67.0, totalPL: 165.0, plMargin: 9.2, performance: 'up' },
    { fund: 'Institutional Fund C', realizedPL: 156.0, unrealizedPL: 112.0, totalPL: 268.0, plMargin: 8.4, performance: 'up' },
    { fund: 'Institutional Fund D', realizedPL: 78.0, unrealizedPL: 45.0, totalPL: 123.0, plMargin: 12.9, performance: 'up' },
    { fund: 'Institutional Fund E', realizedPL: 89.0, unrealizedPL: 58.0, totalPL: 147.0, plMargin: 9.2, performance: 'up' }
  ];

  // Monthly P&L Trends data
  const monthlyTrendsData = [
    { month: 'Jan 2023', value: 40 },
    { month: 'Feb 2023', value: 45 },
    { month: 'Mar 2023', value: 52 },
    { month: 'Apr 2023', value: 48 },
    { month: 'May 2023', value: 65 },
    { month: 'Jun 2023', value: 72 }
  ];

  // P&L Attribution by strategy data
  const attributionData = [
    { strategy: 'Equity Strategies', percentage: 42, color: '#4F46E5' },
    { strategy: 'Fixed Income', percentage: 25, color: '#10B981' },
    { strategy: 'Alternative Investments', percentage: 27, color: '#F59E0B' },
    { strategy: 'Currency Impact', percentage: 6, color: '#EF4444' }
  ];

  // Sector P&L Breakdown data
  const sectorData = [
    { sector: 'Technology', realizedPL: 95, unrealizedPL: 68, total: 163 },
    { sector: 'Healthcare', realizedPL: 42, unrealizedPL: 29, total: 71 },
    { sector: 'Financial Services', realizedPL: 65, unrealizedPL: 38, total: 103 },
    { sector: 'Consumer Goods', realizedPL: 32, unrealizedPL: 28, total: 60 },
    { sector: 'Energy', realizedPL: 23, unrealizedPL: 18, total: 41 },
    { sector: 'Industrials', realizedPL: 48, unrealizedPL: 34, total: 82 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pl-summary':
        return (
          <div className="space-y-6">
            {/* P&L Summary by Fund */}
            <Card>
              <CardHeader>
                <CardTitle>P&L Summary by Fund</CardTitle>
                <p className="text-sm text-muted-foreground">Realized vs. unrealized profit and loss breakdown</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsBarChart data={plSummaryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="fund" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`$${value}M`, '']} />
                    <Bar dataKey="realizedPL" fill="hsl(var(--primary))" name="Realized P&L" />
                    <Bar dataKey="unrealizedPL" fill="hsl(var(--muted))" name="Unrealized P&L" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Fund Performance Details */}
            <Card>
              <CardHeader>
                <CardTitle>Fund Performance Details</CardTitle>
                <p className="text-sm text-muted-foreground">Comprehensive P&L metrics by fund</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Fund</span>
                    <span>Realized P&L</span>
                    <span>Unrealized P&L</span>
                    <span>Total P&L</span>
                    <span>P&L Margin</span>
                    <span>Performance</span>
                  </div>
                  {plSummaryData.map((item) => (
                    <div key={item.fund} className="grid grid-cols-6 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.fund}</span>
                      <span className="font-bold">${item.realizedPL}M</span>
                      <span className="font-bold">${item.unrealizedPL}M</span>
                      <span className="font-bold text-blue-600">${item.totalPL}M</span>
                      <span className="font-bold">{item.plMargin}%</span>
                      <span className="font-bold text-green-600">↗</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'monthly-trends':
        return (
          <div className="space-y-6">
            {/* Monthly P&L Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly P&L Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Six-month profit and loss progression</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`$${value}M`, 'P&L']} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* P&L Attribution */}
            <Card>
              <CardHeader>
                <CardTitle>P&L Attribution</CardTitle>
                <p className="text-sm text-muted-foreground">Contribution by strategy and asset class</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        dataKey="percentage"
                        data={attributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ strategy, percentage }) => `${strategy}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {attributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  
                  <div className="space-y-4">
                    {attributionData.map((item) => (
                      <div key={item.strategy} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="font-medium">{item.strategy}</span>
                        </div>
                        <span className="font-bold">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'sector-breakdown':
        return (
          <div className="space-y-6">
            {/* Sector P&L Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Sector P&L Breakdown</CardTitle>
                <p className="text-sm text-muted-foreground">Realized and unrealized gains by sector</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsBarChart data={sectorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`$${value}M`, '']} />
                    <Bar dataKey="realizedPL" fill="#4F46E5" name="Realized P&L" />
                    <Bar dataKey="unrealizedPL" fill="#94A3B8" name="Unrealized P&L" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* P&L Attribution Methodology */}
            <Card>
              <CardHeader>
                <CardTitle>P&L Attribution Methodology</CardTitle>
                <p className="text-sm text-muted-foreground">Calculation methodology and definitions</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2">Realized P&L:</h4>
                    <p>Crystallized gains/losses from closed positions and distributions received.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2">Unrealized P&L:</h4>
                    <p>Mark-to-market gains/losses on current holdings based on latest valuations.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2">P&L Margin:</h4>
                    <p>Total P&L as a percentage of average invested capital during the period.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2">Attribution:</h4>
                    <p>Performance breakdown by strategy, asset class, sector, and geographic exposure.</p>
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
            <h1 className="text-3xl font-bold">Institutional P&L Dashboard</h1>
            <p className="text-muted-foreground">Profit and loss analysis with detailed performance attribution</p>
            <div className="flex space-x-2 mt-2">
              <Badge variant="secondary">P&L Analysis</Badge>
              <Badge variant="secondary">Attribution</Badge>
              <Badge variant="secondary">Performance</Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total P&L</p>
                  <p className="text-2xl font-bold">$917M</p>
                  <p className="text-xs text-muted-foreground">Realized + Unrealized</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Realized P&L</p>
                  <p className="text-2xl font-bold">$546M</p>
                  <p className="text-xs text-muted-foreground">Crystallized gains</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unrealized P&L</p>
                  <p className="text-2xl font-bold">$371M</p>
                  <p className="text-xs text-muted-foreground">Mark-to-market gains</p>
                </div>
                <BarChart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg P&L Margin</p>
                  <p className="text-2xl font-bold">9.6%</p>
                  <p className="text-xs text-muted-foreground">Across all funds</p>
                </div>
                <PieChart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {[
              { id: 'pl-summary', label: 'P&L Summary' },
              { id: 'monthly-trends', label: 'Monthly Trends' },
              { id: 'sector-breakdown', label: 'Sector Breakdown' },
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

