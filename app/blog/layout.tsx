import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Collation.AI | Insights on AI, Data Automation & Wealth Management',
  description: 'Read the latest insights from Collation.AI on AI-powered data automation, wealth management technology, financial data aggregation, and industry best practices.',
  openGraph: {
    title: 'Blog - Collation.AI | AI & Data Automation Insights',
    description: 'Latest insights on AI-powered data automation, wealth management technology, and financial data aggregation best practices.',
    url: 'https://www.collation.ai/blog',
    siteName: 'Collation.AI',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Collation.AI Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Collation.AI',
    description: 'Latest insights on AI-powered data automation and wealth management technology.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.collation.ai/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
