import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Collation.AI | Get in Touch for AI Data Automation Solutions',
  description: 'Contact Collation.AI to learn how our AI-powered data aggregation platform can transform your wealth management operations. Schedule a demo or reach out to our team today.',
  openGraph: {
    title: 'Contact Us - Collation.AI | AI Data Automation Solutions',
    description: 'Contact Collation.AI to learn how our AI-powered data aggregation can transform your wealth management operations. Schedule a demo today.',
    url: 'https://www.collation.ai/contact-us',
    siteName: 'Collation.AI',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact Collation.AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Collation.AI',
    description: 'Contact Collation.AI to learn how our AI-powered data aggregation can transform your operations. Schedule a demo today.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.collation.ai/contact-us',
  },
}

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
