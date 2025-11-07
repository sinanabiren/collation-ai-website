'use client'

import { ArrowLeft, BarChart3, Sparkles, ExternalLink, Database, Bot, Zap, CheckCircle, Eye } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

export default function FinancialPlatformShowcasePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Financial Platform</h1>
          </div>
          <p className="text-muted-foreground">Professional financial reporting and analytics</p>
        </div>

        {/* Account Activated */}
        <Card className="bg-green-500/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-foreground">Account Activated - Ready to Build Reports!</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Your Lovable.dev account is now active and ready for report building.
            </p>
            
            <div className="flex space-x-4">
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Lovable.dev
              </Button>
              <Button variant="outline">
                <Sparkles className="w-4 h-4 mr-2" />
                Start Building Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

