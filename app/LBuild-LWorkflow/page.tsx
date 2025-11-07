'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Workflow, Clock, Database, Target, CheckCircle } from "lucide-react";
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function BuildWorkflowPage() => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    workflowTitle: "",
    category: "",
    description: "",
    businessJustification: "",
    expectedOutcomes: "",
    executionFrequency: "",
    dataConnections: [] as string[]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDataConnectionChange = (connection: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dataConnections: checked 
        ? [...prev.dataConnections, connection]
        : prev.dataConnections.filter(conn => conn !== connection)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and navigate to analysis
    console.log("Workflow submission:", formData);
    
    // Navigate to analysis page with workflow data
    const params = new URLSearchParams({
      title: formData.workflowTitle,
      category: formData.category
    });
    router.push(`/workflow-analysis?${params.toString()}`);
  };

  // Mock workflow requests data
  const [workflowRequests] = useState({
    pending: 0,
    inDevelopment: 0,
    ready: 0
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/free-trial" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Trial Dashboard</span>
              </Link>
            </div>
            <div className="text-xl font-bold text-foreground">
              collation.ai
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                Free Trial: 1/1 Workflow
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Request Custom Workflow
          </h1>
        </div>

        {/* Request Custom Workflow Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Workflow Title and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="workflowTitle">Workflow Title *</Label>
                    <Input
                      id="workflowTitle"
                      placeholder="Enter workflow name"
                      value={formData.workflowTitle}
                      onChange={(e) => handleInputChange("workflowTitle", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="bg-background border-border z-50">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border shadow-lg z-50">
                        <SelectItem value="data-processing">Data Processing</SelectItem>
                        <SelectItem value="data-sync">Data Synchronization</SelectItem>
                        <SelectItem value="report-generation">Report Generation</SelectItem>
                        <SelectItem value="compliance-monitoring">Compliance Monitoring</SelectItem>
                        <SelectItem value="notification-alerts">Notification & Alerts</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this workflow should do..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                {/* Business Justification */}
                <div className="space-y-2">
                  <Label htmlFor="businessJustification">Business Justification</Label>
                  <Textarea
                    id="businessJustification"
                    placeholder="Why is this workflow needed? What problem does it solve?"
                    value={formData.businessJustification}
                    onChange={(e) => handleInputChange("businessJustification", e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Expected Outcomes */}
                <div className="space-y-2">
                  <Label htmlFor="expectedOutcomes">Expected Outcomes</Label>
                  <Textarea
                    id="expectedOutcomes"
                    placeholder="What should be the result when this workflow runs?"
                    value={formData.expectedOutcomes}
                    onChange={(e) => handleInputChange("expectedOutcomes", e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Execution Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="executionFrequency">Execution Frequency</Label>
                    <Select value={formData.executionFrequency} onValueChange={(value) => handleInputChange("executionFrequency", value)}>
                      <SelectTrigger className="bg-background border-border z-50">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border shadow-lg z-50">
                        <SelectItem value="on-demand">On Demand</SelectItem>
                        <SelectItem value="real-time">Real-time</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>


                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button type="submit" className="px-8">
                    Submit Request
                  </Button>
                  <Link href="/free-trial">
                    <Button type="button" variant="outline" className="px-8">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Your Workflow Requests */}
          <Card className="mt-8 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Workflow Requests</span>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline" className="bg-warning/10 text-warning">
                    {workflowRequests.pending} Pending
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {workflowRequests.inDevelopment} In Development
                  </Badge>
                  <Badge variant="outline" className="bg-success/10 text-success">
                    {workflowRequests.ready} Ready
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Workflow className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No workflow requests submitted yet. Click "Submit Request" to get started!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

