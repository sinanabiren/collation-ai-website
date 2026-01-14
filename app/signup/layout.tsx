import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up - Collation.AI | Start Your Free Trial',
  description: 'Create your Collation.AI account and start transforming your wealth management operations with AI-powered data aggregation. Start your free trial today.',
  openGraph: {
    title: 'Sign Up - Collation.AI | Start Your Free Trial',
    description: 'Create your account and start transforming operations with AI-powered data aggregation. Free trial available.',
    url: 'https://www.collation.ai/signup',
    siteName: 'Collation.AI',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.collation.ai/signup',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
