"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function CompanyOverview() {
  const [showRightSide, setShowRightSide] = useState(false);

  useEffect(() => {
    // Reset right side visibility when component mounts
    setShowRightSide(false);

    // Show right side after 1.5 seconds
    const timer = setTimeout(() => {
      setShowRightSide(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Tagline */}
      <div className="text-center px-16 py-4 mb-4 mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight drop-shadow-lg"
        >
          Compliance-Friendly AI Infrastructure for Financial Services
        </motion.h1>
      </div>

      {/* Main content - Two Column Layout */}
      <div className="flex-1 px-16 pb-6 grid grid-cols-2 gap-12">
        {/* Left Column - Business Overview */}
        <div className={`flex flex-col transition-all duration-1000 ${showRightSide ? '' : 'col-span-2'}`}>
          <h2 className="text-2xl font-bold text-primary mb-6">Business Overview</h2>

          <div className="space-y-6 text-base leading-relaxed">
            <p className="text-gray-700">
              Collation.AI creates <span className="font-semibold text-black">AI native infrastructure</span> for wealth managers, enabling AI-powered analytics, reporting, workflows, and business efficiency.
            </p>

            <div className="pt-2">
              <p className="text-sm font-bold text-gray-700 mb-2">CLIENTS</p>
              <p className="text-gray-700">Single and Multi Family Offices, RIAs and Enterprises (e.g. Banks, FinTechs)</p>
            </div>

            <div className="pt-2">
              <p className="text-sm font-bold text-gray-700 mb-2">DEPLOYMENT</p>
              <p className="text-gray-700">Setup as an overlay on existing tech stack / SaaS or as a standalone solution</p>
            </div>

            <div className="pt-2">
              <p className="text-sm font-bold text-gray-700 mb-2">INFRASTRUCTURE</p>
              <p className="text-gray-700">Data warehouses, bots for data ingestion (APIs, SFTPs, PDFs), reconciliation, unified data models, and compliant vibe coding with guard rails</p>
            </div>
          </div>
        </div>

        {/* Right Column - Platform Metrics & Flow */}
        {showRightSide && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            {/* Platform Metrics */}
            <div className="bg-gray-600 text-white px-4 py-1.5 mb-3">
              <h3 className="font-bold text-sm">Platform Metrics</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold">$100bn+</div>
                <div className="text-xs">Assets<br/>Under Reporting</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-xs">Active Agentic<br/>AI Bots</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-xs">Wealth Manager<br/>Clients</div>
              </div>
            </div>

            {/* Platform Capabilities */}
            <div className="bg-gray-600 text-white px-4 py-1.5 mb-3">
              <h3 className="font-bold text-sm">Platform Capabilities</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-300 rounded-lg p-3 shadow-md relative overflow-hidden">
                <p className="font-bold text-indigo-900 text-xs mb-2">Ingest anything</p>
                <p className="text-indigo-700 text-xs mb-2">Pull from any source</p>
                {/* Animated source boxes */}
                <div className="flex gap-1 flex-wrap mt-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  >
                    APIs
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  >
                    PDFs
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  >
                    Web
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  >
                    Data
                  </motion.div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-3 shadow-md">
                <p className="font-bold text-purple-900 text-xs mb-1">Host your data</p>
                <p className="text-purple-700 text-xs">Your Azure/AWS account</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-lg p-3 shadow-md">
                <p className="font-bold text-emerald-900 text-xs mb-1">Clean & unified</p>
                <p className="text-emerald-700 text-xs">Auto reconciliation</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-3 shadow-md">
                <p className="font-bold text-amber-900 text-xs mb-1">Compliant coding</p>
                <p className="text-amber-700 text-xs">Guard rails & controls</p>
              </div>
            </div>

            {/* Flow Diagram */}
            <div className="flex flex-col items-center space-y-2">
              {/* Arrow down */}
              <ArrowDown className="h-5 w-5 text-green-500" />

              {/* Customer hosted Data Warehouse */}
              <div className="w-full bg-indigo-700 text-white px-4 py-2 rounded text-center">
                <div className="font-bold text-sm">Customer hosted Data Warehouse</div>
                <div className="text-xs">(Extract, Normalize and Reconcile)</div>
              </div>

              {/* Arrow down */}
              <ArrowDown className="h-5 w-5 text-green-500" />

              {/* Data Guardrails */}
              <div className="w-full bg-indigo-700 text-white px-4 py-2 rounded text-center">
                <div className="font-bold text-sm">Data Guardrails</div>
                <div className="text-xs">(Role Based Access, Approvals, Logs, Policy etc.)</div>
              </div>

              {/* Arrow down */}
              <ArrowDown className="h-5 w-5 text-green-500" />

              {/* Vibe Coded Workflows */}
              <div className="w-full bg-gray-900 text-white px-4 py-2 rounded text-center">
                <div className="font-bold text-sm">Vibe Coded Workflows and Dashboards</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="text-center pb-4">
        <Button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-12 py-6 rounded-full hover:scale-105 transition-all"
          asChild
        >
          <Link href="/schedule-demo">
            Schedule a Demo
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
