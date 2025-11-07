'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calculator, TrendingUp, Target, BarChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Link from "next/link";

export default function KaplanSchoarAccountDashboardPage() {
  const [activeTab, setActiveTab] = useState('account-analysis');

  // Account level PME data
  const accountData = [
    { account: 'Institutional Account A', pme: 1.28, irr: 19.2, nav: 45000000, vintageYears: '2019-2021' },
    { account: 'Pension Fund B', pme: 1.15, irr: 15.8, nav: 32000000, vintageYears: '2020-2022' },
    { account: 'Endowment Fund C', pme: 1.42, irr: 22.5, nav: 28000000, vintageYears: '2018-2020' },
    { account: 'Foundation D', pme: 1.08, irr: 12.4, nav: 18000000, vintageYears: '2021-2023' },
    { account: 'Sovereign Wealth E', pme: 1.33, irr: 20.7, nav: 65000000, vintageYears: '2019-2022' }
  ];

  // Quarterly evolution data for multiple accounts
  const quarterlyEvolution = [
    { quarter: 'Q1 2023', institutionalA: 1.15, pensionB: 1.12, endowmentC: 1.35, foundationD: 1.05, sovereignE: 1.25 },
    { quarter: 'Q2 2023', institutionalA: 1.18, pensionB: 1.13, endowmentC: 1.38, foundationD: 1.06, sovereignE: 1.28 },
    { quarter: 'Q3 2023', institutionalA: 1.25, pensionB: 1.14, endowmentC: 1.40, foundationD: 1.07, sovereignE: 1.31 },
    { quarter: 'Q4 2023', institutionalA: 1.28, pensionB: 1.15, endowmentC: 1.42, foundationD: 1.08, sovereignE: 1.33 }
  ];

  // Performance trends data
  const performanceTrends = [
    { quarter: 'Q1 2023', avgPME: 1.18, benchmark: 1.0 },
    { quarter: 'Q2 2023', avgPME: 1.20, benchmark: 1.0 },
    { quarter: 'Q3 2023', avgPME: 1.23, benchmark: 1.0 },
    { quarter: 'Q4 2023', avgPME: 1.25, benchmark: 1.0 }
  ];

  // Cash flow analysis data
  const cashFlowData = [
    { quarter: 'Q1 2023', contributions: 25000000, distributions: 8000000, netCashFlow: 17000000 },
    { quarter: 'Q2 2023', contributions: 18000000, distributions: 12000000, netCashFlow: 6000000 },
    { quarter: 'Q3 2023', contributions: 15000000, distributions: 15000000, netCashFlow: 0 },
    { quarter: 'Q4 2023', contributions: 12000000, distributions: 22000000, netCashFlow: -10000000 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account-analysis':
        return (
          <div className="space-y-6">
            {/* Account-Level PME Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Account-Level PME Performance</CardTitle>
                <p className="text-sm text-muted-foreground">Kaplan-Schoar PME results by institutional account</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Account</span>
                    <span>PME</span>
                    <span>IRR</span>
                    <span>NAV</span>
                    <span>Vintage Years</span>
                  </div>
                  {accountData.map((item) => (
                    <div key={item.account} className="grid grid-cols-5 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.account}</span>
                      <span className={`font-bold ${item.pme > 1.3 ? 'text-green-600' : item.pme > 1.1 ? 'text-blue-600' : 'text-orange-600'}`}>
                        {item.pme.toFixed(2)}
                      </span>
                      <span className="font-bold">{item.irr}%</span>
                      <span className="font-bold">${(item.nav / 1000000).toFixed(0)}M</span>
                      <span className="text-sm text-muted-foreground">{item.vintageYears}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* PME Performance by Account Chart */}
            <Card>
              <CardHeader>
                <CardTitle>PME Performance by Account</CardTitle>
                <p className="text-sm text-muted-foreground">Visual comparison of PME across accounts</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={accountData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="account" angle={-45} textAnchor="end" height={100} />
                    <YAxis domain={[0.8, 1.6]} />
                    <Tooltip formatter={(value: number) => [value.toFixed(2), 'PME']} />
                    <Bar dataKey="pme" fill="hsl(var(--primary))" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );

      case 'performance-trends':
        return (
          <div className="space-y-6">
            {/* Quarterly PME Evolution */}
            <Card>
              <CardHeader>
                <CardTitle>Quarterly PME Evolution</CardTitle>
                <p className="text-sm text-muted-foreground">PME progression by account over time</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={quarterlyEvolution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis domain={[0.9, 1.5]} />
                    <Tooltip formatter={(value: number) => [value.toFixed(2), '']} />
                    <Line type="monotone" dataKey="institutionalA" stroke="#8884d8" strokeWidth={2} name="Institutional A" />
                    <Line type="monotone" dataKey="pensionB" stroke="#82ca9d" strokeWidth={2} name="Pension B" />
                    <Line type="monotone" dataKey="endowmentC" stroke="#ffc658" strokeWidth={2} name="Endowment C" />
                    <Line type="monotone" dataKey="foundationD" stroke="#ff7300" strokeWidth={2} name="Foundation D" />
                    <Line type="monotone" dataKey="sovereignE" stroke="#8dd1e1" strokeWidth={2} name="Sovereign E" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Average Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Average Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Weighted average PME vs benchmark</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis domain={[0.8, 1.4]} />
                    <Tooltip formatter={(value: number) => [value.toFixed(2), '']} />
                    <Line type="monotone" dataKey="avgPME" stroke="hsl(var(--primary))" strokeWidth={3} name="Avg PME" />
                    <Line type="monotone" dataKey="benchmark" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={2} name="Benchmark" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );

      case 'cash-flow-analysis':
        return (
          <div className="space-y-6">
            {/* Quarterly Cash Flow Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Cash Flow Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Contributions, distributions, and net cash flows across all accounts</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsBarChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [
                        `$${(value / 1000000).toFixed(0)}M`, 
                        ''
                      ]}
                    />
                    <Bar dataKey="contributions" fill="hsl(var(--primary))" name="Contributions" />
                    <Bar dataKey="distributions" fill="hsl(var(--muted-foreground))" name="Distributions" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Net Cash Flow Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Net Cash Flow Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Net cash flow progression (contributions minus distributions)</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [
                        `$${(value / 1000000).toFixed(0)}M`, 
                        'Net Cash Flow'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="netCashFlow" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="Net Cash Flow" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );

      case 'comparative-analysis':
        return (
          <div className="space-y-6">
            {/* Account Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">Best Performer</p>
                    <p className="text-2xl font-bold text-green-600">1.42</p>
                    <p className="text-xs text-muted-foreground">Endowment Fund C</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">Portfolio Average</p>
                    <p className="text-2xl font-bold">1.25</p>
                    <p className="text-xs text-muted-foreground">Weighted by NAV</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">Total NAV</p>
                    <p className="text-2xl font-bold">$188M</p>
                    <p className="text-xs text-muted-foreground">Combined NAV</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* IRR vs PME Correlation */}
            <Card>
              <CardHeader>
                <CardTitle>IRR vs PME Correlation</CardTitle>
                <p className="text-sm text-muted-foreground">Relationship between Internal Rate of Return and PME performance</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground">
                    <span>Account</span>
                    <span>IRR %</span>
                    <span>PME Ratio</span>
                  </div>
                  {accountData.map((item) => (
                    <div key={item.account} className="grid grid-cols-3 gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.account}</span>
                      <span className="font-bold text-blue-600">{item.irr}%</span>
                      <span className={`font-bold ${item.pme > 1.3 ? 'text-green-600' : item.pme > 1.1 ? 'text-blue-600' : 'text-orange-600'}`}>
                        {item.pme.toFixed(2)}
                      </span>
                    </div>
                  ))}
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
            <h1 className="text-3xl font-bold">Kaplan Schoar PME (Account Level)</h1>
            <p className="text-muted-foreground">Account-level PME analysis with Kaplan-Schoar calculations</p>
            <div className="flex space-x-2 mt-2">
              <Badge variant="secondary">Kaplan-Schoar</Badge>
              <Badge variant="secondary">Account</Badge>
              <Badge variant="secondary">PME</Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Accounts</p>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-muted-foreground">Institutional accounts</p>
                </div>
                <Calculator className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Weighted Avg PME</p>
                  <p className="text-2xl font-bold text-green-600">1.25</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total NAV</p>
                  <p className="text-2xl font-bold">$188M</p>
                  <p className="text-xs text-muted-foreground">Combined NAV</p>
                </div>
                <BarChart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Best PME</p>
                  <p className="text-2xl font-bold text-green-600">1.42</p>
                  <p className="text-xs text-muted-foreground">Endowment Fund C</p>
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
              { id: 'account-analysis', label: 'Account Analysis' },
              { id: 'performance-trends', label: 'Performance Trends' },
              { id: 'cash-flow-analysis', label: 'Cash Flow Analysis' },
              { id: 'comparative-analysis', label: 'Comparative Analysis' },
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

