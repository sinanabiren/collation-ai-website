'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoModal from '@/components/DemoModal'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  const testimonials = [
    {
      quote: "We were struggling badly with our manual workflows until we brought in Collation.AI. They have automated all of our data audit workflows across our Portfolio Management Software, CRM System, Alternative Investments Data Handling Vendor.",
      company: "A RIA in California - USA",
      role: "CTO"
    },
    {
      quote: "We hired Collation.AI to systemically pull down our data from our General Ledger System and house it in our own centralized data warehouse where we have Full Admin access at All Times! We love it",
      company: "A Single Family Office in Chicago - USA",
      role: "Controller"
    }
  ]

  return (
    <>
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-20 md:py-32 relative overflow-hidden">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
                We Solve Data Headaches{' '}
                <br />
                <span className="text-primary">For Wealth Managers</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
                We reduce operational costs, improve workflow efficiencies by Aggregating Financial Data via AI-driven Bots from
                your "existing technology stack", and bring it into your "Data Warehouse Silo"
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup" className="btn-primary inline-block">
                  Start Free Trial
                </Link>
                <button onClick={() => setIsDemoModalOpen(true)} className="btn-secondary">
                  Request a Demo
                </button>
              </div>
            </div>

            {/* Hero Illustrations */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-sm text-gray-500 mb-4">Data Aggregation</div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-100 rounded animate-pulse delay-100"></div>
                  <div className="h-8 bg-gray-100 rounded animate-pulse delay-200"></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-sm text-gray-500 mb-4">Data Reconciliation</div>
                <div className="flex items-center justify-center h-32">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-sm text-gray-500 mb-4">Workflow Automation</div>
                <div className="flex items-center justify-center h-32">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary rounded-lg animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proudly Featured On */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-center text-2xl font-semibold text-gray-900 mb-12">Proudly featured on</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              <div className="text-gray-400 font-semibold">THE WEALTH MOSAIC</div>
              <div className="text-gray-400 font-bold text-2xl">CITYWIRE</div>
              <div className="text-gray-400 font-bold text-2xl">Forbes</div>
              <div className="text-gray-400 font-bold text-xl">RIABiz</div>
              <div className="text-gray-400 font-semibold">WealthBriefing</div>
              <div className="text-gray-400 font-bold text-xl">KITCES</div>
              <div className="text-gray-400 font-semibold">CFDTechHub</div>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section id="challenges" className="py-20 bg-light">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Challenges You're Facing
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Breaking Through Data Barriers That Hold Your Business Back
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Challenge 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center text-xs font-semibold">carta</div>
                      <div className="w-2 h-px bg-gray-300"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center text-xs font-semibold text-green-600">Sage</div>
                      <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center text-xs font-semibold">ADDEPAR</div>
                      <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center text-xs font-semibold">Fidelity</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Disconnected Data</h3>
                <p className="text-gray-600 mb-4">
                  Data is fragmented across systems.
                </p>
                <p className="text-gray-600">
                  Registered Investment Advisor operations teams waste <strong>3 hours</strong> per day to aggregate data.
                </p>
              </div>

              {/* Challenge 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="mb-6 relative">
                  <div className="absolute top-0 right-0">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Your manual efforts
                    </div>
                  </div>
                  <div className="mt-12 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg>
                      <span>Download</span>
                      <span className="ml-auto text-gray-400">2/3 hrs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"/><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"/></svg>
                      <span>Copy</span>
                      <span className="ml-auto text-gray-400">3/4 hrs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"/></svg>
                      <span>Check & Fix</span>
                      <span className="ml-auto text-gray-400">1/2 hrs</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Manual Data Management</h3>
                <p className="text-gray-600">
                  Downloading, copying, checking & fixing across systems manually causes on average <strong>2 weeks</strong> of delays for preparing reports.
                </p>
              </div>

              {/* Challenge 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Cleaned files</span>
                      <span className="text-sm text-gray-500">-$27</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Edits files</span>
                      <span className="text-sm text-gray-500">-$57</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Copied files</span>
                      <span className="text-sm text-gray-500">-$72</span>
                    </div>
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-center gap-2 text-red-600 font-semibold">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
                        <span>Crossed yearly limit</span>
                      </div>
                      <div className="text-2xl font-bold mt-2">+ $ 8,000</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Repetitive Data Work</h3>
                <p className="text-gray-600">
                  Manual data entry and processing can take upto <strong>15 hours</strong> per week for an External Asset Manager.
                </p>
              </div>
            </div>

            {/* Additional Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Poor Data Analytics */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="mb-6">
                  <div className="bg-gray-50 p-6 rounded-xl relative">
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Poor Data Analytics
                      </div>
                    </div>
                    <div className="mt-8">
                      <svg className="w-full h-24 text-red-500" viewBox="0 0 200 100">
                        <polyline fill="none" stroke="currentColor" strokeWidth="2" points="0,80 20,60 40,70 60,40 80,50 100,30 120,45 140,25 160,40 180,20 200,35"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Poor Data Analytics</h3>
                <p className="text-gray-600 mb-4">
                  FOs experiment with an 'overpriced' performance reporting software and/or excel spread sheets.
                </p>
                <p className="text-gray-600">
                  Yet they already have a general ledger system & the experts to run it, so why not overlay a more affordable reporting software on your GL?
                </p>
              </div>

              {/* Overstaffing */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">Overstaffing & Understaffing</h3>
                <p className="text-gray-600 mb-4">
                  RIAs struggle to recruit new financial advisors when they lack a future-proof, scalable tech stack.
                </p>
                <p className="text-gray-600">
                  And excessive hiring puts unnecessary pressure on their budget.
                </p>
              </div>

              {/* High Cost */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">High Cost of Manual Solutions</h3>
                <p className="text-gray-600 mb-4">
                  Manual solutions are not scalable and become increasingly expensive.
                </p>
                <p className="text-gray-600">
                  Wealth Managers spend <strong>USD 60K</strong> per annum more if they were to build an in-house tech. stack vs. outsourcing to a specialized tech. vendor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Agentic AI Bots Section */}
        <section id="agentic-bots" className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Agentic AI Bots: The Future Of Data
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The Future of DataSmart automation that transforms complex data into actionable insights, revolutionizing wealth management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Data Extraction Bot */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="mb-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-xs text-gray-500">Data Sources</div>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg text-center text-xs font-semibold">CRM<br/>Systems</div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center text-xs font-semibold">Online<br/>Portals</div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center text-xs font-semibold">PDF Files</div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center text-xs font-semibold">APIs</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Data Extraction Bot</h3>
                <p className="text-gray-600">
                  Unlock trapped data from any source, automate extraction from CRMs, PDFs, Portals, and Protected Systems.
                </p>
              </div>

              {/* Data Scrubbing Bot */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="mb-6">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="absolute -right-2 -top-2 w-12 h-12 bg-blue-500 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Data Scrubbing Bot</h3>
                <p className="text-gray-600">
                  Once the data is collated, our Bot reconciles, cleanses, and ensures the data's consistency and reliability.
                </p>
                <p className="text-gray-600 mt-2">
                  We solve for data consistency within a system and also across systems.
                </p>
              </div>

              {/* Centralized Data Warehouse Bot */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">Centralized Data Warehouse Bot</h3>
                <p className="text-gray-600 mb-4">
                  Single source of truth and unlimited access to copies of your data from ALL of your tech. stack!
                </p>
                <p className="text-gray-600">
                  Monitor client relationships, predict retention to ensure you can take timely actions maintaining high levels of client satisfaction.
                </p>
              </div>

              {/* Automated Workflows Bot */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">Automated Workflows Bot</h3>
                <p className="text-gray-600 mb-4">
                  Intelligent automation across your existing technology stack.
                </p>
                <p className="text-gray-600">
                  Recruit new financial advisors to join your RIA thanks to future-proof ("AI ready" out of the box), scalable, open, & modern platform.
                </p>
              </div>

              {/* Analytics Calculator Bot */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">Analytics Calculator Bot</h3>
                <p className="text-gray-600 mb-4">
                  Customizable financial calculations at scale. You can simply bolt on top of your existing tech. stack! (e.g. Accounting Software).
                </p>
                <p className="text-gray-600">
                  Smart analytics help a WM to better understand client behaviors and needs, enabling more effective marketing and sales strategies.
                </p>
              </div>

              {/* AI Chatbot */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">AI Chatbot</h3>
                <p className="text-gray-600 mb-4">
                  Don't want to download "canned reports" from online portals?
                </p>
                <p className="text-gray-600">
                  Sure, Talk to your Data! Ask conversational questions to get instant and in-depth answers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VIBECODING REPORTING SECTION - NEW */}
        <section id="vibecode-reporting" className="py-20 bg-gradient-to-br from-primary/5 to-blue-50 relative overflow-hidden">
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce">
                NEW REPORTING SERVICE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Future of Reporting: Vibecoding
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Ditch expensive BI tools like PowerBI and Tableau. Connect your data warehouse directly to AI-powered vibecoding
                platforms like Lovable, Bolt.new, or Claude Code to build fully custom reporting UIs, apps, and dashboards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
              {/* Traditional Way */}
              <div className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Traditional BI Tools</h3>
                </div>
                <div className="mb-4 text-gray-600 font-medium">Data Warehouse → PowerBI / Tableau</div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start hover:translate-x-1 transition-transform">
                    <span className="text-gray-400 mr-3 mt-1">×</span>
                    <span>Expensive licensing costs</span>
                  </li>
                  <li className="flex items-start hover:translate-x-1 transition-transform">
                    <span className="text-gray-400 mr-3 mt-1">×</span>
                    <span>Limited customization options</span>
                  </li>
                  <li className="flex items-start hover:translate-x-1 transition-transform">
                    <span className="text-gray-400 mr-3 mt-1">×</span>
                    <span>Rigid dashboard templates</span>
                  </li>
                  <li className="flex items-start hover:translate-x-1 transition-transform">
                    <span className="text-gray-400 mr-3 mt-1">×</span>
                    <span>Steep learning curve</span>
                  </li>
                </ul>
              </div>

              {/* Vibecoding Way */}
              <div className="group bg-gradient-to-br from-primary to-blue-700 p-8 rounded-2xl text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-primary">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Vibecoding</h3>
                </div>
                <div className="mb-4 font-medium opacity-90">Data Warehouse → Lovable / Bolt.new / Claude Code</div>
                <ul className="space-y-3">
                  <li className="flex items-start hover:translate-x-1 transition-transform">
                    <span className="mr-3 mt-1">✓</span>
                    <span>Build 100% custom UIs and apps</span>
                  </li>
                  <li className="flex items-start hover:translate-x-1 transition-transform">
                    <span className="mr-3 mt-1">✓</span>
                    <span>No expensive BI tool licenses</span>
                  </li>
                  <li className="flex items-start hover:translate-x-1 transition-transform">
                    <span className="mr-3 mt-1">✓</span>
                    <span>Complete design freedom</span>
                  </li>
                  <li className="flex items-start hover:translate-x-1 transition-transform">
                    <span className="mr-3 mt-1">✓</span>
                    <span>AI-powered rapid development</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Security Section */}
            <div className="max-w-5xl mx-auto bg-white p-8 md:p-10 rounded-2xl border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your Data Stays Secure & Sovereign</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    All customer data remains hosted exclusively on <strong>our secure servers</strong>. We never store data with
                    third-party vibecoding platforms. Your data is accessed only through our secure API gateway with strict access controls.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:shadow-md transition-shadow">
                      <span className="text-3xl">🔒</span>
                      <div>
                        <div className="font-bold text-gray-900 mb-1">Development Environment</div>
                        <p className="text-sm text-gray-600">Separate dummy data only, isolated credentials</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:shadow-md transition-shadow">
                      <span className="text-3xl">🛡️</span>
                      <div>
                        <div className="font-bold text-gray-900 mb-1">Production Environment</div>
                        <p className="text-sm text-gray-600">Zero external platform access to your data</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-6 text-sm italic">
                    Your data privacy and sovereignty remain paramount while you benefit from cutting-edge vibecoding innovation.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Link href="/vibecode-demo" className="btn-primary inline-block text-lg px-10 py-4">
                See Vibecode Reporting in Action
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container-custom">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl">
                Seamless Integration, Powerful Automation - Your Data Journey Simplified
              </p>
              <button onClick={() => setIsDemoModalOpen(true)} className="btn-primary inline-block mt-6">
                Request a Demo
              </button>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-grow bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-2">Book a Call</h3>
                    <p className="text-gray-600">Schedule a 30-min free consultation with our Agentic AI Bot experts.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-grow bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-2">Discuss Challenges & Suggest the AI Bot(s)</h3>
                    <p className="text-gray-600">We will delve into your specific business challenges & objectives, and pick the best Bot for the job out of our Bot Library.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-grow bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-2">Sign NDAs</h3>
                    <p className="text-gray-600">We prioritize data security & client confidentiality.</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-grow bg-gradient-to-r from-primary/10 to-blue-50 p-6 rounded-xl hover:shadow-md transition-shadow border-2 border-primary/20">
                    <h3 className="text-2xl font-bold mb-2">$0, no change, no risk, no stress Proof Of Concept</h3>
                    <p className="text-gray-600">You don't need specialized headcount on your side. We are not changing / breaking anything in your tech. stack. All the magic happens in the data warehouse. The PoC is quick, effortless, and free of charge!</p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <div className="flex-grow bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-2">5 Minutes - Centralised Data Warehouse is created</h3>
                    <p className="text-gray-600">Your data warehouse is created within 5 Minutes. You decide where your data should be hosted; your cloud or Collation.AI's cloud.</p>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="flex-grow bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-2">1-3 Days - Data starts flowing</h3>
                    <p className="text-gray-600">You give Collation.AI access to your data. Your data starts flowing into your data warehouse within 1-3 business days. We use the best tool for the job; APIs, Bots, web scraping, etc.</p>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-grow bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-2">5-10 Days - Start seeing Insights on your Data</h3>
                    <p className="text-gray-600">Once the Bots have pulled in All of your Data into your data warehouse, you start seeing your first set of insights on your data via online dashboards within 5-10 business days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="py-20 bg-light">
          <div className="container-custom">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-xl text-gray-600 mb-2">Predictable Pricing. Minimal Risk. Maximum Value.</p>
              <ul className="space-y-2 text-gray-600 max-w-2xl">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Flat fee — no surprises.
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Costs less than a quarter of a full-time hire.
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  100% free if it doesn't work.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Audit-Ready Data */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="mb-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Current Balance</span>
                      <span className="font-bold">$ 2,550.67</span>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>Reference Number: 2305035366</div>
                      <div>Exchange Rate: 1.33999 USD/SGD</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Audit-Ready Data</h3>
                <p className="text-gray-600 mb-4">
                  Benefit from accurate and readily auditable data, ensuring compliance and informed decision-making.
                </p>
                <p className="text-gray-600">
                  Helps with <strong>5x faster</strong> client onboarding.
                </p>
              </div>

              {/* Boost Revenue */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="mb-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="text-sm text-gray-600 mb-2">Last 2 months</div>
                    <div className="text-3xl font-bold mb-2">$35,586</div>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>
                      <span>28.65%</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Boost Revenue</h3>
                <p className="text-gray-600 mb-4">
                  With increased efficiency & streamlined processes, you'll have more time to focus on selling.
                </p>
                <p className="text-gray-600">
                  Save on average <strong>15 hours per week</strong> on mundane workload.
                </p>
              </div>

              {/* Total Automation */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="mb-6">
                  <div className="bg-gray-50 p-6 rounded-xl relative">
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white font-bold">AI</span>
                        </div>
                        <div className="text-xs text-gray-500">collation.ai</div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Total Automation</h3>
                <p className="text-gray-600 mb-4">
                  Experience seamless automation across your data processes minimizing manual intervention.
                </p>
                <p className="text-gray-600">
                  Grow client engagement on average <strong>200%</strong> year-over-year.
                </p>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Security */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">Security</h3>
                <p className="text-gray-600 mb-4">
                  Collation.AI meets international information security standards and is SOC2 certified.
                </p>
                <p className="text-gray-600">
                  On average <strong>32%</strong> reduction in infrastructure costs.
                </p>
              </div>

              {/* Scalable Data Handling */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">Scalable Data Handling</h3>
                <p className="text-gray-600 mb-4">
                  No change required on your incumbent tech. stack! Effortlessly manage & process vast amounts of data, accommodating your growing needs.
                </p>
                <p className="text-gray-600">
                  Save on average <strong>2/3</strong> on staff salaries.
                </p>
              </div>

              {/* Instant Insights */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">Instant Insights</h3>
                <p className="text-gray-600 mb-4">
                  Get immediate access to critical information, enabling faster responses to market changes
                </p>
                <p className="text-gray-600">
                  Avoid on average <strong>2 weeks</strong> of unnecessary delays in report preparation and delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="py-20 bg-primary text-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Impact Numbers</h2>
              <p className="text-xl opacity-90">Real results in numbers that speak for themselves</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">$100B+</div>
                <div className="text-lg opacity-90">Assets Under Reporting</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">100+</div>
                <div className="text-lg opacity-90">Active Agentic AI Bots</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">20+</div>
                <div className="text-lg opacity-90">Wealth Manager Clients</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">04</div>
                <div className="text-lg opacity-90">Locations</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
              Over 20+ Clients<br />Used Our Agentic AI Bots
            </h2>

            <div className="max-w-4xl mx-auto relative">
              <div className="bg-gray-50 p-8 md:p-12 rounded-2xl">
                <div className="text-6xl text-primary mb-6">"</div>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  {testimonials[activeTestimonial].quote}
                </p>
                <div className="border-t pt-6">
                  <div className="font-bold text-lg">{testimonials[activeTestimonial].company}</div>
                  <div className="text-gray-500">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setActiveTestimonial(0)}
                  className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === 0 ? 'bg-primary w-8' : 'bg-gray-300'}`}
                ></button>
                <button
                  onClick={() => setActiveTestimonial(1)}
                  className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === 1 ? 'bg-primary w-8' : 'bg-gray-300'}`}
                ></button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-light">
          <div className="container-custom max-w-4xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <details className="bg-white p-6 rounded-xl shadow-sm group">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
                  Does Collation.AI offer Customized Calculations?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
              </details>

              <details className="bg-white p-6 rounded-xl shadow-sm group open">
                <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center mb-4">
                  What is the type of data Collation.AI aggregates?
                  <span className="text-2xl group-open:rotate-45 transition-transform">−</span>
                </summary>
                <div className="text-gray-600 space-y-4 pt-4 border-t">
                  <p>
                    Irrespective of the incumbent systems used (e.g. PMS, CRM, PFM, GL, etc.), there are essentially three types of data Collation.AI aggregates for its clients;
                  </p>
                  <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li>Transactions (e.g. in a portfolio management system)</li>
                    <li>General Ledger (e.g. in an accounting software)</li>
                    <li>Contacts (e.g. in a client relationship management system)</li>
                  </ol>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Implementation Roadmap */}
        <section className="py-20 bg-light">
          <div className="container-custom max-w-5xl">
            <div className="text-center mb-12">
              <div className="inline-block bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6">
                🚀 Implementation Roadmap
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What does an implementation look like?
              </h2>
              <p className="text-xl text-gray-600">
                Quick and comprehensive implementation. Fully functional in days.
              </p>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    📅
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Book a Call</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Schedule a 30-min free consultation with our Agentic AI Bot experts.<br />
                      We will dive into your specific business challenges & objectives, and pick the best Bot for the job out of our Bot Library.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    ✅
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Discuss Challenges & Suggest the AI Bot(s)</h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      <strong>$0, no charge, no risk, no stress Proof Of Concept.</strong>
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      You don't need specialized headcount on your side. We are not charging / breaking anything in your tech stack. All the magic happens in the data warehouse. The PoC is quick, effortless, and free of charge!
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    📊
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">3. 5 Minutes - Centralised Data Warehouse is created</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Your data warehouse is created within 5 Minutes.<br />
                      You decide where your data should be hosted: your cloud or Collation.AI's cloud.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    📈
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">4. 1-3 Days - Data starts flowing</h3>
                    <p className="text-gray-600 leading-relaxed">
                      You give Collation.AI access to your data.<br />
                      Your data starts flowing into your data warehouse within 1-3 business days. We use the best tool for the job: APIs, Bots, web scraping, etc.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start">
                  <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mr-6 flex-shrink-0">
                    💡
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">5. 5-10 Days - Start seeing Insights on your Data</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Once the Bots have pulled in All of your Data into your data warehouse.<br />
                      You start seeing your first set of insights on your data via online dashboards within 5-10 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-20 bg-white">
          <div className="container-custom max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Ready to transform your data management? Let's talk about how our Agentic AI Bots can help your business.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tell us about your data challenges..."
                    ></textarea>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" id="privacy" />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      You agree to our <a href="#" className="text-primary hover:underline">friendly privacy policy</a>.
                    </label>
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  )
}
