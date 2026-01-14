'use client'

import React, { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m here to help you learn about Collation AI. How can I assist you today?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Prepare messages for API (exclude the initial greeting for API context)
      const apiMessages = [...messages.slice(1), userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to get response')
      }

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again or contact us at hello@collation.ai for immediate assistance.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Format message content for better readability
  const formatMessage = (content: string) => {
    // Split by double line breaks for paragraphs, OR single line breaks for better list handling
    const lines = content.split('\n')
    const elements: React.ReactElement[] = []
    let currentGroup: string[] = []
    let currentType: 'numbered' | 'lettered' | 'roman' | 'bullet' | 'paragraph' | null = null
    let groupIndex = 0

    // Helper to detect and render download links
    const renderDownloadLink = (text: string) => {
      // Match patterns like: Download: /downloads/filename.ext or /downloads/filename.ext
      // Matches complete paths including spaces until we hit the file extension
      const downloadPattern = /(?:Download:\s*)?(\/downloads\/[^)\n]+?\.(?:pdf|docx|xlsx|md))/gi
      const parts: (string | React.ReactElement)[] = []
      let lastIndex = 0
      let match

      while ((match = downloadPattern.exec(text)) !== null) {
        // Add text before the link
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index))
        }

        const downloadPath = match[1]
        const filename = downloadPath.split('/').pop() || 'Download'

        // Create download link (Perplexity-style)
        parts.push(
          <a
            key={`download-${match.index}`}
            href={encodeURI(downloadPath)}
            download
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors mx-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="underline decoration-dotted">{filename}</span>
          </a>
        )

        lastIndex = downloadPattern.lastIndex
      }

      // Add remaining text
      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex))
      }

      return parts.length > 0 ? parts : text
    }

    // Helper to format text with bold and links
    const formatText = (text: string) => {
      // First handle download links
      const withLinks = renderDownloadLink(text)

      // If we have JSX elements from links, process each string part for bold
      if (Array.isArray(withLinks)) {
        return withLinks.map((part, i) => {
          if (typeof part === 'string') {
            // Process bold formatting on string parts
            const boldParts = part.split(/(\*\*[^*]+\*\*)/g)
            return boldParts.map((boldPart, j) => {
              if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
                return <strong key={`${i}-${j}`} className="font-semibold">{boldPart.slice(2, -2)}</strong>
              }
              return <span key={`${i}-${j}`}>{boldPart}</span>
            })
          }
          return part
        })
      }

      // Otherwise just handle bold formatting
      const parts = text.split(/(\*\*[^*]+\*\*)/g)
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
        }
        return part
      })
    }

    // Helper to detect line type
    const getLineType = (line: string): 'numbered' | 'lettered' | 'roman' | 'bullet' | 'paragraph' => {
      const trimmed = line.trim()
      if (!trimmed) return 'paragraph'
      if (/^\d+\./.test(trimmed)) return 'numbered'
      if (/^[a-z]\./.test(trimmed)) return 'lettered'
      if (/^(i{1,3}|iv|v|vi{0,3}|ix|x)\./.test(trimmed)) return 'roman'
      if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*')) return 'bullet'
      return 'paragraph'
    }

    // Helper to render a group
    const renderGroup = (type: typeof currentType, items: string[], key: number) => {
      if (type === 'numbered') {
        return [
          <ol key={key} className="list-decimal list-outside space-y-3 my-4 ml-5 text-gray-800">
            {items.map((item, i) => (
              <li key={i} className="leading-7 pl-2">
                {formatText(item.replace(/^\d+\.\s*/, ''))}
              </li>
            ))}
          </ol>
        ]
      }
      if (type === 'lettered') {
        return [
          <ol key={key} className="list-[lower-alpha] list-outside space-y-2 my-3 ml-8 text-gray-800">
            {items.map((item, i) => (
              <li key={i} className="leading-7 pl-2">
                {formatText(item.replace(/^[a-z]\.\s*/, ''))}
              </li>
            ))}
          </ol>
        ]
      }
      if (type === 'roman') {
        return [
          <ol key={key} className="list-[lower-roman] list-outside space-y-2 my-3 ml-10 text-gray-800">
            {items.map((item, i) => (
              <li key={i} className="leading-7 pl-2">
                {formatText(item.replace(/^(i{1,3}|iv|v|vi{0,3}|ix|x)\.\s*/, ''))}
              </li>
            ))}
          </ol>
        ]
      }
      if (type === 'bullet') {
        return [
          <ul key={key} className="list-disc list-outside space-y-3 my-4 ml-5 text-gray-800">
            {items.map((item, i) => (
              <li key={i} className="leading-7 pl-2">
                {formatText(item.replace(/^[-•*]\s*/, ''))}
              </li>
            ))}
          </ul>
        ]
      }
      // Paragraph
      return items.map((item, i) => (
        <p key={`${key}-${i}`} className="leading-7 my-4 text-gray-800">
          {formatText(item)}
        </p>
      ))
    }

    // Process each line
    lines.forEach((line) => {
      const lineType = getLineType(line)
      const trimmed = line.trim()

      // Skip empty lines
      if (!trimmed) {
        // Flush current group if exists
        if (currentGroup.length > 0) {
          elements.push(...renderGroup(currentType, currentGroup, groupIndex++))
          currentGroup = []
          currentType = null
        }
        return
      }

      // If line type matches current group, add to group
      if (lineType === currentType || currentType === null) {
        currentGroup.push(trimmed)
        currentType = lineType
      } else {
        // Different type, flush current group and start new one
        if (currentGroup.length > 0) {
          elements.push(...renderGroup(currentType, currentGroup, groupIndex++))
        }
        currentGroup = [trimmed]
        currentType = lineType
      }
    })

    // Flush any remaining group
    if (currentGroup.length > 0) {
      elements.push(...renderGroup(currentType, currentGroup, groupIndex++))
    }

    return elements
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 transform hover:scale-110 flex items-center gap-2"
          aria-label="Open chat"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="font-semibold">Chat with us</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[480px] h-[700px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Collation AI Assistant</h3>
                <p className="text-xs opacity-90">Powered by Claude</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.role === 'user'
                      ? 'bg-gray-100 text-gray-900 rounded-2xl px-4 py-3'
                      : 'text-gray-800'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="text-[15px] leading-relaxed">{message.content}</p>
                  ) : (
                    <div className="text-[15px] leading-7 space-y-3">
                      {formatMessage(message.content)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-900 border border-gray-200 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-primary hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                aria-label="Send message"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              For urgent issues, email{' '}
              <a href="mailto:hello@collation.ai" className="text-primary hover:underline">
                hello@collation.ai
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
