import Section from '@/components/layout/Section'
import { prisma } from '@/lib/prisma'
import LabsClient from '@/components/pages/LabsClient'

// Disable caching for dynamic content
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function LabsPage() {
  const labItems = await prisma.labItem.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return <LabsClient labItems={labItems} />
}
