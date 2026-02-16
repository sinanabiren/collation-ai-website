"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function CompanyOverview() {
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
          className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4"
        >
          We Solve Data Headaches For Wealth Managers
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
        >
          <p className="mb-2">Cut costs and streamline operations with AI bots that consolidate all your financial data into one accessible warehouse.</p>
          <p className="font-semibold text-foreground">Works as an overlay or standalone.</p>
        </motion.div>
      </div>

      {/* Main content - Two Column Layout */}
      <div className="flex-1 px-16 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Business Overview */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-primary mb-4">Business Overview</h2>

          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              We service the wealth management industry by creating <span className="text-lg font-bold text-primary">AI native infrastructure</span> for its clients. This gives them everything they need to effectively use AI for analytics and reporting, making process improvements, creating workflows and driving overall business efficiency.
            </p>

            <p className="font-semibold">
              Clients are Single and Multi Family Offices, RIAs and Banks
            </p>

            <p>
              This <span className="font-bold text-primary">AI native infrastructure</span> can be setup as an overlay on the existing tech stack / SaaS or as a standalone.
            </p>

            <p>
              Infrastructure created includes data warehouses, bots to ingest data from any source (APIs, SFTPs, Browser Automation, PDFs etc.), do data reconciliation and cleansing, creating a unified data model, vibe coding with guard rails etc.
            </p>
          </div>
        </div>

        {/* Right Column - Platform Metrics & Flow */}
        <div className="flex flex-col">
          {/* Platform Capabilities */}
          <div className="bg-gray-600 text-white px-4 py-1.5 mb-2">
            <h3 className="font-bold text-sm">Platform Capabilities</h3>
          </div>

          <div className="space-y-2 text-xs leading-relaxed mb-4">
            <p>
              <span className="font-semibold">• Ingest anything:</span> Pull data from accounting systems, portfolio systems, custodian banks, fund managers, real estate platforms, CRM systems, PDFs, websites etc.
            </p>
            <p>
              <span className="font-semibold">• Host your own data:</span> The Data Warehouse is created in customer's own Azure/AWS account and they have full admin level access
            </p>
            <p>
              <span className="font-semibold">• Clean Data / Unified Data Model:</span> Data is first scrubbed and reconciled. A unified data model across their entire business is also created
            </p>
            <p>
              <span className="font-semibold">• Fully compliant Vibe Coding:</span> Use any tool (e.g. Claude Code). Collation's guard rails ensure that no PII leaks to the LLM used, users are only able to access data that they are authorized to see etc.
            </p>
          </div>

          {/* Flow Diagram */}
          <div className="flex flex-col items-center space-y-2">
            {/* Top row - Data Sources */}
            <div className="flex gap-2 justify-center flex-wrap">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gray-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold"
              >
                APIs
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-gray-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold"
              >
                PDFs
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-gray-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold"
              >
                Websites
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-gray-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold"
              >
                DataFeeds
              </motion.div>
            </div>

            {/* Arrow down */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <ArrowDown className="h-5 w-5 text-green-500" />
            </motion.div>

            {/* Customer hosted Data Warehouse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="w-full bg-indigo-700 text-white px-4 py-2 rounded text-center"
            >
              <div className="font-bold text-sm">Customer hosted Data Warehouse</div>
              <div className="text-xs">(Extract, Normalize and Reconcile)</div>
            </motion.div>

            {/* Arrow down */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              <ArrowDown className="h-5 w-5 text-green-500" />
            </motion.div>

            {/* Data Guardrails */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="w-full bg-indigo-700 text-white px-4 py-2 rounded text-center"
            >
              <div className="font-bold text-sm">Data Guardrails</div>
              <div className="text-xs">(Role Based Access, Approvals, Logs, Policy etc.)</div>
            </motion.div>

            {/* Arrow down */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              <ArrowDown className="h-5 w-5 text-green-500" />
            </motion.div>

            {/* Vibe Coded Workflows */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded text-center"
            >
              <div className="font-bold text-sm">Vibe Coded Workflows and Dashboards</div>
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
}
