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
        <SessionProvider>
          {children}
          <Chatbot />
          {/* <Toaster /> */}
        </SessionProvider>
      </body>
    </html>
  )
}
