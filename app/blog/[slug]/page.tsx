import { notFound } from 'next/navigation'
import Section from '@/components/layout/Section'
import PageShell from '@/components/layout/PageShell'
import { prisma } from '@/lib/prisma'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  })

  if (!post || !post.published) {
    notFound()
  }

  const tags = post.tags ? JSON.parse(post.tags) : []

  return (
    <PageShell title={post.title} description={post.excerpt || undefined}>
      <article className="py-20 bg-white">
        <Section maxWidth="2xl">
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <time className="text-gray-500">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
            </time>
          </div>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Section>
      </article>
    </PageShell>
  )
}
