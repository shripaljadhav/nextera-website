'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Section from '@/components/layout/Section'

interface Product {
  id: string
  name: string
  slug: string
  category: string
  description: string | null
  tagline: string | null
  logo: string | null
  featuredImage: string | null
  status: string
  isFeatured: boolean
  websiteUrl: string | null
  demoUrl: string | null
}

interface ProductsClientProps {
  products: Product[]
  productsByCategory: {
    'Mobile Application': Product[]
    'SaaS': Product[]
    'Website': Product[]
  }
}

const categoryColors: Record<string, string> = {
  'Mobile Application': 'from-blue-600 to-cyan-600',
  'SaaS': 'from-green-600 to-emerald-600',
  'Website': 'from-purple-600 to-pink-600',
}

const categoryIcons: Record<string, string> = {
  'Mobile Application': '📱',
  'SaaS': '☁️',
  'Website': '🌐',
}

export default function ProductsClient({ products, productsByCategory }: ProductsClientProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-600 py-20 lg:py-32 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        <Section className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Our Products
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Building innovative solutions across mobile apps, SaaS platforms, and web experiences
            </p>
          </motion.div>
        </Section>
      </section>

      {/* Featured Products */}
      {products.filter(p => p.isFeatured).length > 0 && (
        <section className="py-20 bg-gray-50">
          <Section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our flagship products that are making a difference
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter(p => p.isFeatured)
                .map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Link href={`/products/${product.slug}`}>
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
                        {product.featuredImage ? (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={product.featuredImage}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-600 rounded-full text-xs font-semibold">
                                {product.status}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className={`h-48 bg-gradient-to-br ${categoryColors[product.category] || 'from-gray-400 to-gray-600'} flex items-center justify-center`}>
                            <span className="text-6xl">{categoryIcons[product.category] || '📦'}</span>
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                {product.name}
                              </h3>
                              {product.tagline && (
                                <p className="text-sm text-primary-600 font-medium mb-2">
                                  {product.tagline}
                                </p>
                              )}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryColors[product.category] || 'from-gray-400 to-gray-600'} text-white`}>
                              {product.category}
                            </span>
                          </div>
                          {product.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                              {product.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-primary-600 font-semibold text-sm group-hover:underline">
                              View Product →
                            </span>
                            {product.status === 'BETA' && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                Beta
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </Section>
        </section>
      )}

      {/* Products by Category */}
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => {
        if (categoryProducts.length === 0) return null

        return (
          <section key={category} className={`py-20 ${category === 'Mobile Application' ? 'bg-white' : category === 'SaaS' ? 'bg-gray-50' : 'bg-white'}`}>
            <Section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className="inline-block mb-4">
                  <span className="text-4xl">{categoryIcons[category]}</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{category}</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {category === 'Mobile Application' && 'Native and cross-platform mobile applications'}
                  {category === 'SaaS' && 'Software as a Service platforms'}
                  {category === 'Website' && 'Web applications and websites'}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Link href={`/products/${product.slug}`}>
                      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 h-full flex flex-col">
                        {product.logo ? (
                          <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center h-32">
                            <img
                              src={product.logo}
                              alt={product.name}
                              className="max-h-16 max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className={`h-32 bg-gradient-to-br ${categoryColors[category] || 'from-gray-400 to-gray-600'} flex items-center justify-center`}>
                            <span className="text-5xl">{categoryIcons[category]}</span>
                          </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors flex-1">
                              {product.name}
                            </h3>
                            {product.status === 'BETA' && (
                              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                Beta
                              </span>
                            )}
                          </div>
                          {product.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                              {product.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-primary-600 font-semibold text-sm group-hover:underline">
                              Learn More →
                            </span>
                            {product.demoUrl && (
                              <span className="text-xs text-gray-500">Demo Available</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </Section>
          </section>
        )
      })}

      {/* Empty State */}
      {products.length === 0 && (
        <section className="py-20">
          <Section>
            <div className="text-center py-16">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-6">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">No Products Yet</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Products will appear here once they're added and published.
              </p>
            </div>
          </Section>
        </section>
      )}
    </div>
  )
}

