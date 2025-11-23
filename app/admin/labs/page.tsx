import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import DataTable from '@/components/admin/DataTable'

export default async function AdminLabsPage() {
  await requireAuth()
  const labs = await prisma.labItem.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      type: 'text' as const,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      type: 'status' as const,
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      type: 'badge' as const,
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
        { label: 'Labs' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lab Items</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage lab items. {labs.length} total item{labs.length !== 1 ? 's' : ''}.
          </p>
        </div>
        <Link
          href="/admin/labs/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Lab Item</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={labs}
        searchPlaceholder="Search lab items..."
        emptyMessage="No lab items found. Create your first lab item to get started."
        actions={{
          editHref: '/admin/labs/[id]',
        }}
      />
    </div>
  )
}
