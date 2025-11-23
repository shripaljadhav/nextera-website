import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import DataTable from '@/components/admin/DataTable'

export default async function AdminServicesPage() {
  await requireAuth()
  
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' },
  })

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
      badgeColors: {},
    },
    {
      key: 'isFeatured',
      label: 'Status',
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
        { label: 'Services' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your services. {services.length} total service{services.length !== 1 ? 's' : ''}.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Service</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={services}
        searchPlaceholder="Search services..."
        emptyMessage="No services found. Create your first service to get started."
        actions={{
          editHref: '/admin/services/[id]',
          viewHref: '/services/[slug]',
          showView: true,
        }}
      />
    </div>
  )
}
