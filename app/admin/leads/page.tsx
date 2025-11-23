import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-helpers'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import DataTable from '@/components/admin/DataTable'
import { format } from 'date-fns'

export default async function AdminLeadsPage() {
  await requireAuth()
  const leads = await prisma.lead.findMany({
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
      key: 'email',
      label: 'Email',
      sortable: true,
      type: 'text' as const,
    },
    {
      key: 'company',
      label: 'Company',
      sortable: true,
      type: 'text' as const,
    },
    {
      key: 'source',
      label: 'Source',
      sortable: true,
      type: 'badge' as const,
      badgeColors: {},
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      type: 'status' as const,
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      type: 'date' as const,
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Leads' },
      ]} />

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your leads. {leads.length} total lead{leads.length !== 1 ? 's' : ''}.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={leads}
        searchPlaceholder="Search leads..."
        emptyMessage="No leads found yet."
      />
    </div>
  )
}
