import Section from '@/components/layout/Section'
import { prisma } from '@/lib/prisma'
import CareersClient from '@/components/pages/CareersClient'

// Disable caching for dynamic content
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { isOpen: true },
    orderBy: { createdAt: 'desc' },
  })

  return <CareersClient jobs={jobs} />
}
