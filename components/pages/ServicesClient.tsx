'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { motion } from 'framer-motion'
import { Service } from '@prisma/client'

// Icon components
const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const CodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const iconComponents: Record<string, any> = {
  rocket: RocketIcon,
  sparkles: SparklesIcon,
  code: CodeIcon,
  chart: ChartIcon,
}

interface ServicesClientProps {
  services: (Service & { gradient: string; href: string })[]
}

export default function ServicesClient({ services }: ServicesClientProps) {
  const bundles = [
    { 
      name: 'MVP in 90 Days', 
      for: 'Early-stage startups', 
      includes: 'Full-stack MVP, design, deployment',
      icon: '🚀',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Ongoing Product Partner', 
      for: 'Growing companies', 
      includes: 'Continuous development, support, scaling',
      icon: '🤝',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Modernize & Maintain', 
      for: 'Established businesses', 
      includes: 'Legacy upgrade, maintenance, optimization',
      icon: '⚡',
      color: 'from-green-500 to-emerald-500'
    },
  ]

  const faqs = [
    { q: 'Do you work with early-stage startups?', a: 'Yes, we specialize in helping startups move from idea to MVP quickly. Our MVP in 90 Days package is designed specifically for early-stage companies looking to validate their product in the market.' },
    { q: 'Do you only take full projects or also fixes?', a: 'We handle both full projects and smaller fixes or improvements. Whether you need a complete product build or just a specific feature, we can help.' },
    { q: 'How do you price?', a: 'Pricing depends on project scope, timeline, and engagement model. We offer flexible pricing options including fixed-price projects, time-based billing, and ongoing retainer agreements. Contact us for a custom quote tailored to your needs.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              Our Services
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              One team for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                product, AI, apps, and growth
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              From concept to scale, we build the software that powers your business forward.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href="#services"
                className="inline-flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                <span>Explore our services</span>
                <ArrowRightIcon className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </Section>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-white">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive services to take your product from idea to market leader
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            let outcomes: string[] = []
            if (service.outcomes) {
              try {
                const parsed = JSON.parse(service.outcomes)
                if (Array.isArray(parsed)) {
                  outcomes = parsed.map((item) => String(item))
                }
              } catch {
                outcomes = []
              }
            }
              const IconComponent = iconComponents[service.icon || 'rocket'] || RocketIcon
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    href={service.href}
                    className="group block h-full p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full">
                        {service.category || 'Service'}
                      </span>
                      {service.isFeatured && (
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {service.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {service.description}
                    </p>

                    {outcomes.length > 0 && (
                      <div className="space-y-2 mb-6">
                        {outcomes.slice(0, 3).map((outcome: string, i: number) => (
                          <div key={i} className="flex items-start text-sm text-gray-700">
                            <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                      <span>Learn more</span>
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </Section>
      </section>

      {/* Engagement Models */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Engagement Models</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible engagement options to match your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {bundles.map((bundle, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${bundle.color} rounded-xl flex items-center justify-center mb-6 text-3xl`}>
                  {bundle.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{bundle.name}</h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">For:</p>
                    <p className="text-gray-600">{bundle.for}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Includes:</p>
                    <p className="text-gray-600">{bundle.includes}</p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  <span>Get started</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <Section maxWidth="3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about working with us
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                  <span className="text-primary-600 mr-3">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed ml-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-600">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to build something amazing?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how we can help bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get in touch
              </Link>
              <Link
                href="/case-studies"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 text-center font-semibold"
              >
                View case studies
              </Link>
            </div>
          </motion.div>
        </Section>
      </section>
    </div>
  )
}

