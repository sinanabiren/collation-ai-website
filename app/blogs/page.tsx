'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Blogs() {
  const blogPosts = [
    {
      slug: 'disruption-of-traditional-saas-models-in-wealth-management',
      title: 'Disruption Of Traditional SaaS Models In Wealth Management.. Should We Blame Agentic AI?',
      author: 'Sinan Biren',
      date: 'Oct 23, 2025',
      image: '/blog/saas-disruption.jpg',
      excerpt: 'Agentic AI is transforming the wealth management industry by enabling advisors and firms to build custom tools and user interfaces on demand...'
    },
    {
      slug: 'embrace-family-office-future-multigenerational-wealth-ai-rpa',
      title: 'Embrace the Family Office of the Future: Multigenerational Wealth Meets AI & RPA',
      author: 'Sinan Biren',
      date: 'Oct 20, 2024',
      image: '/blog/family-office.jpg',
      excerpt: 'AI and RPA are revolutionizing family offices by automating complex workflows and enabling better wealth management...'
    },
    {
      slug: 'true-cost-data-silos-financial-firms-integrated-ai',
      title: 'The True Cost of Data Silos: Why Financial Firms Need Integrated AI Solutions',
      author: 'Sinan Biren',
      date: 'Jan 20, 2025',
      image: '/blog/data-silos.jpg',
      excerpt: 'Data silos are costing financial firms millions in lost productivity and opportunities...'
    },
    {
      slug: 'manual-to-magical-agentic-ai-transforming-wealth-management',
      title: 'From Manual to Magical: How Agentic AI is Transforming Wealth Management Data Operations',
      author: 'Sinan Biren',
      date: 'Jan 20, 2025',
      image: '/blog/manual-to-magical.jpg',
      excerpt: 'Discover how Agentic AI is revolutionizing wealth management operations by automating manual processes...'
    },
    {
      slug: 'sage-intacct-announces-integration-collation-ai',
      title: 'Sage Intacct announces new integration with Collation.AI',
      author: 'Sinan Biren',
      date: 'Mar 28, 2025',
      image: '/blog/sage-announcement.jpg',
      excerpt: 'Exciting partnership announcement between Sage Intacct and Collation.AI...'
    }
  ]

  return (
    <>
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="container-custom">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Insights & Updates
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Stay up to date with the latest trends in AI, wealth management, and data automation.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Link
                  key={index}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Featured Image */}
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-gray-100 relative overflow-hidden">
                    {/* Placeholder for blog image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-sm text-primary font-medium mb-3">
                      {post.author} • {post.date}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-primary font-medium">
                      <span>Read More</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Get In Touch Section */}
        <section id="contact" className="py-20 bg-light">
          <div className="container-custom max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Our friendly team would love to hear from you.
                </p>

                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="flex gap-4 mb-6 border-b pb-4">
                    <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium">
                      Inquiry Form
                    </button>
                    <button className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium">
                      Book a Call
                    </button>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Ex. John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Ex. Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="you@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Tell us about your needs..."
                      ></textarea>
                    </div>

                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-2" id="privacy-blog" />
                      <label htmlFor="privacy-blog" className="text-sm text-gray-600">
                        You agree to our <a href="#" className="text-primary hover:underline">friendly privacy policy</a>.
                      </label>
                    </div>

                    <button type="submit" className="btn-primary w-full">
                      Submit
                    </button>
                  </form>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gray-200 rounded-2xl overflow-hidden aspect-square">
                  {/* Placeholder for contact image */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <svg className="w-32 h-32 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                    </svg>
                  </div>
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
