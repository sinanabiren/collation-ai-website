'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, BarChart3, ArrowLeft, ChevronRight, Sparkles, ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";

export default function InvestmentReportingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check if user returned from Lovable
  useEffect(() => {
    const created = searchParams.get('created');
    if (created === 'true') {
      toast.success("🎉 Custom dashboard created successfully!", {
        description: "Your new dashboard has been created with Lovable AI. Check your Lovable account to access it.",
        duration: 5000,
      });
      // Clean up the URL
      window.history.replaceState({}, '', '/investment-reporting');
    }
  }, [searchParams]);
  
  const [tasks] = useState([
    {
      name: "ABOR to IBOR Conversion",
      completed: true,
      description: "Convert accounting book of records to investment book format"
    },
    {
      name: "Performance Calculations",
      completed: false,
      description: "Calculate portfolio performance metrics and returns"
    },
    {
      name: "Custom Report Templates",
      completed: false,
      description: "Create customized reporting templates for stakeholders"
    },
    {
      name: "Automated Scheduling",
      completed: false,
      description: "Set up automated report generation and delivery"
    }
  ]);

  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = Math.round((completedTasks / tasks.length) * 100);

  const handleBuildReport = () => {
    router.push('/build-report');
  };

  const handleCreateCustomDashboard = () => {
    // Get current user info (in a real app, this would come from auth context)
    const userInfo = {
      customerName: "Investment Analytics Corp", // This would be dynamic
      projectType: "financial-dashboard",
      returnUrl: window.location.origin + "/investment-reporting?created=true",
      userId: "user-12345" // This would be the actual user ID
    };

    // Create the Lovable deep link with pre-configured project details
    // Using the actual Lovable.dev URL structure
    const lovableUrl = new URL("https://lovable.dev/");
    
    // In a real implementation, these parameters would be processed by Lovable
    // For now, we'll open Lovable's homepage where users can create projects
    lovableUrl.searchParams.append("utm_source", "investment-platform");
    lovableUrl.searchParams.append("utm_medium", "integration");
    lovableUrl.searchParams.append("utm_campaign", "custom-dashboard");
    lovableUrl.searchParams.append("template", "financial-dashboard");
    lovableUrl.searchParams.append("return_url", userInfo.returnUrl);

    // Open Lovable in a new tab
    window.open(lovableUrl.toString(), '_blank');
    
    // Show immediate feedback to user
    toast.info("🚀 Opening Lovable AI Dashboard Builder", {
      description: "Create your custom financial dashboard with AI assistance. Return here when you're done!",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/trial-dashboard"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          {/* Success indicator if returned from Lovable */}
          {searchParams.get('created') === 'true' && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Dashboard Created Successfully!</span>
            </div>
          )}
        </div>

        {/* Investment Reporting Card */}
        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Investment Reporting</h1>
                  <Badge className="bg-primary text-primary-foreground mt-2">In Progress</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary">{progressPercentage}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>

            <p className="text-muted-foreground mb-8 text-lg">
              Generate your first automated investment reports and performance analytics
            </p>

            {/* Progress Bar */}
            <div className="mb-8">
              <Progress value={progressPercentage} className="h-4" />
            </div>

            {/* Tasks Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground">Tasks to Complete:</h2>
              
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/30">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      task.completed 
                        ? 'bg-success text-white' 
                        : 'bg-muted border-2 border-muted-foreground'
                    }`}>
                      {task.completed ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${
                        task.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {task.name}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-4">
                {/* Create Custom Dashboard with Lovable */}
                <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Create Custom Dashboard</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Build a personalized financial dashboard using AI - no coding required
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary" className="text-xs">AI-Powered</Badge>
                            <Badge variant="secondary" className="text-xs">No Code</Badge>
                            <Badge variant="secondary" className="text-xs">Custom</Badge>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={handleCreateCustomDashboard}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Create with AI
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Build Report Button */}
                <Button 
                  onClick={handleBuildReport}
                  size="lg"
                  variant="outline"
                  className="w-full text-lg py-6"
                >
                  Build Report from Templates
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

