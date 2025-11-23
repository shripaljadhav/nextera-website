'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { motion } from 'framer-motion'
import { LabItem } from '@prisma/client'

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

interface LabsClientProps {
  labItems: LabItem[]
}

export default function LabsClient({ labItems }: LabsClientProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'EXPERIMENTAL':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const gradients = [
    'from-violet-500 to-purple-500',
    'from-cyan-500 to-blue-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-rose-500',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <div className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold mb-6">
              Labs
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Experimental{' '}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                projects & tools
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Where we experiment, build, and explore new ideas. Some succeed, some fail, all teach us something.
            </p>
          </motion.div>
        </Section>
      </section>

      {/* Lab Items Grid */}
      <section className="py-24 bg-white">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Lab Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {labItems.length > 0 
                ? `Exploring ${labItems.length} project${labItems.length !== 1 ? 's' : ''} in our lab`
                : "Our lab is where innovation happens. Check back soon for new experiments!"
              }
            </p>
          </motion.div>

          {labItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🧪</span>
              </div>
              <p className="text-xl text-gray-600 mb-4">No lab projects yet</p>
              <p className="text-gray-500">We're always experimenting. New projects coming soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {labItems.map((item, idx) => {
                const gradient = gradients[idx % gradients.length]
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div className="group h-full p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-violet-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-3xl`}>
                        🧪
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-block px-3 py-1 border rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        {item.category && (
                          <span className="text-xs text-gray-500 font-medium">{item.category}</span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors">
                        {item.name}
                      </h3>
                      
                      {item.description && (
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {item.description}
                        </p>
                      )}

                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-violet-600 font-semibold group-hover:text-violet-700 transition-colors"
                        >
                          <span>Explore project</span>
                          <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </Section>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-violet-600 to-purple-600">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Have an idea for a lab project?
            </h2>
            <p className="text-xl text-violet-100 mb-8">
              We're always open to exploring new ideas and technologies
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-violet-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Share your idea
            </Link>
          </motion.div>
        </Section>
      </section>
    </div>
  )
}

