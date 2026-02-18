import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solution - AI Infrastructure for Wealth Management | Collation.AI',
  description: 'Collation.AI creates AI native infrastructure for wealth managers, enabling AI-powered analytics, reporting, workflows, and business efficiency. Trusted by 25+ wealth managers managing $100B+ assets.',
  keywords: [
    'AI infrastructure for wealth management',
    'wealth management technology solution',
    'AI native infrastructure',
    'financial data automation platform',
    'RIA technology solution',
    'family office technology',
    'data warehouse for wealth managers',
    'AI bots for financial data',
    'automated financial reporting',
    'compliance-friendly AI',
    'wealth management AI platform',
  ],
  openGraph: {
    title: 'AI Infrastructure Solution for Wealth Management',
    description: 'AI native infrastructure that enables wealth managers to use AI for analytics, reporting, workflows, and business efficiency. $100B+ assets under reporting.',
    type: 'website',
    url: 'https://www.collation.ai/company-overview',
  },
  alternates: {
    canonical: 'https://www.collation.ai/company-overview',
  },
}

export default function CompanyOverviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
