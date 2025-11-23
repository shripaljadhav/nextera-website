import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import DataTable from '@/components/admin/DataTable'

export default async function AdminTimelinePage() {
  await requireAuth()
  const events = await prisma.timelineEvent.findMany({
    orderBy: { order: 'asc' },
  })

  const columns = [
    {
      key: 'year',
      label: 'Year',
      sortable: true,
      type: 'text' as const,
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      type: 'text' as const,
    },
    {
      key: 'tag',
      label: 'Tag',
      sortable: true,
      type: 'badge' as const,
    },
    {
      key: 'order',
      label: 'Order',
      sortable: true,
      type: 'number' as const,
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Timeline' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Timeline Events</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage timeline events. {events.length} total event{events.length !== 1 ? 's' : ''}.
          </p>
        </div>
        <Link
          href="/admin/timeline/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Event</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={events}
        searchPlaceholder="Search timeline events..."
        emptyMessage="No timeline events found. Create your first event to get started."
        actions={{
          editHref: '/admin/timeline/[id]',
        }}
      />
    </div>
  )
}
