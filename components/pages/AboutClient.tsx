'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { motion } from 'framer-motion'

interface AboutClientProps {
  stats: {
    years: number
    projects: number
    products: number
    industries: number
  }
}

export default function AboutClient({ stats }: AboutClientProps) {
  const statsArray = [
    { value: `${stats.years}+`, label: 'Years active (including Drogenide)', icon: '📅' },
    { value: `${stats.projects}+`, label: 'Projects', icon: '🚀' },
    { value: `${stats.products}+`, label: 'Products', icon: '💡' },
    { value: `${stats.industries}+`, label: 'Industries served', icon: '🏢' },
  ]

  const principles = [
    { title: 'Outcome-first, not feature-first', desc: 'We focus on what moves the needle for your business.', icon: '🎯' },
    { title: 'Build to scale', desc: 'Every system is designed to grow with you.', icon: '📈' },
    { title: 'Transparent process', desc: 'You always know what\'s happening and why.', icon: '🔍' },
    { title: 'Long-term partnership', desc: 'We\'re here for the journey, not just the launch.', icon: '🤝' },
  ]

  const values = [
    { title: 'Community', desc: 'Supporting local businesses and institutions', icon: '🌍' },
    { title: 'Teaching', desc: 'Sharing knowledge through workshops and training', icon: '📚' },
    { title: 'Experimentation', desc: 'Always exploring new technologies and approaches', icon: '🧪' },
    { title: 'Relationships', desc: 'Building lasting partnerships with our clients', icon: '💼' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-6">
              About Us
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              The studio behind{' '}
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Nextera Digital
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Building modern software that moves businesses forward.
            </p>
          </motion.div>
        </Section>
      </section>

      {/* Mission & Philosophy */}
      <section className="py-24 bg-white">
        <Section maxWidth="3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Mission & Philosophy</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Nextera Digital was born from years of experience building software, teaching teams, 
                and experimenting with new technologies. We believe that great software should solve 
                real problems and create lasting value.
              </p>
              <p>
                Our approach combines technical excellence with business understanding. We don't just 
                write code—we build systems that help businesses grow, scale, and succeed.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {principles.map((principle, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 bg-gradient-to-br from-white to-teal-50 rounded-2xl border-2 border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{principle.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                <p className="text-gray-600">{principle.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-teal-50">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Nextera in Numbers</h2>
            <p className="text-xl text-gray-600">
              The impact we've made together
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsArray.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-teal-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-5xl font-bold text-teal-600 mb-3">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* Built on Drogenide */}
      <section className="py-24 bg-white">
        <Section maxWidth="3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Built on the shoulders of Drogenide</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Nextera Digital represents the evolution of Drogenide—from scripts and fixes to 
              comprehensive digital solutions. Our journey from small projects to multi-product 
              platforms has shaped how we approach every challenge.
            </p>
            <Link
              href="/journey"
              className="inline-flex items-center space-x-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
            >
              <span>Read the full journey</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </Section>
      </section>

      {/* What We Care About */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-teal-50">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What We Care About</h2>
            <p className="text-xl text-gray-600">
              The values that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-teal-600 to-cyan-600">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to work together?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Let's discuss how we can help bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-teal-600 rounded-xl hover:bg-gray-50 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get in touch
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

