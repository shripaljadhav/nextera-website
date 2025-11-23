import { Metadata } from 'next'
import { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
  title?: string
  description?: string
}

export function generateMetadata({ title, description }: { title?: string; description?: string }): Metadata {
  return {
    title: title ? `${title} | Nextera Digital` : 'Nextera Digital',
    description: description || 'We build modern software that actually moves your business forward.',
  }
}

export default function PageShell({ children, title, description }: PageShellProps) {
  return (
    <div className="min-h-screen">
      {title && (
        <div className="bg-gray-50 border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="mt-4 text-xl text-gray-600">{description}</p>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

