import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Collation.AI | Data Protection & Privacy Commitment',
  description: 'Learn about Collation.AI\'s commitment to data privacy and protection. Our privacy policy outlines how we collect, use, and safeguard your financial data with enterprise-grade security.',
  openGraph: {
    title: 'Privacy Policy - Collation.AI | Data Protection Commitment',
    description: 'Learn about Collation.AI\'s commitment to data privacy and how we safeguard your financial data with enterprise-grade security.',
    url: 'https://www.collation.ai/privacy-policy',
    siteName: 'Collation.AI',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Collation.AI Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Collation.AI',
    description: 'Learn about our commitment to data privacy and enterprise-grade security.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.collation.ai/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
