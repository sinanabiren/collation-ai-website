'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calculator, TrendingUp, Target, BarChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Link from "next/link";

export default function KaplanSchoarPMEDashboardPage() {
  const [activeTab, setActiveTab] = useState('allocation-analysis');

  // PME by allocation data matching your screenshots
  const pmeAllocationData = [
    { allocation: 'Private Equity Fund A', pme: 1.23, irr: 18.5, multiple: 2.1, nav: 25000000 },
    { allocation: 'Venture Capital Fund B', pme: 1.45, irr: 24.2, multiple: 2.8, nav: 18000000 },
    { allocation: 'Growth Equity Fund C', pme: 1.12, irr: 14.7, multiple: 1.6, nav: 32000000 },
    { allocation: 'Real Estate Fund D', pme: 1.08, irr: 12.3, multiple: 1.4, nav: 15000000 },
    { allocation: 'Infrastructure Fund E', pme: 1.18, irr: 15.8, multiple: 1.8, nav: 22000000 },
    { allocation: 'Buyout Fund F', pme: 1.31, irr: 20.1, multiple: 2.3, nav: 28000000 }
  ];

  // Performance tracking data
  const performanceData = [
    { quarter: 'Q1 2023', pmeRatio: 1.15, benchmark: 1.0 },
    { quarter: 'Q2 2023', pmeRatio: 1.18, benchmark: 1.0 },
    { quarter: 'Q3 2023', pmeRatio: 1.21, benchmark: 1.0 },
    { quarter: 'Q4 2023', pmeRatio: 1.21, benchmark: 1.0 }
  ];

  // Methodology comparison data
  const methodologyData = [
    { allocation: 'PE Fund A', kaplanSchoar: 1.23, directAlpha: 0.185, longNickell: 1.19 },
    { allocation: 'VC Fund B', kaplanSchoar: 1.45, directAlpha: 0.242, longNickell: 1.38 },
    { allocation: 'Growth Fund C', kaplanSchoar: 1.12, directAlpha: 0.147, longNickell: 1.09 },
    { allocation: 'RE Fund D', kaplanSchoar: 1.08, directAlpha: 0.123, longNickell: 1.05 },
    { allocation: 'Infra Fund E', kaplanSchoar: 1.18, directAlpha: 0.158, longNickell: 1.15 },
    { allocation: 'Buyout Fund F', kaplanSchoar: 1.31, directAlpha: 0.201, longNickell: 1.27 }
  ];

  // Performance ranking data
  const performanceRanking = [
    { rank: 1, fund: 'Venture Capital Fund B', pme: 1.45, irr: 24.2 },
    { rank: 2, fund: 'Buyout Fund F', pme: 1.31, irr: 20.1 },
    { rank: 3, fund: 'Private Equity Fund A', pme: 1.23, irr: 18.5 },
    { rank: 4, fund: 'Infrastructure Fund E', pme: 1.18, irr: 15.8 },
    { rank: 5, fund: 'Growth Equity Fund C', pme: 1.12, irr: 14.7 },
    { rank: 6, fund: 'Real Estate Fund D', pme: 1.08, irr: 12.3 }
  ];

  // Allocation size distribution data for pie chart
  const allocationSizeData = [
    { name: 'Buyout', value: 20, fill: '#FFA500' },
    { name: 'Private', value: 18, fill: '#90EE90' },
    { name: 'Venture', value: 13, fill: '#FF6B6B' },
    { name: 'Real', value: 11, fill: '#4ECDC4' },
    { name: 'Growth', value: 23, fill: '#45B7D1' },
    { name: 'Infrastructure', value: 16, fill: '#96CEB4' }
  ];

  // Key performance indicators data
  const kpiData = [
    { metric: 'Portfolio PME', value: 1.21, color: 'text-green-600' },
    { metric: 'Excess Return', value: '+12.8%', color: 'text-green-600' },
    { metric: 'Best Performer', value: 'VC Fund B (1.45)', color: 'text-green-600' },
    { metric: 'Total Allocations', value: '6', color: 'text-primary' },
    { metric: 'Average IRR', value: '17.6%', color: 'text-primary' }
  ];

  // Performance distribution data
  const performanceDistribution = [
    { category: 'Below 1.0 (Underperforming)', count: 0, percentage: 0 },
    { category: '1.0 - 1.2 (Meeting benchmark)', count: 3, percentage: 50 },
    { category: 'Above 1.2 (Outperforming)', count: 3, percentage: 50 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'allocation-analysis':
        return (
          <div className="space-y-6">
            {/* Kaplan-Schoar PME by Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Kaplan-Schoar PME by Allocation</CardTitle>
                <p className="text-sm text-muted-foreground">Individual allocation performance using Kaplan-Schoar methodology</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Allocation</span>
                    <span>PME</span>
                    <span>IRR</span>
                    <span>Multiple</span>
                    <span>NAV</span>
                  </div>
                  {pmeAllocationData.map((item) => (
                    <div key={item.allocation} className="grid grid-cols-5 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.allocation}</span>
                      <span className={`font-bold ${item.pme > 1.2 ? 'text-green-600' : item.pme > 1.0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {item.pme.toFixed(2)}
                      </span>
                      <span className="font-bold">{item.irr}%</span>
                      <span className="font-bold">{item.multiple}x</span>
                      <span className="font-bold">${(item.nav / 1000000).toFixed(0)}M</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* PME Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>PME Distribution by Allocation</CardTitle>
                <p className="text-sm text-muted-foreground">Visual representation of PME performance</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={pmeAllocationData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 1.6]} />
                    <YAxis dataKey="allocation" type="category" width={120} />
                    <Tooltip formatter={(value: number) => [value.toFixed(2), 'PME']} />
                    <Bar dataKey="pme" fill="hsl(var(--primary))" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );

      case 'performance-tracking':
        return (
          <div className="space-y-6">
            {/* Quarterly PME Progression */}
            <Card>
              <CardHeader>
                <CardTitle>Quarterly PME Progression</CardTitle>
                <p className="text-sm text-muted-foreground">Portfolio PME evolution over time</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis domain={[0.8, 1.4]} />
                    <Tooltip formatter={(value: number) => [value.toFixed(2), '']} />
                    <Line type="monotone" dataKey="pmeRatio" stroke="hsl(var(--primary))" strokeWidth={2} name="PME Ratio" />
                    <Line type="monotone" dataKey="benchmark" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={2} name="Benchmark" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Ranking */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Ranking</CardTitle>
                  <p className="text-sm text-muted-foreground">Allocations ranked by PME</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {performanceRanking.map((item) => (
                      <div key={item.rank} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-lg">#{item.rank}</span>
                          <span className="font-medium text-sm">{item.fund}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{item.pme.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">{item.irr}% IRR</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Allocation Size Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Allocation Size Distribution</CardTitle>
                  <p className="text-sm text-muted-foreground">NAV distribution across allocations</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={allocationSizeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {allocationSizeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {allocationSizeData.map((entry) => (
                      <div key={entry.name} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: entry.fill }}></div>
                        <span>{entry.name} {entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'methodology-comparison':
        return (
          <div className="space-y-6">
            {/* Methodology Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Methodology Comparison</CardTitle>
                <p className="text-sm text-muted-foreground">Kaplan-Schoar vs other PME methodologies</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Allocation</span>
                    <span>Kaplan-Schoar</span>
                    <span>Direct Alpha</span>
                    <span>Long-Nickell</span>
                  </div>
                  {methodologyData.map((item) => (
                    <div key={item.allocation} className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.allocation}</span>
                      <span className="font-bold text-green-600">{item.kaplanSchoar.toFixed(2)}</span>
                      <span className="font-bold text-blue-600">{item.directAlpha.toFixed(3)}</span>
                      <span className="font-bold text-purple-600">{item.longNickell.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Methodology Performance Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Methodology Performance Comparison</CardTitle>
                <p className="text-sm text-muted-foreground">Visual comparison of different PME approaches</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={methodologyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="allocation" />
                    <YAxis domain={[0, 1.6]} />
                    <Tooltip formatter={(value: number) => [value.toFixed(2), '']} />
                    <Bar dataKey="kaplanSchoar" fill="hsl(var(--primary))" name="Kaplan-Schoar" />
                    <Bar dataKey="longNickell" fill="#94A3B8" name="Long-Nickell" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );

      case 'key-metrics':
        return (
          <div className="space-y-6">
            {/* Key Performance Indicators */}
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <p className="text-sm text-muted-foreground">Primary metrics summary</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kpiData.map((item) => (
                    <div key={item.metric} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="font-medium">{item.metric}</span>
                      <span className={`font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">PME range analysis</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceDistribution.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-muted-foreground">{item.count} allocations</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-6 relative">
                        <div 
                          className="bg-primary h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium" 
                          style={{ width: `${item.percentage}%` }}
                        >
                          {item.percentage > 0 && `${item.percentage}%`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-lg font-bold text-primary">$140M</p>
                  <p className="text-sm text-muted-foreground">Total NAV</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-lg font-bold text-green-600">21%</p>
                  <p className="text-sm text-muted-foreground">Outperformance</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-lg font-bold text-primary">6</p>
                  <p className="text-sm text-muted-foreground">Allocations</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-lg font-bold text-green-600">100%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
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
            <h1 className="text-3xl font-bold">Kaplan Schoar PME (Allocation Level)</h1>
            <p className="text-muted-foreground">Advanced PME calculation at allocation level using Kaplan-Schoar methodology</p>
            <div className="flex space-x-2 mt-2">
              <Badge variant="secondary">Kaplan-Schoar</Badge>
              <Badge variant="secondary">PME</Badge>
              <Badge variant="secondary">Allocation</Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Portfolio PME</p>
                  <p className="text-2xl font-bold text-green-600">1.21</p>
                  <p className="text-xs text-muted-foreground">Kaplan-Schoar methodology</p>
                </div>
                <Calculator className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Excess Return</p>
                  <p className="text-2xl font-bold text-green-600">+12.8%</p>
                  <p className="text-xs text-muted-foreground">vs benchmark</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total NAV</p>
                  <p className="text-2xl font-bold">$140M</p>
                  <p className="text-xs text-muted-foreground">Across 6 allocations</p>
                </div>
                <BarChart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average IRR</p>
                  <p className="text-2xl font-bold">17.6%</p>
                  <p className="text-xs text-muted-foreground">Weighted average</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {[
              { id: 'allocation-analysis', label: 'Allocation Analysis' },
              { id: 'performance-tracking', label: 'Performance Tracking' },
              { id: 'methodology-comparison', label: 'Methodology Comparison' },
              { id: 'key-metrics', label: 'Key Metrics' },
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

