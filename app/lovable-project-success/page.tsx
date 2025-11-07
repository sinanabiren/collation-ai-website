'use client'

import { ArrowLeft, Check, ExternalLink, BarChart3, Bot, Sparkles, Clock, Mail } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

export default function LovableProjectSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/build-report"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Report Options
          </Link>
        </div>

        {/* Account Creation Success */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Bot className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Lovable.dev Account Creation Bot</h1>
          </div>
          <p className="text-muted-foreground">Creating Lovable.dev account for report building using trial credentials</p>
        </div>

        {/* Success Message */}
        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg mb-8">
          <div className="flex items-center space-x-2 text-green-600">
            <Check className="w-5 h-5" />
            <span className="font-medium">Lovable.dev account successfully created! Activation email sent.</span>
          </div>
        </div>

        {/* Account Details */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Lovable.dev Account Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email:</label>
                    <div className="text-foreground">john@smithfamily.com</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Username:</label>
                    <div className="text-foreground">john</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Project URL:</label>
                    <div className="text-primary font-mono text-sm">https://lovable.dev/projects/john-report-builder</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status:</label>
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending Activation
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Activation Required */}
        <Card className="mb-8 border-orange-500/20 bg-orange-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-foreground">Email Activation Required</h3>
            </div>
            
            <p className="text-muted-foreground mb-4">
              An activation email has been sent to <strong>john@smithfamily.com</strong>
            </p>

            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-2">Next Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Check your email inbox for the Lovable.dev activation email</li>
                <li>Click the activation link in the email</li>
                <li>Log in to your new Lovable.dev account</li>
                <li>Start building your custom reports</li>
              </ol>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">For demo purposes, you can simulate email activation:</p>
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Simulate Email Activation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lovable.dev Platform Features */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Lovable.dev Platform Features for Report Building:</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm">AI-powered report generation</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm">Custom dashboard creation</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm">Responsive report layouts</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm">Collaboration features</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm">Real-time data visualization</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm">Interactive chart components</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm">Export to multiple formats</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm">Version control and history</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

