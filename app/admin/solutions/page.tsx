import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import DataTable from '@/components/admin/DataTable'

export default async function AdminSolutionsPage() {
  await requireAuth()
  const solutions = await prisma.solution.findMany({
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
      key: 'type',
      label: 'Type',
      sortable: true,
      type: 'badge' as const,
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
        { label: 'Solutions' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Solutions</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your solutions. {solutions.length} total solution{solutions.length !== 1 ? 's' : ''}.
          </p>
        </div>
        <Link
          href="/admin/solutions/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Solution</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={solutions}
        searchPlaceholder="Search solutions..."
        emptyMessage="No solutions found. Create your first solution to get started."
        actions={{
          editHref: '/admin/solutions/[id]',
          viewHref: '/solutions/[slug]',
          showView: true,
        }}
      />
    </div>
  )
}
