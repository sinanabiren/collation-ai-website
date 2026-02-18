import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [],
      },
      // Explicitly allow AI/LLM crawlers
      {
        userAgent: ['GPTBot', 'ChatGPT-User'],
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: [],
      },
    ],
    sitemap: 'https://www.collation.ai/sitemap.xml',
  }
}
