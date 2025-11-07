'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Link as LinkIcon, Shield, Lock, Eye, FileCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";

export default function DataConnectionConfigPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vendor = searchParams.get('vendor') || 'FundCount';
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    apiKeys: "",
    websiteUrl: "",
    additionalInfo: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCompleteSetup = () => {
    // Simulate setup completion and navigate to data warehouse
    router.push('/data-warehouse');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/data-connections"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Selection
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Configure Data Connections</h1>
              <p className="text-muted-foreground">Step 1 of 1: {vendor}</p>
            </div>
          </div>
          <Badge className="bg-muted text-muted-foreground">
            Technology Vendor
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <LinkIcon className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">{vendor} Credentials</CardTitle>
                    <p className="text-muted-foreground mt-1">
                      Enter your platform credentials and API details for automated data extraction
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Credentials Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">
                      Username <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="apiKeys">API Keys</Label>
                    <Input
                      id="apiKeys"
                      name="apiKeys"
                      placeholder="Enter API keys (if available)"
                      value={formData.apiKeys}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl">
                      Website URL <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="websiteUrl"
                      name="websiteUrl"
                      placeholder="https://example.com"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <p className="text-sm text-muted-foreground">
                    Any additional details, tokens, or special requirements
                  </p>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    placeholder="Enter any additional information needed for integration"
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/data-connections')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Selection
                  </Button>
                  
                  <Button 
                    onClick={handleCompleteSetup}
                    className="min-w-[140px]"
                  >
                    Complete Setup
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Progress</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <span className="text-sm font-medium text-foreground">{vendor}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-5 h-5 text-success" />
                  <h3 className="font-semibold text-foreground">Security</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Lock className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      All credentials are encrypted in transit and at rest
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      SOC 2 Type II compliant infrastructure
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Lock className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Multi-factor authentication required
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FileCheck className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Full audit trail of all data access
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

