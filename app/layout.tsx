import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Chatbot from '@/components/Chatbot'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Collation AI - AI-Powered Data Processing & Automation Platform',
  description: 'Collation AI provides cutting-edge AI-powered data processing, automation, and intelligent data management solutions. Transform your data workflows with advanced machine learning and artificial intelligence.',
  keywords: [
    'AI data processing',
    'artificial intelligence',
    'machine learning',
    'data automation',
    'intelligent data management',
    'AI platform',
    'data processing automation',
    'enterprise AI solutions',
    'AI-powered analytics',
    'automated data workflows'
  ],
  authors: [{ name: 'Collation AI' }],
  creator: 'Collation AI',
  publisher: 'Collation AI',
  metadataBase: new URL('https://www.collation.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.collation.ai',
    siteName: 'Collation AI',
    title: 'Collation AI - AI-Powered Data Processing & Automation',
    description: 'Transform your data workflows with advanced AI-powered processing and automation solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Collation AI Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collation AI - AI-Powered Data Processing',
    description: 'Transform your data workflows with advanced AI-powered processing and automation solutions.',
    images: ['/og-image.png'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Collation AI',
              url: 'https://www.collation.ai',
              logo: 'https://www.collation.ai/logo.png',
              description: 'AI-powered data processing and automation platform',
              sameAs: [
                // Add social media URLs here
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  )
}
