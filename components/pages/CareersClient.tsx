'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { motion } from 'framer-motion'
import { Job } from '@prisma/client'
import { format } from 'date-fns'

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

interface CareersClientProps {
  jobs: Job[]
}

export default function CareersClient({ jobs }: CareersClientProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-6">
              Careers
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Build the future{' '}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                with us
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join a team that's building products that matter. Work on real projects, learn from experienced developers, and grow your career.
            </p>
          </motion.div>
        </Section>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-white">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {jobs.length > 0 
                ? `We're looking for talented people to join our team. ${jobs.length} position${jobs.length !== 1 ? 's' : ''} currently open.`
                : "We're always looking for talented people. Check back soon for new opportunities."
              }
            </p>
          </motion.div>

          {jobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💼</span>
              </div>
              <p className="text-xl text-gray-600 mb-4">No open positions at the moment</p>
              <p className="text-gray-500 mb-8">We're always interested in hearing from talented people. Send us your resume!</p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get in touch
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    href={`/careers/${job.slug}`}
                    className="group block p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-amber-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                            {job.title}
                          </h3>
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                            Open
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                          {job.location && (
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {job.location}
                            </span>
                          )}
                          {job.type && (
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              {job.type}
                            </span>
                          )}
                          {job.createdAt && (
                            <span className="text-gray-500">
                              Posted {format(new Date(job.createdAt), 'MMM d, yyyy')}
                            </span>
                          )}
                        </div>

                        {job.summary && (
                          <p className="text-gray-600 line-clamp-2">
                            {job.summary}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">
                        <span>View details</span>
                        <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </Section>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-amber-50">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Work With Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're building something special, and we want you to be part of it
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🚀', title: 'Real Impact', desc: 'Work on projects that matter and see your code in production' },
              { icon: '📚', title: 'Continuous Learning', desc: 'Learn from experienced developers and stay on the cutting edge' },
              { icon: '🤝', title: 'Great Team', desc: 'Collaborate with talented, passionate people who care about quality' },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-600 to-orange-600">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Don't see a role that fits?
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              We're always interested in hearing from talented people. Send us your resume and let's talk!
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-amber-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get in touch
            </Link>
          </motion.div>
        </Section>
      </section>
    </div>
  )
}

