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

  // Get unique categories (filter out nulls and ensure proper typing)
  const uniqueCategories = Array.from(
    new Set(
      blogPosts
        .map(post => post.category)
        .filter((category): category is string => Boolean(category))
    )
  )
  const categories: string[] = ['All', ...uniqueCategories]

  return <BlogClient blogPosts={blogPosts} categories={categories} />
}
