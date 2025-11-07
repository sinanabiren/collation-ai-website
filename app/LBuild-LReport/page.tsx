'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity,
  ExternalLink,
  Edit3,
  RefreshCw,
  Sparkles,
  X,
  Plus,
  Settings,
  Copy,
  ChevronDown,
  ChevronUp,
  Trash2,
  CheckCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

// Import actual dashboard images
import portfolioOverviewImage from "@/assets/portfolio-overview-dashboard.png";
import riskMetricsImage from "@/assets/risk-metrics-dashboard.png";
import performanceDashboardPreview from "@/assets/performance-dashboard-preview.png";
import investmentSummaryPreview from "@/assets/investment-summary-preview.png";
import allocationDashboardPreview from "@/assets/allocation-dashboard-preview.png";
import profitTWRPreview from "@/assets/profit-twr-dashboard-preview.png";
import explainerPreview from "@/assets/explainer-dashboard-preview.png";
import performanceAnalyticsPreview from "@/assets/performance-analytics-preview.png";
import riskAnalyticsPreview from "@/assets/risk-analytics-preview.png";
import allocationOptimizationPreview from "@/assets/allocation-optimization-preview.png";
import pmePreview from "@/assets/pme-dashboard-preview.png";
import cumulativeProfitPreview from "@/assets/cumulative-profit-preview.png";
import kaplanSchoarPmePreview from "@/assets/kaplan-schoar-pme-preview.png";
import kaplanSchoarAccountPreview from "@/assets/kaplan-schoar-account-preview.png";
import directAlphaPreview from "@/assets/direct-alpha-preview.png";
import directAlphaAllocationPreview from "@/assets/direct-alpha-allocation-preview.png";
import institutionalPLPreview from "@/assets/institutional-pl-preview.png";
import institutionalTWRPreview from "@/assets/institutional-twr-preview.png";
import gainLossSummaryPreview from "@/assets/gain-loss-summary-preview.png";
import stressTestingAnalysisPreview from "@/assets/stress-testing-analysis-preview.png";
import operationalMetricsPreview from "@/assets/operational-metrics-preview.png";
import regulatoryCompliancePreview from "@/assets/regulatory-compliance-preview.png";
import clientReportingPreview from "@/assets/client-reporting-preview.png";
import volatilityAnalysisPreview from "@/assets/volatility-analysis-preview.png";
import correlationAnalysisPreview from "@/assets/correlation-analysis-preview.png";
import drawdownAnalysisPreview from "@/assets/drawdown-analysis-preview.png";
import sectorConcentrationRiskPreview from "@/assets/sector-concentration-risk-preview.png";
import liquidityAnalysisPreview from "@/assets/liquidity-analysis-preview.png";

export default function BuildReportPage() => {
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  const [showUrlImport, setShowUrlImport] = useState(false);
  const [newProjectUrl, setNewProjectUrl] = useState("");
  const [showPromptFor, setShowPromptFor] = useState<string | null>(null);
  const [editingDashboard, setEditingDashboard] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  // Load dashboards from localStorage on mount, merge with default ones
  const getInitialDashboards = () => {
    const savedDashboards = localStorage.getItem('lovableDashboards');
    const importedDashboards = savedDashboards ? JSON.parse(savedDashboards) : [];
    
    const defaultDashboards = [
      {
        name: "Profit TWR Charts",
        subtitle: "Time-weighted return analysis with comprehensive profit calculations",
        created: "2024-01-10",
        lastUpdated: "2024-09-23",
        modifications: "",
        details: "",
        isRiskMetrics: false,
        imageUrl: profitTWRPreview,
        lovableUrl: "/profit-twr-dashboard", 
        editUrl: "https://lovable.dev/projects/current/src/pages/ProfitTWRDashboard.tsx",
        isDefault: true
      },
    {
      name: "Explainer Dashboard", 
      subtitle: "Interactive dashboard explaining all financial calculations and metrics",
      created: "2024-01-08",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: explainerPreview,
      lovableUrl: "/explainer-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/ExplainerDashboard.tsx",
      isDefault: true
    },
    {
      name: "Public Market Equivalent Analysis",
      subtitle: "PME analysis comparing private investments to public market benchmarks",
      created: "2024-01-20",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: pmePreview,
      lovableUrl: "/public-market-equivalent-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/PublicMarketEquivalentDashboard.tsx",
      isDefault: true
    },
    {
      name: "Cumulative Profit Analysis",
      subtitle: "Track cumulative profit trends and performance metrics over time",
      created: "2024-01-12", 
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: cumulativeProfitPreview,
      lovableUrl: "/cumulative-profit-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/CumulativeProfitDashboard.tsx",
      isDefault: true
    },
    {
      name: "Kaplan Schoar PME",
      subtitle: "Advanced PME analysis using Kaplan-Schoar methodology",
      created: "2024-01-18",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: kaplanSchoarPmePreview,
      lovableUrl: "/kaplan-schoar-pme-dashboard", 
      editUrl: "https://lovable.dev/projects/current/src/pages/KaplanSchoarPMEDashboard.tsx",
      isDefault: true
    },
    {
      name: "Kaplan Schoar Account",
      subtitle: "Account-level analysis with Kaplan-Schoar calculations",
      created: "2024-01-22",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: kaplanSchoarAccountPreview,
      lovableUrl: "/kaplan-schoar-account-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/KaplanSchoarAccountDashboard.tsx",
      isDefault: true
    },
    {
      name: "Direct Alpha Analysis",
      subtitle: "Direct alpha generation analysis and performance tracking",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: directAlphaPreview,
      lovableUrl: "/direct-alpha-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/DirectAlphaDashboard.tsx",
      isDefault: true
    },
    {
      name: "Direct Alpha Allocation",
      subtitle: "Portfolio allocation analysis with direct alpha metrics",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: directAlphaAllocationPreview,
      lovableUrl: "/direct-alpha-allocation-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/DirectAlphaAllocationDashboard.tsx",
      isDefault: true
    },
    {
      name: "Institutional P&L Dashboard",
      subtitle: "Comprehensive profit and loss analysis for institutional portfolios",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: institutionalPLPreview,
      lovableUrl: "/institutional-pl-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/InstitutionalPLDashboard.tsx",
      isDefault: true
    },
    {
      name: "Institutional TWR Dashboard",
      subtitle: "Time-weighted return calculations for institutional portfolios",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: institutionalTWRPreview,
      lovableUrl: "/institutional-twr-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/InstitutionalTWRDashboard.tsx",
      isDefault: true
    },
    {
      name: "Risk Metrics Dashboard",
      subtitle: "Advanced risk analytics and portfolio risk assessment",
      created: "2024-02-15",
      lastUpdated: "2024-09-23",
      modifications: "Enhanced with interactive charts and real-time data",
      details: "Advanced risk metrics including VaR, CVaR, and correlation analysis",
      isRiskMetrics: true,
      imageUrl: riskMetricsImage,
      lovableUrl: "/risk-metrics-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/RiskMetricsDashboard.tsx",
      isDefault: true
    },
    {
      name: "Detailed Holdings Report",
      subtitle: "Complete holdings breakdown with portfolio, security details, and valuations",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: performanceDashboardPreview,
      lovableUrl: "/detailed-holdings-report",
      editUrl: "https://lovable.dev/projects/current/src/pages/DetailedHoldingsReport.tsx",
      isDefault: true
    },
    {
      name: "Holdings Decomposition",
      subtitle: "Hierarchical tree visualization of holdings by asset class, geography, and custodian",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: allocationDashboardPreview,
      lovableUrl: "/holdings-decomposition",
      editUrl: "https://lovable.dev/projects/current/src/pages/HoldingsDecomposition.tsx",
      isDefault: true
    },
    {
      name: "Holdings Geography Map",
      subtitle: "Interactive world map showing geographic distribution of holdings",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: performanceAnalyticsPreview,
      lovableUrl: "/holdings-geography-map",
      editUrl: "https://lovable.dev/projects/current/src/pages/HoldingsGeographyMap.tsx",
      isDefault: true
    },
    {
      name: "Holdings Over Time",
      subtitle: "Track portfolio composition evolution across asset classes, excluding cash positions",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: allocationOptimizationPreview,
      lovableUrl: "/holdings-over-time",
      editUrl: "https://lovable.dev/projects/current/src/pages/HoldingsOverTime.tsx",
      isDefault: true
    },
    {
      name: "Portfolio Overview",
      subtitle: "Comprehensive overview with market value, allocation, and performance metrics",
      created: "2024-01-05",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: portfolioOverviewImage,
      lovableUrl: "/portfolio-overview",
      editUrl: "https://lovable.dev/projects/current/src/pages/PortfolioOverview.tsx",
      isDefault: true
    },
    {
      name: "Investment Summary",
      subtitle: "Comprehensive investment analysis with performance metrics, allocation, and rebalancing recommendations",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: investmentSummaryPreview,
      lovableUrl: "/investment-summary",
      editUrl: "https://lovable.dev/projects/current/src/pages/InvestmentSummary.tsx",
      isDefault: true
    },
    {
      name: "Entity Level Financial Summary",
      subtitle: "Comprehensive financial overview across all entities with consolidated metrics",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: riskAnalyticsPreview,
      lovableUrl: "/entity-level-financial-summary",
      editUrl: "https://lovable.dev/projects/current/src/pages/EntityLevelFinancialSummary.tsx",
      isDefault: true
    },
    {
      name: "Cumulative Inflow/Outflow Analysis",
      subtitle: "Detailed cash flow analysis tracking all investment inflows and outflows",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: cumulativeProfitPreview,
      lovableUrl: "/cumulative-inflow-outflow-analysis",
      editUrl: "https://lovable.dev/projects/current/src/pages/CumulativeInflowOutflowAnalysis.tsx",
      isDefault: true
    },
    {
      name: "Institutional Valuation Dashboard",
      subtitle: "Advanced valuation metrics and analysis for institutional investments",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: institutionalPLPreview,
      lovableUrl: "/institutional-valuation-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/InstitutionalValuationDashboard.tsx",
      isDefault: true
    },
    {
      name: "Fixed Income Analysis",
      subtitle: "Specialized analysis for fixed income securities and bonds",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: performanceDashboardPreview,
      lovableUrl: "/fixed-income-analysis",
      editUrl: "https://lovable.dev/projects/current/src/pages/FixedIncomeAnalysis.tsx",
      isDefault: true
    },
    {
      name: "Corporate Structure Chart",
      subtitle: "Visual representation of corporate structure and entity relationships",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: explainerPreview,
      lovableUrl: "/corporate-structure-chart",
      editUrl: "https://lovable.dev/projects/current/src/pages/CorporateStructureChart.tsx",
      isDefault: true
    },
    {
      name: "Transaction History",
      subtitle: "Detailed transaction logs with buy/sell analysis and timing",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: performanceAnalyticsPreview,
      lovableUrl: "/transaction-history",
      editUrl: "https://lovable.dev/projects/current/src/pages/TransactionHistory.tsx",
      isDefault: true
    },
    {
      name: "Gain/Loss Summary",
      subtitle: "Comprehensive gain and loss analysis with tax implications",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: gainLossSummaryPreview,
      lovableUrl: "/gain-loss-summary",
      editUrl: "https://lovable.dev/projects/current/src/pages/GainLossSummary.tsx",
      isDefault: true
    },
    {
      name: "Stress Testing Analysis",
      subtitle: "Portfolio stress testing under various market scenarios including tail risk metrics, sector analysis, and recovery time analysis.",
      created: "Created Today",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: stressTestingAnalysisPreview,
      lovableUrl: "/stress-testing-analysis",
      editUrl: "https://lovable.dev/projects/current/src/pages/StressTestingAnalysis.tsx",
      isDefault: true
    },
    {
      name: "Operational Metrics Dashboard",
      subtitle: "Monitor key operational performance indicators and efficiency metrics including SLA tracking and department performance analysis.",
      created: "2024-03-10",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: operationalMetricsPreview,
      lovableUrl: "/operational-metrics-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/OperationalMetricsDashboard.tsx",
      isDefault: true
    },
    {
      name: "Regulatory Compliance Dashboard",
      subtitle: "Monitor compliance status, risk assessment, and regulatory obligations including audit results and violation tracking.",
      created: "2024-01-15",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: regulatoryCompliancePreview,
      lovableUrl: "/regulatory-compliance-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/RegulatoryComplianceDashboard.tsx",
      isDefault: true
    },
    {
      name: "Client Reporting Dashboard",
      subtitle: "Monitor client communication, report delivery, and satisfaction metrics including performance tracking and feedback analysis.",
      created: "2024-02-20",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: false,
      imageUrl: clientReportingPreview,
      lovableUrl: "/client-reporting-dashboard",
      editUrl: "https://lovable.dev/projects/current/src/pages/ClientReportingDashboard.tsx",
      isDefault: true
    },
    {
      name: "Volatility Analysis",
      subtitle: "Track portfolio volatility trends and rolling volatility metrics for risk assessment and performance evaluation.",
      created: "2024-02-01",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: true,
      imageUrl: volatilityAnalysisPreview,
      lovableUrl: "/volatility-analysis",
      editUrl: "https://lovable.dev/projects/current/src/pages/VolatilityAnalysis.tsx",
      isDefault: true
    },
    {
      name: "Correlation Analysis",
      subtitle: "Analyze correlations between funds and market indices to understand portfolio diversification and concentration risks.",
      created: "2024-01-25",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: true,
      imageUrl: correlationAnalysisPreview,
      lovableUrl: "/correlation-analysis",
      editUrl: "https://lovable.dev/projects/current/src/pages/CorrelationAnalysis.tsx",
      isDefault: true
    },
    {
      name: "Drawdown Analysis",
      subtitle: "Monitor portfolio drawdown patterns, maximum drawdown levels, and recovery analysis for risk management.",
      created: "2024-02-05",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: true,
      imageUrl: drawdownAnalysisPreview,
      lovableUrl: "/drawdown-analysis",
      editUrl: "https://lovable.dev/projects/current/src/pages/DrawdownAnalysis.tsx",
      isDefault: true
    },
    {
      name: "Sector Concentration Risk",
      subtitle: "Assess sector concentration limits and allocation risks across different industry sectors and geographical regions.",
      created: "2024-01-30",
      lastUpdated: "2024-09-23",
      modifications: "",
      details: "",
      isRiskMetrics: true,
      imageUrl: sectorConcentrationRiskPreview,
      lovableUrl: "/sector-concentration-risk",
      editUrl: "https://lovable.dev/projects/current/src/pages/SectorConcentrationRisk.tsx",
      isDefault: true
    },
    {
      name: "Liquidity Analysis",
      subtitle: "Evaluate portfolio liquidity across time buckets and assess redemption capacity and liquidity risk exposure.",
      created: "2024-02-10",
      lastUpdated: "2024-09-23T22:25:00Z",
      modifications: "",
      details: "",
      isRiskMetrics: true,
      imageUrl: liquidityAnalysisPreview,
      lovableUrl: "/liquidity-analysis",
      editUrl: "https://lovable.dev/projects/current/src/pages/LiquidityAnalysis.tsx",
      isDefault: true
    },
    {
      name: "Credit Risk Assessment",
      description: "Comprehensive credit risk analysis and assessment",
      subtitle: "Analyze credit exposure by rating and monitor portfolio probability of default trends.",
      created: "2024-09-23",
      lastUpdated: "2024-09-23T22:35:00Z",
      modifications: "",
      details: "",
      isRiskMetrics: true,
      imageUrl: "/assets/credit-risk-assessment-preview.png",
      lovableUrl: "/credit-risk-assessment",
      editUrl: "/credit-risk-assessment",
      previewImage: "/assets/credit-risk-assessment-preview.png",
      isDefault: true,
      isImported: false
    },
    {
      name: "Market Risk Analysis", 
      description: "Value at Risk and market sensitivity analysis",
      subtitle: "Monitor Value at Risk trends and portfolio beta relative to market benchmarks.",
      created: "2024-09-23",
      lastUpdated: "2024-09-23T22:32:00Z",
      modifications: "",
      details: "",
      isRiskMetrics: true,
      imageUrl: "/assets/market-risk-analysis-preview.png",
      lovableUrl: "/market-risk-analysis",
      editUrl: "/market-risk-analysis",
      previewImage: "/assets/market-risk-analysis-preview.png",
      isDefault: true,
      isImported: false
    },
    {
      name: "Risk Attribution Analysis",
      description: "Portfolio risk attribution across different factors",
      subtitle: "Decompose portfolio risk by factors including market, size, value, momentum, and quality.",
      created: "2024-09-23",
      lastUpdated: "2024-09-23T22:30:00Z",
      modifications: "",
      details: "",
      isRiskMetrics: true,
      imageUrl: "/assets/risk-attribution-analysis-preview.png",
      lovableUrl: "/risk-attribution-analysis",
      editUrl: "/risk-attribution-analysis",
      previewImage: "/assets/risk-attribution-analysis-preview.png",
      isDefault: true,
      isImported: false
    }];

    // Merge imported dashboards with default ones, putting imported ones first
    const allDashboards = [...importedDashboards, ...defaultDashboards];
    
    // Sort by last updated date (newest first), then by creation date
    return allDashboards.sort((a, b) => {
      const dateA = new Date(a.lastUpdated || a.created);
      const dateB = new Date(b.lastUpdated || b.created);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const [dashboards, setDashboards] = useState(getInitialDashboards);

  // Filter function for search
  const filterReports = (reports: any[], query: string) => {
    if (!query.trim()) return reports;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return reports.filter(report => {
      const searchableText = [
        report.name,
        report.subtitle || report.description || '',
        ...(report.tags || []),
        report.category || ''
      ].join(' ').toLowerCase();
      
      return searchTerms.every(term => searchableText.includes(term));
    });
  };


  // Auto-sync dashboards every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch from your API
      console.log('Auto-syncing dashboards...');
      toast({
        title: "Dashboards Synced",
        description: "Your dashboard collection has been updated.",
      });
    }, 600000); // 10 minutes = 600,000 milliseconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    // Simulate refresh functionality
    toast({
      title: "Refreshing...",
      description: "Updating your dashboard collection.",
    });
    
    // In a real app, this would re-fetch data from the API
    setTimeout(() => {
      toast({
        title: "Refreshed",
        description: "Your dashboards have been updated.",
      });
    }, 1000);
  };

  const handleImportFromUrl = () => {
    if (!newProjectUrl) return;

    try {
      // Extract project name and ID from URL
      const url = new URL(newProjectUrl);
      let projectName = "";
      let projectId = "";
      
      if (url.hostname.includes('lovable.app')) {
        // Extract from subdomain: https://the-do-project.lovable.app/
        projectName = url.hostname.split('.')[0];
      } else if (url.pathname.includes('/projects/')) {
        // Extract from path: https://lovable.dev/projects/project-id
        const pathParts = url.pathname.split('/projects/')[1];
        projectId = pathParts;
        projectName = `Project ${projectId.substring(0, 8)}`;
      } else {
        projectName = "Imported Project";
      }

      // Create new dashboard entry
      const newDashboard = {
        name: projectName.replace(/-/g, ' ').replace(/\w/g, l => l.toUpperCase()),
        subtitle: "Imported from Lovable project",
        created: "Imported " + new Date().toLocaleDateString(),
        modifications: "",
        details: "",
        isRiskMetrics: false,
        imageUrl: "",
        lovableUrl: newProjectUrl,
        editUrl: newProjectUrl,
        isImported: true
      };

      setDashboards(prev => {
        const updated = [newDashboard, ...prev];
        // Save only imported dashboards to localStorage
        const importedOnly = updated.filter(d => d.isImported);
        localStorage.setItem('lovableDashboards', JSON.stringify(importedOnly));
        return updated;
      });
      setNewProjectUrl("");
      setShowUrlImport(false);
      
      toast({
        title: "Project Imported",
        description: `Successfully imported "${newDashboard.name}" from Lovable.`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Please enter a valid Lovable project URL.",
        variant: "destructive",
      });
    }
  };

  const handleEditInLovable = (dashboard: any) => {
    // Check if this is a local dashboard (not imported from Lovable)
    const isLocalDashboard = !dashboard.editUrl.includes('lovable.dev') || !dashboard.isImported;
    
    if (isLocalDashboard) {
      // Open Lovable with workspace settings, ensuring "(you)" is selected by default
      const lovableUrl = new URL('https://lovable.dev');
      lovableUrl.searchParams.set('workspace', 'collation-ai');
      lovableUrl.searchParams.set('owner', 'you');
      lovableUrl.searchParams.set('defaultWorkspace', 'collation-ai-you');
      lovableUrl.searchParams.set('defaultOwner', 'you'); // Ensure "(you)" is selected by default
      
      window.open(lovableUrl.toString(), '_blank');
      
      toast({
        title: "Opening Lovable",
        description: `Opening Lovable in Collation.AI's workspace with "(you)" selected. Use the prompt below to recreate "${dashboard.name}".`,
        duration: 4000,
      });
      
    } else {
      // For imported Lovable dashboards, ensure workspace is set when opening
      const originalUrl = new URL(dashboard.editUrl);
      originalUrl.searchParams.set('workspace', 'collation-ai');
      originalUrl.searchParams.set('owner', 'you');
      originalUrl.searchParams.set('defaultOwner', 'you'); // Ensure "(you)" is selected by default
      
      window.open(originalUrl.toString(), '_blank');
      
      toast({
        title: "Opening Lovable Editor",
        description: "Opening in Collation.AI's Lovable workspace with (you) selected.",
      });
    }
  };

  const handleTogglePrompt = (dashboardName: string) => {
    setShowPromptFor(showPromptFor === dashboardName ? null : dashboardName);
  };

  const handleCopyPrompt = (dashboard: any) => {
    const prompt = generateDashboardPrompt(dashboard);
    navigator.clipboard.writeText(prompt).then(() => {
      toast({
        title: "Prompt Copied!",
        description: `Dashboard prompt for "${dashboard.name}" copied to clipboard.`,
        duration: 3000,
      });
    }).catch(() => {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard. Please select and copy the text manually.",
        variant: "destructive",
      });
    });
  };

  const handleDeleteDashboard = (dashboardToDelete: any) => {
    setDashboards(prev => {
      const updated = prev.filter(dashboard => dashboard.name !== dashboardToDelete.name);
      // Update localStorage after deletion
      const importedOnly = updated.filter(d => d.isImported);
      localStorage.setItem('lovableDashboards', JSON.stringify(importedOnly));
      return updated;
    });
    toast({
      title: "Dashboard Deleted",
      description: `"${dashboardToDelete.name}" has been removed from your collection.`,
    });
  };

  const handleStartEdit = (dashboard: any) => {
    if (dashboard.isImported) {
      setEditingDashboard(dashboard.name);
      setEditingName(dashboard.name);
    }
  };

  const handleSaveEdit = () => {
    if (!editingDashboard || !editingName.trim()) return;

    setDashboards(prev => {
      const updated = prev.map(dashboard => 
        dashboard.name === editingDashboard 
          ? { ...dashboard, name: editingName.trim() }
          : dashboard
      );
      
      // Save only imported dashboards to localStorage
      const importedOnly = updated.filter(d => d.isImported);
      localStorage.setItem('lovableDashboards', JSON.stringify(importedOnly));
      return updated;
    });

    setEditingDashboard(null);
    setEditingName("");
    
    toast({
      title: "Dashboard Renamed",
      description: `Dashboard name updated successfully.`,
    });
  };

  const handleCancelEdit = () => {
    setEditingDashboard(null);
    setEditingName("");
  };

  // Generate dashboard prompt for Lovable to recreate the dashboard
  const generateDashboardPrompt = (dashboard: any) => {
    const dashboardType = dashboard.name.toLowerCase();
    
    // Create a detailed prompt based on the dashboard type and content
    let prompt = `Create a comprehensive financial dashboard called "${dashboard.name}".

DASHBOARD OVERVIEW:
${dashboard.subtitle}

KEY FEATURES TO INCLUDE:
`;

    // Add specific features based on dashboard type
    if (dashboardType.includes('risk')) {
      prompt += `
- Risk metrics cards showing VaR, CVaR, and risk scores
- Risk correlation heatmap
- Volatility charts over time
- Maximum drawdown analysis
- Stress testing results
- Risk concentration by asset class and geography`;
    } else if (dashboardType.includes('profit') || dashboardType.includes('twr')) {
      prompt += `
- Time-weighted return (TWR) calculations and charts
- Cumulative profit analysis over time
- Monthly and quarterly return breakdowns
- Performance comparison with benchmarks
- Profit attribution by asset class
- Return distribution histograms`;
    } else if (dashboardType.includes('pme') || dashboardType.includes('kaplan')) {
      prompt += `
- Public Market Equivalent (PME) analysis
- Kaplan-Schoar PME calculations
- Cash flow timing analysis
- Benchmark comparison charts
- Alpha generation metrics
- Vintage year performance comparison`;
    } else if (dashboardType.includes('allocation')) {
      prompt += `
- Portfolio allocation pie charts and treemaps
- Allocation by asset class, geography, and custodian
- Allocation changes over time
- Target vs actual allocation comparisons
- Concentration risk metrics
- Rebalancing recommendations`;
    } else if (dashboardType.includes('alpha')) {
      prompt += `
- Direct alpha calculation and tracking
- Alpha attribution by investment strategy
- Rolling alpha performance charts
- Benchmark-relative performance
- Risk-adjusted alpha metrics
- Alpha persistence analysis`;
    } else if (dashboardType.includes('institutional')) {
      prompt += `
- Institutional-grade performance metrics
- Large portfolio analytics
- Multi-period performance analysis
- Advanced attribution analysis
- Regulatory compliance metrics
- Client reporting summaries`;
    } else {
      // Generic financial dashboard
      prompt += `
- Key performance metrics cards
- Interactive charts showing trends
- Portfolio summary statistics
- Performance analytics
- Risk and return metrics
- Data visualization components`;
    }

    prompt += `

DESIGN REQUIREMENTS:
- Modern, professional financial dashboard design
- Dark/light mode support
- Responsive layout for desktop and mobile
- Interactive charts using recharts library
- Clean card-based layout with proper spacing
- Use shadcn/ui components for consistency
- Color-coded metrics (green for positive, red for negative)
- Loading states and error handling
- Export functionality for charts and data

TECHNICAL SPECIFICATIONS:
- Built with React and TypeScript
- Use Tailwind CSS for styling
- Implement proper data formatting for financial numbers
- Add tooltips and hover effects for better UX
- Make charts interactive with drill-down capabilities
- Include date range selectors where applicable
- Add search and filter functionality

Please create a fully functional dashboard with sample data that demonstrates all these features. Make it look professional and suitable for institutional financial reporting.`;

    return prompt;
  };

  const sampleReports = [
    {
      name: "Public Market Equivalent Analysis",
      description: "PME analysis comparing private investments to public market benchmarks with alpha generation",
      tags: ["PME", "Benchmarking", "Private Equity"],
      category: "performance",
      image: pmePreview,
      lovableUrl: "/public-market-equivalent",
      editUrl: "https://lovable.dev/projects/current/src/pages/PublicMarketEquivalentDashboard.tsx"
    },
    {
      name: "Cumulative Profit Analysis", 
      description: "Detailed cumulative profit tracking across all investment categories with growth analysis",
      tags: ["Cumulative", "Profit", "Analysis"],
      category: "performance",
      image: cumulativeProfitPreview,
      lovableUrl: "/cumulative-profit-analysis", 
      editUrl: "https://lovable.dev/projects/current/src/pages/CumulativeProfitDashboard.tsx"
    },
    {
      name: "Explainer Dashboard",
      description: "Interactive dashboard explaining all financial calculations and metrics",
      tags: ["Educational", "Calculations", "Interactive"],
      category: "education"
    },
    {
      name: "Profit TWR Charts",
      description: "Time-weighted return analysis with comprehensive profit calculations",
      tags: ["TWR", "Profit", "Returns"],
      category: "performance"
    },
    {
      name: "Cumulative Inflow/Outflow Analysis",
      description: "Detailed cash flow analysis tracking all investment inflows and outflows",
      tags: ["Cash Flow", "Inflow", "Outflow"],
      category: "cashflow"
    },
    {
      name: "Institutional Valuation Dashboard",
      description: "Advanced valuation metrics and analysis for institutional investments",
      tags: ["Institutional", "Valuation", "Advanced"],
      category: "valuation"
    },
    {
      name: "Fixed Income Analysis",
      description: "Specialized analysis for fixed income securities and bonds",
      tags: ["Fixed Income", "Bonds", "Analysis"],
      category: "fixedincome"
    },
    {
      name: "Corporate Structure Chart",
      description: "Visual representation of corporate structure and entity relationships",
      tags: ["Corporate", "Structure", "Entities"],
      category: "structure"
    },
    {
      name: "Investment Summary",
      description: "Comprehensive investment analysis with performance metrics, allocation analysis, and rebalancing recommendations",
      tags: ["Investment", "Analysis", "Performance", "Rebalancing"],
      category: "summary"
    },
    {
      name: "Holdings Over Time (Ignoring Cash)",
      description: "Stacked area chart showing holdings evolution excluding cash positions",
      tags: ["Time Series", "Holdings Evolution", "Non-Cash"],
      category: "holdings"
    },
    {
      name: "Portfolio Overview",
      description: "Comprehensive portfolio overview with top holdings, sector allocation, and performance metrics",
      tags: ["Portfolio", "Overview", "Holdings", "Performance"],
      category: "overview"
    },
    {
      name: "Entity Level Financial Summary",
      description: "Comprehensive financial overview at the entity level with key metrics",
      tags: ["Entity Level", "Financial", "Summary"],
      category: "summary"
    },
    {
      name: "Holdings Decomposition",
      description: "Hierarchical tree visualization of holdings by asset class, geography, and custodian",
      tags: ["Hierarchical", "Tree View", "Decomposition"],
      category: "holdings"
    },
    {
      name: "Holdings Geography Map",
      description: "Interactive world map showing geographic distribution of holdings",
      tags: ["Geographic", "World Map", "Interactive"],
      category: "geographic"
    },
    {
      name: "Portfolio Overview",
      description: "Comprehensive overview with market value, allocation, and performance metrics",
      tags: ["Market Value", "Allocation", "Performance"],
      category: "overview"
    },
    {
      name: "Detailed Holdings Report",
      description: "Complete holdings breakdown with portfolio, security details, and valuations",
      tags: ["Holdings", "Valuations", "Security Details"],
      category: "holdings"
    },
    {
      name: "Institutional TWR Dashboard",
      description: "Time-weighted return calculations and analysis for institutional portfolios",
      tags: ["TWR", "Institutional", "Returns"],
      category: "performance"
    },
    {
      name: "Institutional P&L Dashboard",
      description: "Profit and loss analysis with detailed performance attribution",
      tags: ["P&L", "Attribution", "Performance"],
      category: "pnl"
    },
    {
      name: "Direct Alpha (Account Level)",
      description: "Direct alpha calculations and performance attribution at account level",
      tags: ["Direct Alpha", "Account", "Attribution"],
      category: "alpha"
    },
    {
      name: "Direct Alpha (Allocation Category)",
      description: "Alpha generation analysis across different allocation categories",
      tags: ["Direct Alpha", "Allocation", "Categories"],
      category: "alpha",
      image: directAlphaAllocationPreview,
      lovableUrl: "/direct-alpha-allocation",
      editUrl: "https://lovable.dev/projects/current/src/pages/DirectAlphaAllocationDashboard.tsx"
    },
    {
      name: "Kaplan Schoar PME (Allocation Level)",
      description: "Advanced PME calculation at allocation level using Kaplan-Schoar methodology",
      tags: ["Kaplan-Schoar", "PME", "Allocation"],
      category: "pme"
    },
    {
      name: "Kaplan Schoar PME (Account Level)",
      description: "Account-level PME analysis with Kaplan-Schoar calculations",
      tags: ["Kaplan-Schoar", "Account", "PME"],
      category: "pme"
    },
    {
      name: "Transaction History",
      description: "Detailed transaction logs with buy/sell analysis and timing",
      tags: ["Transactions", "History", "Analysis"],
      category: "transactions"
    },
    {
      name: "Gain/Loss Summary",
      description: "Comprehensive gain and loss analysis with tax implications",
      tags: ["Gain/Loss", "Tax", "Summary"],
      category: "pnl"
    },
    {
      name: "Allocation by Geography & Custodian",
      description: "Geographic distribution and custodian breakdown with detailed percentages",
      tags: ["Geography", "Custodian", "Distribution"],
      category: "allocation"
    },
    {
      name: "Asset Class & Sub-Asset Class",
      description: "Detailed breakdown by asset classes and sub-categories with performance data",
      tags: ["Asset Class", "Sub-Asset", "Performance"],
      category: "allocation"
    },
    {
      name: "Comprehensive Allocation Dashboard",
      description: "Multi-dimensional allocation view with pie charts across all categories",
      tags: ["Multi-View", "Comprehensive", "Interactive"],
      category: "allocation"
    },
    {
      name: "Allocation Over Time",
      description: "Historical allocation trends with stacked bar charts and time series data",
      tags: ["Historical", "Trends", "Time Series"],
      category: "allocation"
    },
    {
      name: "Institutional Allocation Dashboard",
      description: "Advanced allocation metrics for institutional-grade portfolio management",
      tags: ["Institutional", "Advanced", "Portfolio"],
      category: "allocation"
    },
    {
      name: "Valuation & Allocation Charts",
      description: "Combined valuation and allocation analysis with time-series data",
      tags: ["Valuation", "Allocation", "Time-Series"],
      category: "valuation"
    },
    {
      name: "Net Worth & Allocation Analysis",
      description: "Comprehensive net worth tracking with detailed allocation breakdowns",
      tags: ["Net Worth", "Allocation", "Tracking"],
      category: "networth"
    },
    {
      name: "Stress Testing Analysis",
      description: "Portfolio stress testing under various market scenarios",
      tags: ["Stress Testing", "Scenarios", "Risk"],
      category: "risk"
    },
    {
      name: "Correlation Analysis",
      description: "Detailed correlation matrix and risk factor analysis",
      tags: ["Correlation", "Risk Factors", "Matrix"],
      category: "risk"
    },
    {
      name: "Drawdown Analysis",
      description: "Maximum drawdown calculations and recovery period analysis",
      tags: ["Drawdown", "Recovery", "Risk"],
      category: "risk"
    },
    {
      name: "Volatility Analysis",
      description: "Historical and implied volatility analysis across asset classes",
      tags: ["Volatility", "Historical", "Implied"],
      category: "risk"
    },
    {
      name: "Sector Concentration Risk",
      description: "Analysis of concentration risk across sectors and geographies",
      tags: ["Concentration", "Sector", "Geography"],
      category: "risk"
    },
    {
      name: "Liquidity Risk Analysis",
      description: "Assessment of portfolio liquidity and redemption capacity",
      tags: ["Liquidity", "Redemption", "Risk"],
      category: "risk"
    },
    {
      name: "Credit Risk Assessment",
      description: "Credit exposure analysis and counterparty risk evaluation",
      tags: ["Credit Risk", "Counterparty", "Exposure"],
      category: "risk"
    },
    {
      name: "Market Risk Analysis",
      description: "Market exposure and beta analysis across asset classes",
      tags: ["Market Risk", "Beta", "Exposure"],
      category: "risk"
    },
    {
      name: "Risk Attribution Analysis",
      description: "Performance attribution with risk factor decomposition",
      tags: ["Attribution", "Risk Factors", "Decomposition"],
      category: "risk"
    },
    {
      name: "Operational Metrics Dashboard",
      description: "Monitor settlement rates, processing times, system uptime, and operational efficiency",
      tags: ["Operations", "Settlement", "System Uptime"],
      category: "operations"
    },
    {
      name: "Regulatory Compliance Dashboard",
      description: "Track compliance status, risk assessment, and regulatory obligations",
      tags: ["Compliance", "Regulatory", "Risk Assessment"],
      category: "compliance"
    },
    {
      name: "Client Reporting Dashboard",
      description: "Monitor report delivery metrics, quality tracking, and client satisfaction",
      tags: ["Client Reports", "Quality", "Satisfaction"],
      category: "client"
    }
  ];

  const reportTypes = [
    {
      id: "performance",
      name: "Performance Dashboard",
      description: "Track portfolio performance with interactive charts and key metrics",
      icon: BarChart3,
      features: [
        "Returns analysis",
        "Benchmark comparison", 
        "Risk metrics",
        "Allocation breakdown"
      ]
    },
    {
      id: "investment-summary",
      name: "Investment Summary",
      description: "Comprehensive investment overview with holdings and transactions",
      icon: TrendingUp,
      features: [
        "Holdings summary",
        "Transaction history",
        "Gain/loss analysis", 
        "Tax reporting"
      ]
    },
    {
      id: "asset-allocation",
      name: "Asset Allocation",
      description: "Visual breakdown of portfolio allocation across asset classes",
      icon: PieChart,
      features: [
        "Sector allocation",
        "Geographic distribution",
        "Asset class mix",
        "Rebalancing alerts"
      ]
    },
    {
      id: "risk-analysis",
      name: "Risk Analysis",
      description: "Detailed risk assessment and stress testing reports",
      icon: Activity,
      features: [
        "VaR calculations",
        "Stress scenarios",
        "Correlation analysis",
        "Risk attribution"
      ]
    }
  ];

  // Filter dashboards and sample reports based on search query
  const filteredDashboards = filterReports(dashboards, searchQuery);
  const filteredSampleReports = filterReports(sampleReports, searchQuery);

  const handleReportTypeSelect = (reportId: string) => {
    setSelectedReportType(reportId);
    // Navigate to report builder or creation flow
    router.push(`/report-builder?type=${reportId}`);
  };

  const handleViewDashboard = (dashboardName: string, lovableUrl?: string) => {
    if (lovableUrl) {
      // Open the actual Lovable dashboard in a new tab
      window.open(lovableUrl, '_blank');
    } else if (dashboardName.includes("Risk")) {
      // Fallback for internal navigation
      router.push('/risk-metrics-dashboard');
    } else {
      router.push(`/dashboard-view?name=${encodeURIComponent(dashboardName)}`);
    }
  };

  const handleContinueEditing = (editUrl: string) => {
    // Open Lovable editor in a new tab
    window.open(editUrl, '_blank');
  };

  const handleOpenAIBuilder = () => {
    router.push('/ai-dashboard-builder');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Build a Report</h1>
          <p className="text-xl text-muted-foreground">Let's build your report</p>
        </div>

        {/* My Lovable Dashboards Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🛠️</div>
              <h2 className="text-2xl font-bold text-foreground">My Lovable Dashboards</h2>
              <p className="text-muted-foreground">Your published Lovable.dev projects</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="default" 
                size="sm"
                onClick={() => setShowUrlImport(!showUrlImport)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Import URL from Lovable
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* URL Import Section */}
          {showUrlImport && (
            <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 dark:border-blue-800 dark:from-blue-950/30 dark:to-purple-950/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Import Lovable Project</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUrlImport(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Paste your Lovable project URL to automatically import it into your dashboard collection.
                </p>
                
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="url"
                      placeholder="https://lovable.dev/projects/a0722d59-7e7b-415f-802c-b420b6d305d9"
                      value={newProjectUrl}
                      onChange={(e) => setNewProjectUrl(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button 
                    onClick={handleImportFromUrl}
                    disabled={!newProjectUrl}
                  >
                    Import Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search Bar for My Dashboards */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search your dashboards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Search Results for My Dashboards */}
          {searchQuery && (
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredDashboards.length} of {dashboards.length} dashboards match "{searchQuery}"
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredDashboards.length === 0 && searchQuery ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No dashboards found matching "{searchQuery}"</p>
                <p className="text-sm mt-2">Try different keywords or clear the search</p>
              </div>
            ) : (
              filteredDashboards.map((dashboard, index) => (
                <Card key={index} className="border-border/50 hover:shadow-lg transition-all relative">
                {/* Delete button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteDashboard(dashboard)}
                  className="absolute top-2 right-2 z-10 h-8 w-8 p-0 bg-background/80 hover:bg-destructive hover:text-destructive-foreground shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                
                <div 
                  className="aspect-video bg-secondary/20 flex items-center justify-center rounded-t-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleViewDashboard(dashboard.name, dashboard.lovableUrl)}
                >
                  {dashboard.imageUrl ? (
                    <img 
                      src={dashboard.imageUrl} 
                      alt={dashboard.name}
                      className="w-full h-full object-cover"
                    />
                  ) : dashboard.created.includes('Imported') ? (
                    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-t-lg flex items-center justify-center relative">
                      <div className="text-center text-white">
                        <Sparkles className="w-12 h-12 mx-auto mb-2" />
                        <div className="text-xs font-bold">LOVABLE</div>
                        <div className="text-xs opacity-80">IMPORTED</div>
                      </div>
                      <div className="absolute top-2 left-2 bg-white/20 rounded px-2 py-1">
                        <span className="text-xs font-semibold text-white">Lovable</span>
                      </div>
                    </div>
                  ) : dashboard.isRiskMetrics ? (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-700 rounded-t-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                        <div className="text-xs font-mono">RISK METRICS</div>
                      </div>
                    </div>
                  ) : (
                    <BarChart3 className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    {editingDashboard === dashboard.name ? (
                      <div className="flex-1 flex items-center space-x-2">
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit();
                            if (e.key === 'Escape') handleCancelEdit();
                          }}
                          autoFocus
                        />
                        <Button size="sm" onClick={handleSaveEdit}>
                          <CheckCircle className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-semibold text-foreground">{dashboard.name}</h3>
                        {dashboard.isImported && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleStartEdit(dashboard)}
                            className="p-1 h-auto text-muted-foreground hover:text-foreground"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                  {dashboard.subtitle && (
                    <p className="text-sm text-muted-foreground mb-2">{dashboard.subtitle}</p>
                  )}
                   <div className="text-xs text-muted-foreground mb-3 space-y-1">
                     <div>Created: {dashboard.created}</div>
                     {dashboard.lastUpdated && <div>Last Updated: {dashboard.lastUpdated}</div>}
                   </div>
                  
                  {dashboard.modifications && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground">{dashboard.modifications}</p>
                      <p className="text-sm text-muted-foreground">{dashboard.details}</p>
                    </div>
                  )}
                  
                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        onClick={() => handleViewDashboard(dashboard.name, dashboard.lovableUrl)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Dashboard
                      </Button>
                      
                      {/* Check if this is a local dashboard that needs a prompt */}
                      {(!dashboard.editUrl.includes('lovable.dev') || !dashboard.isImported) && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleTogglePrompt(dashboard.name)}
                        >
                          {showPromptFor === dashboard.name ? (
                            <ChevronUp className="w-4 h-4 mr-2" />
                          ) : (
                            <ChevronDown className="w-4 h-4 mr-2" />
                          )}
                          Prompt Text for Lovable
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleEditInLovable(dashboard)}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit in Lovable
                      </Button>
                      
                      {/* Check if this is a local dashboard that needs a prompt */}
                      {(!dashboard.editUrl.includes('lovable.dev') || !dashboard.isImported) && showPromptFor === dashboard.name && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-md border">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-muted-foreground font-medium">
                              Copy and paste this prompt into Lovable after clicking "Edit in Lovable"
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyPrompt(dashboard)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="max-h-32 overflow-y-auto bg-background rounded border p-2">
                            <pre className="text-xs text-foreground whitespace-pre-wrap">
                              {generateDashboardPrompt(dashboard)}
                            </pre>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              Click copy, then click "Edit in Lovable", then paste this prompt
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopyPrompt(dashboard)}
                              className="text-xs h-7"
                            >
                              <Copy className="w-3 h-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Sample Reports Gallery */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📊</div>
              <h2 className="text-2xl font-bold text-foreground">Sample Reports Gallery</h2>
            </div>
            <Badge variant="outline">Investment Summary</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Browse our comprehensive collection of institutional-grade financial reports and analytics
          </p>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search dashboards by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Search Results Counter */}
          {searchQuery && (
            <div className="mb-4 text-sm text-muted-foreground">
              Found {filteredDashboards.length + filteredSampleReports.length} reports matching "{searchQuery}"
            </div>
          )}

          {/* Report Type Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">All</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Performance</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Risk Analysis</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Allocation</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Holdings</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">P&L</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">PME</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Transactions</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Operations</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Compliance</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Client</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSampleReports.length === 0 && searchQuery ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No sample reports found matching "{searchQuery}"</p>
                <p className="text-sm mt-2">Try different keywords or browse all reports</p>
              </div>
            ) : (
              filteredSampleReports.slice(0, 12).map((report, index) => {
              // Assign preview images to the first few reports
              let previewImage = null;
              if (index === 0) previewImage = performanceDashboardPreview;
              else if (index === 1) previewImage = investmentSummaryPreview;
              else if (index === 2) previewImage = allocationDashboardPreview;
              else if (index === 3) previewImage = riskMetricsImage;
              else if (index === 4) previewImage = portfolioOverviewImage;
              
              return (
                <Card key={index} className="border-border/50 hover:shadow-lg transition-all cursor-pointer group">
                  <div 
                    className="aspect-video bg-gradient-to-br from-slate-900 to-slate-700 rounded-t-lg flex items-center justify-center relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(`https://${report.name.toLowerCase().replace(/\s+/g, '-')}.lovable.app`, '_blank')}
                  >
                    {previewImage ? (
                      <img 
                        src={previewImage} 
                        alt={report.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative text-center text-white z-10">
                          <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                          <div className="text-xs font-semibold px-2">{report.name}</div>
                        </div>
                      </>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 text-sm">{report.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{report.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {report.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs px-2 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        className="w-full text-xs" 
                        size="sm"
                        onClick={() => window.open(`https://${report.name.toLowerCase().replace(/\s+/g, '-')}.lovable.app`, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Dashboard
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full text-xs" 
                        size="sm"
                        onClick={() => window.open(`https://lovable.dev/projects/${report.name.toLowerCase().replace(/\s+/g, '-')}`, '_blank')}
                      >
                        <Edit3 className="w-3 h-3 mr-1" />
                        Edit in Lovable
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                );
              })
            )}
          </div>

          {/* Show More Button */}
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Load More Reports ({sampleReports.length - 12} remaining)
            </Button>
          </div>

          {/* Ready to Create Section */}
          <div className="mt-12 p-8 bg-secondary/20 rounded-lg text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Ready to create your own reports?</h3>
            <p className="text-muted-foreground mb-6">
              Use our AI-powered report builder to create custom analytics tailored to your investment needs.
            </p>
            <Button 
              onClick={handleOpenAIBuilder}
              size="lg"
              className="text-lg px-8"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Building Custom Reports
            </Button>
          </div>
        </div>

        {/* Choose Report Type Section */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">🔧</div>
              <h2 className="text-2xl font-bold text-foreground">Choose Your Report Type</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Select the type of investment report you'd like to create
            </p>
            
            {/* Search */}
            <div className="relative mb-8 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for specific dashboards by keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Report Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTypes.map((reportType, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedReportType === reportType.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleReportTypeSelect(reportType.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <reportType.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {reportType.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {reportType.description}
                      </p>
                      <ul className="space-y-1">
                        {reportType.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                            <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI-Powered Report Builder */}
          <div className="mt-12">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">AI-Powered Report Builder</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              We'll create a custom report builder using Lovable.dev's AI platform
            </p>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground">
                      Our <span className="text-primary font-medium">Agentic AI Bot</span> will automatically create a Lovable.dev account using your trial credentials and build a custom report interface tailored to your needs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <h3 className="font-semibold text-foreground mb-2">What happens next:</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>• AI analyzes your data structure and requirements</p>
                <p>• Creates custom dashboard templates</p>
                <p>• Generates interactive charts and visualizations</p>
                <p>• Provides real-time data connectivity</p>
              </div>
              
              <Button 
                onClick={handleOpenAIBuilder}
                className="mt-6 w-full"
                size="lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Try AI Dashboard Builder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

