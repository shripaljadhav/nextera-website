import Section from '@/components/layout/Section'
import { prisma } from '@/lib/prisma'
import BlogClient from '@/components/pages/BlogClient'

// Disable caching for dynamic content
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPage() {
  const blogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  })

  // Get unique categories
  const categories = ['All', ...new Set(blogPosts.map(post => post.category).filter(Boolean))]

  return <BlogClient blogPosts={blogPosts} categories={categories} />
}
