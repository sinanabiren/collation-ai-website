'use client'

import { ArrowLeft, AlertTriangle, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";

export default function RiskMetricsDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/build-report"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reports Gallery
          </Link>
        </div>

        {/* Dashboard Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Risk Metrics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive risk analysis with VaR, volatility, and correlation metrics
          </p>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            <span>Created: 2024-02-15</span>
            <span>Last Updated: 2024-09-23</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-6 mb-8 border-b border-border">
          <button className="pb-2 border-b-2 border-primary text-primary font-medium">
            VaR
          </button>
          <button className="pb-2 text-muted-foreground hover:text-foreground">
            Volatility
          </button>
          <button className="pb-2 text-muted-foreground hover:text-foreground">
            Risk Metrics
          </button>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Value at Risk (95%)</h3>
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-red-500 mb-1">2.8%</div>
              <p className="text-xs text-muted-foreground">Daily 95% confidence</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Portfolio Volatility</h3>
                <TrendingUp className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-orange-500 mb-1">16.4%</div>
              <p className="text-xs text-muted-foreground">Annualized volatility</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Sharpe Ratio</h3>
                <BarChart3 className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-500 mb-1">1.24</div>
              <p className="text-xs text-muted-foreground">Risk-adjusted return</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Value at Risk Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Value at Risk Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">
                VaR calculations across different time horizons and confidence levels
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-secondary/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">VaR Chart Visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Tabs */}
          <div className="space-y-6">
            <div className="flex space-x-4">
              <Badge variant="outline">Value at Risk</Badge>
              <Badge variant="outline">Volatility</Badge>
              <Badge variant="outline">Stress Testing</Badge>
              <Badge variant="outline">Drawdown</Badge>
            </div>

            {/* Risk Tolerance Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Tolerance Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Portfolio risk assessment and tolerance metrics
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conservative</span>
                    <Progress value={75} className="w-32" />
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Risk Capacity</span>
                    <Progress value={82} className="w-32" />
                    <span className="text-sm font-medium">82%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Risk Analysis Summary */}
        <Card className="bg-secondary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <h4 className="font-medium text-foreground">Risk Analysis Status:</h4>
                <div className="text-sm text-muted-foreground mt-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Risk metrics calculated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Portfolio volatility assessed</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

