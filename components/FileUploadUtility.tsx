'use client'

import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Table, FileSpreadsheet, CheckCircle, AlertCircle, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadUtilityProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UploadedFile {
  file: File;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: {
    fileName: string;
    fileType: string;
    size: string;
    rows?: number;
    columns?: number;
    dataPoints?: number;
    preview?: any[];
  };
  error?: string;
}

export default function FileUploadUtility({ open, onOpenChange }: FileUploadUtilityProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File): Promise<UploadedFile['result']> => {
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const fileType = file.type.includes('pdf') ? 'PDF' :
                     file.type.includes('sheet') || file.type.includes('excel') ? 'Excel' :
                     file.type.includes('csv') ? 'CSV' : 'Unknown';

    return {
      fileName: file.name,
      fileType,
      size: (file.size / 1024).toFixed(2) + ' KB',
      rows: Math.floor(Math.random() * 1000) + 100,
      columns: Math.floor(Math.random() * 50) + 10,
      dataPoints: Math.floor(Math.random() * 10000) + 1000,
      preview: [
        { column: 'Date', value: '2024-01-15', type: 'Date' },
        { column: 'Amount', value: '$1,250,000.00', type: 'Currency' },
        { column: 'Security', value: 'AAPL', type: 'Text' },
        { column: 'Quantity', value: '1,500', type: 'Number' }
      ]
    };
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  }, []);

  const handleFiles = async (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(file => ({
      file,
      status: 'uploading',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Process each file
    for (let i = 0; i < newFiles.length; i++) {
      const fileIndex = files.length + i;

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setFiles(prev => {
          const updated = [...prev];
          updated[fileIndex] = { ...updated[fileIndex], progress };
          return updated;
        });
      }

      // Change to processing
      setFiles(prev => {
        const updated = [...prev];
        updated[fileIndex] = { ...updated[fileIndex], status: 'processing' };
        return updated;
      });

      // Process file
      try {
        const result = await processFile(newFiles[i].file);
        setFiles(prev => {
          const updated = [...prev];
          updated[fileIndex] = {
            ...updated[fileIndex],
            status: 'completed',
            progress: 100,
            result
          };
          return updated;
        });
      } catch (error) {
        setFiles(prev => {
          const updated = [...prev];
          updated[fileIndex] = {
            ...updated[fileIndex],
            status: 'error',
            error: 'Failed to process file'
          };
          return updated;
        });
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return <FileText className="w-8 h-8 text-red-500" />;
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
    if (fileName.endsWith('.csv')) return <Table className="w-8 h-8 text-blue-500" />;
    return <FileText className="w-8 h-8 text-gray-500" />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upload Financial Data</DialogTitle>
          <DialogDescription>
            Upload your financial documents, statements, or data files. We support PDF, Excel, and CSV formats.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <Card
            className={cn(
              "border-2 border-dashed transition-colors cursor-pointer",
              isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardContent className="p-12">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium text-foreground mb-1">
                      Drop files here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Support for PDF, Excel (.xlsx, .xls), and CSV files
                    </p>
                  </div>
                  <Button type="button" variant="outline" size="lg">
                    Select Files
                  </Button>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.xlsx,.xls,.csv"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </CardContent>
          </Card>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Uploaded Files</h3>
              {files.map((uploadedFile, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getFileIcon(uploadedFile.file.name)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-foreground truncate">
                              {uploadedFile.file.name}
                            </p>
                            {uploadedFile.status === 'completed' && (
                              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                            )}
                            {uploadedFile.status === 'error' && (
                              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        {uploadedFile.status === 'uploading' && (
                          <div className="space-y-1">
                            <Progress value={uploadedFile.progress} className="h-2" />
                            <p className="text-sm text-muted-foreground">
                              Uploading... {uploadedFile.progress}%
                            </p>
                          </div>
                        )}

                        {uploadedFile.status === 'processing' && (
                          <div className="space-y-1">
                            <Progress value={50} className="h-2" />
                            <p className="text-sm text-muted-foreground">
                              Processing file...
                            </p>
                          </div>
                        )}

                        {uploadedFile.status === 'completed' && uploadedFile.result && (
                          <div className="space-y-3 mt-3">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              <Badge variant="outline" className="justify-start">
                                <FileText className="w-3 h-3 mr-1" />
                                {uploadedFile.result.fileType}
                              </Badge>
                              <Badge variant="outline" className="justify-start">
                                <Table className="w-3 h-3 mr-1" />
                                {uploadedFile.result.rows} rows
                              </Badge>
                              <Badge variant="outline" className="justify-start">
                                <Table className="w-3 h-3 mr-1" />
                                {uploadedFile.result.columns} columns
                              </Badge>
                              <Badge variant="outline" className="justify-start">
                                {uploadedFile.result.size}
                              </Badge>
                            </div>

                            {uploadedFile.result.preview && (
                              <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-sm font-medium text-foreground mb-2">
                                  Data Preview
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  {uploadedFile.result.preview.map((item, i) => (
                                    <div key={i} className="flex justify-between">
                                      <span className="text-muted-foreground">{item.column}:</span>
                                      <span className="font-medium text-foreground">{item.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                <Download className="w-4 h-4" />
                                <span>Download Parsed Data</span>
                              </Button>
                              <Button variant="outline" size="sm">
                                View Full Details
                              </Button>
                            </div>
                          </div>
                        )}

                        {uploadedFile.status === 'error' && (
                          <p className="text-sm text-destructive mt-2">
                            {uploadedFile.error}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          {files.length > 0 && (
            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {files.filter(f => f.status === 'completed').length} of {files.length} files processed
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setFiles([])}>
                  Clear All
                </Button>
                <Button onClick={() => onOpenChange(false)}>
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
