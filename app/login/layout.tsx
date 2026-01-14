import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Collation.AI | Access Your Account',
  description: 'Log in to your Collation.AI account to access AI-powered data aggregation, workflow automation, and financial data management tools.',
  openGraph: {
    title: 'Login - Collation.AI | Access Your Account',
    description: 'Log in to access AI-powered data aggregation and workflow automation tools.',
    url: 'https://www.collation.ai/login',
    siteName: 'Collation.AI',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.collation.ai/login',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
