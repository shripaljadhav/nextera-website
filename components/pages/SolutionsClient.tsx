'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { motion } from 'framer-motion'
import { Solution } from '@prisma/client'

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

interface SolutionsClientProps {
  liveProducts: Solution[]
  kits: Solution[]
  labs: Solution[]
}

export default function SolutionsClient({ liveProducts, kits, labs }: SolutionsClientProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'BETA':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'DEVELOPMENT':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeGradient = (type: string, idx: number) => {
    if (type === 'PRODUCT') {
      const gradients = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-green-500 to-emerald-500']
      return gradients[idx % gradients.length]
    }
    if (type === 'KIT') {
      return 'from-orange-500 to-red-500'
    }
    return 'from-indigo-500 to-purple-500'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
              Our Solutions
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Products & solution kits{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                battle-tested from real projects
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Real-world solutions built from actual client projects, ready to accelerate your business.
            </p>
          </motion.div>
        </Section>
      </section>

      {/* Live Products */}
      {liveProducts.length > 0 && (
        <section className="py-24 bg-white">
          <Section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Live Products</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Production-ready solutions powering real businesses
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    href={`/solutions/${product.slug}`}
                    className="group block h-full p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${getTypeGradient('PRODUCT', idx)} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl">🚀</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block px-3 py-1 border rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">{product.category || 'Product'}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {product.tagline || product.description}
                    </p>

                    <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                      <span>Explore solution</span>
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* Solution Kits */}
      {kits.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50">
          <Section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Solution Kits</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                White-label solutions ready to customize and deploy
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kits.map((kit, idx) => (
                <motion.div
                  key={kit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    href={`/solutions/${kit.slug}`}
                    className="group block h-full p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">📦</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block px-3 py-1 border rounded-full text-xs font-semibold ${getStatusColor(kit.status)}`}>
                        {kit.status}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">Kit</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {kit.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {kit.tagline || kit.description}
                    </p>

                    <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                      <span>View kit</span>
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* Labs */}
      {labs.length > 0 && (
        <section className="py-24 bg-white">
          <Section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Drogenide Labs</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Legacy tools and experimental projects
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {labs.map((lab, idx) => (
                <motion.div
                  key={lab.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    href={`/solutions/${lab.slug}`}
                    className="group block h-full p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">🧪</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block px-3 py-1 border rounded-full text-xs font-semibold ${getStatusColor(lab.status)}`}>
                        {lab.status}
                      </span>
                      <span className="text-xs text-indigo-600 font-medium">Lab</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {lab.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {lab.tagline || lab.description}
                    </p>

                    <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors">
                      <span>Explore lab</span>
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Need a custom solution?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              We can build a solution tailored to your specific needs
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get in touch
            </Link>
          </motion.div>
        </Section>
      </section>
    </div>
  )
}

