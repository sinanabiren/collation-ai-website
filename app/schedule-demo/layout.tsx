import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule a Demo - Collation.AI | See AI Data Automation in Action',
  description: 'Schedule a personalized demo of Collation.AI and discover how AI-powered data aggregation can cut costs, streamline operations, and transform your wealth management workflows.',
  openGraph: {
    title: 'Schedule a Demo - Collation.AI | See AI Data Automation in Action',
    description: 'Schedule a demo and discover how AI-powered data aggregation can cut costs and transform your wealth management workflows.',
    url: 'https://www.collation.ai/schedule-demo',
    siteName: 'Collation.AI',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Schedule Collation.AI Demo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schedule a Demo - Collation.AI',
    description: 'Schedule a demo and see how AI-powered data aggregation can transform your workflows.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.collation.ai/schedule-demo',
  },
}

export default function ScheduleDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
