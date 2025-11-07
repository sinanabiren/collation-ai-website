'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  Settings,
  Eye,
  Shuffle,
  Download,
  Plus,
  Trash2,
  FileSpreadsheet
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

type WorkflowStep = 'extract' | 'configure' | 'review' | 'transform' | 'export';

interface DataField {
  id: string;
  name: string;
  type: 'Currency' | 'Date' | 'Text' | 'Number' | 'Percentage';
}

export default function FinDocParserPage() {
  const [activeStep, setActiveStep] = useState<WorkflowStep>('configure');
  const [sharePointUrl, setSharePointUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dataFields, setDataFields] = useState<DataField[]>([
    { id: '1', name: 'Starting Balance', type: 'Currency' },
    { id: '2', name: 'Ending Balance', type: 'Currency' }
  ]);

  const steps = [
    { id: 'extract', label: 'Extract', icon: FileText },
    { id: 'configure', label: 'Configure', icon: Settings },
    { id: 'review', label: 'Review', icon: Eye },
    { id: 'transform', label: 'Transform', icon: Shuffle },
    { id: 'export', label: 'Export', icon: Download }
  ];

  const addField = () => {
    const newField: DataField = {
      id: Date.now().toString(),
      name: '',
      type: 'Text'
    };
    setDataFields([...dataFields, newField]);
  };

  const removeField = (id: string) => {
    setDataFields(dataFields.filter(field => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<DataField>) => {
    setDataFields(dataFields.map(field =>
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">FinDoc Parser</h1>
                <p className="text-xs text-muted-foreground">Financial Document Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/data-connections">
                <Button variant="ghost" size="sm">Back to Connections</Button>
              </Link>
              <Button variant="ghost" size="sm">Dashboard</Button>
              <Button variant="ghost" size="sm">History</Button>
              <Button variant="ghost" size="sm">Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* SharePoint Connection Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-foreground mb-3">SharePoint Site URL</h3>
            <div className="flex gap-3">
              <Input
                placeholder="https://yourcompany.sharepoint.com/sites/yoursite"
                value={sharePointUrl}
                onChange={(e) => setSharePointUrl(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Connect to SharePoint
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Enter the URL of your SharePoint document library
            </p>
          </CardContent>
        </Card>

        {/* Workflow Steps */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="flex border-b border-border">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                const isPast = steps.findIndex(s => s.id === activeStep) > index;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id as WorkflowStep)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-4 transition-colors ${
                      isActive
                        ? 'bg-primary/5 border-b-2 border-primary'
                        : isPast
                        ? 'bg-muted/30 hover:bg-muted/50'
                        : 'hover:bg-muted/30'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Configure Step Content */}
        {activeStep === 'configure' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Configure New Format</h2>
              <p className="text-muted-foreground">
                Upload a sample PDF page and define expected data fields
              </p>
            </div>

            {/* Upload Sample PDF */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-base font-semibold text-foreground mb-4">
                  Upload Sample PDF Page
                </h3>
                <label
                  htmlFor="pdf-upload"
                  className="flex items-center justify-center space-x-3 p-12 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {uploadedFile ? uploadedFile.name : 'Click to upload sample PDF'}
                  </span>
                  <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </CardContent>
            </Card>

            {/* Expected Data Fields */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold text-foreground">
                    Expected Data Fields
                  </h3>
                  <Button
                    onClick={addField}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Field</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  {dataFields.map((field, index) => (
                    <div key={field.id} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">
                            Field Name
                          </label>
                          <Input
                            value={field.name}
                            onChange={(e) => updateField(field.id, { name: e.target.value })}
                            placeholder="Enter field name"
                            className="bg-background"
                          />
                        </div>
                        <div className="w-48">
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">
                            Type
                          </label>
                          <Select
                            value={field.type}
                            onValueChange={(value) => updateField(field.id, { type: value as DataField['type'] })}
                          >
                            <SelectTrigger className="bg-background">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Currency">Currency</SelectItem>
                              <SelectItem value="Date">Date</SelectItem>
                              <SelectItem value="Text">Text</SelectItem>
                              <SelectItem value="Number">Number</SelectItem>
                              <SelectItem value="Percentage">Percentage</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          onClick={() => removeField(field.id)}
                          variant="ghost"
                          size="icon"
                          className="mt-5"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-center pt-6">
              <Button size="lg" className="px-12">
                Save Format Configuration
              </Button>
            </div>
          </div>
        )}

        {/* Extract Step */}
        {activeStep === 'extract' && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Extract Data</h2>
            <p className="text-muted-foreground mb-6">
              Upload documents to extract data using configured formats
            </p>
            <Button size="lg">Upload Documents</Button>
          </div>
        )}

        {/* Review Step */}
        {activeStep === 'review' && (
          <div className="text-center py-12">
            <Eye className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Review Extracted Data</h2>
            <p className="text-muted-foreground mb-6">
              Review and validate the extracted data before transformation
            </p>
            <Badge variant="outline" className="text-muted-foreground">
              No data to review yet
            </Badge>
          </div>
        )}

        {/* Transform Step */}
        {activeStep === 'transform' && (
          <div className="text-center py-12">
            <Shuffle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Transform Data</h2>
            <p className="text-muted-foreground mb-6">
              Apply transformations and business rules to extracted data
            </p>
            <Badge variant="outline" className="text-muted-foreground">
              No data to transform yet
            </Badge>
          </div>
        )}

        {/* Export Step */}
        {activeStep === 'export' && (
          <div className="text-center py-12">
            <Download className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Export Data</h2>
            <p className="text-muted-foreground mb-6">
              Export transformed data to your preferred format
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline">Export to Excel</Button>
              <Button variant="outline">Export to CSV</Button>
              <Button variant="outline">Export to JSON</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
