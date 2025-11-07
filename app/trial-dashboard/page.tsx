'use client'

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Database, Zap, BarChart3 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Mail, Calendar, TrendingUp, FileText } from "lucide-react";
import Link from "next/link";

export default function TrialDashboardPage() {
  // Mock trial data - in real app this would come from backend
  const [trialData] = useState({
    userEmail: "john@smithfamily.com",
    startDate: "15/12/2024",
    daysRemaining: 5,
    isExpired: true, // Set to true to show expired state like in screenshot
  });

  // Calculate progress based on pillar completion
  const pillars = [
    {
      title: "Data Warehousing",
      description: "Set up your centralized data warehouse and connect accounting systems",
      progress: 60,
      icon: Database,
      status: "in-progress" as const,
    },
    {
      title: "Workflow Automation", 
      description: "AI-powered automation for business processes and data flows",
      progress: 0,
      icon: Zap,
      status: "not-started" as const,
    },
    {
      title: "Investment Reporting",
      description: "Generate your first automated investment reports and performance analytics", 
      progress: 30,
      icon: BarChart3,
      status: "in-progress" as const,
    }
  ];

  const completedPillars = pillars.filter(p => p.progress === 100).length;
  const totalProgress = 45; // Match the 45% from screenshot

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Trial Status Alerts */}
        {trialData.isExpired && (
          <div className="mb-6 space-y-4">
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive font-medium">
                <strong>Trial Expired</strong> - Your free trial has ended. Upgrade to continue using Collation.AI
              </AlertDescription>
            </Alert>
            
            <Alert className="border-destructive/50 bg-destructive/5">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                <strong>Trial Expired!</strong> Your 7-day free trial has ended. Upgrade to a paid subscription to continue using Collation.AI.
              </AlertDescription>
            </Alert>

            <Alert className="border-primary/50 bg-primary/10">
              <Mail className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                We've sent upgrade instructions to <strong>{trialData.userEmail}</strong> and notified our team at hello@collation.ai.
              </AlertDescription>
            </Alert>

            <Button className="w-full bg-destructive hover:bg-destructive/90 text-white">
              <Mail className="w-4 h-4 mr-2" />
              Check Email for Upgrade Link
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Trial started: {trialData.startDate} • Email: {trialData.userEmail}
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your 7-Day Trial</h1>
          <p className="text-muted-foreground">
            Complete these steps to experience the full power of Collation.AI
          </p>
        </div>

        {/* Overall Progress */}
        <div className="mb-12">
          <Card className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10 border-blue-200/50 dark:border-blue-800/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Overall Trial Progress</h2>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalProgress}%</span>
              </div>
              
              <Progress value={totalProgress} className="h-3 mb-6" />
              
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Started 2 days ago</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">On track for completion</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">2 of 4 pillars started</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Data Warehousing */}
          <Card className="bg-gradient-to-br from-purple-50/50 to-purple-100/30 dark:from-purple-950/20 dark:to-purple-900/10 border-purple-200/50 dark:border-purple-800/30 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Data Warehousing</h3>
                    <Badge className="bg-purple-600 dark:bg-purple-500 text-white mt-1">In Progress</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">60%</span>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Set up your centralized data warehouse and connect accounting systems
              </p>
              
              <Progress value={60} className="h-2" />
              
              <div className="mt-4">
                <Link href="/data-connections">
                  <Button variant="outline" className="w-full border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                    Continue Setup
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Automation */}
          <Card className="bg-gradient-to-br from-green-50/50 to-green-100/30 dark:from-green-950/20 dark:to-green-900/10 border-green-200/50 dark:border-green-800/30 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Workflow Automation</h3>
                    <Badge className="bg-gray-500 text-white mt-1">Not Started</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">0%</span>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                AI-powered automation for business processes and data flows
              </p>
              
              <Progress value={0} className="h-2" />
              
              <div className="mt-4">
                <Link href="/build-workflow">
                  <Button variant="outline" className="w-full border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20">
                    Start Workflow Request
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Investment Reporting */}
          <Card className="bg-gradient-to-br from-orange-50/50 to-orange-100/30 dark:from-orange-950/20 dark:to-orange-900/10 border-orange-200/50 dark:border-orange-800/30 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Investment Reporting</h3>
                    <Badge className="bg-orange-600 dark:bg-orange-500 text-white mt-1">In Progress</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">30%</span>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Generate your first automated investment reports and performance analytics
              </p>
              
              <Progress value={30} className="h-2" />
              
              <div className="mt-4">
                <Link href="/investment-reporting">
                  <Button variant="outline" className="w-full border-orange-200 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                    Continue Setup
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

