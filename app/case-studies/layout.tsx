import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies - Collation.AI | Success Stories in Wealth Management Automation',
  description: 'Discover how wealth managers and RIAs use Collation.AI to automate data workflows, reduce operational costs, and manage $100B+ in assets with AI-powered data aggregation.',
  keywords: [
    'wealth management case studies',
    'RIA automation success stories',
    'financial data automation case studies',
    'family office technology case studies',
    'AI data aggregation success stories',
    'wealth tech client results',
    'portfolio management automation case studies',
    'data reconciliation success stories',
  ],
  openGraph: {
    title: 'Case Studies - Collation.AI | Wealth Management Automation Success Stories',
    description: 'Discover how wealth managers use Collation.AI to automate workflows and manage $100B+ in assets with AI-powered data aggregation.',
    url: 'https://www.collation.ai/case-studies',
    siteName: 'Collation.AI',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Collation.AI Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - Collation.AI',
    description: 'See how wealth managers use Collation.AI to automate workflows and manage $100B+ in assets with AI.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.collation.ai/case-studies',
  },
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
