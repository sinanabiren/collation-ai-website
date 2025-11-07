'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Target, BarChart, PieChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, ComposedChart, Line, Pie } from 'recharts';
import Link from "next/link";

export default function DirectAlphaAllocationDashboardPage() {
  const [activeTab, setActiveTab] = useState('performance-attribution');

  // Allocation category data
  const allocationData = [
    { category: 'US Large Cap Equity', alpha: 5.8, allocation: 35, value: 52.5, performance: 12.4, beta: 1.05 },
    { category: 'International Developed', alpha: 7.2, allocation: 20, value: 30.0, performance: 15.1, beta: 0.92 },
    { category: 'Emerging Markets', alpha: 12.5, allocation: 10, value: 15.0, performance: 22.8, beta: 1.35 },
    { category: 'Private Equity', alpha: 15.2, allocation: 15, value: 22.5, performance: 28.9, beta: 1.68 },
    { category: 'Real Estate', alpha: 4.1, allocation: 8, value: 12.0, performance: 8.7, beta: 0.75 },
    { category: 'Fixed Income', alpha: 2.3, allocation: 7, value: 10.5, performance: 5.1, beta: 0.15 },
    { category: 'Commodities', alpha: 8.9, allocation: 5, value: 7.5, performance: 18.2, beta: 0.45 }
  ];

  // Performance attribution data for stacked bars
  const attributionData = [
    { 
      category: 'US Large Cap Equity', 
      securitySelection: 3.2, 
      allocationEffect: 1.8, 
      interaction: 0.8,
      total: 5.8 
    },
    { 
      category: 'International Developed', 
      securitySelection: 4.1, 
      allocationEffect: 2.2, 
      interaction: 0.9,
      total: 7.2 
    },
    { 
      category: 'Emerging Markets', 
      securitySelection: 7.8, 
      allocationEffect: 3.1, 
      interaction: 1.6,
      total: 12.5 
    },
    { 
      category: 'Private Equity', 
      securitySelection: 9.2, 
      allocationEffect: 4.1, 
      interaction: 1.9,
      total: 15.2 
    },
    { 
      category: 'Real Estate', 
      securitySelection: 2.1, 
      allocationEffect: 1.4, 
      interaction: 0.6,
      total: 4.1 
    },
    { 
      category: 'Fixed Income', 
      securitySelection: 1.2, 
      allocationEffect: 0.8, 
      interaction: 0.3,
      total: 2.3 
    },
    { 
      category: 'Commodities', 
      securitySelection: 5.4, 
      allocationEffect: 2.1, 
      interaction: 1.4,
      total: 8.9 
    }
  ];

  // Chart data for attribution breakdown
  const attributionChartData = attributionData.map(item => ({
    category: item.category.replace(' Equity', '').replace(' Developed', '').replace(' Markets', '').replace(' Income', ''),
    securitySelection: item.securitySelection,
    allocationEffect: item.allocationEffect,
    interaction: item.interaction
  }));

  // Pie chart data for allocation distribution
  const allocationPieData = allocationData.map(item => ({
    name: item.category.replace(' Equity', '').replace(' Developed', '').replace(' Markets', '').replace(' Income', ''),
    value: item.allocation,
    color: item.category === 'US Large Cap Equity' ? '#3B82F6' :
           item.category === 'International Developed' ? '#10B981' :
           item.category === 'Emerging Markets' ? '#F59E0B' :
           item.category === 'Private Equity' ? '#EF4444' :
           item.category === 'Real Estate' ? '#8B5CF6' :
           item.category === 'Fixed Income' ? '#06B6D4' :
           '#F97316'
  }));

  // Risk analysis data
  const riskData = [
    { category: 'US Large Cap Equity', risk: 8.2, totalRisk: 36 },
    { category: 'International Developed', risk: 11.5, totalRisk: 27 },
    { category: 'Emerging Markets', risk: 18.2, totalRisk: 18 },
    { category: 'Private Equity', risk: 22.1, totalRisk: 18 },
    { category: 'Real Estate', risk: 14.8, totalRisk: 9 },
    { category: 'Fixed Income', risk: 3.2, totalRisk: 0 },
    { category: 'Commodities', risk: 19.5, totalRisk: 18 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'performance-attribution':
        return (
          <div className="space-y-6">
            {/* Performance Attribution Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Attribution Breakdown</CardTitle>
                <p className="text-sm text-muted-foreground">Alpha sources by allocation category</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsBarChart data={attributionChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="category" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100}
                    />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                    <Bar dataKey="securitySelection" stackId="a" fill="#4F46E5" name="Security Selection" />
                    <Bar dataKey="allocationEffect" stackId="a" fill="#F59E0B" name="Allocation Effect" />
                    <Bar dataKey="interaction" stackId="a" fill="#10B981" name="Interaction" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Attribution Analysis Details */}
            <Card>
              <CardHeader>
                <CardTitle>Attribution Analysis Details</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed breakdown of alpha sources</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Category</span>
                    <span>Security Selection</span>
                    <span>Allocation Effect</span>
                    <span>Interaction</span>
                    <span>Total Alpha</span>
                  </div>
                  {attributionData.map((item) => (
                    <div key={item.category} className="grid grid-cols-5 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.category}</span>
                      <span className="font-bold text-green-600">+{item.securitySelection}%</span>
                      <span className="font-bold text-blue-600">+{item.allocationEffect}%</span>
                      <span className="font-bold text-purple-600">+{item.interaction}%</span>
                      <span className="font-bold text-green-600">+{item.total}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'category-analysis':
        return (
          <div className="space-y-6">
            {/* Alpha by Allocation Category Table */}
            <Card>
              <CardHeader>
                <CardTitle>Alpha by Allocation Category</CardTitle>
                <p className="text-sm text-muted-foreground">Direct alpha generation across asset categories</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Category</span>
                    <span>Alpha</span>
                    <span>Allocation</span>
                    <span>Value</span>
                    <span>Performance</span>
                    <span>Beta</span>
                  </div>
                  {allocationData.map((item) => (
                    <div key={item.category} className="grid grid-cols-6 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.category}</span>
                      <span className="font-bold text-green-600">+{item.alpha}%</span>
                      <span className="font-bold">{item.allocation}%</span>
                      <span className="font-bold">${item.value}M</span>
                      <span className="font-bold text-green-600">+{item.performance}%</span>
                      <span className="font-bold">{item.beta}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Allocation Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Allocation Distribution</CardTitle>
                  <p className="text-sm text-muted-foreground">Portfolio allocation by category</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        dataKey="value"
                        data={allocationPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {allocationPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Alpha vs Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle>Alpha vs Allocation</CardTitle>
                  <p className="text-sm text-muted-foreground">Alpha generation relative to allocation size</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={allocationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="category" 
                        angle={-45} 
                        textAnchor="end" 
                        height={100}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                      <Bar dataKey="alpha" fill="hsl(var(--primary))" name="Alpha %" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'risk-analysis':
        return (
          <div className="space-y-6">
            {/* Risk Contribution by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Contribution by Category</CardTitle>
                <p className="text-sm text-muted-foreground">Total, specific, and systematic risk breakdown</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="category" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value}`, '']} />
                    <Bar dataKey="risk" fill="hsl(var(--primary))" name="Risk Contribution" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Risk-Return Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Risk-Return Profile</CardTitle>
                <p className="text-sm text-muted-foreground">Risk vs alpha for each category</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Category</span>
                    <span>Alpha</span>
                    <span>Risk Contribution</span>
                    <span>Risk-Adjusted Return</span>
                  </div>
                  {riskData.map((item, index) => {
                    const alphaData = allocationData.find(a => a.category === item.category);
                    const riskAdjusted = alphaData ? (alphaData.alpha / item.risk).toFixed(2) : '0.00';
                    return (
                      <div key={item.category} className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-muted/50">
                        <span className="font-medium">{item.category}</span>
                        <span className="font-bold text-green-600">+{alphaData?.alpha}%</span>
                        <span className="font-bold">{item.risk}</span>
                        <span className="font-bold">{riskAdjusted}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'alpha-trends':
        return (
          <div className="space-y-6">
            {/* Alpha Evolution by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Alpha Evolution by Category</CardTitle>
                <p className="text-sm text-muted-foreground">Quarterly alpha trends across categories</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={[
                    { quarter: 'Q1 2023', privateEquity: 14.8, emergingMarkets: 11.2, commodities: 8.1, international: 6.8, usLargeCap: 5.2, realEstate: 3.8, fixedIncome: 2.1 },
                    { quarter: 'Q2 2023', privateEquity: 15.0, emergingMarkets: 11.8, commodities: 8.5, international: 7.0, usLargeCap: 5.5, realEstate: 4.0, fixedIncome: 2.2 },
                    { quarter: 'Q3 2023', privateEquity: 15.1, emergingMarkets: 12.2, commodities: 8.7, international: 7.1, usLargeCap: 5.7, realEstate: 4.1, fixedIncome: 2.3 },
                    { quarter: 'Q4 2023', privateEquity: 15.2, emergingMarkets: 12.5, commodities: 8.9, international: 7.2, usLargeCap: 5.8, realEstate: 4.1, fixedIncome: 2.3 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                    <Line type="monotone" dataKey="privateEquity" stroke="#EF4444" strokeWidth={2} name="Private Equity" />
                    <Line type="monotone" dataKey="emergingMarkets" stroke="#F59E0B" strokeWidth={2} name="Emerging Markets" />
                    <Line type="monotone" dataKey="commodities" stroke="#F97316" strokeWidth={2} name="Commodities" />
                    <Line type="monotone" dataKey="international" stroke="#10B981" strokeWidth={2} name="International" />
                    <Line type="monotone" dataKey="usLargeCap" stroke="#3B82F6" strokeWidth={2} name="US Large Cap" />
                    <Line type="monotone" dataKey="realEstate" stroke="#8B5CF6" strokeWidth={2} name="Real Estate" />
                    <Line type="monotone" dataKey="fixedIncome" stroke="#06B6D4" strokeWidth={2} name="Fixed Income" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Performance Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Best Performing Categories</CardTitle>
                  <p className="text-sm text-muted-foreground">Top alpha generators</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {allocationData
                      .sort((a, b) => b.alpha - a.alpha)
                      .slice(0, 4)
                      .map((item, index) => (
                        <div key={item.category} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                          <div>
                            <p className="font-medium">{item.category}</p>
                            <p className="text-sm text-muted-foreground">Allocation: {item.allocation}%</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">+{item.alpha}%</p>
                            <p className="text-sm text-muted-foreground">#{index + 1}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk-Adjusted Performance</CardTitle>
                  <p className="text-sm text-muted-foreground">Alpha per unit of risk</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {allocationData
                      .map(item => {
                        const riskItem = riskData.find(r => r.category === item.category);
                        return {
                          ...item,
                          riskAdjusted: riskItem ? item.alpha / riskItem.risk : 0
                        };
                      })
                      .sort((a, b) => b.riskAdjusted - a.riskAdjusted)
                      .slice(0, 4)
                      .map((item, index) => (
                        <div key={item.category} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                          <div>
                            <p className="font-medium">{item.category}</p>
                            <p className="text-sm text-muted-foreground">Alpha: +{item.alpha}%</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{item.riskAdjusted.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">Risk-Adj</p>
                          </div>
                        </div>
                      ))}
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
            <h1 className="text-3xl font-bold">Direct Alpha (Allocation Category)</h1>
            <p className="text-muted-foreground">Alpha generation analysis across different allocation categories</p>
            <div className="flex space-x-2 mt-2">
              <Badge variant="secondary">Direct Alpha</Badge>
              <Badge variant="secondary">Allocation</Badge>
              <Badge variant="secondary">Categories</Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Categories</p>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-xs text-muted-foreground">Asset categories</p>
                </div>
                <BarChart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Weighted Avg Alpha</p>
                  <p className="text-2xl font-bold text-green-600">+7.8%</p>
                  <p className="text-xs text-muted-foreground">Portfolio alpha</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Best Category</p>
                  <p className="text-2xl font-bold text-green-600">+15.2%</p>
                  <p className="text-xs text-muted-foreground">Private Equity</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total AUM</p>
                  <p className="text-2xl font-bold">$150M</p>
                  <p className="text-xs text-muted-foreground">Total assets</p>
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
              { id: 'category-analysis', label: 'Category Analysis' },
              { id: 'performance-attribution', label: 'Performance Attribution' },
              { id: 'risk-analysis', label: 'Risk Analysis' },
              { id: 'alpha-trends', label: 'Alpha Trends' },
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

