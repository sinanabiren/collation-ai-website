'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Target, BarChart, PieChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Link from "next/link";

export default function InstitutionalTWRDashboardPage() {
  const [activeTab, setActiveTab] = useState('twr-performance');

  // TWR Performance data
  const twrPerformanceData = [
    { 
      fund: 'Institutional Fund A', 
      oneYear: 14.6, 
      threeYear: 11.8, 
      fiveYear: 9.4, 
      irr: 12.2,
      volatility: 12.4,
      sharpe: 1.17,
      maxDD: -8.2,
      beta: 1.05
    },
    { 
      fund: 'Institutional Fund B', 
      oneYear: 16.2, 
      threeYear: 13.1, 
      fiveYear: 10.8, 
      irr: 14.1,
      volatility: 14.1,
      sharpe: 1.25,
      maxDD: -9.8,
      beta: 1.18
    },
    { 
      fund: 'Institutional Fund C', 
      oneYear: 12.8, 
      threeYear: 10.5, 
      fiveYear: 8.9, 
      irr: 10.8,
      volatility: 10.8,
      sharpe: 1.02,
      maxDD: -6.5,
      beta: 0.92
    },
    { 
      fund: 'Institutional Fund D', 
      oneYear: 18.1, 
      threeYear: 15.2, 
      fiveYear: 12.1, 
      irr: 16.8,
      volatility: 16.2,
      sharpe: 1.42,
      maxDD: -12.1,
      beta: 1.35
    },
    { 
      fund: 'Institutional Fund E', 
      oneYear: 11.4, 
      threeYear: 9.8, 
      fiveYear: 7.6, 
      irr: 9.2,
      volatility: 9.5,
      sharpe: 0.85,
      maxDD: -5.8,
      beta: 0.88
    }
  ];

  // Chart data for multi-period analysis
  const multiPeriodData = twrPerformanceData.map(item => ({
    fund: item.fund.replace('Institutional ', ''),
    '1Y': item.oneYear,
    '3Y': item.threeYear,
    '5Y': item.fiveYear
  }));

  // Quarterly TWR trends
  const quarterlyTrendsData = [
    { quarter: 'Q1 2022', fundA: 3.2, fundB: 4.1, fundC: 2.8, fundD: 5.2, fundE: 2.1, benchmark: 2.9 },
    { quarter: 'Q2 2022', fundA: 2.8, fundB: 3.5, fundC: 2.4, fundD: 4.8, fundE: 1.8, benchmark: 2.6 },
    { quarter: 'Q3 2022', fundA: 3.8, fundB: 4.2, fundC: 3.1, fundD: 5.8, fundE: 2.5, benchmark: 3.2 },
    { quarter: 'Q4 2022', fundA: 2.1, fundB: 2.8, fundC: 1.9, fundD: 3.5, fundE: 1.2, benchmark: 2.1 },
    { quarter: 'Q1 2023', fundA: 4.2, fundB: 4.8, fundC: 3.6, fundD: 6.1, fundE: 2.9, benchmark: 3.8 },
    { quarter: 'Q2 2023', fundA: 3.9, fundB: 4.5, fundC: 3.3, fundD: 5.7, fundE: 2.7, benchmark: 3.5 },
    { quarter: 'Q3 2023', fundA: 4.1, fundB: 4.7, fundC: 3.5, fundD: 5.9, fundE: 2.8, benchmark: 3.7 },
    { quarter: 'Q4 2023', fundA: 3.7, fundB: 4.3, fundC: 3.1, fundD: 5.5, fundE: 2.6, benchmark: 3.3 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'twr-performance':
        return (
          <div className="space-y-6">
            {/* Time-Weighted Return Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Time-Weighted Return Performance</CardTitle>
                <p className="text-sm text-muted-foreground">Multi-period TWR analysis across institutional portfolios</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsBarChart data={multiPeriodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fund" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                    <Bar dataKey="1Y" fill="#4F46E5" name="1-Year TWR %" />
                    <Bar dataKey="3Y" fill="#10B981" name="3-Year TWR %" />
                    <Bar dataKey="5Y" fill="#F59E0B" name="5-Year TWR %" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <p className="text-sm text-muted-foreground">Comprehensive TWR and IRR metrics</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Fund</span>
                    <span>1Y TWR</span>
                    <span>3Y TWR</span>
                    <span>5Y TWR</span>
                    <span>IRR</span>
                  </div>
                  {twrPerformanceData.map((item) => (
                    <div key={item.fund} className="grid grid-cols-5 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.fund}</span>
                      <span className="font-bold text-blue-600">{item.oneYear}%</span>
                      <span className="font-bold">{item.threeYear}%</span>
                      <span className="font-bold">{item.fiveYear}%</span>
                      <span className="font-bold">{item.irr}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'quarterly-trends':
        return (
          <div className="space-y-6">
            {/* Quarterly TWR Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Quarterly TWR Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Quarterly time-weighted returns with benchmark comparison</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={quarterlyTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis domain={[0, 7]} />
                    <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                    <Line type="monotone" dataKey="fundA" stroke="#4F46E5" strokeWidth={2} name="Fund A" />
                    <Line type="monotone" dataKey="fundB" stroke="#10B981" strokeWidth={2} name="Fund B" />
                    <Line type="monotone" dataKey="fundC" stroke="#F59E0B" strokeWidth={2} name="Fund C" />
                    <Line type="monotone" dataKey="fundD" stroke="#EF4444" strokeWidth={2} name="Fund D" />
                    <Line type="monotone" dataKey="fundE" stroke="#8B5CF6" strokeWidth={2} name="Fund E" />
                    <Line type="monotone" dataKey="benchmark" stroke="#94A3B8" strokeWidth={3} strokeDasharray="5 5" name="Benchmark" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* TWR Methodology */}
            <Card>
              <CardHeader>
                <CardTitle>Time-Weighted Return Methodology</CardTitle>
                <p className="text-sm text-muted-foreground">Calculation methodology and use cases</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2">TWR Calculation:</h4>
                    <p>Eliminates the impact of cash flows to measure pure investment performance.</p>
                    <p className="mt-2 font-mono text-xs">Formula: TWR = [(1 + R₁) × (1 + R₂) × ... × (1 + Rₙ)] - 1</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2">Use Case:</h4>
                    <p>Ideal for comparing manager performance and benchmarking against indices.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'risk-metrics':
        return (
          <div className="space-y-6">
            {/* Risk-Adjusted Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Risk-Adjusted Metrics</CardTitle>
                <p className="text-sm text-muted-foreground">Volatility and risk measures</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Fund</span>
                    <span>Volatility</span>
                    <span>Sharpe</span>
                    <span>Max DD</span>
                    <span>Beta</span>
                  </div>
                  {twrPerformanceData.map((item) => (
                    <div key={item.fund} className="grid grid-cols-5 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.fund}</span>
                      <span className="font-bold">{item.volatility}%</span>
                      <span className="font-bold">{item.sharpe}</span>
                      <span className="font-bold text-red-600">{item.maxDD}%</span>
                      <span className="font-bold">{item.beta}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <p className="text-sm text-muted-foreground">Highest risk-adjusted returns</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {twrPerformanceData
                      .sort((a, b) => b.sharpe - a.sharpe)
                      .slice(0, 3)
                      .map((item, index) => (
                        <div key={item.fund} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                          <div>
                            <p className="font-medium">{item.fund}</p>
                            <p className="text-sm text-muted-foreground">Sharpe Ratio: {item.sharpe}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">#{index + 1}</p>
                            <p className="text-sm text-muted-foreground">{item.oneYear}% 1Y TWR</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Statistics</CardTitle>
                  <p className="text-sm text-muted-foreground">Portfolio risk overview</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="font-medium">Average Volatility</span>
                      <span className="font-bold">12.6%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="font-medium">Average Sharpe Ratio</span>
                      <span className="font-bold">1.14</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="font-medium">Max Drawdown Range</span>
                      <span className="font-bold">-5.8% to -12.1%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="font-medium">Average Beta</span>
                      <span className="font-bold">1.08</span>
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
            <h1 className="text-3xl font-bold">Institutional TWR Dashboard</h1>
            <p className="text-muted-foreground">Time-weighted return calculations and analysis for institutional portfolios</p>
            <div className="flex space-x-2 mt-2">
              <Badge variant="secondary">TWR</Badge>
              <Badge variant="secondary">Institutional</Badge>
              <Badge variant="secondary">Returns</Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average 1Y TWR</p>
                  <p className="text-2xl font-bold">14.6%</p>
                  <p className="text-xs text-muted-foreground">Across all funds</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total AUM</p>
                  <p className="text-2xl font-bold">$10.1B</p>
                  <p className="text-xs text-muted-foreground">Under management</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Best Performer</p>
                  <p className="text-2xl font-bold">18.1%</p>
                  <p className="text-xs text-muted-foreground">1-year TWR</p>
                </div>
                <BarChart className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fund Count</p>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-muted-foreground">Active funds</p>
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
              { id: 'twr-performance', label: 'TWR Performance' },
              { id: 'quarterly-trends', label: 'Quarterly Trends' },
              { id: 'risk-metrics', label: 'Risk Metrics' },
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

