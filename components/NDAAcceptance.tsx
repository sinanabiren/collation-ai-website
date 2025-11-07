'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

interface NDAAcceptanceProps {
  onAccepted: () => void;
}

export default function NDAAcceptance({ onAccepted }: NDAAcceptanceProps) {
  const { data: session } = useSession();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const ndaContainerRef = useRef<HTMLDivElement>(null);

  // Pre-fill signature name with user's name from session
  useEffect(() => {
    if (session?.user?.name) {
      setSignatureName(session.user.name);
    }
  }, [session]);

  const handleScroll = () => {
    if (ndaContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = ndaContainerRef.current;
      // Check if scrolled to bottom (with 10px tolerance)
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setHasScrolledToBottom(true);
      }
    }
  };

  const handleAccept = async () => {
    if (!agreed) {
      setError('Please check the agreement box');
      return;
    }

    if (!signatureName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!session?.user?.id) {
      setError('User session not found');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/accept-nda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          signatureName: signatureName.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        onAccepted();
      } else {
        setError(result.error || 'Failed to accept NDA');
      }
    } catch (err) {
      setError('Error submitting NDA acceptance');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-pink-300 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/90 rounded-full mb-4 shadow-lg">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Non-Disclosure Agreement
          </h1>
          <p className="text-lg text-gray-700">
            Please review and electronically sign the NDA to continue
          </p>
        </div>

        {/* NDA Document Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
          {/* Scroll indicator */}
          {!hasScrolledToBottom && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 flex items-center justify-between">
              <span className="text-sm font-medium">Please scroll down to read the entire agreement</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}

          {/* NDA Content */}
          <div
            ref={ndaContainerRef}
            onScroll={handleScroll}
            className="p-8 overflow-y-auto bg-white"
            style={{ maxHeight: '60vh' }}
          >
            <iframe
              src="/nda.html"
              className="w-full border-none"
              style={{ minHeight: '800px' }}
              title="NDA Document"
            />
          </div>

          {/* Signature Section */}
          <div className="bg-gray-50 border-t-2 border-gray-200 p-8">
            <div className="space-y-6">
              {/* Agreement Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={!hasScrolledToBottom || isSubmitting}
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <label
                  htmlFor="agree"
                  className={`text-sm ${!hasScrolledToBottom ? 'text-gray-400' : 'text-gray-700'} select-none`}
                >
                  I have read and agree to the terms and conditions of this Non-Disclosure Agreement. I understand that I am entering into a legally binding agreement.
                </label>
              </div>

              {/* Signature Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Electronic Signature (Full Legal Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="Enter your full legal name"
                  disabled={!hasScrolledToBottom || !agreed || isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed font-cursive text-lg"
                  style={{ fontFamily: "'Brush Script MT', cursive" }}
                />
                <p className="text-xs text-gray-500 mt-2">
                  By typing your name above, you are creating a legally binding electronic signature.
                </p>
              </div>

              {/* Date Display */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-700">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleAccept}
                disabled={!hasScrolledToBottom || !agreed || !signatureName.trim() || isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Accept & Continue
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Your electronic signature is legally binding and equivalent to a handwritten signature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
