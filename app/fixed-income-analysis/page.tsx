'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, DollarSign, Clock, Star, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export default function FixedIncomeAnalysisPage() {
  const router = useRouter();
  const [selectedView, setSelectedView] = useState("fixed-income");

  const summaryData = {
    portfolioValue: 125,
    bondCount: 78,
    averageYield: 4.85,
    ytm: 5.12,
    duration: 6.2,
    modifiedDuration: "years",
    creditRating: "AA-",
    weightedAverage: "Weighted average"
  };

  // Bond holdings data
  const bondHoldingsData = [
    {
      bond: "US Treasury 10Y",
      faceValue: "$25.0M",
      marketValue: "$24.85M",
      yield: "4.45%",
      duration: 9.1,
      rating: "AAA",
      maturity: "2034-05-15"
    },
    {
      bond: "Corporate Bond - AAPL",
      faceValue: "$15.0M",
      marketValue: "$15.24M",
      yield: "3.85%",
      duration: 5.2,
      rating: "AA+",
      maturity: "2029-11-20"
    },
    {
      bond: "Municipal Bond - CA",
      faceValue: "$12.0M",
      marketValue: "$11.88M",
      yield: "3.25%",
      duration: 8.5,
      rating: "AA",
      maturity: "2032-08-12"
    },
    {
      bond: "Corporate Bond - MSFT",
      faceValue: "$10.0M",
      marketValue: "$10.15M",
      yield: "4.15%",
      duration: 6.8,
      rating: "AAA",
      maturity: "2031-03-08"
    },
    {
      bond: "High Yield Corp - XYZ",
      faceValue: "$8.0M",
      marketValue: "$7.92M",
      yield: "7.25%",
      duration: 4.2,
      rating: "BB+",
      maturity: "2027-12-01"
    }
  ];

  // Market value vs face value comparison data
  const marketVsFaceData = [
    { bond: "US Treasury 10Y", faceValue: 25.0, marketValue: 24.85 },
    { bond: "Corporate Bond - AAPL", faceValue: 15.0, marketValue: 15.24 },
    { bond: "Municipal Bond - CA", faceValue: 12.0, marketValue: 11.88 },
    { bond: "Corporate Bond - MSFT", faceValue: 10.0, marketValue: 10.15 },
    { bond: "High Yield Corp - XYZ", faceValue: 8.0, marketValue: 7.92 }
  ];

  // Yield analysis data
  const yieldAnalysisData = [
    { category: "Government Bonds", averageYield: 4.2, count: 25 },
    { category: "Corporate Bonds", averageYield: 4.8, count: 32 },
    { category: "Municipal Bonds", averageYield: 3.5, count: 15 },
    { category: "High Yield", averageYield: 7.1, count: 6 }
  ];

  // Yield curve data
  const yieldCurveData = [
    { maturity: "1Y", treasury: 5.1, corporate: 5.4, municipal: 4.2 },
    { maturity: "2Y", treasury: 5.0, corporate: 5.3, municipal: 4.1 },
    { maturity: "5Y", treasury: 4.8, corporate: 5.1, municipal: 4.4 },
    { maturity: "10Y", treasury: 4.6, corporate: 4.9, municipal: 4.5 },
    { maturity: "30Y", treasury: 4.9, corporate: 5.2, municipal: 4.7 }
  ];

  // Credit spreads data
  const creditSpreadsData = [
    { maturity: "1Y", spread: 40 },
    { maturity: "2Y", spread: 38 },
    { maturity: "5Y", spread: 39 },
    { maturity: "10Y", spread: 41 },
    { maturity: "30Y", spread: 52 }
  ];

  // Credit rating distribution data
  const creditRatingDistribution = [
    { rating: "AAA", value: 28, color: "#22c55e" },
    { rating: "AA+/AA", value: 33.6, color: "#3b82f6" },
    { rating: "AA-/A+", value: 22.4, color: "#f59e0b" },
    { rating: "A/A-", value: 9.6, color: "#ef4444" },
    { rating: "BBB+/BBB", value: 4, color: "#8b5cf6" },
    { rating: "Below BBB", value: 2.4, color: "#64748b" }
  ];

  // Credit quality summary
  const creditQualitySummary = [
    { rating: "AAA", value: "$35.0M", percentage: "28%", quality: "Highest" },
    { rating: "AA+/AA", value: "$42.0M", percentage: "33.6%", quality: "Highest" },
    { rating: "AA-/A+", value: "$28.0M", percentage: "22.4%", quality: "High" },
    { rating: "A/A-", value: "$12.0M", percentage: "9.6%", quality: "High" },
    { rating: "BBB+/BBB", value: "$5.0M", percentage: "4%", quality: "Medium" },
    { rating: "Below BBB", value: "$3.0M", percentage: "2.4%", quality: "Medium" }
  ];

  // Duration bucket analysis data
  const durationBucketData = [
    { bucket: "0-2 Years", value: 18.0 },
    { bucket: "2-5 Years", value: 35.0 },
    { bucket: "5-10 Years", value: 45.0 },
    { bucket: "10-15 Years", value: 20.0 },
    { bucket: "15+ Years", value: 7.0 }
  ];

  // Duration risk summary
  const durationRiskSummary = [
    { bucket: "0-2 Years", value: "$18.0M", bondCount: 12, avgYield: "4.95%", convexity: 2.1 },
    { bucket: "2-5 Years", value: "$35.0M", bondCount: 18, avgYield: "4.75%", convexity: 8.5 },
    { bucket: "5-10 Years", value: "$45.0M", bondCount: 28, avgYield: "4.65%", convexity: 15.2 },
    { bucket: "10-15 Years", value: "$20.0M", bondCount: 14, avgYield: "4.85%", convexity: 25.8 },
    { bucket: "15+ Years", value: "$7.0M", bondCount: 6, avgYield: "5.15%", convexity: 35.4 }
  ];

  // Monthly performance attribution
  const monthlyPerformanceData = [
    { month: "2024-01", yieldIncome: 0.42, priceReturn: 0.83, totalReturn: 1.25 },
    { month: "2024-02", yieldIncome: 0.41, priceReturn: -1.26, totalReturn: -0.85 },
    { month: "2024-03", yieldIncome: 0.4, priceReturn: 1.75, totalReturn: 2.15 },
    { month: "2024-04", yieldIncome: 0.39, priceReturn: 0.56, totalReturn: 0.95 },
    { month: "2024-05", yieldIncome: 0.41, priceReturn: -1.76, totalReturn: -1.35 },
    { month: "2024-06", yieldIncome: 0.4, priceReturn: 1.45, totalReturn: 1.85 }
  ];

  // Performance summary
  const performanceSummary = [
    { month: "2024-01", totalReturn: "+1.25%", yieldIncome: "+0.42%", priceReturn: "+0.83%", spreadChange: "0.35%" },
    { month: "2024-02", totalReturn: "-0.85%", yieldIncome: "+0.41%", priceReturn: "-1.26%", spreadChange: "0.38%" },
    { month: "2024-03", totalReturn: "+2.15%", yieldIncome: "+0.4%", priceReturn: "+1.75%", spreadChange: "0.32%" },
    { month: "2024-04", totalReturn: "+0.95%", yieldIncome: "+0.39%", priceReturn: "+0.56%", spreadChange: "0.36%" },
    { month: "2024-05", totalReturn: "-1.35%", yieldIncome: "+0.41%", priceReturn: "-1.76%", spreadChange: "0.42%" },
    { month: "2024-06", totalReturn: "+1.85%", yieldIncome: "+0.4%", priceReturn: "+1.45%", spreadChange: "0.38%" }
  ];

  // Credit analysis data
  const creditAnalysisData = [
    { rating: "AAA", allocation: 35, yield: 4.1 },
    { rating: "AA+", allocation: 28, yield: 4.4 },
    { rating: "AA", allocation: 22, yield: 4.8 },
    { rating: "A+", allocation: 10, yield: 5.2 },
    { rating: "BBB+", allocation: 5, yield: 6.8 }
  ];

  // Duration risk data
  const durationRiskData = [
    { category: "Short Term (0-3Y)", allocation: 25, avgDuration: 2.1 },
    { category: "Medium Term (3-7Y)", allocation: 45, avgDuration: 5.5 },
    { category: "Long Term (7-15Y)", allocation: 25, avgDuration: 9.8 },
    { category: "Ultra Long (15Y+)", allocation: 5, avgDuration: 18.2 }
  ];

  // Performance metrics
  const performanceData = [
    { metric: "Total Return YTD", value: "5.8%" },
    { metric: "Duration-Adjusted Return", value: "4.2%" },
    { metric: "Sharpe Ratio", value: "1.35" },
    { metric: "Maximum Drawdown", value: "-2.1%" }
  ];

  const getRatingColor = (rating: string) => {
    if (rating === "AAA") return "bg-green-100 text-green-800";
    if (rating.startsWith("AA")) return "bg-blue-100 text-blue-800";
    if (rating.startsWith("A")) return "bg-yellow-100 text-yellow-800";
    if (rating.startsWith("BB")) return "bg-orange-100 text-orange-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => router.push(-1)} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Reports Gallery
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Fixed Income Analysis</h1>
            <div className="flex gap-2">
              <Button variant={selectedView === "fixed-income" ? "default" : "outline"} size="sm" onClick={() => setSelectedView("fixed-income")}>
                Fixed Income
              </Button>
              <Button variant={selectedView === "duration-analysis" ? "default" : "outline"} size="sm" onClick={() => setSelectedView("duration-analysis")}>
                Duration Analysis
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Specialized analysis for fixed income securities and bonds
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryData.portfolioValue}M</div>
              <p className="text-sm text-muted-foreground">{summaryData.bondCount} bonds</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Average Yield
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.averageYield}%</div>
              <p className="text-sm text-muted-foreground">YTM: {summaryData.ytm}%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.duration}</div>
              <p className="text-sm text-muted-foreground">{summaryData.modifiedDuration}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Star className="h-4 w-4" />
                Credit Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.creditRating}</div>
              <p className="text-sm text-muted-foreground">{summaryData.weightedAverage}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="holdings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="holdings">Bond Holdings</TabsTrigger>
            <TabsTrigger value="yield">Yield Analysis</TabsTrigger>
            <TabsTrigger value="credit">Credit Analysis</TabsTrigger>
            <TabsTrigger value="duration">Duration Risk</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings" className="space-y-6">
            {/* Bond Holdings Detail */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Bond Holdings Detail
                  <Badge variant="outline" className="ml-2">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    0
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">Individual bond positions and characteristics</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Bond</th>
                        <th className="text-left py-3 px-4">Face Value</th>
                        <th className="text-left py-3 px-4">Market Value</th>
                        <th className="text-left py-3 px-4">
                          Yield %
                          <Badge variant="outline" className="ml-2">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            0
                          </Badge>
                        </th>
                        <th className="text-left py-3 px-4">Duration</th>
                        <th className="text-left py-3 px-4">Rating</th>
                        <th className="text-left py-3 px-4">Maturity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bondHoldingsData.map((bond, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{bond.bond}</td>
                          <td className="py-3 px-4">{bond.faceValue}</td>
                          <td className="py-3 px-4 font-semibold text-green-600">{bond.marketValue}</td>
                          <td className="py-3 px-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {bond.yield}
                            </span>
                          </td>
                          <td className="py-3 px-4">{bond.duration}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${getRatingColor(bond.rating)}`}>
                              {bond.rating}
                            </span>
                          </td>
                          <td className="py-3 px-4">{bond.maturity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Market Value vs Face Value */}
            <Card>
              <CardHeader>
                <CardTitle>Market Value vs Face Value</CardTitle>
                <Badge variant="outline" className="ml-2">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  0
                </Badge>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={marketVsFaceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bond" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, ""]} />
                    <Bar dataKey="faceValue" fill="#64748b" name="Face Value" />
                    <Bar dataKey="marketValue" fill="#3b82f6" name="Market Value" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-500 rounded"></div>
                    <span className="text-sm">Face Value</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Market Value</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yield" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Yield Curve Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Comparison across bond types and maturities</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={yieldCurveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="maturity" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="treasury" stroke="#22c55e" strokeWidth={2} name="Treasury" />
                    <Line type="monotone" dataKey="corporate" stroke="#3b82f6" strokeWidth={2} name="Corporate" />
                    <Line type="monotone" dataKey="municipal" stroke="#f59e0b" strokeWidth={2} name="Municipal" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Treasury</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Corporate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm">Municipal</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Spreads</CardTitle>
                <Badge variant="outline" className="ml-2">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  0
                </Badge>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={creditSpreadsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="maturity" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} bps`, "Spread"]} />
                    <Bar dataKey="spread" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Credit Rating Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">Portfolio allocation across credit ratings</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={creditRatingDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ rating, value }) => `${rating}: ${value}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {creditRatingDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Quality Summary</CardTitle>
                <Badge variant="outline" className="ml-2">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  0
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Rating</th>
                        <th className="text-left py-3 px-4">Value</th>
                        <th className="text-left py-3 px-4">Percentage</th>
                        <th className="text-left py-3 px-4">Quality</th>
                      </tr>
                    </thead>
                    <tbody>
                      {creditQualitySummary.map((credit, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{credit.rating}</td>
                          <td className="py-3 px-4 font-semibold">{credit.value}</td>
                          <td className="py-3 px-4">{credit.percentage}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${
                              credit.quality === "Highest" ? "bg-blue-100 text-blue-800" :
                              credit.quality === "High" ? "bg-green-100 text-green-800" :
                              "bg-orange-100 text-orange-800"
                            }`}>
                              {credit.quality}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="duration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Duration Bucket Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">Interest rate risk distribution across maturity buckets</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={durationBucketData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bucket" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, "Value"]} />
                    <Bar dataKey="value" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
                <Badge variant="outline" className="ml-2">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  0
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duration Risk Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Maturity Bucket</th>
                        <th className="text-left py-3 px-4">Value</th>
                        <th className="text-left py-3 px-4">Bond Count</th>
                        <th className="text-left py-3 px-4">Avg Yield</th>
                        <th className="text-left py-3 px-4">Convexity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {durationRiskSummary.map((duration, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{duration.bucket}</td>
                          <td className="py-3 px-4 font-semibold">{duration.value}</td>
                          <td className="py-3 px-4">{duration.bondCount}</td>
                          <td className="py-3 px-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {duration.avgYield}
                            </span>
                          </td>
                          <td className="py-3 px-4">{duration.convexity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Attribution</CardTitle>
                <p className="text-sm text-muted-foreground">Total return breakdown by components</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="yieldIncome" fill="#22c55e" name="Yield Income %" />
                    <Bar dataKey="priceReturn" fill="#3b82f6" name="Price Return %" />
                    <Bar dataKey="totalReturn" fill="#8b5cf6" name="Total Return %" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Yield Income %</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Price Return %</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm">Total Return %</span>
                  </div>
                </div>
                <Badge variant="outline" className="ml-2">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  0
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <Badge variant="outline" className="ml-2">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  0
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Month</th>
                        <th className="text-left py-3 px-4">Total Return</th>
                        <th className="text-left py-3 px-4">Yield Income</th>
                        <th className="text-left py-3 px-4">Price Return</th>
                        <th className="text-left py-3 px-4">Spread Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {performanceSummary.map((performance, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{performance.month}</td>
                          <td className="py-3 px-4">
                            <span className={`font-bold ${
                              performance.totalReturn.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {performance.totalReturn}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-green-600">{performance.yieldIncome}</td>
                          <td className="py-3 px-4">
                            <span className={`${
                              performance.priceReturn.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {performance.priceReturn}
                            </span>
                          </td>
                          <td className="py-3 px-4">{performance.spreadChange}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

