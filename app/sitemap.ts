import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.collation.ai'

  // Blog posts slugs
  const blogPosts = [
    'ai-powered-data-processing-transforms-business',
    'machine-learning-data-quality-validation',
    'implementing-ai-automation-enterprise-guide',
    'nlp-document-processing-analysis',
    'ai-predictive-analytics-insights',
    'scalable-ai-pipelines-real-time-processing',
    'computer-vision-quality-control-manufacturing',
    'ai-security-privacy-best-practices',
    'transfer-learning-ai-model-development',
    'ai-powered-customer-data-platforms',
    'deep-learning-time-series-forecasting',
    'ai-ethics-responsible-development',
  ]

  const blogUrls = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...blogUrls,
  ]
}
