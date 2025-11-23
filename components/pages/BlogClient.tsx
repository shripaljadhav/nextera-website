'use client'

import Link from 'next/link'
import Section from '@/components/layout/Section'
import { motion } from 'framer-motion'
import { BlogPost } from '@prisma/client'
import { useState } from 'react'
import { format } from 'date-fns'

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

interface BlogClientProps {
  blogPosts: BlogPost[]
  categories: string[]
}

export default function BlogClient({ blogPosts, categories }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  
  // Filter posts
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
              Blog & Insights
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Insights from building{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                real products & systems
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Learn from our experiences, mistakes, and successes in building software that matters.
            </p>
          </motion.div>
        </Section>
      </section>

      {/* Categories Filter */}
      {categories.length > 1 && (
        <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-0 z-30 backdrop-blur-sm bg-opacity-90">
          <Section>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-24 bg-white">
        <Section>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No blog posts found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, idx) => {
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
                      className="group block h-full p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-200">
                          {category}
                        </span>
                        {post.publishedAt && (
                          <span className="text-xs text-gray-500">
                            {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
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

                      <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors">
                        <span>Read article</span>
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
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Stay updated with our latest insights
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Get notified when we publish new articles and case studies
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Subscribe to updates
            </Link>
          </motion.div>
        </Section>
      </section>
    </div>
  )
}

