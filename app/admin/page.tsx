"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    slug?: string;
  } | null>(null);
  const [metadata, setMetadata] = useState({
    author: "Sinan Biren",
    category: "AI & Automation",
    excerpt: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setResult(null);
      } else {
        alert("Please select a PDF file");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    if (!metadata.excerpt) {
      alert("Please provide an excerpt");
      return;
    }

    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("author", metadata.author);
      formData.append("category", metadata.category);
      formData.append("excerpt", metadata.excerpt);

      const response = await fetch("/api/blog/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: "Blog post created successfully!",
          slug: data.slug,
        });
        // Reset form
        setFile(null);
        setMetadata({
          author: "Sinan Biren",
          category: "AI & Automation",
          excerpt: "",
        });
        // Reset file input
        const fileInput = document.getElementById("pdf-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to create blog post",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setResult({
        success: false,
        message: "An error occurred while uploading the file",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Blog Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Upload a PDF article to automatically create a new blog post
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upload PDF Article</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="pdf-upload">PDF File</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  {file && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span className="truncate max-w-xs">{file.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={metadata.author}
                  onChange={(e) =>
                    setMetadata({ ...metadata, author: e.target.value })
                  }
                  disabled={uploading}
                  placeholder="Author name"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={metadata.category}
                  onChange={(e) =>
                    setMetadata({ ...metadata, category: e.target.value })
                  }
                  disabled={uploading}
                  placeholder="Blog category"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (Short Description)</Label>
                <Textarea
                  id="excerpt"
                  value={metadata.excerpt}
                  onChange={(e) =>
                    setMetadata({ ...metadata, excerpt: e.target.value })
                  }
                  disabled={uploading}
                  placeholder="Brief description of the article (will appear in blog listing)"
                  rows={3}
                />
              </div>

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={!file || uploading || !metadata.excerpt}
                className="w-full"
                size="lg"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload and Create Blog Post
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Result Message */}
          {result && (
            <Card
              className={`${
                result.success
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  {result.success ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`font-semibold mb-1 ${
                        result.success ? "text-green-900" : "text-red-900"
                      }`}
                    >
                      {result.success ? "Success!" : "Error"}
                    </p>
                    <p
                      className={`text-sm ${
                        result.success ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {result.message}
                    </p>
                    {result.success && result.slug && (
                      <div className="mt-3">
                        <a
                          href={`/blog/${result.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          View Blog Post →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">How it works</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Select a PDF file containing your article</li>
                <li>Fill in the author, category, and excerpt</li>
                <li>Click upload - the system will:
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>Extract text content from the PDF</li>
                    <li>Extract and save images</li>
                    <li>Generate a URL-friendly slug</li>
                    <li>Create the blog post in the database</li>
                    <li>Make it immediately available on the blog</li>
                  </ul>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
