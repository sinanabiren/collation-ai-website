'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Target, BarChart, PieChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, ComposedChart } from 'recharts';
import Link from "next/link";

export default function DirectAlphaDashboardPage() {
  const [activeTab, setActiveTab] = useState('alpha-analysis');

  // Direct alpha by account data
  const directAlphaData = [
    { account: 'Growth Portfolio A', alpha: 8.5, beta: 1.15, trackingError: 4.2, informationRatio: 2.02, nav: 45000000 },
    { account: 'Value Portfolio B', alpha: 6.8, beta: 0.92, trackingError: 3.8, informationRatio: 1.79, nav: 32000000 },
    { account: 'Balanced Fund C', alpha: 4.2, beta: 1.05, trackingError: 2.1, informationRatio: 2.0, nav: 28000000 },
    { account: 'Aggressive Growth D', alpha: 12.1, beta: 1.35, trackingError: 6.5, informationRatio: 1.86, nav: 18000000 },
    { account: 'Conservative E', alpha: 3.1, beta: 0.75, trackingError: 1.8, informationRatio: 1.72, nav: 25000000 }
  ];

  // Alpha attribution data
  const attributionData = [
    { account: 'Growth Portfolio A', securitySelection: 4.8, sectorAllocation: 2.1, marketTiming: 1.6, totalAlpha: 8.5 },
    { account: 'Value Portfolio B', securitySelection: 3.2, sectorAllocation: 2.8, marketTiming: 0.8, totalAlpha: 6.8 },
    { account: 'Balanced Fund C', securitySelection: 2.1, sectorAllocation: 1.5, marketTiming: 0.6, totalAlpha: 4.2 },
    { account: 'Aggressive Growth D', securitySelection: 7.2, sectorAllocation: 3.1, marketTiming: 1.8, totalAlpha: 12.1 },
    { account: 'Conservative E', securitySelection: 1.8, sectorAllocation: 0.9, marketTiming: 0.4, totalAlpha: 3.1 }
  ];

  // Alpha vs Beta scatter data
  const alphaBetaData = directAlphaData.map(item => ({
    name: item.account,
    alpha: item.alpha,
    beta: item.beta,
    size: item.nav / 1000000
  }));

  // Performance attribution breakdown for stacked bar chart
  const performanceAttributionChart = attributionData.map(item => ({
    account: item.account.replace(' Portfolio', '').replace(' Fund', '').replace(' Growth', ''),
    securitySelection: item.securitySelection,
    sectorAllocation: item.sectorAllocation,
    marketTiming: item.marketTiming
  }));

  // Risk-adjusted metrics
  const riskAdjustedData = [
    { metric: 'Average Alpha', portfolio: '+6.9%', benchmark: 'N/A', difference: '+6.9%' },
    { metric: 'Best Alpha', portfolio: '+12.1%', benchmark: 'N/A', difference: '+12.1%' },
    { metric: 'Total NAV', portfolio: '$148M', benchmark: 'N/A', difference: 'N/A' },
    { metric: 'Information Ratio', portfolio: '1.88', benchmark: 'N/A', difference: 'N/A' },
    { metric: 'Alpha Generation', portfolio: '9.6', benchmark: 'N/A', difference: 'N/A' }
  ];

  // Alpha trends data
  const alphaTrendsData = [
    { quarter: 'Q1 2023', growthA: 7.2, valueB: 5.8, balancedC: 3.5, aggressiveD: 10.8, conservativeE: 2.8 },
    { quarter: 'Q2 2023', growthA: 8.1, valueB: 6.2, balancedC: 3.9, aggressiveD: 11.5, conservativeE: 2.9 },
    { quarter: 'Q3 2023', growthA: 8.8, valueB: 6.5, balancedC: 4.0, aggressiveD: 12.2, conservativeE: 3.0 },
    { quarter: 'Q4 2023', growthA: 8.5, valueB: 6.8, balancedC: 4.2, aggressiveD: 12.1, conservativeE: 3.1 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'alpha-analysis':
        return (
          <div className="space-y-6">
            {/* Direct Alpha by Account Table */}
            <Card>
              <CardHeader>
                <CardTitle>Direct Alpha by Account</CardTitle>
                <p className="text-sm text-muted-foreground">Alpha generation and risk metrics for each account</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Account</span>
                    <span>Alpha</span>
                    <span>Beta</span>
                    <span>Tracking Error</span>
                    <span>Information Ratio</span>
                    <span>NAV</span>
                  </div>
                  {directAlphaData.map((item) => (
                    <div key={item.account} className="grid grid-cols-6 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.account}</span>
                      <span className="font-bold text-green-600">+{item.alpha}%</span>
                      <span className="font-bold">{item.beta}</span>
                      <span className="font-bold">{item.trackingError}%</span>
                      <span className="font-bold">{item.informationRatio}</span>
                      <span className="font-bold">${(item.nav / 1000000).toFixed(0)}M</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alpha vs Beta Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Alpha vs Beta Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Risk-return profile of each account</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={alphaBetaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      type="number" 
                      dataKey="beta" 
                      domain={[0.6, 1.5]} 
                      name="Beta"
                      axisLine={false}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="alpha" 
                      domain={[0, 16]} 
                      name="Alpha (%)"
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'alpha' ? `${value}%` : value,
                        name === 'alpha' ? 'Alpha' : 'Beta'
                      ]}
                      labelFormatter={(label, payload) => payload?.[0]?.payload?.name || ''}
                    />
                    <Scatter 
                      dataKey="alpha" 
                      fill="hsl(var(--primary))"
                      r={8}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );

      case 'performance-attribution':
        return (
          <div className="space-y-6">
            {/* Alpha Attribution Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Alpha Attribution Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Breakdown of alpha sources by account</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={performanceAttributionChart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="account" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                    <Bar dataKey="securitySelection" stackId="a" fill="#4F46E5" name="Security Selection" />
                    <Bar dataKey="sectorAllocation" stackId="a" fill="#F59E0B" name="Sector Allocation" />
                    <Bar dataKey="marketTiming" stackId="a" fill="#10B981" name="Market Timing" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Attribution Breakdown Table */}
            <Card>
              <CardHeader>
                <CardTitle>Attribution Breakdown</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed alpha attribution by source</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Account</span>
                    <span>Security Selection</span>
                    <span>Sector Allocation</span>
                    <span>Market Timing</span>
                    <span>Total Alpha</span>
                  </div>
                  {attributionData.map((item) => (
                    <div key={item.account} className="grid grid-cols-5 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.account}</span>
                      <span className="font-bold text-green-600">+{item.securitySelection}%</span>
                      <span className="font-bold text-blue-600">+{item.sectorAllocation}%</span>
                      <span className="font-bold text-purple-600">+{item.marketTiming}%</span>
                      <span className="font-bold text-green-600">+{item.totalAlpha}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'risk-adjusted-metrics':
        return (
          <div className="space-y-6">
            {/* Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <p className="text-sm text-muted-foreground">Key metrics vs benchmark comparison</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Metric</span>
                    <span>Portfolio</span>
                    <span>Benchmark</span>
                    <span>Difference</span>
                  </div>
                  {riskAdjustedData.map((item) => (
                    <div key={item.metric} className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.metric}</span>
                      <span className="font-bold">{item.portfolio}</span>
                      <span className="font-bold">{item.benchmark}</span>
                      <span className={`font-bold ${item.difference.includes('+') ? 'text-green-600' : item.difference === 'N/A' ? 'text-muted-foreground' : 'text-red-600'}`}>
                        {item.difference}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Account Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Type Distribution</CardTitle>
                  <p className="text-sm text-muted-foreground">NAV by account type</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'Institutional Account', pme: '1.28', nav: '$45.0M', irr: '19.2% IRR' },
                      { type: 'Pension Fund', pme: '1.15', nav: '$32.0M', irr: '15.8% IRR' },
                      { type: 'Endowment Fund', pme: '1.42', nav: '$28.0M', irr: '22.5% IRR' },
                      { type: 'Foundation D', pme: '1.08', nav: '$18.0M', irr: '12.4% IRR' },
                      { type: 'Sovereign Wealth', pme: '1.33', nav: '$65.0M', irr: '20.7% IRR' }
                    ].map((item) => (
                      <div key={item.type} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium">{item.type}</p>
                          <p className="text-sm text-muted-foreground">PME: {item.pme}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{item.nav}</p>
                          <p className="text-sm text-muted-foreground">{item.irr}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Statistics</CardTitle>
                  <p className="text-sm text-muted-foreground">Account-level performance summary</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="font-medium">Best PME</span>
                      <span className="font-bold text-green-600">1.42 (Endowment C)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="font-medium">Lowest PME</span>
                      <span className="font-bold text-orange-600">1.08 (Foundation D)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="font-medium">PME Range</span>
                      <span className="font-bold">0.34</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="font-medium">Accounts &gt; 1.0</span>
                      <span className="font-bold text-green-600">5 of 5 (100%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="font-medium">Alpha Generation</span>
                      <span className="font-bold text-green-600">+9.6%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'alpha-trends':
        return (
          <div className="space-y-6">
            {/* Quarterly Alpha Evolution */}
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Alpha Evolution</CardTitle>
                <p className="text-sm text-muted-foreground">Alpha progression by account over time</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={alphaTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis domain={[0, 14]} />
                    <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                    <Line type="monotone" dataKey="growthA" stroke="#8884d8" strokeWidth={2} name="Growth Portfolio A" />
                    <Line type="monotone" dataKey="valueB" stroke="#82ca9d" strokeWidth={2} name="Value Portfolio B" />
                    <Line type="monotone" dataKey="balancedC" stroke="#ffc658" strokeWidth={2} name="Balanced Fund C" />
                    <Line type="monotone" dataKey="aggressiveD" stroke="#ff7300" strokeWidth={2} name="Aggressive Growth D" />
                    <Line type="monotone" dataKey="conservativeE" stroke="#8dd1e1" strokeWidth={2} name="Conservative E" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* IRR vs PME Correlation */}
            <Card>
              <CardHeader>
                <CardTitle>IRR vs PME Correlation</CardTitle>
                <p className="text-sm text-muted-foreground">Relationship between IRR and PME performance</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart data={directAlphaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="account" angle={-45} textAnchor="end" height={100} />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="alpha" fill="hsl(var(--primary))" name="Alpha %" />
                    <Line yAxisId="right" type="monotone" dataKey="informationRatio" stroke="#ff0000" strokeWidth={2} name="Info Ratio" />
                  </ComposedChart>
                </ResponsiveContainer>
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
            <h1 className="text-3xl font-bold">Direct Alpha (Account Level)</h1>
            <p className="text-muted-foreground">Direct alpha calculations and performance attribution at account level</p>
            <div className="flex space-x-2 mt-2">
              <Badge variant="secondary">Direct Alpha</Badge>
              <Badge variant="secondary">Account</Badge>
              <Badge variant="secondary">Attribution</Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Alpha</p>
                  <p className="text-2xl font-bold text-green-600">+6.9%</p>
                  <p className="text-xs text-muted-foreground">Across all accounts</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Best Alpha</p>
                  <p className="text-2xl font-bold text-green-600">+12.1%</p>
                  <p className="text-xs text-muted-foreground">Aggressive Growth D</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total NAV</p>
                  <p className="text-2xl font-bold">$148M</p>
                  <p className="text-xs text-muted-foreground">Combined assets</p>
                </div>
                <BarChart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Information Ratio</p>
                  <p className="text-2xl font-bold">1.88</p>
                  <p className="text-xs text-muted-foreground">Weighted average</p>
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
              { id: 'alpha-analysis', label: 'Alpha Analysis' },
              { id: 'performance-attribution', label: 'Performance Attribution' },
              { id: 'risk-adjusted-metrics', label: 'Risk-Adjusted Metrics' },
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

