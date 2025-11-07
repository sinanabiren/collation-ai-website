'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoModal from '@/components/DemoModal'
import Link from 'next/link'
import { useState } from 'react'

export default function CaseStudies() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const caseStudies = [
    {
      title: 'RIA in California Automates Data Workflows',
      industry: 'Wealth Management',
      challenge: 'Manual data workflows causing 15+ hours of work per week',
      solution: 'Automated data audit workflows across Portfolio Management Software, CRM, and Alternative Investments',
      results: [
        '90% reduction in manual data processing time',
        '5x faster client onboarding',
        '200% increase in client engagement'
      ],
      quote: 'We were struggling badly with our manual workflows until we brought in Collation.AI. They have automated all of our data audit workflows across our Portfolio Management Software, CRM System, Alternative Investments Data Handling Vendor.',
      company: 'A RIA in California - USA',
      role: 'CTO'
    },
    {
      title: 'Single Family Office Gains Data Control',
      industry: 'Family Office',
      challenge: 'Lack of centralized data warehouse and admin access to all systems',
      solution: 'Built centralized data warehouse with full admin access and automated data pulls from General Ledger',
      results: [
        'Full control over all data',
        'Automated daily data synchronization',
        '32% reduction in infrastructure costs'
      ],
      quote: 'We hired Collation.AI to systemically pull down our data from our General Ledger System and house it in our own centralized data warehouse where we have Full Admin access at All Times! We love it',
      company: 'A Single Family Office in Chicago - USA',
      role: 'Controller'
    }
  ]

  return (
    <>
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Success Stories
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                See how wealth managers are transforming their operations with Collation.AI's Agentic AI Bots.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            {caseStudies.map((study, index) => (
              <div key={index} className={`mb-20 ${index !== caseStudies.length - 1 ? 'pb-20 border-b border-gray-200' : ''}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Content */}
                  <div>
                    <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      {study.industry}
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                      {study.title}
                    </h2>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">The Challenge</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">The Solution</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Results</h3>
                      <ul className="space-y-3">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-6 h-6 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gradient-to-br from-primary to-blue-700 p-8 md:p-12 rounded-2xl text-white lg:sticky lg:top-24">
                    <div className="text-6xl mb-6">"</div>
                    <p className="text-xl leading-relaxed mb-8">
                      {study.quote}
                    </p>
                    <div className="border-t border-white/20 pt-6">
                      <div className="font-bold text-lg">{study.company}</div>
                      <div className="opacity-90">{study.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Results Across All Clients</h2>
              <p className="text-xl opacity-90">Real impact across 20+ wealth management firms</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">$100B+</div>
                <div className="text-lg opacity-90">Assets Under Reporting</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">15hrs</div>
                <div className="text-lg opacity-90">Average Time Saved/Week</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">5x</div>
                <div className="text-lg opacity-90">Faster Client Onboarding</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">200%</div>
                <div className="text-lg opacity-90">Client Engagement Growth</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join 20+ wealth managers who have automated their data workflows with Collation.AI.
            </p>
            <button onClick={() => setIsDemoModalOpen(true)} className="btn-primary inline-block text-lg">
              Request a Demo
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  )
}
