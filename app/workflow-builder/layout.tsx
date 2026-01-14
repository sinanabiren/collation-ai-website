import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workflow Builder - Collation.AI | Build Custom Data Automation Workflows',
  description: 'Create custom data automation workflows with Collation.AI\'s visual workflow builder. Automate data aggregation, reconciliation, and reporting tasks with AI-powered tools.',
  openGraph: {
    title: 'Workflow Builder - Collation.AI | Custom Data Automation',
    description: 'Create custom data automation workflows with our visual builder. Automate aggregation, reconciliation, and reporting.',
    url: 'https://www.collation.ai/workflow-builder',
    siteName: 'Collation.AI',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Collation.AI Workflow Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workflow Builder - Collation.AI',
    description: 'Create custom data automation workflows with our visual builder.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.collation.ai/workflow-builder',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function WorkflowBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
