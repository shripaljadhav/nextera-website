import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import DataTable from '@/components/admin/DataTable'

export default async function AdminCaseStudiesPage() {
  await requireAuth()
  const caseStudies = await prisma.caseStudy.findMany({
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
      key: 'client',
      label: 'Client',
      sortable: true,
      type: 'text' as const,
    },
    {
      key: 'industry',
      label: 'Industry',
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
        { label: 'Case Studies' },
      ]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Case Studies</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your case studies. {caseStudies.length} total case study{caseStudies.length !== 1 ? 'ies' : ''}.
          </p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-sm transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Case Study</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={caseStudies}
        searchPlaceholder="Search case studies..."
        emptyMessage="No case studies found. Create your first case study to get started."
        actions={{
          editHref: '/admin/case-studies/[id]',
          viewHref: '/case-studies/[slug]',
          showView: true,
        }}
      />
    </div>
  )
}
