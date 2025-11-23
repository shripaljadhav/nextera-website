import Link from 'next/link'
import Section from '@/components/layout/Section'
import { prisma } from '@/lib/prisma'
import ProductsClient from '@/components/pages/ProductsClient'

// Disable caching for fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProductsPage() {
  // Safely fetch products with error handling
  let products: any[] = []
  
  try {
    // Check if product model exists before calling
    if ('product' in prisma && prisma.product && typeof (prisma.product as any).findMany === 'function') {
      products = await (prisma.product as any).findMany({
        where: { status: { in: ['LIVE', 'BETA'] } },
        orderBy: { createdAt: 'desc' },
      })
    } else {
      console.warn('Product model not available in Prisma client. Restart dev server after running: npx prisma generate')
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    // Continue with empty array - page will show empty state
  }

  // Group products by category
  const productsByCategory = {
    'Mobile Application': products.filter(p => p.category === 'Mobile Application'),
    'SaaS': products.filter(p => p.category === 'SaaS'),
    'Website': products.filter(p => p.category === 'Website'),
  }

  return <ProductsClient products={products} productsByCategory={productsByCategory} />
}

