'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function VibecodeDemo() {
  const [selectedDashboard, setSelectedDashboard] = useState<number | null>(null)

  const handleViewDashboard = (url: string) => {
    window.open(url, '_blank')
  }

  const handleEditInLovable = () => {
    window.open('https://lovable.dev', '_blank')
  }

  const handleCreateWithAI = () => {
    window.open('https://lovable.dev', '_blank')
  }

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Prompt copied to clipboard!')
  }

  const dashboards = [
    {
      title: 'Profit TWR Charts',
      description: 'Time-weighted return analysis with comprehensive profit calculations',
      image: 'dark',
      dashboardUrl: 'https://link-gather-flow.lovable.app/profit-twr-dashboard',
      metrics: [
        { label: 'Total Profit', value: '+60.3%' },
        { label: 'Total Return', value: '$300,000' },
        { label: 'Annual ROI', value: '+28.4%' },
        { label: 'Best Quarter', value: '+115.2(M)' }
      ]
    },
    {
      title: 'Explainer Dashboard',
      description: 'Interactive dashboard explaining all financial calculations and metrics',
      image: 'light',
      dashboardUrl: 'https://link-gather-flow.lovable.app/explainer-dashboard',
      metrics: [
        { label: 'Portfolio Value', value: '$1,250,000' },
        { label: 'Total Return', value: '12.5%' },
        { label: 'Risk Level', value: 'Moderate' },
        { label: 'Holdings', value: '47' }
      ]
    },
    {
      title: 'Asset Allocation Report',
      description: 'Current portfolio allocation by asset class with performance tracking',
      image: 'pie',
      dashboardUrl: 'https://link-gather-flow.lovable.app/explainer-dashboard',
      metrics: [
        { label: 'Equities', value: '60%' },
        { label: 'Fixed Income', value: '25%' },
        { label: 'Alternatives', value: '10%' },
        { label: 'Cash', value: '5%' }
      ]
    },
    {
      title: 'Performance Analytics',
      description: 'Deep dive into portfolio performance metrics and benchmark comparisons',
      image: 'chart',
      dashboardUrl: 'https://link-gather-flow.lovable.app/profit-twr-dashboard',
      metrics: [
        { label: 'YTD Return', value: '+18.7%' },
        { label: 'vs Benchmark', value: '+4.3%' },
        { label: 'Sharpe Ratio', value: '1.8' },
        { label: 'Max Drawdown', value: '-8.2%' }
      ]
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
              <div className="inline-block bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6">
                🎨 Vibecode Reporting Demo
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Investment Reporting
              </h1>
              <div className="inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
                25% Complete - In Progress
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Generate your first automated investment reports and performance analytics
              </p>
            </div>
          </div>
        </section>

        {/* Tasks to Complete */}
        <section className="py-16 bg-white">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Tasks to Complete:</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">ABOR to IBOR Conversion</h3>
                  <p className="text-gray-600">Convert accounting book of records to investment book format</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white border-2 border-gray-200 rounded-xl">
                <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  ⊙
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Calculations</h3>
                  <p className="text-gray-600">Calculate portfolio performance metrics and returns</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white border-2 border-gray-200 rounded-xl">
                <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  ⊙
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Report Templates</h3>
                  <p className="text-gray-600">Create customized reporting templates for stakeholders</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white border-2 border-gray-200 rounded-xl">
                <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  ⊙
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Automated Scheduling</h3>
                  <p className="text-gray-600">Set up automated report generation and delivery</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Create Custom Dashboard CTA */}
        <section className="py-16 bg-light">
          <div className="container-custom max-w-4xl">
            <div className="bg-white p-8 md:p-12 rounded-2xl border-2 border-gray-200">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                  🎯
                </div>
                <div className="flex-grow">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Create Custom Dashboard</h2>
                  <p className="text-xl text-gray-600 mb-6">
                    Build a personalized financial dashboard using AI - no coding required
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">AI-Powered</span>
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">No Code</span>
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Custom</span>
                  </div>
                  <button onClick={handleCreateWithAI} className="btn-primary inline-flex items-center gap-2">
                    <span>Create with AI</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Gallery */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">
                    🔧 My Lovable Dashboards
                  </h2>
                  <p className="text-gray-600">Your published Lovable.dev projects</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => window.open('https://lovable.dev', '_blank')} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                    <span>+ Import URL from Lovable</span>
                  </button>
                  <button onClick={() => window.location.reload()} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    🔄 Refresh
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {dashboards.map((dashboard, index) => (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Dashboard Preview */}
                    <div className={`h-64 relative ${
                      dashboard.image === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' :
                      dashboard.image === 'light' ? 'bg-gradient-to-br from-blue-50 to-white' :
                      dashboard.image === 'pie' ? 'bg-gradient-to-br from-green-50 to-blue-50' :
                      'bg-gradient-to-br from-purple-50 to-pink-50'
                    } p-6`}>
                      {/* Simulated Dashboard Content */}
                      <div className="grid grid-cols-2 gap-4 h-full">
                        {dashboard.metrics.map((metric, i) => (
                          <div key={i} className={`${
                            dashboard.image === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'
                          } backdrop-blur-sm rounded-lg p-4 flex flex-col justify-center`}>
                            <div className={`text-sm ${dashboard.image === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                              {metric.label}
                            </div>
                            <div className={`text-2xl font-bold ${dashboard.image === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {metric.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dashboard Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{dashboard.title}</h3>
                      <p className="text-gray-600 mb-4">{dashboard.description}</p>
                      <div className="text-sm text-gray-500 mb-6">
                        Created: 2024-01-08<br />
                        Last Updated: 2024-09-23
                      </div>

                      <div className="space-y-3">
                        <button onClick={() => handleViewDashboard(dashboard.dashboardUrl)} className="btn-primary w-full inline-flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>View Dashboard</span>
                        </button>

                        <button
                          onClick={() => setSelectedDashboard(selectedDashboard === index ? null : index)}
                          className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                        >
                          {selectedDashboard === index ? '∧' : '∨'} Prompt Text for Lovable
                        </button>

                        {selectedDashboard === index && (
                          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-600 mb-3">
                              Copy and paste this prompt into Lovable after clicking "Edit in Lovable"
                            </p>
                            <div className="bg-white p-4 rounded border border-gray-200 text-sm font-mono text-gray-800">
                              Create a comprehensive financial dashboard called "{dashboard.title}".
                              <br /><br />
                              DASHBOARD OVERVIEW:<br />
                              {dashboard.description}
                              <br /><br />
                              KEY FEATURES TO INCLUDE:<br />
                              {dashboard.metrics.map(m => `- ${m.label}: Display ${m.value}`).join('\n')}
                            </div>
                            <button
                              onClick={() => handleCopyPrompt(`Create a comprehensive financial dashboard called "${dashboard.title}".\n\nDASHBOARD OVERVIEW:\n${dashboard.description}\n\nKEY FEATURES TO INCLUDE:\n${dashboard.metrics.map(m => `- ${m.label}: Display ${m.value}`).join('\n')}`)}
                              className="mt-3 text-primary hover:underline text-sm font-medium"
                            >
                              📋 Copy
                            </button>
                          </div>
                        )}

                        <button onClick={handleEditInLovable} className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium inline-flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Edit in Lovable</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Build from Templates */}
        <section className="py-16 bg-light">
          <div className="container-custom max-w-4xl text-center">
            <button onClick={handleCreateWithAI} className="text-xl text-gray-700 font-semibold hover:text-primary transition-colors inline-flex items-center gap-2">
              <span>Build Report from Templates</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
