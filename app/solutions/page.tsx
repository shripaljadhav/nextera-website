import Section from '@/components/layout/Section'
import { prisma } from '@/lib/prisma'
import SolutionsClient from '@/components/pages/SolutionsClient'

// Disable caching for dynamic content
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SolutionsPage() {
  const [liveProducts, kits, labs] = await Promise.all([
    prisma.solution.findMany({
      where: { type: 'PRODUCT', status: 'LIVE' },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.solution.findMany({
      where: { type: 'KIT' },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.solution.findMany({
      where: { type: 'LAB' },
      orderBy: { createdAt: 'asc' },
    }),
  ])

  return <SolutionsClient liveProducts={liveProducts} kits={kits} labs={labs} />
}
