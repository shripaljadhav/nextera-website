import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import DataTable from '@/components/admin/DataTable'

export default async function AdminProductsPage() {
  await requireAuth()
  
  let products: any[] = []
  
  try {
    if ('product' in prisma && prisma.product && typeof (prisma.product as any).findMany === 'function') {
      products = await (prisma.product as any).findMany({
        orderBy: { createdAt: 'desc' },
      })
    } else {
      console.warn('Product model not available in Prisma client. Restart dev server after running: npx prisma generate')
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }

  const columns = [
    {
      key: 'slug',
      label: 'Name',
      sortable: true,
      type: 'slug' as const,
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      type: 'badge' as const,
      badgeColors: {
        'Mobile Application': 'bg-blue-100 text-blue-800',
        'SaaS': 'bg-green-100 text-green-800',
        'Website': 'bg-purple-100 text-purple-800',
      },
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      type: 'status' as const,
    },
    {
      key: 'isFeatured',
      label: 'Featured',
      type: 'boolean' as const,
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      type: 'date' as const,
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Products' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your products. {products.length} total product{products.length !== 1 ? 's' : ''}.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/products/import"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>Quick Import</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={products}
        searchPlaceholder="Search products..."
        emptyMessage="No products found. Create your first product to get started."
        actions={{
          editHref: '/admin/products/[id]',
          viewHref: '/products/[slug]',
          showView: true,
        }}
      />
    </div>
  )
}

