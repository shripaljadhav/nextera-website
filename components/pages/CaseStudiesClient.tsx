'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { motion } from 'framer-motion'
import { CaseStudy } from '@prisma/client'
import { useState } from 'react'

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

interface CaseStudiesClientProps {
  caseStudies: CaseStudy[]
}

export default function CaseStudiesClient({ caseStudies }: CaseStudiesClientProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All')
  
  // Get unique industries
  const industries = ['All', ...new Set(caseStudies.map(cs => cs.industry).filter(Boolean))] as string[]
  
  // Filter case studies
  const filteredStudies = selectedIndustry === 'All' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === selectedIndustry)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
              Case Studies
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Proof that this works{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                in the real world
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Real projects, real results. See how we've helped businesses achieve their goals.
            </p>
          </motion.div>
        </Section>
      </section>

      {/* Filters */}
      {industries.length > 1 && (
        <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-0 z-30 backdrop-blur-sm bg-opacity-90">
          <Section>
            <div className="flex flex-wrap gap-3 justify-center">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedIndustry === industry
                      ? 'bg-green-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* Case Studies Grid */}
      <section className="py-24 bg-white">
        <Section>
          {filteredStudies.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No case studies found for this filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudies.map((study, idx) => {
                const tags = study.tags ? JSON.parse(study.tags) : []
                return (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="group block h-full p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {study.industry && (
                        <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full mb-4 border border-green-200">
                          {study.industry}
                        </span>
                      )}
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                        {study.title}
                      </h3>
                      
                      {study.client && (
                        <p className="text-sm text-gray-500 mb-4 font-medium">
                          Client: {study.client}
                        </p>
                      )}

                      {study.problem && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-700 mb-1">Challenge:</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{study.problem}</p>
                        </div>
                      )}

                      {study.result && (
                        <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-xs font-semibold text-green-700 mb-1">Result:</p>
                          <p className="text-sm text-green-800 font-medium line-clamp-2">{study.result}</p>
                        </div>
                      )}

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {tags.slice(0, 3).map((tag: string, i: number) => (
                            <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                              {tag}
                            </span>
                          ))}
                          {tags.length > 3 && (
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                              +{tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                        <span>Read case study</span>
                        <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </Section>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-600">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to be our next success story?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Let's discuss how we can help you achieve similar results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-gray-50 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start your project
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 text-center font-semibold"
              >
                View services
              </Link>
            </div>
          </motion.div>
        </Section>
      </section>
    </div>
  )
}

