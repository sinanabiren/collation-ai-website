'use client';

import { signOut } from 'next-auth/react';
import dynamic from 'next/dynamic';

const LovableStyleBuilder = dynamic(() => import('@/components/ui-builder/LovableStyleBuilder'), { ssr: false });

interface DashboardClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    trialActive: boolean;
    daysRemaining: number;
  };
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  // If trial is active, show the UI builder
  if (user.trialActive) {
    return (
      <div className="min-h-screen">
        {/* Trial Banner - Centered at top to avoid blocking workspace buttons */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-4 py-2 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {user.daysRemaining > 0
                  ? `${user.daysRemaining} ${user.daysRemaining === 1 ? 'day' : 'days'} left`
                  : 'Last day!'}
              </span>
              <button className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full hover:from-purple-700 hover:to-blue-700 transition">
                Upgrade
              </button>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* UI Builder */}
        <LovableStyleBuilder />
      </div>
    );
  }

  // Trial expired view
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Collation AI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user.name}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trial Expired Banner */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Your trial has expired. Upgrade to continue using Collation AI.
            </p>
            <button className="text-sm font-semibold bg-white text-red-600 px-4 py-1 rounded-full hover:bg-gray-100 transition">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Trial Expired
          </h2>
          <p className="text-gray-600 mb-6">
            Your 7-day trial has ended. Upgrade your account to continue building with Collation AI.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition">
            View Pricing Plans
          </button>
        </div>
      </div>
    </div>
  );
}
