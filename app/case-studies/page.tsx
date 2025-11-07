"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SEOHead from "@/components/SEOHead";
import LottieAnimation from "@/components/LottieAnimation";
import { motion } from "framer-motion";
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
        keywords="RIA case studies, Family Office success stories, wealth management automation results, data warehouse implementation, Agentic AI results, financial data automation case studies"
        canonical="https://www.collation.ai/case-studies"
      />
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Case Studies
              </h1>
              <p className="text-xl text-muted-foreground">
                Real businesses, real people, and how Agentic AI Bots have managed to solve their complex data problems at scale and ease.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src={typeof heroImage === 'string' ? heroImage : heroImage.src}
                alt="Business professionals in modern office building"
                className="w-full max-w-xl h-auto rounded-lg"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="mb-6 flex justify-center">
                      <LottieAnimation 
                        animationData={study.animation} 
                        className="w-full max-w-md h-auto"
                      />
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-2">{study.client}</p>
                      <h3 className="text-2xl font-bold text-foreground mb-4">{study.title}</h3>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center">
                        <span className="mr-2">⚠️</span> The Problem
                      </h4>
                      <p className="text-foreground font-semibold mb-6">{study.description}</p>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center">
                        <span className="mr-2">✓</span> The Solution
                      </h4>
                      <ul className="space-y-3">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="text-muted-foreground leading-relaxed">
                            {result}
                          </li>
                        ))}
                      </ul>
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
            className="text-center"
          >
            <Card className="max-w-3xl mx-auto bg-primary text-primary-foreground hover:shadow-2xl transition-shadow">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Want Similar Results?</h2>
                <p className="text-lg mb-8 opacity-90">
                  See how Collation.AI can transform your wealth management data operations with our Agentic AI Bots.
                </p>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Schedule a Free Consultation</Link>
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
