'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, BarChart, Target, Calculator } from 'lucide-react';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from "next/link";

export default function PublicMarketEquivalentDashboardPage() {
  const [activeTab, setActiveTab] = useState('pme-analysis');

  const pmeData = [
    { quarter: 'Q1 2023', pme: 100, benchmark: 100 },
    { quarter: 'Q2 2023', pme: 115, benchmark: 110 },
    { quarter: 'Q3 2023', pme: 122, benchmark: 118 },
    { quarter: 'Q4 2023', pme: 128, benchmark: 120 },
    { quarter: 'Q1 2024', pme: 135, benchmark: 125 },
    { quarter: 'Q2 2024', pme: 142, benchmark: 128 },
  ];

  const benchmarkData = [
    { name: 'S&P 500', pmeRatio: 1.114, alpha: 11.4, outperformance: 'Strong' },
    { name: 'Russell 2000', pmeRatio: 1.089, alpha: 8.9, outperformance: 'Moderate' },
    { name: 'MSCI World', pmeRatio: 1.125, alpha: 12.5, outperformance: 'Strong' },
    { name: 'NASDAQ', pmeRatio: 1.076, alpha: 7.6, outperformance: 'Moderate' },
  ];

  const alphaData = [
    { benchmark: 'S&P 500', alpha: 11.4 },
    { benchmark: 'Russell 2000', alpha: 8.9 },
    { benchmark: 'MSCI World', alpha: 12.5 },
    { benchmark: 'NASDAQ', alpha: 7.6 },
  ];

  const cashFlowData = [
    { quarter: 'Q1 2023', contributions: 6500000, distributions: 1500000 },
    { quarter: 'Q2 2023', contributions: 4200000, distributions: 1800000 },
    { quarter: 'Q3 2023', contributions: 3800000, distributions: 2200000 },
    { quarter: 'Q4 2023', contributions: 2100000, distributions: 2800000 },
    { quarter: 'Q1 2024', contributions: 1600000, distributions: 3200000 },
    { quarter: 'Q2 2024', contributions: 1200000, distributions: 3800000 },
  ];

  const vintageData = [
    { year: '2018', irr: 18.5, multiple: 2.1, pme: 1.23 },
    { year: '2019', irr: 22.3, multiple: 1.8, pme: 1.18 },
    { year: '2020', irr: 15.7, multiple: 1.6, pme: 1.09 },
    { year: '2021', irr: 12.4, multiple: 1.3, pme: 0.98 },
    { year: '2022', irr: 8.9, multiple: 1.1, pme: 0.89 },
    { year: '2023', irr: 6.2, multiple: 1.0, pme: 0.82 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pme-analysis':
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current PME</p>
                      <p className="text-2xl font-bold">1.114</p>
                      <p className="text-xs text-muted-foreground">vs S&P 500</p>
                    </div>
                    <Calculator className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Alpha Generation</p>
                      <p className="text-2xl font-bold text-green-600">+11.4%</p>
                      <p className="text-xs text-muted-foreground">Excess return</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Portfolio NAV</p>
                      <p className="text-2xl font-bold">$78M</p>
                      <p className="text-xs text-muted-foreground">Current value</p>
                    </div>
                    <BarChart className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Best Vintage</p>
                      <p className="text-2xl font-bold">2019</p>
                      <p className="text-xs text-muted-foreground">22.3% IRR</p>
                    </div>
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* PME Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>PME Performance Over Time</CardTitle>
                <p className="text-sm text-muted-foreground">Private equity performance vs public market equivalent</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={pmeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="pme" stroke="hsl(var(--primary))" strokeWidth={2} name="Private Equity" />
                    <Line type="monotone" dataKey="benchmark" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={2} name="Public Market" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );

      case 'benchmarks':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Benchmark Comparison</CardTitle>
                <p className="text-sm text-muted-foreground">PME performance against different market indices</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Benchmark</span>
                    <span>PME Ratio</span>
                    <span>Alpha %</span>
                    <span>Outperformance</span>
                  </div>
                  {benchmarkData.map((item) => (
                    <div key={item.name} className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-bold">{item.pmeRatio}</span>
                      <span className={`font-bold ${item.alpha > 10 ? 'text-green-600' : 'text-blue-600'}`}>
                        +{item.alpha}%
                      </span>
                      <Badge variant={item.outperformance === 'Strong' ? 'default' : 'secondary'}>
                        {item.outperformance}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alpha Generation by Benchmark</CardTitle>
                <p className="text-sm text-muted-foreground">Excess returns vs different market indices</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={alphaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="benchmark" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Alpha']} />
                    <Bar dataKey="alpha" fill="hsl(var(--primary))" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );

      case 'cash-flows':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Quarterly contributions, distributions, and NAV progression</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        `$${(value / 1000000).toFixed(1)}M`, 
                        name === 'contributions' ? 'Contributions' : 'Distributions'
                      ]} 
                    />
                    <Bar dataKey="contributions" fill="hsl(var(--primary))" name="contributions" />
                    <Bar dataKey="distributions" fill="hsl(var(--muted-foreground))" name="distributions" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>NAV Growth</CardTitle>
                <p className="text-sm text-muted-foreground">Net Asset Value progression over time</p>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">NAV Growth Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'vintage-analysis':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vintage Year Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Performance metrics by investment vintage year</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Vintage Year</span>
                    <span>IRR %</span>
                    <span>Multiple</span>
                    <span>PME</span>
                  </div>
                  {vintageData.map((item) => (
                    <div key={item.year} className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.year}</span>
                      <span className={`font-bold ${item.irr > 15 ? 'text-green-600' : item.irr > 10 ? 'text-blue-600' : 'text-orange-600'}`}>
                        {item.irr}%
                      </span>
                      <span className="font-bold">{item.multiple}x</span>
                      <span className={`font-bold ${item.pme > 1 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.pme}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>IRR by Vintage</CardTitle>
                  <p className="text-sm text-muted-foreground">Internal Rate of Return performance</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsBarChart data={vintageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'IRR']} />
                      <Bar dataKey="irr" fill="hsl(var(--primary))" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>PME by Vintage</CardTitle>
                  <p className="text-sm text-muted-foreground">Public Market Equivalent by vintage year</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={vintageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => [value, 'PME']} />
                      <Line type="monotone" dataKey="pme" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
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
            <h1 className="text-3xl font-bold">Public Market Equivalent Analysis</h1>
            <p className="text-muted-foreground">PME analysis comparing private investments to public market benchmarks</p>
            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
              <span>Created: 2024-01-20</span>
              <span>Last Updated: 2024-09-23</span>
            </div>
            <div className="flex space-x-2 mt-2">
              <Badge variant="secondary">PME</Badge>
              <Badge variant="secondary">Benchmarking</Badge>
              <Badge variant="secondary">Private Equity</Badge>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {[
              { id: 'pme-analysis', label: 'PME Analysis' },
              { id: 'benchmarks', label: 'Benchmarks' },
              { id: 'cash-flows', label: 'Cash Flows' },
              { id: 'vintage-analysis', label: 'Vintage Analysis' },
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

