"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SEOHead from "@/components/SEOHead";
import LottieAnimation from "@/components/LottieAnimation";
import { motion } from "framer-motion";

// Lazy load Footer
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
import caseStudy01 from "@/assets/animations/case-study-01.json";
import caseStudy02 from "@/assets/animations/case-study-02.json";
import caseStudy03 from "@/assets/animations/case-study-03.json";
import caseStudy04 from "@/assets/animations/case-study-04.json";
import heroImage from "@/assets/case-studies-hero.png";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Case Studies - Collation.AI Success Stories | RIA & Family Office Results"
        description="Real-world success stories of RIAs and Family Offices using Collation.AI's Agentic AI Bots. See how we've helped wealth managers automate data operations, reduce costs, and achieve 5x faster onboarding."
        keywords="RIA case studies, Registered Investment Advisor case studies, Family Office success stories, wealth management automation results, data warehouse implementation, Agentic AI results, financial data automation case studies, WealthTech success stories, AI Bots results, portfolio management implementation, asset management automation, data aggregation success, custodian integration results, investment reporting case studies, client reporting automation, performance analytics implementation, data reconciliation success, workflow automation results, ROI case studies, cost savings wealth management, efficiency improvements, client retention results, faster onboarding, data quality improvement"
        canonical="https://www.collation.ai/case-studies"
      />
      <Navbar />

      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 lg:mb-24"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
                Case Studies
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                Real businesses, real people, and how Agentic AI Bots have managed to solve their complex data problems at scale and ease.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src={typeof heroImage === 'string' ? heroImage : heroImage.src}
                alt="Business professionals collaborating in modern office building"
                width={672}
                height={448}
                className="w-full max-w-xl h-auto rounded-lg"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 items-start">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                className="flex flex-col h-full"
              >
                <Card className="h-full hover:shadow-xl transition-shadow flex flex-col">
                  <CardContent className="p-4 sm:p-6 md:p-8 flex flex-col h-full">
                    {/* Client Type Badge */}
                    <div className="mb-3 sm:mb-4">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-bold uppercase tracking-wide rounded-full">
                        {study.client}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                      {study.title}
                    </h3>

                    {/* Animation - Natural size, takes available space */}
                    <div className="mb-6 sm:mb-8 flex justify-center flex-1">
                      <LottieAnimation
                        animationData={study.animation}
                        className="w-full max-w-md h-auto"
                      />
                    </div>

                    {/* Text sections container - Always at bottom */}
                    <div className="space-y-6 mt-auto">
                      {/* The Problem Section */}
                      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                        <h4 className="font-bold text-foreground mb-2 flex items-center text-lg">
                          <span className="mr-2 text-red-500">⚠️</span> The Problem
                        </h4>
                        <p className="text-foreground leading-relaxed">{study.description}</p>
                      </div>

                      {/* The Solution Section */}
                      <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                        <h4 className="font-bold text-foreground mb-3 flex items-center text-lg">
                          <span className="mr-2 text-green-600">✓</span> The Solution
                        </h4>
                        <ul className="space-y-3">
                          {study.results.map((result, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-foreground leading-relaxed">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center px-4"
          >
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-primary hover:shadow-2xl transition-shadow">
              <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">Want Similar Results?</h2>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-muted-foreground leading-relaxed">
                  See how Collation.AI can transform your wealth management data operations with our Agentic AI Bots.
                </p>
                <Button asChild size="lg" className="touch-manipulation bg-primary hover:bg-primary/90 text-white">
                  <Link href="/schedule-demo">Schedule a Free Consultation</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const caseStudies = [
  {
    title: "Data Extraction Bot & Analytics Calculator Bot Transforms Raw Accounting Data into Actionable Insights",
    client: "FAMILY OFFICE",
    description: "We are a FO and our Accounting System does not do investment reporting.",
    results: [
      "Collation.AI generates reports as an overlay to our current General Ledger system after having enriched it with the data coming from our Custodian Banks (e.g. Schwab, Fidelity)",
      "Collation.AI pulls your data from your incumbent Accounting System and pushes it into your data warehouse, runs various calculations e.g. TWR, PnL, Attribution (with drill down functionality), Risk/Return calculations, etc.",
      "Collation.AI was 30% of the cost and 4X faster than the next best solution"
    ],
    animation: caseStudy01
  },
  {
    title: "Data Extraction Bot Bridges the Gap Between Data Providers and Your Systems",
    client: "FAMILY OFFICE / RIA",
    description: "Our Staff is spending way too much time on downloading documents manually from various portals.",
    results: [
      "Collation.AI downloads the files and extracts data points from the PDF Files automatically",
      "Collation.AI uses its Data Extraction Bot to login into your data provider e.g. Fund Manager, Custodian Bank, Real Estate Platform, etc., pulls your the data down into your data warehouse, and finally pushes it into your preferred system",
      "We saved 01 full head count and Collation.AI was 4X faster than any other vendor"
    ],
    animation: caseStudy02
  },
  {
    title: "Data Scrubbing Bot & Automated Workflow Bot Detect and Resolve Data Anomalies",
    client: "FAMILY OFFICE / RIA",
    description: "My data contains errors, which leads to incorrect reporting.",
    results: [
      "Collation.AI's Auditor Bots scrub the data",
      "Collation.AI pulls your data from your portfolio system(s) and pushes it into your data warehouse, then the Audit Bots look for data anomalies; and it either fixes these data bugs or notifies you so that you can take appropriate / timely action",
      "Our Customer base grew 3X with 80% retention rate"
    ],
    animation: caseStudy03
  },
  {
    title: "Centralized Data Warehouse Bot centralizes & warehouses Multi-Source Financial Data",
    client: "FAMILY OFFICE / RIA",
    description: "We will lose our data that is on our old system we are planning to retire.",
    results: [
      "Collation.AI's Bots will extract and warehouse the data",
      "Collation.AI pulls your data from your portfolio systems, accounting systems, CRM systems, etc., pushes it into your centralised data warehouse so that you can migrate your historical data into your new system without any hassle",
      "Collation.AI was 60% more affordable and 10X faster than anything else in the market"
    ],
    animation: caseStudy04
  }
];

export default CaseStudies;
