import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import DataTable from '@/components/admin/DataTable'

export default async function AdminCareersPage() {
  await requireAuth()
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const columns = [
    {
      key: 'slug',
      label: 'Title',
      sortable: true,
      type: 'slug' as const,
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      type: 'badge' as const,
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      type: 'text' as const,
    },
    {
      key: 'isOpen',
      label: 'Status',
      type: 'status' as const,
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
        { label: 'Careers' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage job postings. {jobs.length} total job{jobs.length !== 1 ? 's' : ''}.
          </p>
        </div>
        <Link
          href="/admin/careers/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Job</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={jobs}
        searchPlaceholder="Search jobs..."
        emptyMessage="No jobs found. Create your first job posting to get started."
        actions={{
          editHref: '/admin/careers/[id]',
          viewHref: '/careers/[slug]',
          showView: true,
        }}
      />
    </div>
  )
}
