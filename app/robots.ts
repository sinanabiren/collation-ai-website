import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [],
      },
      // Explicitly allow ALL AI/LLM crawlers
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
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'anthropic-ai',
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
      {
        userAgent: 'GoogleOther',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'FacebookBot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Omgilibot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Omgili',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'YouBot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'diffbot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'AI2Bot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'iaskspider',
        allow: '/',
        disallow: [],
      },
    ],
    sitemap: 'https://www.collation.ai/sitemap.xml',
  }
}
