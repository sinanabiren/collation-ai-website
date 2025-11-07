'use client'

import { useState } from "react";
import { ArrowLeft, Sparkles, Check, Bot, BarChart3, TrendingUp, FileText, X } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";

export default function AIDashboardBuilderPage() => {
  const [isBuilding, setIsBuilding] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Using trial credentials for registration...");

  const handleBuildDashboard = () => {
    setIsBuilding(true);
    setProgress(0);
    
    // Simulate account creation process
    const steps = [
      { step: "Using trial credentials for registration...", progress: 15 },
      { step: "Creating Lovable.dev account...", progress: 38 },
      { step: "Setting up project environment...", progress: 65 },
      { step: "Building custom dashboard...", progress: 85 },
      { step: "Finalizing report interface...", progress: 100 }
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setCurrentStep(steps[currentStepIndex].step);
        setProgress(steps[currentStepIndex].progress);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setIsBuilding(false);
        setIsComplete(true);
      }
    }, 800);
  };

  const handleViewSuccess = () => {
    window.open('/lovable-project-success', '_blank');
  };

  const handleViewShowcase = () => {
    window.open('/financial-platform-showcase', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/build-report"
            className="flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collation.AI
          </Link>
          <Badge className="bg-primary text-primary-foreground">
            L Lovable Demo
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ask Lovable Panel */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Ask Lovable</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-foreground">Ask Lovable</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAboutDialog(true)}
                    >
                      About Lovable
                    </Button>
                  </div>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-foreground mb-2">
                      <strong>Initial prompt:</strong> Build a risk analytics dashboard with VaR calculations
                    </p>
                    
                    <div className="mt-4">
                      <p className="text-sm font-medium text-foreground mb-2">Modifications:</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• add donald trump's face</li>
                        <li>• add air jordan logo</li>
                      </ul>
                    </div>
                  </div>

                  {isBuilding && (
                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Bot className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Lovable.dev Account Creation Bot</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Creating Lovable.dev account for report building using trial credentials
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{currentStep}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="text-right text-sm text-muted-foreground">
                          Progress: {progress}%
                        </div>
                      </div>
                    </div>
                  )}

                  {isComplete && (
                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg mb-4">
                      <div className="flex items-center space-x-2 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="font-medium">Dashboard Built Successfully!</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">Continue Editing Dashboard</span>
                  </div>

                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">Add modifications:</p>
                    <textarea 
                      className="w-full p-3 border rounded-lg bg-background text-foreground text-sm resize-none"
                      rows={3}
                      placeholder="e.g., Add a pie chart showing sector allocation, change colors to blue theme..."
                    />
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full"
                      onClick={handleBuildDashboard}
                      disabled={isBuilding}
                    >
                      {isBuilding ? "Building..." : "Cancel"}
                    </Button>

                    {isComplete && (
                      <div className="space-y-2">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Apply Changes
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={handleViewSuccess}
                        >
                          View Account Details
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={handleViewShowcase}
                        >
                          See Platform Showcase
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated Dashboard Preview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="text-xl">📊</div>
                  <h2 className="text-xl font-bold text-foreground">Generated Dashboard</h2>
                </div>
                <Button variant="outline" size="sm">
                  <span className="text-sm">🔄 Rebuild</span>
                </Button>
              </div>

              {/* Dashboard Preview */}
              <div className="bg-secondary/20 rounded-lg p-4 min-h-[400px]">
                <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg p-6 text-white relative overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <Link href="/build-report"
                      className="flex items-center text-white/80 hover:text-white transition-colors text-sm"
                    >
                      <ArrowLeft className="w-3 h-3 mr-1" />
                      Back to Reports Gallery
                    </Link>
                  </div>

                  <h1 className="text-2xl font-bold mb-4">Risk Metrics Dashboard</h1>
                  <p className="text-white/80 text-sm mb-6">
                    Comprehensive risk analysis with VaR, volatility, and correlation metrics
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-white/10 rounded p-3">
                      <div className="text-red-400 text-lg font-bold">2.8%</div>
                      <div className="text-xs text-white/60">VaR (95%)</div>
                    </div>
                    <div className="bg-white/10 rounded p-3">
                      <div className="text-orange-400 text-lg font-bold">16.4%</div>
                      <div className="text-xs text-white/60">Volatility</div>
                    </div>
                    <div className="bg-white/10 rounded p-3">
                      <div className="text-green-400 text-lg font-bold">1.24</div>
                      <div className="text-xs text-white/60">Sharpe</div>
                    </div>
                  </div>

                  {/* AIR JORDAN Logo */}
                  <div className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-lg">
                    <div className="text-lg font-bold">AIR JORDAN</div>
                    <div className="text-xs opacity-75">Big logo mode</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs">MJ DUNK!</span>
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xs">🏀</span>
                      </div>
                    </div>
                    <div className="text-xs opacity-75">Air Jordan Rising</div>
                  </div>

                  {/* Active Modifications */}
                  <div className="absolute bottom-4 left-4 bg-black/50 rounded p-2">
                    <div className="text-xs text-white/80 mb-1">Active Modifications:</div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-xs">
                        <Check className="w-3 h-3 text-green-400" />
                        <span className="text-white/70">add donald trump's face</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs">
                        <Check className="w-3 h-3 text-green-400" />
                        <span className="text-white/70">add air jordan logo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* About Lovable Dialog */}
      <Dialog open={showAboutDialog} onOpenChange={setShowAboutDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>About Lovable - AI-Powered Report Builder</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-2 flex items-center">
                <Bot className="w-4 h-4 mr-2" />
                What is Lovable?
              </h4>
              <p className="text-sm text-muted-foreground">
                Lovable is a tool that helps you to build your desired report / application / user interface by simply typing your prompts. You can create complex dashboards and reports using natural language descriptions.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Example Prompt
              </h4>
              <div className="bg-white p-3 rounded border font-mono text-sm">
                <p className="text-green-700">You can simply type:</p>
                <p className="text-gray-700 mt-2 italic">
                  "Build me an online dashboard that shows my holdings, transactions, asset allocation, geographical allocation in a table chart, add a date slider so that I can pick any date I want and the data refreshes accordingly, add an utility where I can download my raw data from this UI, positions should be coloured in blue and transactions should be in red. I should be able to toggle between the positions and transactions. I should also be able to filter them by size, alphabetical order, date"
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-3">What Lovable Will Build for You:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Interactive dashboard with holdings and transactions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Date slider for dynamic data filtering</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Color-coded positions (blue) and transactions (red)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Sorting by size, alphabetical order, and date</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Asset allocation and geographical breakdown charts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Data download functionality</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Toggle between positions and transactions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Responsive and user-friendly interface</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-3">Benefits of Using Lovable:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>No coding required</strong> - Just describe what you want</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Instant results</strong> - AI builds your report in minutes</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Fully customizable</strong> - Modify with simple text commands</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Professional quality</strong> - Production-ready dashboards</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Real-time data</strong> - Connect to your existing data sources</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Complex calculations</strong> - Time-weighted returns, risk metrics, attribution analysis</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowAboutDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setShowAboutDialog(false);
                  handleBuildDashboard();
                }}
                className="flex-1"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Proceed with Account Creation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

