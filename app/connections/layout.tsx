import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integrations & Connections - Collation.AI | 10,000+ Data Source Connections',
  description: 'Connect to 10,000+ data sources with Collation.AI. Seamless integrations with custodians, portfolio management systems, accounting platforms, and financial data providers for wealth management.',
  keywords: [
    'financial data integrations',
    'wealth management integrations',
    'custodian connections',
    'portfolio management integrations',
    'accounting system integrations',
    'data source connections',
    'API integrations',
    'financial data providers',
    'broker integrations',
    'banking integrations',
    'wealth tech integrations',
  ],
  openGraph: {
    title: 'Integrations & Connections - Collation.AI | 10,000+ Data Sources',
    description: 'Connect to 10,000+ data sources including custodians, portfolio management systems, accounting platforms, and financial data providers.',
    url: 'https://www.collation.ai/connections',
    siteName: 'Collation.AI',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Collation.AI Integrations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integrations & Connections - Collation.AI',
    description: 'Connect to 10,000+ data sources including custodians, portfolio management systems, and financial data providers.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.collation.ai/connections',
  },
}

export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
