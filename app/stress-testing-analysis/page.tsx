'use client'

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingDown, Activity, Shield, Clock, TriangleAlert, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import {
  ComposedChart,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function StressTestingAnalysisPage() {
  const [activeTab, setActiveTab] = useState("stress-testing");

  // Historical stress test data
  const historicalStressData = [
    { name: "Flash Crash 2010", impact: -8.7, recovery: 25 },
    { name: "1987 Black Monday", impact: -18.7, recovery: 5 },
    { name: "COVID-19 Pandemic", impact: -22.1, recovery: 8 },
    { name: "Rising Interest Rates", impact: -12.4, recovery: 12 },
    { name: "Geopolitical Crisis", impact: -19.6, recovery: 15 },
    { name: "European Debt Crisis", impact: -15.3, recovery: 18 },
    { name: "2008 Financial Crisis", impact: -28.5, recovery: 22 },
    { name: "Dot-com Bubble Burst", impact: -31.2, recovery: 24 },
  ];

  // Sector stress testing data
  const sectorStressData = [
    {
      sector: "Technology",
      baseline: 0,
      bearMarket: -32,
      recession: -45,
      financialCrisis: -75,
      geopolitical: -30,
      inflation: -25,
      stagflation: -35,
      recoveryLine: 15,
    },
    {
      sector: "Financial Services",
      baseline: 0,
      bearMarket: -52,
      recession: -32,
      financialCrisis: -28,
      geopolitical: -42,
      inflation: -30,
      stagflation: -45,
      recoveryLine: 8,
    },
    {
      sector: "Healthcare",
      baseline: 0,
      bearMarket: -15,
      recession: -8,
      financialCrisis: -5,
      geopolitical: -12,
      inflation: -5,
      stagflation: -8,
      recoveryLine: 12,
    },
    {
      sector: "Consumer Discretionary",
      baseline: 0,
      bearMarket: -42,
      recession: -35,
      financialCrisis: -32,
      geopolitical: -40,
      inflation: -38,
      stagflation: -42,
      recoveryLine: 6,
    },
    {
      sector: "Energy",
      baseline: 0,
      bearMarket: -38,
      recession: -42,
      financialCrisis: -45,
      geopolitical: -28,
      inflation: -15,
      stagflation: -22,
      recoveryLine: 10,
    },
    {
      sector: "Real Estate",
      baseline: 0,
      bearMarket: -62,
      recession: -35,
      financialCrisis: -28,
      geopolitical: -45,
      inflation: -32,
      stagflation: -65,
      recoveryLine: 4,
    },
  ];

  // Sector resilience ranking
  const sectorRanking = [
    { rank: "#1", sector: "Healthcare", baseline: "+9.8%", avgStress: "-6.1%", status: "positive" },
    { rank: "#2", sector: "Energy", baseline: "+6.7%", avgStress: "-26.2%", status: "negative" },
    { rank: "#3", sector: "Real Estate", baseline: "+7.9%", avgStress: "-30.4%", status: "negative" },
    { rank: "#4", sector: "Consumer Discretionary", baseline: "+11.3%", avgStress: "-31.2%", status: "negative" },
    { rank: "#5", sector: "Financial Services", baseline: "+8.2%", avgStress: "-34.0%", status: "negative" },
    { rank: "#6", sector: "Technology", baseline: "+12.5%", avgStress: "-34.3%", status: "negative" },
  ];

  // Scenario impact vs probability data
  const scenarioData = [
    { probability: 5, impact: -31.2, name: "Dot-com Bubble" },
    { probability: 8, impact: -28.5, name: "Financial Crisis" },
    { probability: 12, impact: -22.1, name: "COVID-19" },
    { probability: 15, impact: -19.6, name: "Geopolitical Crisis" },
    { probability: 18, impact: -18.7, name: "Black Monday" },
    { probability: 22, impact: -15.3, name: "Debt Crisis" },
    { probability: 25, impact: -12.4, name: "Interest Rates" },
    { probability: 28, impact: -8.7, name: "Flash Crash" },
  ];

  // Recovery time analysis data
  const recoveryData = [
    { event: "Flash Crash 2010", impact: "-8.7%", months: 1 },
    { event: "1987 Black Monday", impact: "-18.7%", months: 4 },
    { event: "COVID-19 Pandemic", impact: "-22.1%", months: 6 },
    { event: "Rising Interest Rates", impact: "-12.4%", months: 8 },
    { event: "Geopolitical Crisis", impact: "-19.6%", months: 10 },
    { event: "European Debt Crisis", impact: "-15.3%", months: 12 },
  ];

  // Tail risk metrics
  const tailRiskMetrics = [
    { label: "99% VaR (1 Day)", value: "-4.8%", limit: "-5%", progress: 96, status: "Within Limit" },
    { label: "99% VaR (1 Month)", value: "-18.2%", limit: "-20%", progress: 91, status: "Within Limit" },
    { label: "Expected Shortfall (95%)", value: "-6.2%", limit: "-7%", progress: 89, status: "Within Limit" },
    { label: "Expected Shortfall (99%)", value: "-12.8%", limit: "-15%", progress: 85, status: "Within Limit" },
    { label: "Maximum Drawdown", value: "-8.7%", limit: "-12%", progress: 72, status: "Within Limit" },
    { label: "Conditional VaR", value: "-15.3%", limit: "-18%", progress: 85, status: "Within Limit" },
  ];

  // Scenario-based analysis curve data
  const scenarioAnalysisData = [
    { scenario: "Bull Market", impact: 18 },
    { scenario: "Normal", impact: 5 },
    { scenario: "Bear Market", impact: -12 },
    { scenario: "Recession", impact: -8 },
    { scenario: "High Inflation", impact: 3 },
    { scenario: "Stagflation", impact: -2 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "stress-testing":
        return (
          <div className="space-y-6">
            {/* Historical Stress Test Results */}
            <Card>
              <CardHeader>
                <CardTitle>Historical Stress Test Results</CardTitle>
                <CardDescription>Portfolio performance under historical crisis scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={historicalStressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
                      <Bar dataKey="impact" fill="hsl(var(--primary))" />
                      <Line type="monotone" dataKey="recovery" stroke="hsl(var(--destructive))" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Scenario Impact vs Probability */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scenario Impact vs Probability</CardTitle>
                  <CardDescription>Risk-return profile of stress scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart data={scenarioData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          type="number" 
                          dataKey="probability" 
                          domain={[0, 30]}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <YAxis 
                          type="number" 
                          dataKey="impact" 
                          domain={[-35, -7]}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                          formatter={(value, name) => [
                            name === "probability" ? `${value}%` : `${value}%`,
                            name === "probability" ? "Probability" : "Impact"
                          ]}
                        />
                        <Scatter dataKey="impact" fill="hsl(var(--primary))" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recovery Time Analysis</CardTitle>
                  <CardDescription>Time to recover from different stress scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recoveryData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{item.event}</div>
                          <div className="text-sm text-muted-foreground">Impact: {item.impact}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{item.months} months</div>
                          <div className="text-xs text-muted-foreground">to recover</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "scenarios":
        return (
          <div className="space-y-6">
            {/* Scenario-Based Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Scenario-Based Analysis</CardTitle>
                <CardDescription>Forward-looking scenario probabilities and impacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={scenarioAnalysisData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="scenario" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
                      <Area 
                        type="monotone" 
                        dataKey="impact" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary) / 0.3)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "sector-analysis":
        return (
          <div className="space-y-6">
            {/* Sector Stress Testing */}
            <Card>
              <CardHeader>
                <CardTitle>Sector Stress Testing</CardTitle>
                <CardDescription>How different sectors perform under stress scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={sectorStressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="sector" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
                      <Bar dataKey="bearMarket" stackId="a" fill="hsl(var(--destructive))" />
                      <Bar dataKey="recession" stackId="a" fill="hsl(var(--primary))" />
                      <Bar dataKey="financialCrisis" stackId="a" fill="hsl(var(--secondary))" />
                      <Bar dataKey="geopolitical" stackId="a" fill="hsl(var(--accent))" />
                      <Line type="monotone" dataKey="recoveryLine" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sector Resilience Ranking */}
            <Card>
              <CardHeader>
                <CardTitle>Sector Resilience Ranking</CardTitle>
                <CardDescription>Sectors ranked by average stress performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectorRanking.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-lg">{item.rank}</span>
                        <div>
                          <div className="font-medium">{item.sector}</div>
                          <div className="text-sm text-muted-foreground">Baseline: {item.baseline}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${item.status === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                          {item.avgStress}
                        </div>
                        <div className="text-xs text-muted-foreground">avg stress</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "tail-risk":
        return (
          <div className="space-y-6">
            {/* Tail Risk Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Tail Risk Metrics</CardTitle>
                <CardDescription>Extreme risk measures and limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tailRiskMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{metric.label}</div>
                          <div className="text-2xl font-bold">{metric.value}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {metric.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">Limit: {metric.limit}</div>
                        </div>
                      </div>
                      <Progress value={metric.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "monte-carlo":
        return (
          <div className="space-y-6">
            {/* Monte Carlo Simulation Results */}
            <Card>
              <CardHeader>
                <CardTitle>Monte Carlo Simulation Results</CardTitle>
                <CardDescription>10,000 simulations of portfolio performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Return Distribution */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Return Distribution (1 Year)</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">95th Percentile</span>
                        <span className="font-semibold text-green-600">+28.7%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">75th Percentile</span>
                        <span className="font-semibold text-green-600">+18.2%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">Median</span>
                        <span className="font-semibold text-green-600">+11.5%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">25th Percentile</span>
                        <span className="font-semibold text-orange-600">+2.8%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">5th Percentile</span>
                        <span className="font-semibold text-red-600">-8.2%</span>
                      </div>
                    </div>
                  </div>

                  {/* Risk Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Risk Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">Probability of Loss</span>
                        <span className="font-semibold">18.5%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">Expected Return</span>
                        <span className="font-semibold text-green-600">+12.1%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">Volatility</span>
                        <span className="font-semibold">16.8%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">Skewness</span>
                        <span className="font-semibold">-0.23</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">Kurtosis</span>
                        <span className="font-semibold">3.42</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Confidence Intervals and Stress Test Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Confidence Intervals</CardTitle>
                  <CardDescription>Portfolio value projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold mb-2">1-Year Portfolio Value</h3>
                    <p className="text-sm text-muted-foreground">Starting Value: $150M</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">95% Confidence</span>
                      <span className="font-semibold">$138M - $193M</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">68% Confidence</span>
                      <span className="font-semibold">$144M - $179M</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Expected Value</span>
                      <span className="font-semibold text-green-600">$168M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stress Test Summary</CardTitle>
                  <CardDescription>Key findings from stress analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Portfolio Resilience</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Strong</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Diversification Benefit</span>
                      <span className="font-semibold text-green-600">+8.9%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Tail Risk Control</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Effective</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Recovery Capability</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Fast</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">Overall Risk Rating</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">Moderate</Badge>
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
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Back to Reports Gallery */}
        <Link href="/build-report"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Reports Gallery
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Stress Testing Analysis</h1>
          <p className="text-muted-foreground mb-4">Portfolio stress testing under various market scenarios</p>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="stress-testing">Stress Testing</TabsTrigger>
              <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
              <TabsTrigger value="sector-analysis">Sector Analysis</TabsTrigger>
              <TabsTrigger value="tail-risk">Tail Risk</TabsTrigger>
              <TabsTrigger value="monte-carlo">Monte Carlo</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Worst Case Scenario</p>
                  <p className="text-2xl font-bold text-red-600">-31.2%</p>
                  <p className="text-xs text-muted-foreground">Dot-com bubble</p>
                </div>
                <TriangleAlert className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Stress Loss</p>
                  <p className="text-2xl font-bold text-red-600">-19.6%</p>
                  <p className="text-xs text-muted-foreground">Across all scenarios</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio Resilience</p>
                  <p className="text-2xl font-bold text-green-600">Good</p>
                  <p className="text-xs text-muted-foreground">vs benchmark</p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recovery Time</p>
                  <p className="text-2xl font-bold">11 months</p>
                  <p className="text-xs text-muted-foreground">Average recovery</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

