import Section from '@/components/layout/Section'
import { prisma } from '@/lib/prisma'
import CaseStudiesClient from '@/components/pages/CaseStudiesClient'

// Disable caching for dynamic content
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return <CaseStudiesClient caseStudies={caseStudies} />
}
