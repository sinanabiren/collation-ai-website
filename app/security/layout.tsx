import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security & Compliance - Collation.AI | Enterprise-Grade Data Protection',
  description: 'Collation.AI ensures enterprise-grade security with SOC 2 compliance, end-to-end encryption, and robust data protection for financial data aggregation and automation.',
  openGraph: {
    title: 'Security & Compliance - Collation.AI | Enterprise-Grade Protection',
    description: 'Enterprise-grade security with SOC 2 compliance, end-to-end encryption, and robust data protection for financial data aggregation.',
    url: 'https://www.collation.ai/security',
    siteName: 'Collation.AI',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Collation.AI Security',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security & Compliance - Collation.AI',
    description: 'Enterprise-grade security with SOC 2 compliance and end-to-end encryption for financial data aggregation.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.collation.ai/security',
  },
}

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
