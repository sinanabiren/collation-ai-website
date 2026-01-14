"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

const ScheduleDemo = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8 touch-manipulation"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm sm:text-base">Back to Home</span>
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-4">
              Schedule Your Demo
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Book a 30-minute personalized demo to see how collation.ai can transform your investment operations.
            </p>
          </div>

          {/* Calendly Widget */}
          <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border/50">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/sinan-biren-collationai/30min"
              style={{ minWidth: '280px', height: '600px' }}
            />
          </div>

          {/* Additional Info */}
          <div className="mt-6 sm:mt-8 text-center px-4">
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              Questions? Email us at{" "}
              <a
                href="mailto:hello@collation.ai"
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                hello@collation.ai
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Load Calendly script with lazyOnload strategy */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  );
};

export default ScheduleDemo;