'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import { useState } from 'react'

interface ProductDetailClientProps {
  product: {
    id: string
    name: string
    slug: string
    category: string
    description: string | null
    content: string | null
    tagline: string | null
    techStack: string[]
    screenshots: string[]
    pricing: any
    changelog: any[]
    versions: any[]
    features: string[]
    status: string
    websiteUrl: string | null
    demoUrl: string | null
    githubUrl: string | null
    documentationUrl: string | null
    logo: string | null
    featuredImage: string | null
  }
  relatedProducts: any[]
}

const categoryColors: Record<string, string> = {
  'Mobile Application': 'bg-blue-600',
  'SaaS': 'bg-green-600',
  'Website': 'bg-purple-600',
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'features' | 'pricing' | 'screenshots' | 'changelog' | 'versions'>('overview')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'screenshots', label: 'Screenshots' },
    { id: 'changelog', label: 'Changelog' },
    { id: 'versions', label: 'Versions' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Product Header */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200 py-8">
        <Section>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link href="/products" className="hover:text-primary-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                {product.logo && (
                  <img src={product.logo} alt={product.name} className="h-16 w-16 object-contain" />
                )}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  {product.tagline && (
                    <p className="text-xl text-gray-600">{product.tagline}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${categoryColors[product.category] || 'bg-gray-600'}`}>
                  {product.category}
                </span>
                {product.status === 'BETA' && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                    Beta
                  </span>
                )}
                {product.status === 'LIVE' && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    Live
                  </span>
                )}
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Main Content Area - Two Column Layout */}
      <Section className="py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Product Visual */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg">
              {product.featuredImage ? (
                <div className="relative rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={product.featuredImage}
                    alt={product.name}
                    className="w-full h-auto"
                  />
                  {product.status === 'BETA' && (
                    <div className="absolute top-4 right-4 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow-lg">
                      Beta Version
                    </div>
                  )}
                </div>
              ) : (
                <div className={`h-96 ${categoryColors[product.category] || 'bg-gray-600'} rounded-xl flex items-center justify-center`}>
                  <span className="text-9xl">📦</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Live Preview</span>
                </a>
              )}
              {product.screenshots && product.screenshots.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedTab('screenshots')
                    document.getElementById('screenshots-section')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Screenshots ({product.screenshots.length})</span>
                </button>
              )}
              {product.githubUrl && (
                <a
                  href={product.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span>View on GitHub</span>
                </a>
              )}
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-1 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                      selectedTab === tab.id
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div id="screenshots-section">
              {/* Overview Tab */}
              {selectedTab === 'overview' && (
                <div className="space-y-6">
                  {product.description && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                      <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
                    </div>
                  )}

                  {product.content && (
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.content }}
                    />
                  )}

                  {product.techStack && product.techStack.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Tech Stack</h2>
                      <div className="flex flex-wrap gap-3">
                        {product.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Features Tab */}
              {selectedTab === 'features' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
                  {product.features && product.features.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center mt-0.5">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-gray-700 font-medium">{feature}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No features listed yet.</p>
                  )}
                </div>
              )}

              {/* Pricing Tab */}
              {selectedTab === 'pricing' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing</h2>
                  {product.pricing && Object.keys(product.pricing).length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(product.pricing).map(([tier, details]: [string, any], idx) => (
                        <motion.div
                          key={tier}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-600 transition-colors"
                        >
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 capitalize">{tier}</h3>
                          <div className="mb-6">
                            <span className="text-4xl font-bold text-gray-900">
                              ${details.price || 0}
                            </span>
                            {details.billing && (
                              <span className="text-gray-600 ml-2">/{details.billing}</span>
                            )}
                          </div>
                          {details.features && Array.isArray(details.features) && (
                            <ul className="space-y-3 mb-6">
                              {details.features.map((feature: string, fIdx: number) => (
                                <li key={fIdx} className="flex items-start space-x-2">
                                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {product.websiteUrl && (
                            <a
                              href={product.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full text-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                            >
                              Get Started
                            </a>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">Pricing information coming soon.</p>
                  )}
                </div>
              )}

              {/* Screenshots Tab */}
              {selectedTab === 'screenshots' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Screenshots</h2>
                  {product.screenshots && product.screenshots.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {product.screenshots.map((screenshot, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                          onClick={() => setSelectedImage(screenshot)}
                        >
                          <img
                            src={screenshot}
                            alt={`${product.name} screenshot ${idx + 1}`}
                            className="w-full h-auto"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                            <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No screenshots available.</p>
                  )}
                </div>
              )}

              {/* Changelog Tab */}
              {selectedTab === 'changelog' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Changelog</h2>
                  {product.changelog && product.changelog.length > 0 ? (
                    <div className="space-y-4">
                      {product.changelog.map((entry: any, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="border-l-4 border-primary-600 pl-6 py-4 bg-gray-50 rounded-r-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-900">{entry.date}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              entry.type === 'added' ? 'bg-green-100 text-green-800' :
                              entry.type === 'fixed' ? 'bg-blue-100 text-blue-800' :
                              entry.type === 'changed' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {entry.type || 'update'}
                            </span>
                          </div>
                          <p className="text-gray-700">{entry.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No changelog entries yet.</p>
                  )}
                </div>
              )}

              {/* Versions Tab */}
              {selectedTab === 'versions' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Version History</h2>
                  {product.versions && product.versions.length > 0 ? (
                    <div className="space-y-4">
                      {product.versions.map((version: any, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">v{version.version}</h3>
                            {version.date && (
                              <span className="text-sm text-gray-600">{version.date}</span>
                            )}
                          </div>
                          {version.changes && Array.isArray(version.changes) && (
                            <ul className="space-y-2">
                              {version.changes.map((change: string, cIdx: number) => (
                                <li key={cIdx} className="flex items-start space-x-2 text-gray-700">
                                  <span className="text-primary-600 mt-1">•</span>
                                  <span>{change}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No version history available.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Sticky (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Pricing Card */}
              {product.pricing && Object.keys(product.pricing).length > 0 && (
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing</h3>
                  {Object.entries(product.pricing).slice(0, 1).map(([tier, details]: [string, any]) => (
                    <div key={tier} className="mb-4">
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900">
                          ${details.price || 0}
                        </span>
                        {details.billing && (
                          <span className="text-gray-600 ml-2">/{details.billing}</span>
                        )}
                      </div>
                      {product.websiteUrl && (
                        <a
                          href={product.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold mb-3"
                        >
                          Get Started
                        </a>
                      )}
                      {product.demoUrl && (
                        <a
                          href={product.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
                        >
                          Try Demo
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Info Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Product Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Category</span>
                    <p className="font-semibold text-gray-900">{product.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Status</span>
                    <p className="font-semibold text-gray-900">{product.status}</p>
                  </div>
                  {product.techStack && product.techStack.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-600">Tech Stack</span>
                      <p className="font-semibold text-gray-900">{product.techStack.length} technologies</p>
                    </div>
                  )}
                  {product.screenshots && product.screenshots.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-600">Screenshots</span>
                      <p className="font-semibold text-gray-900">{product.screenshots.length} images</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Links Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Links</h3>
                <div className="space-y-2">
                  {product.websiteUrl && (
                    <a
                      href={product.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Website</span>
                    </a>
                  )}
                  {product.demoUrl && (
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Live Demo</span>
                    </a>
                  )}
                  {product.githubUrl && (
                    <a
                      href={product.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}
                  {product.documentationUrl && (
                    <a
                      href={product.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>Documentation</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Screenshot"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <Section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Related Products</h2>
              <p className="text-xl text-gray-600">Explore more {product.category.toLowerCase()} products</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((related, idx) => (
                <Link key={related.id} href={`/products/${related.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {related.logo ? (
                      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center h-32">
                        <img src={related.logo} alt={related.name} className="max-h-16 max-w-full object-contain" />
                      </div>
                    ) : (
                      <div className={`h-32 bg-gradient-to-br ${categoryColors[related.category] || 'from-gray-400 to-gray-600'}`} />
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {related.name}
                      </h3>
                      {related.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {related.description}
                        </p>
                      )}
                      <span className="text-primary-600 font-semibold text-sm group-hover:underline">
                        View Product →
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </Section>
        </section>
      )}
    </div>
  )
}
