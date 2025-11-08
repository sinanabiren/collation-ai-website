import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI & Data Processing Blog | Collation AI',
  description: 'Explore the latest insights on artificial intelligence, machine learning, data processing automation, and AI-powered analytics. Learn best practices for implementing AI solutions in your business.',
  keywords: [
    'AI blog',
    'machine learning insights',
    'data processing tips',
    'AI automation guides',
    'artificial intelligence trends',
    'enterprise AI',
    'data science blog',
    'AI implementation',
    'machine learning tutorials',
    'AI best practices'
  ],
}

// This would typically come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: 'How AI-Powered Data Processing Transforms Business Operations',
    excerpt: 'Discover how artificial intelligence and machine learning are revolutionizing data processing, enabling businesses to automate workflows, reduce manual effort, and unlock valuable insights from their data.',
    date: '2024-01-15',
    category: 'AI Automation',
    slug: 'ai-powered-data-processing-transforms-business',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'Machine Learning for Automated Data Quality and Validation',
    excerpt: 'Learn how machine learning algorithms can automatically detect data quality issues, validate information accuracy, and ensure data integrity across your enterprise systems without manual intervention.',
    date: '2024-01-10',
    category: 'Machine Learning',
    slug: 'machine-learning-data-quality-validation',
    readTime: '10 min read',
  },
  {
    id: 3,
    title: 'Implementing AI Automation: A Complete Guide for Enterprises',
    excerpt: 'A comprehensive guide to implementing AI-powered automation in enterprise environments. Explore strategies for workflow automation, process optimization, and achieving ROI with artificial intelligence.',
    date: '2024-01-05',
    category: 'Enterprise AI',
    slug: 'implementing-ai-automation-enterprise-guide',
    readTime: '12 min read',
  },
  {
    id: 4,
    title: 'Natural Language Processing for Document Processing and Analysis',
    excerpt: 'Explore how NLP and AI technologies enable automated document processing, information extraction, and intelligent analysis of unstructured text data at scale.',
    date: '2023-12-28',
    category: 'NLP',
    slug: 'nlp-document-processing-analysis',
    readTime: '9 min read',
  },
  {
    id: 5,
    title: 'AI-Driven Predictive Analytics: From Data to Insights',
    excerpt: 'Understand how AI and machine learning enable predictive analytics, helping businesses forecast trends, identify patterns, and make data-driven decisions with confidence.',
    date: '2023-12-20',
    category: 'Analytics',
    slug: 'ai-predictive-analytics-insights',
    readTime: '11 min read',
  },
  {
    id: 6,
    title: 'Building Scalable AI Pipelines for Real-Time Data Processing',
    excerpt: 'Technical deep-dive into architecting scalable AI pipelines that process streaming data in real-time, with best practices for performance, reliability, and cost optimization.',
    date: '2023-12-15',
    category: 'Infrastructure',
    slug: 'scalable-ai-pipelines-real-time-processing',
    readTime: '15 min read',
  },
  {
    id: 7,
    title: 'Computer Vision AI for Automated Quality Control in Manufacturing',
    excerpt: 'Discover how computer vision and deep learning enable automated quality inspection, defect detection, and manufacturing process optimization using AI-powered visual analysis.',
    date: '2023-12-10',
    category: 'Computer Vision',
    slug: 'computer-vision-quality-control-manufacturing',
    readTime: '10 min read',
  },
  {
    id: 8,
    title: 'AI Security and Privacy: Best Practices for Enterprise AI Systems',
    excerpt: 'Essential security and privacy considerations for implementing AI systems in enterprise environments, including data protection, model security, and compliance requirements.',
    date: '2023-12-05',
    category: 'Security',
    slug: 'ai-security-privacy-best-practices',
    readTime: '13 min read',
  },
  {
    id: 9,
    title: 'Transfer Learning: Accelerating AI Model Development',
    excerpt: 'Learn how transfer learning enables faster AI model development by leveraging pre-trained neural networks, reducing training time and data requirements for custom AI applications.',
    date: '2023-11-28',
    category: 'Machine Learning',
    slug: 'transfer-learning-ai-model-development',
    readTime: '9 min read',
  },
  {
    id: 10,
    title: 'AI-Powered Customer Data Platforms: Unifying Customer Intelligence',
    excerpt: 'Explore how AI enhances customer data platforms by unifying customer data, enabling personalization, and delivering actionable insights for marketing and customer experience.',
    date: '2023-11-20',
    category: 'Customer Intelligence',
    slug: 'ai-powered-customer-data-platforms',
    readTime: '11 min read',
  },
  {
    id: 11,
    title: 'Deep Learning for Time Series Forecasting and Anomaly Detection',
    excerpt: 'Advanced techniques for using deep learning models to forecast time series data and detect anomalies in real-time, with applications in finance, IoT, and operations.',
    date: '2023-11-15',
    category: 'Deep Learning',
    slug: 'deep-learning-time-series-forecasting',
    readTime: '14 min read',
  },
  {
    id: 12,
    title: 'AI Ethics and Responsible AI Development in Enterprise',
    excerpt: 'Understanding the ethical implications of AI systems and implementing responsible AI practices, including fairness, transparency, accountability, and bias mitigation.',
    date: '2023-11-10',
    category: 'AI Ethics',
    slug: 'ai-ethics-responsible-development',
    readTime: '12 min read',
  },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* Blog Header */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                AI & Data Processing Insights
              </h1>
              <p className="text-xl text-gray-600">
                Expert insights on artificial intelligence, machine learning, data automation,
                and AI-powered solutions for modern enterprises.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-white" id="bloglisting">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <time className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary hover:text-blue-700 font-semibold text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-light">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-8">Explore by Category</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'AI Automation',
                'Machine Learning',
                'Enterprise AI',
                'NLP',
                'Analytics',
                'Computer Vision',
                'Deep Learning',
                'AI Ethics',
                'Security',
                'Infrastructure',
              ].map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${category.toLowerCase().replace(' ', '-')}`}
                  className="px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-primary hover:text-primary transition-colors font-medium"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO-Rich Content Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold mb-6">
                Your Resource for AI and Machine Learning Knowledge
              </h2>
              <p className="text-gray-600 mb-4">
                The Collation AI blog is your comprehensive resource for learning about artificial intelligence,
                machine learning, and data processing automation. Our expert team shares practical insights,
                technical tutorials, and industry best practices to help you successfully implement AI solutions
                in your organization.
              </p>
              <p className="text-gray-600 mb-4">
                Whether you're exploring AI-powered data processing, implementing machine learning models,
                building automated workflows, or optimizing your data infrastructure, our blog provides
                actionable guidance and real-world examples to accelerate your AI journey.
              </p>
              <h3 className="text-2xl font-bold mt-8 mb-4">Topics We Cover</h3>
              <ul className="space-y-2 text-gray-600">
                <li><strong>AI Automation:</strong> Strategies for automating business processes with artificial intelligence</li>
                <li><strong>Machine Learning:</strong> Building and deploying ML models for data analysis and prediction</li>
                <li><strong>Data Processing:</strong> Techniques for efficient data transformation and validation</li>
                <li><strong>Natural Language Processing:</strong> Extracting insights from text and documents</li>
                <li><strong>Computer Vision:</strong> Visual recognition and image analysis applications</li>
                <li><strong>Predictive Analytics:</strong> Forecasting trends and identifying patterns with AI</li>
                <li><strong>Enterprise AI:</strong> Implementing AI at scale in large organizations</li>
                <li><strong>AI Security:</strong> Protecting AI systems and ensuring data privacy</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
