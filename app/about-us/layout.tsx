import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Collation.AI | AI-Powered Financial Data Automation Team',
  description: 'Meet the Collation.AI team transforming wealth management with AI-powered data aggregation and automation. $100B+ in assets under reporting across 20+ clients.',
  keywords: [
    'Collation.AI team',
    'wealth management technology company',
    'AI data automation company',
    'financial technology startup',
    'wealth tech company',
    'AI-powered fintech',
    'data aggregation platform',
    'financial services technology',
  ],
  openGraph: {
    title: 'About Us - Collation.AI | AI-Powered Financial Data Automation',
    description: 'Meet the Collation.AI team transforming wealth management with AI-powered data aggregation and automation. $100B+ in assets under reporting.',
    url: 'https://www.collation.ai/about-us',
    siteName: 'Collation.AI',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Collation.AI Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Collation.AI',
    description: 'Meet the team transforming wealth management with AI-powered data automation. $100B+ in assets under reporting.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.collation.ai/about-us',
  },
}

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
