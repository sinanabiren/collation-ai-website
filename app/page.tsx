import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Data with{' '}
                <span className="text-primary">AI-Powered Automation</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Collation AI delivers cutting-edge artificial intelligence and machine learning solutions
                for data processing, automation, and intelligent data management. Streamline your workflows
                and unlock insights with our advanced AI platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contact" className="btn-primary">
                  Get Started Free
                </Link>
                <Link href="/#features" className="btn-secondary">
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful AI-Driven Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive AI platform provides everything you need for intelligent data processing,
                automation, and analytics powered by advanced machine learning algorithms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Automated Data Processing</h3>
                <p className="text-gray-600">
                  Leverage AI-powered automation to process large volumes of data efficiently. Our intelligent
                  algorithms handle data cleaning, transformation, and validation automatically, reducing
                  manual effort by up to 90%.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Intelligent Analytics</h3>
                <p className="text-gray-600">
                  Gain actionable insights with AI-powered analytics and machine learning models. Our platform
                  analyzes patterns, predicts trends, and provides real-time business intelligence to drive
                  data-driven decisions.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
                <p className="text-gray-600">
                  Your data is protected with enterprise-grade security, encryption, and compliance features.
                  We ensure data privacy with SOC 2, GDPR, and HIPAA compliance for peace of mind.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Workflow Automation</h3>
                <p className="text-gray-600">
                  Create custom AI-powered workflows and automation pipelines. Integrate with your existing
                  tools and systems to automate repetitive tasks and accelerate business processes.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Machine Learning Models</h3>
                <p className="text-gray-600">
                  Deploy pre-trained machine learning models or build custom AI models tailored to your
                  specific use cases. Our platform supports deep learning, natural language processing,
                  and computer vision applications.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-Time Processing</h3>
                <p className="text-gray-600">
                  Process and analyze data in real-time with low latency. Our distributed AI infrastructure
                  scales automatically to handle high-volume data streams and deliver instant insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-20 bg-light">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                AI Solutions for Every Industry
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Collation AI powers intelligent data processing and automation across diverse industries,
                helping businesses leverage artificial intelligence for competitive advantage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Solution 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">Financial Services AI</h3>
                <p className="text-gray-600 mb-4">
                  Automate financial data processing, fraud detection, risk assessment, and compliance
                  reporting with AI-powered solutions. Process transactions in real-time, detect anomalies,
                  and ensure regulatory compliance with machine learning algorithms.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Automated fraud detection and prevention
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    AI-powered risk scoring and credit analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Regulatory compliance automation
                  </li>
                </ul>
              </div>

              {/* Solution 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">Healthcare Data Intelligence</h3>
                <p className="text-gray-600 mb-4">
                  Transform healthcare operations with AI-driven patient data management, medical records
                  processing, and predictive analytics. Improve patient outcomes with intelligent automation
                  while maintaining HIPAA compliance.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Medical record digitization and analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Predictive patient care analytics
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    HIPAA-compliant data processing
                  </li>
                </ul>
              </div>

              {/* Solution 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">E-commerce & Retail AI</h3>
                <p className="text-gray-600 mb-4">
                  Optimize inventory management, personalize customer experiences, and automate product
                  recommendations with AI-powered retail solutions. Drive sales with intelligent pricing
                  and demand forecasting.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    AI-powered product recommendations
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Intelligent inventory optimization
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Dynamic pricing and demand forecasting
                  </li>
                </ul>
              </div>

              {/* Solution 4 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">Manufacturing & Supply Chain</h3>
                <p className="text-gray-600 mb-4">
                  Enhance manufacturing efficiency and supply chain visibility with AI-driven predictive
                  maintenance, quality control, and logistics optimization. Reduce downtime and improve
                  operational efficiency.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Predictive maintenance AI systems
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Automated quality control inspection
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Supply chain optimization algorithms
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-primary text-white">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Data with AI?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join leading enterprises using Collation AI to automate data processing,
              unlock insights, and accelerate growth with artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#demo"
                className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200"
              >
                Schedule a Demo
              </Link>
              <Link
                href="/blog"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-3 px-8 rounded-lg transition-all duration-200"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Collation AI
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Collation AI is a leading provider of artificial intelligence and machine learning solutions
                for data processing and automation. Our mission is to empower businesses to harness the
                power of AI for intelligent data management, automated workflows, and actionable insights.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                Founded by experts in AI, machine learning, and data science, we combine cutting-edge
                technology with industry expertise to deliver enterprise-grade AI solutions that scale
                with your business. Our platform processes billions of data points daily, helping
                organizations across industries achieve digital transformation through artificial intelligence.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
