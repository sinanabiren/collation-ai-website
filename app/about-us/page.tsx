'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoModal from '@/components/DemoModal'
import Link from 'next/link'
import { useState } from 'react'

export default function AboutUs() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const teamMembers = [
    {
      name: 'Tanmai Sharma',
      role: 'Founder & CEO',
      image: '/team/tanmai.jpg',
      linkedin: '#'
    },
    {
      name: 'Sinan Biren',
      role: 'Chief Revenue Officer',
      image: '/team/sinan.jpg',
      linkedin: '#'
    },
    {
      name: 'Prashant Surana',
      role: 'CTO',
      image: '/team/prashant.jpg',
      linkedin: '#'
    },
    {
      name: 'Shamara Pereira',
      role: 'Head, Implementation',
      image: '/team/shamara.jpg',
      linkedin: '#'
    }
  ]

  return (
    <>
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  We Empower Wealth Managers.
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We are a Product Company! Not a SW development shop for hire. And our Mission is to simplify complex tasks, enhance productivity, & unlock new possibilities for WMs by harnessing the power of Agentic AI Bots.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    {/* Placeholder for office/team image */}
                    <svg className="w-32 h-32 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Finance & Technology Experts */}
        <section className="py-20 bg-white">
          <div className="container-custom max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                  The Finance &<br />Technology Experts
                </h2>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Collation.AI is a Powerful WealthTech that is specialized in reducing operational costs, improving workflow efficiencies, and increasing client retention for wealth managers by Aggregating Financial Data via Bots from their "existing technology stack" and bring it into a "fully accessible" centralized Data Warehouse. Once the Data is in the Warehouse we setup Bot-driven workflows to check, reconcile, fix, enrich that data, so that infinite Analytics can be derived from it via flexible, scalable Reports.
                </p>
                <p>
                  We originated from the WealthTech provider Canopy.Cloud, which reports on over USD 170 billion in assets and is supported by many Family Offices and UBS Bank.
                </p>
                <p>
                  Our CEO /Founder; Tanmai Sharma, is an entrepreneur, finance expert, and technology aficionado. He established Canopy.Cloud and engineered the core analytics platform. Prior to Canopy, he was a MD at Deutsche Bank, with 20 years of trading expertise in prominent international trading floors, focusing on analytics and arbitrage.
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

        {/* Our Team Section */}
        <section className="py-20 bg-light">
          <div className="container-custom">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">Our Team</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="grid grid-cols-2">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 aspect-square flex items-center justify-center">
                      {/* Placeholder for team member photo */}
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-gray-600 mb-6">{member.role}</p>
                      <a
                        href={member.linkedin}
                        className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Data Management?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Let's discuss how our Agentic AI Bots can help streamline your operations and unlock new insights.
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
