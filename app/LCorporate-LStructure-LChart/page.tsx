'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building, Users, DollarSign, Globe, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function CorporateStructureChartPage() => {
  const router = useRouter();
  const [selectedView, setSelectedView] = useState("multi-entity");

  const summaryData = {
    totalEntities: 28,
    activeEntities: 24,
    jurisdictions: 8,
    countries: "multiple countries",
    totalAssets: 2.9,
    consolidatedValue: "Consolidated value",
    netWorth: 2.4,
    afterLiabilities: "After liabilities"
  };

  // Corporate entity hierarchy data
  const entityHierarchyData = [
    {
      entityName: "Smith Family Holdings LLC",
      type: "Parent",
      jurisdiction: "Delaware",
      ownership: "100%",
      assets: "$2850M",
      subEntities: 4,
      status: "Active"
    },
    {
      entityName: "Smith Investment Partners LP",
      type: "Subsidiary",
      jurisdiction: "Delaware",
      ownership: "85%",
      assets: "$1200M",
      subEntities: 8,
      status: "Active"
    },
    {
      entityName: "Smith Real Estate Holdings",
      type: "Subsidiary",
      jurisdiction: "Nevada",
      ownership: "90%",
      assets: "$850M",
      subEntities: 6,
      status: "Active"
    },
    {
      entityName: "Smith Technology Ventures",
      type: "Subsidiary",
      jurisdiction: "California",
      ownership: "75%",
      assets: "$450M",
      subEntities: 4,
      status: "Active"
    },
    {
      entityName: "Smith Energy Assets LLC",
      type: "Subsidiary",
      jurisdiction: "Texas",
      ownership: "95%",
      assets: "$280M",
      subEntities: 3,
      status: "Active"
    },
    {
      entityName: "Smith International Holdings",
      type: "Subsidiary",
      jurisdiction: "Cayman Islands",
      ownership: "100%",
      assets: "$180M",
      subEntities: 2,
      status: "Dormant"
    }
  ];

  // Asset distribution data
  const assetDistributionData = [
    { entity: "Smith Family Holdings", realEstate: 850, securities: 1200, alternatives: 450, cash: 350 },
    { entity: "Investment Partners", realEstate: 200, securities: 650, alternatives: 280, cash: 70 },
    { entity: "Real Estate Holdings", realEstate: 600, securities: 150, alternatives: 80, cash: 20 },
    { entity: "Technology Ventures", realEstate: 50, securities: 200, alternatives: 180, cash: 20 },
    { entity: "Energy Assets", realEstate: 120, securities: 80, alternatives: 70, cash: 10 }
  ];

  // Jurisdiction analysis data with assets by jurisdiction
  const jurisdictionAssetsData = [
    { jurisdiction: "Delaware", assets: 1580 },
    { jurisdiction: "Nevada", assets: 850 },
    { jurisdiction: "California", assets: 450 },
    { jurisdiction: "Texas", assets: 280 },
    { jurisdiction: "Cayman Islands", assets: 180 },
    { jurisdiction: "British Virgin Islands", assets: 120 }
  ];

  // Jurisdiction summary data
  const jurisdictionData = [
    { jurisdiction: "Delaware", entities: 12, assets: "$1580M", percentage: "55.4%", regulationLevel: "Domestic" },
    { jurisdiction: "Nevada", entities: 6, assets: "$850M", percentage: "29.8%", regulationLevel: "Domestic" },
    { jurisdiction: "California", entities: 4, assets: "$450M", percentage: "15.8%", regulationLevel: "Domestic" },
    { jurisdiction: "Texas", entities: 3, assets: "$280M", percentage: "9.8%", regulationLevel: "Domestic" },
    { jurisdiction: "Cayman Islands", entities: 2, assets: "$180M", percentage: "6.3%", regulationLevel: "Offshore" },
    { jurisdiction: "British Virgin Islands", entities: 1, assets: "$120M", percentage: "4.2%", regulationLevel: "Offshore" }
  ];

  // Ownership structure by tier data
  const ownershipTierData = [
    { tier: "Tier 1 (Direct)", entityCount: 4, avgOwnership: 92.5 },
    { tier: "Tier 2 (Indirect)", entityCount: 12, avgOwnership: 78.3 },
    { tier: "Tier 3 (Sub-Holdings)", entityCount: 8, avgOwnership: 65.8 },
    { tier: "Tier 4 (Operating)", entityCount: 4, avgOwnership: 45.2 }
  ];

  // Ownership tier analysis
  const ownershipTierAnalysis = [
    { level: "Tier 1 (Direct)", entities: 4, avgOwnership: "92.5%", totalAssets: "$2280M", controlLevel: "Full Control" },
    { level: "Tier 2 (Indirect)", entities: 12, avgOwnership: "78.3%", totalAssets: "$1850M", controlLevel: "Full Control" },
    { level: "Tier 3 (Sub-Holdings)", entities: 8, avgOwnership: "65.8%", totalAssets: "$980M", controlLevel: "Majority" },
    { level: "Tier 4 (Operating)", entities: 4, avgOwnership: "45.2%", totalAssets: "$420M", controlLevel: "Minority" }
  ];

  // Compliance filing status data
  const complianceFilingData = [
    {
      entity: "Smith Family Holdings LLC",
      filingType: "Annual Report",
      dueDate: "2024-12-31",
      status: "Pending",
      jurisdiction: "Delaware"
    },
    {
      entity: "Smith Investment Partners LP",
      filingType: "Tax Return",
      dueDate: "2024-11-15",
      status: "Filed",
      jurisdiction: "Delaware"
    },
    {
      entity: "Smith Real Estate Holdings",
      filingType: "Regulatory Filing",
      dueDate: "2024-10-30",
      status: "Overdue",
      jurisdiction: "Nevada"
    },
    {
      entity: "Smith Technology Ventures",
      filingType: "Securities Filing",
      dueDate: "2024-12-15",
      status: "Pending",
      jurisdiction: "California"
    },
    {
      entity: "Smith Energy Assets LLC",
      filingType: "Environmental Report",
      dueDate: "2024-11-30",
      status: "Filed",
      jurisdiction: "Texas"
    }
  ];

  // Filing status summary
  const filingStatusSummary = {
    filed: 2,
    pending: 2,
    overdue: 1
  };

  // Upcoming deadlines
  const upcomingDeadlines = [
    "2024-11-30: Environmental Report",
    "2024-12-15: Securities Filing",
    "2024-12-31: Annual Report"
  ];

  // Compliance score
  const complianceScore = 80;

  // Risk assessment data
  const riskAssessmentData = [
    { category: "Regulatory Risk", score: 3.2 },
    { category: "Operational Risk", score: 2.8 },
    { category: "Financial Risk", score: 2.1 },
    { category: "Compliance Risk", score: 3.8 },
    { category: "Reputational Risk", score: 2.5 }
  ];

  // Risk analysis details
  const riskAnalysisDetails = [
    { category: "Regulatory Risk", score: "3.2/5", impactLevel: "Medium", trend: "Stable", priority: "Medium" },
    { category: "Operational Risk", score: "2.8/5", impactLevel: "Low", trend: "Improving", priority: "Medium" },
    { category: "Financial Risk", score: "2.1/5", impactLevel: "Low", trend: "Stable", priority: "Medium" },
    { category: "Compliance Risk", score: "3.8/5", impactLevel: "High", trend: "Monitoring", priority: "High" },
    { category: "Reputational Risk", score: "2.5/5", impactLevel: "Low", trend: "Stable", priority: "Medium" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Dormant":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Parent":
        return "bg-blue-100 text-blue-800";
      case "Subsidiary":
        return "bg-purple-100 text-purple-800";
      case "Joint Venture":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
            <h1 className="text-3xl font-bold">Corporate Structure Chart</h1>
            <div className="flex gap-2">
              <Button variant={selectedView === "multi-entity" ? "default" : "outline"} size="sm" onClick={() => setSelectedView("multi-entity")}>
                Multi-Entity
              </Button>
              <Button variant={selectedView === "compliance" ? "default" : "outline"} size="sm" onClick={() => setSelectedView("compliance")}>
                Compliance
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Visual representation of corporate structure and entity relationships
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building className="h-4 w-4" />
                Total Entities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.totalEntities}</div>
              <p className="text-sm text-muted-foreground">{summaryData.activeEntities} active entities</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Jurisdictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.jurisdictions}</div>
              <p className="text-sm text-muted-foreground">Across {summaryData.countries}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryData.totalAssets}B</div>
              <p className="text-sm text-muted-foreground">{summaryData.consolidatedValue}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Net Worth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summaryData.netWorth}B</div>
              <p className="text-sm text-muted-foreground">{summaryData.afterLiabilities}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="hierarchy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hierarchy">Entity Hierarchy</TabsTrigger>
            <TabsTrigger value="jurisdictions">Jurisdictions</TabsTrigger>
            <TabsTrigger value="ownership">Ownership</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="hierarchy" className="space-y-6">
            {/* Corporate Entity Hierarchy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Corporate Entity Hierarchy
                  <Badge variant="outline" className="ml-2">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    0
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">Complete structure showing parent-subsidiary relationships</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Entity Name</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Jurisdiction</th>
                        <th className="text-left py-3 px-4">
                          Ownership %
                          <Badge variant="outline" className="ml-2">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            0
                          </Badge>
                        </th>
                        <th className="text-left py-3 px-4">Assets</th>
                        <th className="text-left py-3 px-4">Sub-Entities</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entityHierarchyData.map((entity, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{entity.entityName}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${getTypeColor(entity.type)}`}>
                              {entity.type}
                            </span>
                          </td>
                          <td className="py-3 px-4">{entity.jurisdiction}</td>
                          <td className="py-3 px-4 font-semibold">{entity.ownership}</td>
                          <td className="py-3 px-4 font-bold">{entity.assets}</td>
                          <td className="py-3 px-4">{entity.subEntities}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${getStatusColor(entity.status)}`}>
                              {entity.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Asset Distribution by Entity */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Distribution by Entity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={assetDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="entity" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, ""]} />
                    <Bar dataKey="realEstate" fill="#22c55e" name="Real Estate" />
                    <Bar dataKey="securities" fill="#3b82f6" name="Securities" />
                    <Bar dataKey="alternatives" fill="#f59e0b" name="Alternatives" />
                    <Bar dataKey="cash" fill="#8b5cf6" name="Cash" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Real Estate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Securities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm">Alternatives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm">Cash</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jurisdictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assets by Jurisdiction</CardTitle>
                <p className="text-sm text-muted-foreground">Geographic distribution of corporate entities and assets</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={jurisdictionAssetsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="jurisdiction" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}M`, "Assets"]} />
                    <Bar dataKey="assets" fill="#8b5cf6" />
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
                <CardTitle>Jurisdiction Summary</CardTitle>
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
                        <th className="text-left py-3 px-4">Jurisdiction</th>
                        <th className="text-left py-3 px-4">Entities</th>
                        <th className="text-left py-3 px-4">Assets</th>
                        <th className="text-left py-3 px-4">Percentage</th>
                        <th className="text-left py-3 px-4">Regulation Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jurisdictionData.map((jurisdiction, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{jurisdiction.jurisdiction}</td>
                          <td className="py-3 px-4">{jurisdiction.entities}</td>
                          <td className="py-3 px-4 font-bold">{jurisdiction.assets}</td>
                          <td className="py-3 px-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {jurisdiction.percentage}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${
                              jurisdiction.regulationLevel === "Domestic" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                            }`}>
                              {jurisdiction.regulationLevel}
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

          <TabsContent value="ownership" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ownership Structure by Tier</CardTitle>
                <p className="text-sm text-muted-foreground">Multi-tier ownership analysis showing control levels</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={ownershipTierData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tier" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="entityCount" fill="#8b5cf6" name="Entity Count" />
                    <Bar dataKey="avgOwnership" fill="#22c55e" name="Avg Ownership %" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm">Entity Count</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Avg Ownership %</span>
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
                <CardTitle>Ownership Tier Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Ownership Level</th>
                        <th className="text-left py-3 px-4">Entities</th>
                        <th className="text-left py-3 px-4">Avg Ownership</th>
                        <th className="text-left py-3 px-4">Total Assets</th>
                        <th className="text-left py-3 px-4">Control Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ownershipTierAnalysis.map((tier, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{tier.level}</td>
                          <td className="py-3 px-4">{tier.entities}</td>
                          <td className="py-3 px-4">{tier.avgOwnership}</td>
                          <td className="py-3 px-4 font-bold">{tier.totalAssets}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${
                              tier.controlLevel === "Full Control" ? "bg-blue-100 text-blue-800" :
                              tier.controlLevel === "Majority" ? "bg-yellow-100 text-yellow-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {tier.controlLevel}
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

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Filing Status</CardTitle>
                <p className="text-sm text-muted-foreground">Current status of regulatory filings across entities</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Entity</th>
                        <th className="text-left py-3 px-4">Filing Type</th>
                        <th className="text-left py-3 px-4">
                          Due Date
                          <Badge variant="outline" className="ml-2">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            0
                          </Badge>
                        </th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Jurisdiction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceFilingData.map((filing, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{filing.entity}</td>
                          <td className="py-3 px-4">{filing.filingType}</td>
                          <td className="py-3 px-4">{filing.dueDate}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${
                              filing.status === "Filed" ? "bg-blue-100 text-blue-800" :
                              filing.status === "Pending" ? "bg-gray-100 text-gray-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {filing.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{filing.jurisdiction}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Filing Status Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Filed</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">{filingStatusSummary.filed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-bold">{filingStatusSummary.pending}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Overdue</span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-bold">{filingStatusSummary.overdue}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        {deadline}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{complianceScore}%</div>
                    <div className="text-sm text-muted-foreground">Current compliance rate</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Corporate Risk Assessment</CardTitle>
                <p className="text-sm text-muted-foreground">Risk evaluation across different categories</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={riskAssessmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#ef4444" name="Risk Score" />
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
                <CardTitle>Risk Analysis Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Risk Category</th>
                        <th className="text-left py-3 px-4">Score</th>
                        <th className="text-left py-3 px-4">Impact Level</th>
                        <th className="text-left py-3 px-4">Trend</th>
                        <th className="text-left py-3 px-4">Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskAnalysisDetails.map((risk, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{risk.category}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${
                              risk.score.startsWith("3.8") ? "bg-red-100 text-red-800" :
                              risk.score.startsWith("3.2") ? "bg-yellow-100 text-yellow-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {risk.score}
                            </span>
                          </td>
                          <td className="py-3 px-4">{risk.impactLevel}</td>
                          <td className="py-3 px-4">{risk.trend}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-sm ${
                              risk.priority === "High" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                            }`}>
                              {risk.priority}
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
        </Tabs>
      </div>
    </div>
  );
};

