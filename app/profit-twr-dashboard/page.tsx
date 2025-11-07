'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, DollarSign, BarChart3, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from "next/link";

export default function ProfitTWRDashboardPage() {
  const [activeTab, setActiveTab] = useState('quarterly');

  const quarterlyData = [
    { quarter: 'Q1 2023', profit: 45000 },
    { quarter: 'Q2 2023', profit: 65000 },
    { quarter: 'Q3 2023', profit: -15000 },
    { quarter: 'Q4 2023', profit: 85000 },
    { quarter: 'Q1 2024', profit: 42000 },
    { quarter: 'Q2 2024', profit: 58000 },
  ];

  const monthlyData = [
    { month: 'Jan', profit: 15000 },
    { month: 'Feb', profit: 22000 },
    { month: 'Mar', profit: 8000 },
    { month: 'Apr', profit: 32000 },
    { month: 'May', profit: 18000 },
    { month: 'Jun', profit: 12000 },
  ];

  const cumulativeData = [
    { date: '2023-01', value: 100000 },
    { date: '2023-04', value: 150000 },
    { date: '2023-07', value: 200000 },
    { date: '2023-10', value: 250000 },
    { date: '2024-01', value: 300000 },
    { date: '2024-04', value: 350000 },
    { date: '2024-07', value: 380000 },
  ];

  const benchmarkData = [
    { month: 'Jan', portfolio: 2.2, benchmark: 1.8 },
    { month: 'Feb', portfolio: 3.1, benchmark: 2.5 },
    { month: 'Mar', portfolio: 1.1, benchmark: 1.4 },
    { month: 'Apr', portfolio: 4.5, benchmark: 3.2 },
    { month: 'May', portfolio: 2.8, benchmark: 2.1 },
    { month: 'Jun', portfolio: 1.8, benchmark: 1.5 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'quarterly':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quarterly Profit Analysis</CardTitle>
                  <p className="text-sm text-muted-foreground">Profit contribution by quarter</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={quarterlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Profit']} />
                      <Bar dataKey="profit" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>TWR Performance Summary</CardTitle>
                  <p className="text-sm text-muted-foreground">Key performance statistics</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Best Quarter</span>
                    <span className="text-sm font-medium text-green-600">+15.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Worst Quarter</span>
                    <span className="text-sm font-medium text-red-600">-2.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Quarter</span>
                    <span className="text-sm font-medium">+8.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Positive Quarters</span>
                    <span className="text-sm font-medium">5 of 6</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Return</span>
                    <span className="text-sm font-medium text-green-600">+60.3%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'monthly':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly TWR vs Benchmark</CardTitle>
                  <p className="text-sm text-muted-foreground">Monthly time-weighted returns compared to benchmark performance</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={benchmarkData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="portfolio" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="benchmark" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Profit Distribution</CardTitle>
                  <p className="text-sm text-muted-foreground">Profit generated each month</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Profit']} />
                      <Bar dataKey="profit" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'cumulative':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Growth</CardTitle>
              <p className="text-sm text-muted-foreground">Portfolio value and TWR growth over time</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={cumulativeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fill="hsl(var(--primary))" fillOpacity={0.1} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
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
            <h1 className="text-3xl font-bold">Profit TWR Charts</h1>
            <p className="text-muted-foreground">Time-weighted return analysis with comprehensive profit calculations</p>
            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
              <span>Created: 2024-01-10</span>
              <span>Last Updated: 2024-09-23</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total TWR</p>
                  <p className="text-2xl font-bold text-green-600">+60.3%</p>
                  <p className="text-xs text-muted-foreground">Since inception</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Profit</p>
                  <p className="text-2xl font-bold text-green-600">$289,000</p>
                  <p className="text-xs text-muted-foreground">Cumulative gains</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Annualized TWR</p>
                  <p className="text-2xl font-bold">+28.4%</p>
                  <p className="text-xs text-muted-foreground">Geometric average</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Best Quarter</p>
                  <p className="text-2xl font-bold text-green-600">+15.2%</p>
                  <p className="text-xs text-muted-foreground">Q4 2023</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {[
              { id: 'quarterly', label: 'Quarterly TWR' },
              { id: 'monthly', label: 'Monthly Analysis' },
              { id: 'cumulative', label: 'Cumulative Growth' },
              { id: 'breakdown', label: 'Profit Breakdown' },
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

