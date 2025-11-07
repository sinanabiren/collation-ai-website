'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Filter, Info, TrendingUp, TrendingDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DetailedHoldingsReportPage() => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedSort, setSelectedSort] = useState("market-value");

  // Sample holdings data
  const holdings = [
    { symbol: "NVDA", company: "NVIDIA Corporation", sector: "Technology", shares: 400, price: 875.28, marketValue: 350112, gainLoss: 70112, percentage: 25.04 },
    { symbol: "MSFT", company: "Microsoft Corporation", sector: "Technology", shares: 800, price: 378.85, marketValue: 303080, gainLoss: 28080, percentage: 10.21 },
    { symbol: "AAPL", company: "Apple Inc.", sector: "Technology", shares: 1500, price: 175.43, marketValue: 263145, gainLoss: 29145, percentage: 12.45 },
    { symbol: "JPM", company: "JPMorgan Chase & Co.", sector: "Financial Services", shares: 1100, price: 168.45, marketValue: 185295, gainLoss: 15295, percentage: 9.00 },
  ];

  const sectors = [
    { name: "Technology", count: 3, marketValue: 916337, percentage: 52.1 },
    { name: "Consumer Discretionary", company: "Amazon", count: 2, marketValue: 280326, percentage: 15.9 },
    { name: "Financial Services", count: 1, marketValue: 185295, percentage: 10.5 },
    { name: "Communication Services", count: 1, marketValue: 171072, percentage: 9.7 },
    { name: "Healthcare", count: 1, marketValue: 125384, percentage: 7.1 },
  ];

  const topPerformers = {
    gainers: [
      { symbol: "NVDA", company: "NVIDIA Corporation", return: 25.04, value: 70112 },
      { symbol: "AAPL", company: "Apple Inc.", return: 12.45, value: 29145 },
      { symbol: "TSLA", company: "Tesla Inc.", return: 10.41, value: 14052 },
    ],
    losers: [
      { symbol: "AMZN", company: "Amazon.com Inc.", return: -6.23, value: -8726 },
      { symbol: "JNJ", company: "Johnson & Johnson", return: -5.01, value: -6616 },
    ]
  };

  const filteredHoldings = holdings.filter(holding => 
    holding.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    holding.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold">Detailed Holdings Report</h1>
          <p className="text-muted-foreground">
            Complete holdings breakdown with portfolio, security details, and valuations
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Market Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,678,414</div>
              <p className="text-sm text-muted-foreground">8 holdings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Gain/Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+$147,414</div>
              <p className="text-sm text-muted-foreground">9.63% total return</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Best Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">NVDA</div>
              <p className="text-sm text-muted-foreground">+25.04% return</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sectors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-sm text-muted-foreground">Diversified across sectors</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="holdings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="holdings">Holdings Details</TabsTrigger>
            <TabsTrigger value="sectors">Sector Breakdown</TabsTrigger>
            <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings" className="space-y-6">
            {/* Holdings Filter & Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Holdings Filter & Search
                </CardTitle>
                <p className="text-sm text-muted-foreground">Filter and search through your portfolio holdings</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by symbol or company name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="financial">Financial Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Market Value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market-value">Market Value</SelectItem>
                      <SelectItem value="gain-loss">Gain/Loss</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Holdings Table */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Holdings</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed breakdown of all holdings</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead className="text-right">Shares</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Market Value</TableHead>
                      <TableHead className="text-right">Gain/Loss</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHoldings.map((holding) => (
                      <TableRow key={holding.symbol}>
                        <TableCell className="font-medium">{holding.symbol}</TableCell>
                        <TableCell>{holding.company}</TableCell>
                        <TableCell>{holding.sector}</TableCell>
                        <TableCell className="text-right">{holding.shares.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${holding.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${holding.marketValue.toLocaleString()}</TableCell>
                        <TableCell className={`text-right ${holding.gainLoss > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {holding.gainLoss > 0 ? '+' : ''}${holding.gainLoss.toLocaleString()}
                        </TableCell>
                        <TableCell className={`text-right ${holding.percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {holding.percentage > 0 ? '+' : ''}{holding.percentage.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sector Allocation</CardTitle>
                <p className="text-sm text-muted-foreground">Holdings breakdown by sector</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sector</TableHead>
                      <TableHead className="text-right">Holdings Count</TableHead>
                      <TableHead className="text-right">Market Value</TableHead>
                      <TableHead className="text-right">Allocation %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sectors.map((sector) => (
                      <TableRow key={sector.name}>
                        <TableCell className="font-medium">{sector.name}</TableCell>
                        <TableCell className="text-right">{sector.count}</TableCell>
                        <TableCell className="text-right">${sector.marketValue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{sector.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <p className="text-sm text-muted-foreground">Best and worst performing holdings</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Top Gainers
                    </h4>
                    <div className="space-y-3">
                      {topPerformers.gainers.map((stock) => (
                        <div key={stock.symbol} className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">{stock.company}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-600 font-semibold">+{stock.return}%</div>
                            <div className="text-sm text-muted-foreground">+${stock.value.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                      <TrendingDown className="h-5 w-5" />
                      Top Losers
                      <Badge variant="outline" className="ml-2">
                        <Info className="h-3 w-3 mr-1" />
                        0
                      </Badge>
                    </h4>
                    <div className="space-y-3">
                      {topPerformers.losers.map((stock) => (
                        <div key={stock.symbol} className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">{stock.company}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-red-600 font-semibold">{stock.return}%</div>
                            <div className="text-sm text-muted-foreground">-${Math.abs(stock.value).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics</CardTitle>
                <p className="text-sm text-muted-foreground">Beta and valuation metrics for holdings</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead className="text-right">Beta</TableHead>
                      <TableHead className="text-right">P/E Ratio</TableHead>
                      <TableHead className="text-right">Dividend Yield</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">AAPL</TableCell>
                      <TableCell>Apple Inc.</TableCell>
                      <TableCell className="text-right">1.21</TableCell>
                      <TableCell className="text-right">28.5</TableCell>
                      <TableCell className="text-right">0.52%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

