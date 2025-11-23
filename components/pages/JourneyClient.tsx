'use client'

import Section from '@/components/layout/Section'
import { motion } from 'framer-motion'
import { TimelineEvent } from '@prisma/client'
import { format } from 'date-fns'

interface JourneyClientProps {
  timelineEvents: TimelineEvent[]
}

export default function JourneyClient({ timelineEvents }: JourneyClientProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-rose-50 to-pink-50 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <div className="inline-block px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-semibold mb-6">
              Our Journey
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              The story of{' '}
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Nextera Digital
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              From humble beginnings to building products that matter. Here's our journey so far.
            </p>
          </motion.div>
        </Section>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <Section maxWidth="4xl">
          {timelineEvents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No timeline events yet.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-200 via-pink-200 to-rose-200 transform md:-translate-x-0.5"></div>

              <div className="space-y-12">
                {timelineEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`relative flex items-start ${
                      idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                    {/* Content */}
                    <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 pl-20 md:pl-0' : 'md:pl-12 pl-20 md:pr-0'}`}>
                      <div className="p-8 bg-gradient-to-br from-white to-rose-50 rounded-2xl border-2 border-rose-100 hover:border-rose-300 hover:shadow-xl transition-all duration-300">
                        {event.date && (
                          <div className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded-full mb-4 border border-rose-200">
                            {format(new Date(event.date), 'MMM yyyy')}
                          </div>
                        )}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {event.title}
                        </h3>
                        {event.description && (
                          <p className="text-gray-600 leading-relaxed">
                            {event.description}
                          </p>
                        )}
                        {event.milestone && (
                          <div className="mt-4 p-4 bg-rose-50 rounded-lg border border-rose-200">
                            <p className="text-sm font-semibold text-rose-700 mb-1">Milestone:</p>
                            <p className="text-rose-800">{event.milestone}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </Section>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-rose-600 to-pink-600">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Want to be part of our story?
            </h2>
            <p className="text-xl text-rose-100 mb-8">
              Join us on our journey to build products that matter
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/careers"
                className="px-8 py-4 bg-white text-rose-600 rounded-xl hover:bg-gray-50 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                View careers
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 text-center font-semibold"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </Section>
      </section>
    </div>
  )
}

