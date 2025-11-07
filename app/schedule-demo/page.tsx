"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const ScheduleDemo = () => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6 py-8">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Schedule Your Demo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Book a 30-minute personalized demo to see how collation.ai can transform your investment operations.
            </p>
          </div>

          {/* Calendly Widget */}
          <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border/50">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/sinan-biren-collationai/30min" 
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Questions? Email us at{" "}
              <a 
                href="mailto:demo@collation.ai" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                demo@collation.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDemo;