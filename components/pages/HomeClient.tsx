'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { motion } from 'framer-motion'
import { Service, Solution, CaseStudy, BlogPost, TimelineEvent } from '@prisma/client'

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

const iconComponents: Record<string, any> = {
  rocket: RocketIcon,
  sparkles: SparklesIcon,
  code: CodeIcon,
  chart: ChartIcon,
}

interface HomeClientProps {
  services: (Service & { gradient: string; href: string })[]
  solutions: { name: string; tag: string; href: string; color: string }[]
  caseStudies: CaseStudy[]
  blogPosts: BlogPost[]
  timelineEvents: TimelineEvent[]
  homepageSettings?: Record<string, any>
}

export default function HomeClient({ services, solutions, caseStudies, blogPosts, timelineEvents, homepageSettings = {} }: HomeClientProps) {
  // Use settings from database or fallback to defaults
  const heroTitle = homepageSettings.homepage_hero_title || 'We build modern software that actually moves your business'
  const heroSubtitle = homepageSettings.homepage_hero_subtitle || 'forward.'
  const heroDescription = homepageSettings.homepage_hero_description || 'SaaS, AI automation, mobile apps, and web experiences that scale with your vision.'
  const heroPrimaryButtonText = homepageSettings.homepage_hero_primary_button_text || 'Book a strategy call'
  const heroPrimaryButtonLink = homepageSettings.homepage_hero_primary_button_link || '/contact'
  const heroSecondaryButtonText = homepageSettings.homepage_hero_secondary_button_text || 'View case studies'
  const heroSecondaryButtonLink = homepageSettings.homepage_hero_secondary_button_link || '/case-studies'
  
  const processSteps = homepageSettings.homepage_process_steps || [
    { title: 'Discover', desc: 'Understand your goals', output: 'Roadmap', icon: '🔍' },
    { title: 'Design', desc: 'Create user experiences', output: 'Clickable prototype', icon: '🎨' },
    { title: 'Build', desc: 'Develop with modern tech', output: 'Production-ready system', icon: '⚡' },
    { title: 'Grow', desc: 'Iterate and scale', output: 'Ongoing optimization', icon: '📈' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Section H1 - Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <Section>
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                Nextera Digital
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {heroTitle}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {heroSubtitle}
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={heroPrimaryButtonLink}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {heroPrimaryButtonText}
                </Link>
                <Link
                  href={heroSecondaryButtonLink}
                  className="group px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 text-center font-semibold shadow-md hover:shadow-lg"
                >
                  {heroSecondaryButtonText}
                  <ArrowRightIcon className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Powered by experiences from Drogenide → Nextera
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 rounded-3xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-4">Nextera</div>
                    <div className="text-white/80 text-lg">Next Era of Digital</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </section>

      {/* Section H2 - What We Do */}
      <section className="py-24 bg-white">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What We Do
              <span className="block text-blue-600 mt-2">At a Glance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
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
                    className="group block p-8 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </Section>
      </section>

      {/* Section H3 - For Whom We Build */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">For Whom We Build</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored solutions for businesses at every stage
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Startups', problem: 'Need to move fast', solution: 'MVP in 90 days', example: 'SaaS platforms', icon: '🚀' },
              { title: 'Agencies', problem: 'Client delivery pressure', solution: 'Reliable tech partner', example: 'White-label solutions', icon: '🤝' },
              { title: 'SMEs', problem: 'Legacy systems holding back', solution: 'Modernization & growth', example: 'Digital transformation', icon: '🏢' },
              { title: 'Communities', problem: 'Manual processes', solution: 'Automated systems', example: 'School apps, Temple SaaS', icon: '👥' },
            ].map((audience, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{audience.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{audience.title}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Problem</p>
                    <p className="text-sm text-gray-700">{audience.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Solution</p>
                    <p className="text-sm text-gray-700">{audience.solution}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-blue-600 font-semibold">{audience.example}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* Section H4 - Signature Experiences */}
      <section className="py-24 bg-white">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Signature Experiences</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Battle-tested products built by Nextera
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href={product.href}
                  className="group block relative p-8 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${product.color} opacity-10 rounded-full blur-3xl`}></div>
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold rounded-full mb-6 relative z-10">
                    Nextera Product
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3 relative z-10 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6 relative z-10">{product.tag}</p>
                  <div className="flex items-center text-blue-600 font-semibold relative z-10 group-hover:gap-2 transition-all">
                    View solution
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* Section H5 - Case Study Strip */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <Section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Case Studies</h2>
              <p className="text-xl text-blue-100">Proof that this works in the real world</p>
            </div>
            <Link 
              href="/case-studies" 
              className="mt-6 md:mt-0 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
            >
              View all
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, idx) => {
              const results = study.results ? JSON.parse(study.results) : []
              const mainResult = results[0] || { metric: study.result || 'Success', label: 'Improvement' }
              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-sm text-blue-200 mb-2">{study.client || 'Client'}</div>
                  <h3 className="text-lg font-semibold mb-3">{study.title}</h3>
                  <p className="text-sm text-blue-100 mb-3">Problem: {study.problem}</p>
                  <p className="text-lg font-bold text-cyan-200">Result: {mainResult.metric} {mainResult.label}</p>
                </motion.div>
              )
            })}
          </div>
        </Section>
      </section>

      {/* Section H6 - Journey Teaser */}
      <section className="py-24 bg-white">
        <Section>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-12 lg:p-16 text-white overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">From Drogenide to Nextera</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {timelineEvents.map((event, idx) => (
                  <div key={event.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-4xl font-bold mb-3 text-cyan-200">{event.year}</div>
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    <p className="text-blue-100">{event.description}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/journey"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Read the journey
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* Section H7 - How We Work */}
      <section className="py-24 bg-gray-50">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How We Work
              <span className="block text-blue-600 mt-2">Process as a System</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A proven methodology that delivers results
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  {idx < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent">
                      <ArrowRightIcon className="w-6 h-6 text-blue-300 absolute -right-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-3">{step.desc}</p>
                <p className="text-sm text-blue-600 font-semibold bg-blue-50 px-4 py-2 rounded-full inline-block">
                  {step.output}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* Section H8 - Insights & Articles */}
      <section className="py-24 bg-white">
        <Section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Insights & Articles</h2>
              <p className="text-xl text-gray-600">Latest from our blog</p>
            </div>
            <Link 
              href="/blog" 
              className="mt-6 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Explore insights
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => {
              const tags = post.tags ? JSON.parse(post.tags) : []
              const category = tags[0] || post.category || 'General'
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="block p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4">
                      {category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {post.excerpt || 'Read more about this topic...'}
                    </p>
                    <span className="text-sm text-gray-500">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent'}
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </Section>
      </section>

      {/* Section H9 - Final CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 text-white relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Have a project, a broken system, or just an idea?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Let's turn your vision into reality. Get started today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
              >
                Start with a 20-min call
              </Link>
              <Link
                href="/start"
                className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-bold text-lg"
              >
                Fill project brief
              </Link>
            </div>
          </motion.div>
        </Section>
      </section>
    </div>
  )
}

