'use client';

interface DatabaseChoiceProps {
  onHaveDatabase: () => void;
  onNeedDatabase: () => void;
}

export default function DatabaseChoice({ onHaveDatabase, onNeedDatabase }: DatabaseChoiceProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Connect Your Data
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose how you'd like to get started
          </p>
        </div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Option 1: I Have a Database - PRIMARY */}
          <button
            onClick={onHaveDatabase}
            className="group relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-10 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-left overflow-hidden"
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-white mb-3">
                Connect Existing Database
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                PostgreSQL, MySQL, or any SQL database
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-white/90">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Instant connection</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Your infrastructure stays secure</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-lg">Connect Now</span>
                <svg className="w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </button>

          {/* Option 2: Create Database - SECONDARY */}
          <button
            onClick={onNeedDatabase}
            className="group relative bg-white border-2 border-gray-200 rounded-lg p-10 hover:border-gray-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-left"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Create New Database
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Start fresh with a free PostgreSQL database
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Upload Excel or CSV files</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Quick setup for testing</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold text-lg group-hover:text-gray-900 transition-colors">Get Started</span>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
