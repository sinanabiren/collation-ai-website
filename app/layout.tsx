import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Inter_Tight } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import Chatbot from '@/components/Chatbot'
// import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Collation.AI - AI-Powered Financial Data Aggregation & Automation for Wealth Management',
  description: 'Cut costs and streamline operations with Collation.AI\'s AI-powered data aggregation platform. Trusted by 20+ wealth managers managing $100B+ in assets under reporting.',
  keywords: [
    'AI data aggregation',
    'financial data automation',
    'wealth management technology',
    'RIA data management',
    'AI bots',
    'data reconciliation',
    'workflow automation',
    'portfolio management automation',
    'financial reporting',
    'data warehouse'
  ],
  authors: [{ name: 'Collation.AI' }],
  creator: 'Collation.AI',
  publisher: 'Collation.AI',
  metadataBase: new URL('https://www.collation.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.collation.ai',
    siteName: 'Collation.AI',
    title: 'Collation.AI - AI-Powered Financial Data Aggregation for Wealth Management',
    description: 'Cut costs and streamline operations by letting AI bots pull all your financial data from your existing systems into one fully accessible data warehouse.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Collation.AI Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collation.AI - AI-Powered Financial Data Aggregation',
    description: 'Cut costs and streamline operations with AI-powered data aggregation for wealth management.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.collation.ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Collation AI',
              alternateName: 'Collation.AI',
              url: 'https://www.collation.ai',
              logo: 'https://www.collation.ai/logo.png',
              description: 'AI native infrastructure for wealth managers - data aggregation, automation, and AI-powered analytics platform',
              foundingDate: '2023',
              sameAs: [
                'https://www.linkedin.com/company/collation-ai',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@collation.ai',
                contactType: 'Customer Support',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Collation.AI Platform',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              description: 'AI native infrastructure that creates data warehouses, deploys AI bots for data ingestion, performs automated reconciliation, and enables compliant AI coding with guardrails for wealth management firms.',
              featureList: [
                'AI-powered data aggregation from any source (APIs, PDFs, SFTPs)',
                'Customer-hosted data warehouse on Azure/AWS',
                'Automated data reconciliation and cleansing',
                'Unified data model across business',
                'Compliant AI coding with guardrails and access controls',
                'AI bots for workflow automation',
                'Financial reporting and analytics',
              ],
              audience: {
                '@type': 'Audience',
                audienceType: 'Wealth Managers, RIAs, Family Offices, Banks, FinTechs',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is Collation.AI?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Collation.AI creates AI native infrastructure for wealth managers, enabling AI-powered analytics, reporting, workflows, and business efficiency. We service Single and Multi Family Offices, RIAs, and Enterprises like Banks and FinTechs.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What does AI native infrastructure include?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Our infrastructure includes customer-hosted data warehouses, AI bots for data ingestion from any source (APIs, SFTPs, PDFs, websites), automated data reconciliation and cleansing, unified data models, and compliant AI coding with guardrails for secure access.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Who uses Collation.AI?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We serve 25+ wealth management clients including Single and Multi Family Offices, RIAs, and Enterprises such as Banks and FinTechs, managing over $100 billion in assets under reporting with 100+ active AI bots.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How is Collation.AI deployed?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Collation.AI can be deployed as an overlay on your existing tech stack/SaaS or as a standalone solution. The data warehouse is hosted in your own Azure or AWS account with full admin-level access.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What makes Collation.AI different from other wealth management technology vendors?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Collation.AI provides true AI-native infrastructure with compliance guardrails, allowing wealth managers to use AI tools like Claude Code securely. We offer customer-hosted data warehouses, automated data ingestion from any source, and built-in compliance controls that prevent PII leaks and enforce role-based access.',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <SessionProvider>
          {children}
          <Chatbot />
          {/* <Toaster /> */}
        </SessionProvider>
      </body>
    </html>
  )
}
