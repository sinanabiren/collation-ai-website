'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function DemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Add padding to prevent layout shift from scrollbar removal
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div className="relative w-full max-w-7xl h-[90vh] my-auto" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:scale-110 transition-all z-10 border-2 border-gray-200"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="bg-white rounded-3xl shadow-2xl h-full overflow-hidden border-4 border-gray-100 flex flex-col">
          <iframe
            src="https://link-gather-flow.lovable.app/free-trial"
            className="w-full h-full border-0"
            title="Request a Demo - Start Your 7-Day Free Trial"
            allow="fullscreen; geolocation; microphone; camera"
            loading="eager"
          />
        </div>
      </div>
    </div>,
    document.body
  )
}
