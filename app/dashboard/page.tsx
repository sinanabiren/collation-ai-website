'use client';

import dynamic from 'next/dynamic';

const LovableStyleBuilder = dynamic(() => import('@/components/ui-builder/LovableStyleBuilder'), { ssr: false });

export default function DashboardPage() {
  return <LovableStyleBuilder />;
}
