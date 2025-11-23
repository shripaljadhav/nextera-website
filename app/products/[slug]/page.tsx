import { notFound } from 'next/navigation'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import { prisma } from '@/lib/prisma'
import ProductDetailClient from '@/components/pages/ProductDetailClient'

// Disable caching for fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: { params: { slug: string } }) {
  let product: any = null
  
  try {
    if ('product' in prisma && prisma.product && typeof (prisma.product as any).findUnique === 'function') {
      product = await (prisma.product as any).findUnique({
        where: { slug: params.slug },
      })
    }
  } catch (error) {
    console.error('Error fetching product for metadata:', error)
  }

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.description || '',
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  let product: any = null
  
  try {
    // Check if product model exists before calling
    if ('product' in prisma && prisma.product && typeof (prisma.product as any).findUnique === 'function') {
      product = await (prisma.product as any).findUnique({
        where: { slug: params.slug },
      })
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  }

  if (!product || (product.status !== 'LIVE' && product.status !== 'BETA')) {
    notFound()
  }

  // Parse JSON fields
  const techStack = product.techStack ? JSON.parse(product.techStack) : []
  const screenshots = product.screenshots ? JSON.parse(product.screenshots) : []
  const pricing = product.pricing ? JSON.parse(product.pricing) : {}
  const changelog = product.changelog ? JSON.parse(product.changelog) : []
  const versions = product.versions ? JSON.parse(product.versions) : []
  const features = product.features ? JSON.parse(product.features) : []

  // Get related products (same category, different product)
  let relatedProducts: any[] = []
  try {
    if ('product' in prisma && prisma.product && typeof (prisma.product as any).findMany === 'function') {
      relatedProducts = await (prisma.product as any).findMany({
        where: {
          category: product.category,
          status: { in: ['LIVE', 'BETA'] },
          NOT: { id: product.id },
        },
        take: 3,
        orderBy: { createdAt: 'desc' },
      })
    }
  } catch (error) {
    console.error('Error fetching related products:', error)
  }

  return (
    <ProductDetailClient
      product={{
        ...product,
        techStack,
        screenshots,
        pricing,
        changelog,
        versions,
        features,
      }}
      relatedProducts={relatedProducts}
    />
  )
}

