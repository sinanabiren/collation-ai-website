import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Collation.AI | Your Data Automation Control Center',
  description: 'Access your Collation.AI dashboard to monitor AI bots, manage workflows, view analytics, and control your financial data aggregation operations.',
  openGraph: {
    title: 'Dashboard - Collation.AI | Data Automation Control Center',
    description: 'Monitor AI bots, manage workflows, and control your financial data aggregation operations.',
    url: 'https://www.collation.ai/dashboard',
    siteName: 'Collation.AI',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.collation.ai/dashboard',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
