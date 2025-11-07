'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Search, Database, ChevronRight, CheckCircle, Upload } from "lucide-react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";

export default function DataConnectionsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  const vendors = {
    "General Ledger / Accounting Software": [
      { name: "Allvue", description: "Alternative investment management", icon: "💼" },
      { name: "FundCount", description: "Investment accounting platform", icon: "📊" },
      { name: "Intuit QuickBooks", description: "Small business accounting", icon: "📋" },
      { name: "Xero", description: "Cloud accounting software", icon: "🟢" },
      { name: "Sage Intacct", description: "Financial management", icon: "🔧" },
      { name: "Microsoft Dynamics 365", description: "Enterprise resource planning", icon: "🚀" },
      { name: "Oracle NetSuite", description: "Cloud business software", icon: "🔶" },
      { name: "Microsoft Business Central", description: "Business management solution", icon: "🏢" },
      { name: "Microsoft Navision (Dynamics NAV)", description: "Enterprise resource planning", icon: "📊" },
      { name: "Softledger", description: "Cloud-based accounting", icon: "💰" },
      { name: "Bill", description: "Business payments platform", icon: "💳" },
      { name: "Zoho CRM", description: "Customer relationship management", icon: "📱" },
      { name: "Quicken", description: "Personal finance management", icon: "🏠" },
      { name: "Tally", description: "Business accounting software", icon: "📈" },
    ],
    "Portfolio Management & Wealth Management": [
      { name: "Addepar", description: "Wealth management platform", icon: "💎" },
      { name: "SS&C Black Diamond", description: "Wealth management technology", icon: "💎" },
      { name: "Envestnet Tamarac", description: "Rebalancing and reporting", icon: "💎" },
      { name: "Orion", description: "Technology solutions for advisors", icon: "⚫" },
      { name: "Asora", description: "Portfolio management platform", icon: "🎯", selected: true },
      { name: "Eton Solutions", description: "Investment management", icon: "🌍" },
      { name: "Masttro", description: "Portfolio management", icon: "⭐" },
      { name: "AdvisorEngine", description: "Digital wealth management", icon: "🚀" },
      { name: "Advyzon", description: "Portfolio management system", icon: "📊" },
      { name: "eMoney", description: "Financial planning software", icon: "💰" },
      { name: "Investnet Money Guide Pro", description: "Financial planning", icon: "📊" },
      { name: "Right Capital", description: "Financial planning platform", icon: "✅" },
      { name: "NaviPlan", description: "Financial planning software", icon: "🧭" },
      { name: "Asset-Map", description: "Visual financial planning", icon: "🗺️" },
      { name: "WealthBox", description: "CRM for financial advisors", icon: "📦" },
      { name: "RedTail", description: "CRM for financial services", icon: "🦊" },
      { name: "SmartOffice", description: "Practice management software", icon: "🏢" },
    ],
    "Alternative Investments & Fund Administration": [
      { name: "SEI Archway", description: "Fund administration", icon: "🏛️" },
      { name: "Northern Trust Wealth Passport", description: "Wealth management platform", icon: "🛡️" },
      { name: "Solovis", description: "Investment reporting platform", icon: "👁️" },
      { name: "Liquiditybook", description: "Trading technology", icon: "📘" },
      { name: "Private Wealth Systems", description: "Wealth management software", icon: "🏦" },
      { name: "Fi-Tek Wealth Solutions", description: "Wealth management technology", icon: "⚫" },
      { name: "Infinite Investment Systems", description: "Investment management software", icon: "♾️" },
      { name: "SS&C Advent", description: "Investment management software", icon: "📊" },
      { name: "SS&C Total Return", description: "Performance measurement", icon: "📊" },
      { name: "SS&C Salentica", description: "Wealth management CRM", icon: "👥" },
      { name: "Burgiss", description: "Private capital data", icon: "🏛️" },
      { name: "iCapital", description: "Alternative investment platform", icon: "📊" },
      { name: "Carta", description: "Cap table management", icon: "📦" },
      { name: "Juniper Square", description: "Investment management platform", icon: "🏢" },
      { name: "Canoe Intelligence", description: "Alternative investment data", icon: "🛶" },
    ],
    "Data & Analytics Platforms": [
      { name: "LSEG Alphadesk", description: "Financial data platform", icon: "📊" },
      { name: "Infront", description: "Financial data solutions", icon: "📈" },
      { name: "PCR Insights", description: "Performance analytics", icon: "🔍" },
      { name: "Fathom", description: "Financial analysis", icon: "🌊" },
      { name: "Valuefy", description: "Wealth management analytics", icon: "💎" },
      { name: "Bloomberg", description: "Financial data terminal", icon: "⬜" },
      { name: "FactSet", description: "Financial data analytics", icon: "📊" },
      { name: "Morningstar", description: "Investment research", icon: "⭐" },
      { name: "MSCI Total Plan (formerly Caissa)", description: "Performance analytics", icon: "📈" },
      { name: "Microsoft PowerBI", description: "Business analytics", icon: "📊" },
      { name: "Microsoft Fabric", description: "Data platform", icon: "🔵" },
      { name: "Amazon Redshift", description: "Data warehouse", icon: "🔴" },
      { name: "Alteryx", description: "Data analytics platform", icon: "🔵" },
    ],
    "Document Management & Collaboration": [
      { name: "Microsoft SharePoint", description: "Document management platform", icon: "📊" },
      { name: "Microsoft OneDrive", description: "Cloud storage service", icon: "☁️" },
      { name: "Microsoft Teams", description: "Collaboration platform", icon: "👥" },
      { name: "Box", description: "Cloud content management", icon: "📦" },
      { name: "Egnyte", description: "Content collaboration platform", icon: "🔒" },
      { name: "Laserfiche", description: "Document management", icon: "📄" },
      { name: "OpenText", description: "Information management", icon: "📄" },
      { name: "SS&C Intralinks", description: "Virtual data rooms", icon: "🔗" },
      { name: "Moxo", description: "Client interaction platform", icon: "📱" },
    ],
    "Real Estate & Property Management": [
      { name: "Yardi", description: "Property management software", icon: "🏢" },
      { name: "AppFolio", description: "Property management platform", icon: "👤" },
      { name: "MRI Software", description: "Real estate software", icon: "👥" },
      { name: "CoStar", description: "Commercial real estate database", icon: "⭐" },
      { name: "Argus", description: "Real estate valuation software", icon: "👁️" },
      { name: "Zillow", description: "Real estate marketplace", icon: "🏠" },
    ],
    "CRM & Business Operations": [
      { name: "Salesforce", description: "Customer relationship management", icon: "☁️" },
      { name: "HubSpot", description: "Inbound marketing platform", icon: "🔴" },
      { name: "Mailchimp", description: "Email marketing service", icon: "🐵" },
      { name: "ADP", description: "Human resources solutions", icon: "👥" },
      { name: "Ramp", description: "Corporate expense management", icon: "🚀" },
      { name: "Toast", description: "Restaurant management platform", icon: "🍞" },
    ],
    "Specialized Financial Software": [
      { name: "Albridge Wealth Reporting (by Pershing)", description: "Wealth reporting platform", icon: "📊" },
      { name: "AltExchange", description: "Alternative investment exchange", icon: "🔄" },
      { name: "Assetmax", description: "Asset management software", icon: "📈" },
      { name: "Asset Vantage", description: "Investment management platform", icon: "📦" },
      { name: "BridgeFT", description: "Wealth management technology", icon: "⚫" },
      { name: "Broadridge", description: "Financial communications", icon: "🔗" },
      { name: "Chrono24", description: "Luxury watch marketplace", icon: "⚫" },
      { name: "D1g1t", description: "Digital asset management", icon: "🔵" },
      { name: "DAPM", description: "Digital asset portfolio management", icon: "📊" },
      { name: "Dynamo", description: "Investor relations platform", icon: "⚡" },
      { name: "Expersoft", description: "Financial software solutions", icon: "⚫" },
      { name: "Fathom AI Notetaker", description: "AI meeting assistant", icon: "🌊" },
      { name: "FundingStack", description: "Fundraising platform", icon: "💰" },
      { name: "Fynancial", description: "Investment management platform", icon: "💎" },
      { name: "Intelliflo Redblack", description: "Wealth management platform", icon: "🔴" },
      { name: "Invest Cloud", description: "Investment management software", icon: "☁️" },
      { name: "Knowledger", description: "Knowledge management platform", icon: "🧠" },
      { name: "Mirador", description: "Investment management software", icon: "👁️" },
      { name: "Ndex", description: "Financial data platform", icon: "📊" },
      { name: "Nirvana Solutions", description: "Investment management software", icon: "🔮" },
      { name: "Orca", description: "Investment platform", icon: "🐋" },
      { name: "Plaid", description: "Financial data network", icon: "🏴" },
      { name: "Qvinci", description: "Investment management platform", icon: "🎯" },
      { name: "RedBlack", description: "Wealth management software", icon: "🔴" },
      { name: "Rockit® Solutions", description: "Financial technology solutions", icon: "🚀" },
      { name: "Tradeweb", description: "Electronic trading platform", icon: "🌐" },
      { name: "Truss Edge", description: "Financial infrastructure", icon: "📊" },
      { name: "TrustNet", description: "Trust management platform", icon: "🛡️" },
      { name: "Vanilla", description: "Derivatives technology", icon: "🍦" },
      { name: "WealthHub", description: "Wealth management platform", icon: "🏢" },
      { name: "Wealthscape (by Fidelity Investments)", description: "Wealth management platform", icon: "🏠" },
    ],
    "Major US Banks": [
      { name: "J.P. Morgan", description: "Global investment bank", icon: "🏛️" },
      { name: "Bank of America", description: "Major US commercial bank", icon: "🏛️" },
      { name: "Wells Fargo", description: "Diversified financial services", icon: "🐎" },
      { name: "Chase", description: "Consumer and commercial banking", icon: "🏠" },
      { name: "Citi", description: "Global banking corporation", icon: "🌐" },
      { name: "US Bank", description: "Fifth largest bank in US", icon: "🇺🇸" },
      { name: "Goldman Sachs", description: "Investment banking services", icon: "💰" },
      { name: "Morgan Stanley", description: "Investment bank and wealth management", icon: "📈" },
      { name: "Merrill Lynch", description: "Wealth management division", icon: "🐂" },
      { name: "First Republic", description: "Private bank and wealth management", icon: "🏛️" },
    ],
    "Investment Banks & Broker-Dealers": [
      { name: "Interactive Brokers", description: "Electronic trading platform", icon: "📊" },
      { name: "Schwab", description: "Discount brokerage and banking", icon: "🔵" },
      { name: "TDAmeritrade", description: "Online broker", icon: "📈" },
      { name: "Fidelity", description: "Mutual funds and brokerage", icon: "💚" },
      { name: "Vanguard", description: "Investment management company", icon: "🔺" },
      { name: "Pershing", description: "Clearing and custody services", icon: "🏢" },
      { name: "Apex", description: "Clearing and custody platform", icon: "🔺" },
      { name: "TradePMR", description: "Technology and custody platform", icon: "⚫" },
      { name: "Robinhood", description: "Commission-free trading platform", icon: "🏹" },
      { name: "John Hancock", description: "Financial services company", icon: "⚡" },
    ],
    "Global Custodian Banks": [
      { name: "BNY Mellon", description: "Global custodian and asset manager", icon: "🏛️" },
      { name: "Northern Trust", description: "Wealth management and custody", icon: "🔒" },
      { name: "State Street", description: "Institutional custody services", icon: "🏢" },
      { name: "UBS", description: "Swiss global financial services", icon: "🔴" },
      { name: "Credit Suisse", description: "Swiss investment bank", icon: "🇨🇭" },
      { name: "Deutsche Bank", description: "German multinational bank", icon: "🇩🇪" },
      { name: "HSBC", description: "British multinational bank", icon: "🔴" },
      { name: "Barclays", description: "British multinational bank", icon: "⚫" },
      { name: "Standard Chartered", description: "British multinational bank", icon: "💎" },
      { name: "Societe Generale", description: "French multinational bank", icon: "🔴" },
    ],
    "Private Banks & Wealth Management": [
      { name: "Julius Baer", description: "Swiss private banking", icon: "👑" },
      { name: "Pictet", description: "Swiss private bank", icon: "🔺" },
      { name: "Lombard Odier", description: "Swiss private bank", icon: "👑" },
      { name: "J. Safra Sarasin", description: "Private banking group", icon: "💎" },
      { name: "LGT", description: "Liechtenstein private bank", icon: "👑" },
      { name: "Union Bancaire Privée (UBP)", description: "Swiss private bank", icon: "🏛️" },
      { name: "Reichmuth & Co.", description: "Swiss private bank", icon: "🔺" },
      { name: "EFG", description: "Global private banking group", icon: "☀️" },
      { name: "City National Bank", description: "Private and business banking", icon: "🏢" },
      { name: "Safra National Bank of New York", description: "Private banking services", icon: "🗽" },
    ],
    "Regional & International Banks": [
      { name: "Royal Bank of Canada (RBC)", description: "Canadian multinational bank", icon: "🍁" },
      { name: "BNP Paribas", description: "French international bank", icon: "🇫🇷" },
      { name: "Crédit Agricole", description: "French cooperative bank", icon: "🌱" },
      { name: "Intesa Sanpaolo", description: "Italian banking group", icon: "🇮🇹" },
      { name: "Commonwealth Bank of Australia", description: "Australian multinational bank", icon: "🇦🇺" },
      { name: "NAB", description: "National Australia Bank", icon: "🏢" },
      { name: "DBS", description: "Development Bank of Singapore", icon: "🏠" },
      { name: "Bank of Singapore", description: "Private banking arm of OCBC", icon: "🇸🇬" },
      { name: "BEA (The Bank of East Asia)", description: "Hong Kong-based bank", icon: "🏢" },
      { name: "Itau", description: "Brazilian multinational bank", icon: "🇧🇷" },
    ],
    "Specialized Custodians & Fund Services": [
      { name: "Citco", description: "Fund administration services", icon: "🏢" },
      { name: "Gen II Fund Services", description: "Fund administration platform", icon: "⚡" },
      { name: "JTC Group", description: "Professional services group", icon: "🌐" },
      { name: "Adminis", description: "Fund administration services", icon: "📊" },
      { name: "alterDomus", description: "Corporate and fund services", icon: "🏢" },
      { name: "Nav Fund Services", description: "Fund administration services", icon: "🧭" },
      { name: "Opus Fund Services", description: "Alternative investment services", icon: "🎵" },
      { name: "Registry Direct", description: "Transfer agent services", icon: "📊" },
      { name: "One Registry Services", description: "Registry and corporate services", icon: "ℹ️" },
      { name: "Computershare", description: "Transfer agent and registry services", icon: "⚫" },
    ]
  };

  const filteredVendors = Object.fromEntries(
    Object.entries(vendors).map(([category, vendorList]) => [
      category,
      vendorList.filter(vendor =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ]).filter(([_, vendorList]) => (vendorList as any[]).length > 0)
  ) as Record<string, typeof vendors[keyof typeof vendors]>;

  const handleVendorSelect = (vendorName: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorName) 
        ? prev.filter(v => v !== vendorName)
        : [...prev, vendorName]
    );
  };

  const handleContinue = () => {
    if (selectedVendors.length > 0) {
      router.push(`/data-connection-config?vendor=${selectedVendors[0]}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/trial-dashboard"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-3">
              <Database className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Data Connections</h1>
            </div>
          </div>
          <Badge className="bg-success/10 text-success hover:bg-success/20">
            Trial Active
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Setup Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Setup Progress</h2>
                  <span className="text-lg font-bold text-primary">0%</span>
                </div>
                <Progress value={0} className="h-2 mb-4" />
                <p className="text-muted-foreground">
                  First, let's start creating your data connections to build your customized data warehousing solution.
                </p>
              </CardContent>
            </Card>

            {/* Technology Stack and Custodian Banks */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  What is your current Technology Stack like?
                </h2>
                <p className="text-muted-foreground mb-6">
                  We've identified <span className="font-semibold">111 vendors</span> from your list. Select all systems you currently use to help us build the perfect data connections for your family office.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Please list your Custodian Banks
                </h2>
                <p className="text-muted-foreground mb-4">
                  Select all custodian banks and financial institutions where you hold assets. This helps us understand your custody landscape for data integration.
                </p>

                {/* Upload Data Button */}
                <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">
                          Don't see your Technology Stack in the List?
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Don't worry! Upload your data over here and we will process it
                        </p>
                      </div>
                      <Link href="/findoc-parser">
                        <Button className="flex items-center space-x-2">
                          <Upload className="w-4 h-4" />
                          <span>Upload Data</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search technology vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Vendor Categories */}
              <div className="space-y-6">
                {Object.entries(filteredVendors).map(([category, vendorList]) => (
                  <div key={category} className="bg-card rounded-lg border border-border">
                    <div className="p-4 border-b border-border">
                      <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                        <Database className="w-5 h-5 text-primary" />
                        <span>{category}</span>
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {vendorList.map((vendor, index) => (
                          <Card 
                            key={index}
                            className={`cursor-pointer transition-all duration-200 ${
                              selectedVendors.includes(vendor.name) 
                                ? 'bg-primary/10 border-primary' 
                                : vendor.selected
                                ? 'bg-orange-100 border-orange-300'
                                : 'hover:bg-muted/50 border-border'
                            }`}
                            onClick={() => handleVendorSelect(vendor.name)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">
                                  {vendor.icon}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-foreground">{vendor.name}</h4>
                                  <p className="text-sm text-muted-foreground">{vendor.description}</p>
                                </div>
                                {selectedVendors.includes(vendor.name) && (
                                  <CheckCircle className="w-5 h-5 text-primary" />
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {/* "Other" input fields based on category */}
                      {[
                        "General Ledger / Accounting Software",
                        "Alternative Investments & Fund Administration", 
                        "Portfolio Management & Wealth Management",
                        "Data & Analytics Platforms",
                        "Document Management & Collaboration",
                        "Real Estate & Property Management",
                        "CRM & Business Operations",
                        "Specialized Financial Software",
                        "Major US Banks",
                        "Investment Banks & Broker-Dealers",
                        "Global Custodian Banks",
                        "Private Banks & Wealth Management",
                        "Regional & International Banks",
                        "Specialized Custodians & Fund Services"
                      ].includes(category) && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-foreground mb-2">
                            Other {category} (please specify)
                          </p>
                          <Input 
                            placeholder={category.includes("Banks") ? "Enter bank name..." : "Enter system name..."} 
                            className="bg-background"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Selections */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Your Selections</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select systems and banks above to see your comprehensive technology and custody landscape summary
                </p>
                
                {selectedVendors.length > 0 && (
                  <div className="space-y-2">
                    {selectedVendors.map((vendor, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                        <span className="text-sm text-foreground">{vendor}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleVendorSelect(vendor)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Next Steps</h3>
                <div className="space-y-3 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    <span>Select your systems & banks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    <span>Deploy AI bots & configure integrations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                    <span>Connect APIs & extract data</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full h-auto py-3 px-4 whitespace-normal text-center" 
                  onClick={handleContinue}
                  disabled={selectedVendors.length === 0}
                >
                  <span className="flex items-center justify-center gap-2 flex-wrap">
                    Connect to APIs & Start Data Extraction
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

