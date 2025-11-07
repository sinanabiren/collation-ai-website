'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Bot, GitBranch, Search, CheckCircle, Copy, ExternalLink, Code, Database, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface WorkflowMatch {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  technologies: string[];
  problemSet: string;
  githubUrl: string;
  createdFor: string;
  complexity: "Low" | "Medium" | "High";
  estimatedAdaptation: string;
}

export default function WorkflowAnalysisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [analysisStep, setAnalysisStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [matches, setMatches] = useState<WorkflowMatch[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  // Mock submitted workflow data (in real app, this would come from form submission)
  const submittedWorkflow = {
    title: searchParams.get("title") || "Monthly Investment Report Automation",
    description: "Automate the generation of monthly investment performance reports by extracting data from QuickBooks and Allvue, transforming it into standardized format, and delivering via Power BI dashboard",
    category: "Report Generation",
    dataConnections: ["QuickBooks Online", "Allvue Black Diamond", "Power BI"],
    deliveryMechanism: "Power BI Dashboard"
  };

  // Simulation of AI analysis steps
  const analysisSteps = [
    "Analyzing workflow requirements...",
    "Extracting keywords and technologies...", 
    "Searching GitHub repositories...",
    "Matching technology vendors...",
    "Identifying similar problem sets...",
    "Ranking workflow matches...",
    "Generating adaptation recommendations..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Load mock results
          setKeywords(["QuickBooks", "Allvue", "Power BI", "Investment Reports", "Monthly Automation"]);
          setMatches(mockMatches);
          return 100;
        }
        return prev + 2;
      });
      
      setAnalysisStep(prev => {
        const newStep = Math.floor((progress / 100) * analysisSteps.length);
        return Math.min(newStep, analysisSteps.length - 1);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [progress]);

  const mockMatches: WorkflowMatch[] = [
    {
      id: "WF-001",
      title: "QuickBooks_Allvue_PowerBI_InvestmentReporting",
      description: "Automated investment performance reporting workflow that extracts GL data from QuickBooks, reconciles with Allvue portfolio data, and generates executive dashboards in Power BI",
      matchPercentage: 95,
      technologies: ["QuickBooks Online", "Allvue Black Diamond", "Power BI", "Python", "Azure Functions"],
      problemSet: "Investment Performance Reporting",
      githubUrl: "github.com/CollationAI/workflows/QuickBooks-Allvue-PowerBI",
      createdFor: "Family Office Alpha",
      complexity: "Medium",
      estimatedAdaptation: "2-3 days"
    },
    {
      id: "WF-002", 
      title: "Multi_Custodian_Investment_Dashboard",
      description: "Consolidated reporting workflow for multiple custodian data sources including Allvue and QuickBooks with automated PowerBI refresh",
      matchPercentage: 87,
      technologies: ["QuickBooks", "Allvue", "Power BI", "SQL Server", "Power Automate"],
      problemSet: "Multi-Source Investment Reporting",
      githubUrl: "github.com/CollationAI/workflows/Multi-Custodian-Dashboard",
      createdFor: "Wealth Management Firm Beta", 
      complexity: "High",
      estimatedAdaptation: "3-5 days"
    },
    {
      id: "WF-003",
      title: "GL_to_IBOR_PowerBI_Automation",
      description: "General Ledger to Investment Book of Records transformation with Power BI visualization for family office reporting",
      matchPercentage: 78,
      technologies: ["QuickBooks", "Power BI", "Azure Data Factory", "SQL"],
      problemSet: "GL to IBOR Conversion",
      githubUrl: "github.com/CollationAI/workflows/GL-IBOR-PowerBI",
      createdFor: "Single Family Office Gamma",
      complexity: "Low",
      estimatedAdaptation: "1-2 days"
    }
  ];

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 75) return "text-primary";
    return "text-warning";
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low": return "bg-success/10 text-success";
      case "Medium": return "bg-primary/10 text-primary"; 
      case "High": return "bg-warning/10 text-warning";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/build-workflow" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Form</span>
            </Link>
            <div className="text-xl font-bold text-foreground">
              collation.ai
            </div>
            <Badge variant="outline" className="text-xs">
              Agentic AI Analysis
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Submitted Workflow Summary */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-primary" />
              <span>Submitted Workflow Request</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">{submittedWorkflow.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{submittedWorkflow.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {submittedWorkflow.dataConnections.map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="space-y-2 text-sm">
                  <div><strong>Category:</strong> {submittedWorkflow.category}</div>
                  <div><strong>Delivery:</strong> {submittedWorkflow.deliveryMechanism}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-primary" />
              <span>Agentic AI Bot Analysis</span>
            </CardTitle>
            <CardDescription>
              Scanning Collation.AI GitHub repositories for matching workflows and code patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Analysis Progress</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 mb-4" />
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Search className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Current Step:</span>
                </div>
                <p className="text-sm text-muted-foreground">{analysisSteps[analysisStep]}</p>
              </div>

              {progress === 100 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">Analysis Complete</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Extracted Keywords:</h4>
                    <div className="flex gap-2 flex-wrap">
                      {keywords.map((keyword, idx) => (
                        <Badge key={idx} className="bg-accent/10 text-accent text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Workflow Matches */}
        {progress === 100 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="w-5 h-5 text-primary" />
                <span>Matching Workflows Found ({matches.length})</span>
              </CardTitle>
              <CardDescription>
                Existing workflows from Collation.AI GitHub that match your requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {matches.map((match, idx) => (
                  <Card key={match.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{match.title}</h3>
                            <Badge className={`${getMatchColor(match.matchPercentage)} bg-transparent border-current`}>
                              {match.matchPercentage}% Match
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{match.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-xs font-medium text-muted-foreground mb-1">Technologies</div>
                              <div className="flex gap-1 flex-wrap">
                                {match.technologies.map((tech, techIdx) => (
                                  <Badge key={techIdx} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-muted-foreground mb-1">Problem Set</div>
                              <div className="text-sm">{match.problemSet}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div>
                              <div className="font-medium text-muted-foreground">Created For</div>
                              <div>{match.createdFor}</div>
                            </div>
                            <div>
                              <div className="font-medium text-muted-foreground">Complexity</div>
                              <Badge className={getComplexityColor(match.complexity)}>
                                {match.complexity}
                              </Badge>
                            </div>
                            <div>
                              <div className="font-medium text-muted-foreground">Adaptation Time</div>
                              <div>{match.estimatedAdaptation}</div>
                            </div>
                            <div>
                              <div className="font-medium text-muted-foreground">Match Rank</div>
                              <div>#{idx + 1}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-border">
                        <Button size="sm" className="flex items-center space-x-2" onClick={() => router.push('/airflow-dashboard')}>
                          <Copy className="w-4 h-4" />
                          <span>Use This Workflow</span>
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center space-x-2">
                          <ExternalLink className="w-4 h-4" />
                          <span>View GitHub</span>
                        </Button>
                        <Button size="sm" variant="ghost" className="flex items-center space-x-2">
                          <Code className="w-4 h-4" />
                          <span>Preview Code</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Action Section */}
                <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Ready to Proceed?</h3>
                    <p className="text-muted-foreground mb-6">
                      Our AI found {matches.length} matching workflows. Select one to adapt for your needs, or let us create a custom solution.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button className="flex items-center space-x-2" onClick={() => router.push('/airflow-dashboard')}>
                        <Zap className="w-4 h-4" />
                        <span>Auto-Generate from Best Match</span>
                      </Button>
                      <Button variant="outline">Request Custom Development</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

