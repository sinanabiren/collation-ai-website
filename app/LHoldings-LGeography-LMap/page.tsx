'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, MapPin, Building2, Globe, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function HoldingsGeographyMap() {
  const router = useRouter();

  const geographicData = [
    { name: "North America", value: 65.5, color: "#3b82f6" },
    { name: "Europe", value: 18.2, color: "#10b981" },
    { name: "Asia Pacific", value: 12.8, color: "#f59e0b" },
    { name: "Emerging Markets", value: 2.5, color: "#ef4444" },
    { name: "Other", value: 1.0, color: "#8b5cf6" }
  ];

  const regionalValues = [
    { region: "North America", value: 800000 },
    { region: "Europe", value: 445600 },
    { region: "Asia Pacific", value: 313600 },
    { region: "Emerging Markets", value: 61250 },
    { region: "Other", value: 24500 }
  ];

  const countryDetails = [
    { country: "United States", allocation: 58.5, marketValue: "$1,433,250", risk: "Low" },
    { country: "Canada", allocation: 7.0, marketValue: "$171,500", risk: "Low" },
    { country: "United Kingdom", allocation: 6.8, marketValue: "$166,600", risk: "Medium" },
    { country: "Germany", allocation: 4.2, marketValue: "$102,900", risk: "Medium" },
    { country: "Japan", allocation: 3.8, marketValue: "$93,100", risk: "Medium" },
    { country: "France", allocation: 3.5, marketValue: "$85,750", risk: "Medium" },
    { country: "Switzerland", allocation: 2.9, marketValue: "$71,050", risk: "Low" },
    { country: "Australia", allocation: 2.7, marketValue: "$66,150", risk: "Medium" },
    { country: "Netherlands", allocation: 2.0, marketValue: "$49,000", risk: "Low" },
    { country: "South Korea", allocation: 1.8, marketValue: "$44,100", risk: "Medium" }
  ];

  const custodianData = [
    { name: "Fidelity", percentage: 32.5, amount: "$795,625" },
    { name: "Charles Schwab", percentage: 28.3, amount: "$692,750" },
    { name: "Vanguard", percentage: 15.8, amount: "$387,000" },
    { name: "BlackRock", percentage: 12.2, amount: "$298,900" },
    { name: "State Street", percentage: 8.7, amount: "$213,075" },
    { name: "Other", percentage: 2.5, amount: "$61,250" }
  ];

  const performanceData = [
    { region: "North America", ytd: "+8.5%", oneYear: "+15.2%", threeYear: "+12.8%", fiveYear: "+11.4%" },
    { region: "Europe", ytd: "+6.2%", oneYear: "+11.8%", threeYear: "+9.5%", fiveYear: "+8.7%" },
    { region: "Asia Pacific", ytd: "+4.8%", oneYear: "+18.9%", threeYear: "+8.2%", fiveYear: "+9.8%" },
    { region: "Emerging Markets", ytd: "+12.3%", oneYear: "+22.1%", threeYear: "+6.8%", fiveYear: "+7.2%" },
    { region: "Other", ytd: "+3.2%", oneYear: "+8.5%", threeYear: "+5.4%", fiveYear: "+6.1%" }
  ];

  const oneYearPerformance = [
    { region: "North America", performance: 15.2 },
    { region: "Europe", performance: 11.8 },
    { region: "Asia Pacific", performance: 18.9 },
    { region: "Emerging Markets", performance: 22.1 },
    { region: "Other", performance: 8.5 }
  ];

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "High": return "bg-red-100 text-red-800 hover:bg-red-100";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/build-report')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Reports Gallery
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Allocation by Geography & Custodian</h1>
          <p className="text-muted-foreground">Geographic distribution and custodian breakdown with detailed percentages</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Primary Region</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">North America</div>
              <p className="text-xs text-muted-foreground">65.5% allocation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Primary Custodian</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Fidelity</div>
              <p className="text-xs text-muted-foreground">32.5% allocation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Countries</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">Geographic exposure</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Diversification</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Good</div>
              <p className="text-xs text-muted-foreground">Well distributed</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="geography" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="geography">Geographic Allocation</TabsTrigger>
            <TabsTrigger value="custodian">Custodian Breakdown</TabsTrigger>
            <TabsTrigger value="country">Country Details</TabsTrigger>
            <TabsTrigger value="performance">Regional Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="geography" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Allocation</CardTitle>
                  <CardDescription>Portfolio distribution by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={geographicData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name} ${value}%`}
                        >
                          {geographicData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Values</CardTitle>
                  <CardDescription>Dollar amounts by geographic region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regionalValues}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="region" 
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`} />
                        <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Market Value']} />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution Summary</CardTitle>
                <CardDescription>Detailed breakdown by region</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      <TableHead className="text-right">Allocation %</TableHead>
                      <TableHead className="text-right">Market Value</TableHead>
                      <TableHead className="text-center">Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {geographicData.map((region) => (
                      <TableRow key={region.name}>
                        <TableCell className="font-medium">{region.name}</TableCell>
                        <TableCell className="text-right">{region.value}%</TableCell>
                        <TableCell className="text-right">
                          ${(region.value * 24450).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className={
                            region.name === "North America" ? "bg-green-100 text-green-800" : 
                            region.name === "Emerging Markets" ? "bg-red-100 text-red-800" : 
                            "bg-yellow-100 text-yellow-800"
                          }>
                            {region.name === "North America" ? "Low" : 
                             region.name === "Emerging Markets" ? "High" : "Medium"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custodian" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custodian Breakdown</CardTitle>
                <CardDescription>Assets under management by custodian</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Custodian</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {custodianData.map((custodian) => (
                      <TableRow key={custodian.name}>
                        <TableCell className="font-medium">{custodian.name}</TableCell>
                        <TableCell className="text-right">{custodian.percentage}%</TableCell>
                        <TableCell className="text-right">{custodian.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="country" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top 10 Countries by Allocation</CardTitle>
                  <CardDescription>Most significant country exposures</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Country</TableHead>
                        <TableHead className="text-right">Allocation %</TableHead>
                        <TableHead className="text-right">Market Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {countryDetails.map((country) => (
                        <TableRow key={country.country}>
                          <TableCell className="font-medium">{country.country}</TableCell>
                          <TableCell className="text-right">{country.allocation}%</TableCell>
                          <TableCell className="text-right">{country.marketValue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Country Allocation Visualization</CardTitle>
                  <CardDescription>Treemap view of country allocations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={countryDetails.slice(0, 8)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="country" 
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                        <Bar dataKey="allocation" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance Comparison</CardTitle>
                <CardDescription>Returns by geographic region across time periods</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      <TableHead className="text-right">YTD</TableHead>
                      <TableHead className="text-right">1 Year</TableHead>
                      <TableHead className="text-right">3 Years</TableHead>
                      <TableHead className="text-right">5 Years</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceData.map((region) => (
                      <TableRow key={region.region}>
                        <TableCell className="font-medium">{region.region}</TableCell>
                        <TableCell className="text-right text-green-600 font-medium">{region.ytd}</TableCell>
                        <TableCell className="text-right text-green-600 font-medium">{region.oneYear}</TableCell>
                        <TableCell className="text-right text-green-600 font-medium">{region.threeYear}</TableCell>
                        <TableCell className="text-right text-green-600 font-medium">{region.fiveYear}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>1-Year Performance by Region</CardTitle>
                <CardDescription>Annual returns comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={oneYearPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="region" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
                      <Bar dataKey="performance" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
