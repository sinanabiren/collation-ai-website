import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Started - Collation.AI | Begin Your AI Data Automation Journey',
  description: 'Start transforming your wealth management operations with Collation.AI. Cut costs and streamline operations with AI-powered financial data aggregation. Get started today.',
  openGraph: {
    title: 'Get Started - Collation.AI | Begin Your AI Automation Journey',
    description: 'Transform your operations with AI-powered financial data aggregation. Cut costs and streamline workflows. Get started today.',
    url: 'https://www.collation.ai/get-started',
    siteName: 'Collation.AI',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Get Started with Collation.AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Started - Collation.AI',
    description: 'Transform your operations with AI-powered data aggregation. Get started today.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.collation.ai/get-started',
  },
}

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
