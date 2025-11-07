'use client'

import Link from 'next/link'
import { useState } from 'react'
import DemoModal from './DemoModal'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            Collation AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/security" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Security
            </Link>
            <Link href="/case-studies" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Case Studies
            </Link>
            <Link href="/blogs" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Blogs
            </Link>
            <Link href="/about-us" className="text-gray-700 hover:text-primary transition-colors font-medium">
              About Us
            </Link>
            <button onClick={() => setIsDemoModalOpen(true)} className="btn-primary text-sm px-6 py-2.5">
              Request a Demo
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/security"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Security
              </Link>
              <Link
                href="/case-studies"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>
              <Link
                href="/blogs"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/about-us"
                className="text-gray-700 hover:text-primary transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setIsDemoModalOpen(true)
                }}
                className="btn-primary text-center"
              >
                Request a Demo
              </button>
            </div>
          </div>
        )}
      </div>
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </nav>
  )
}
