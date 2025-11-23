import Section from '@/components/layout/Section'
import { prisma } from '@/lib/prisma'
import JourneyClient from '@/components/pages/JourneyClient'

// Disable caching for dynamic content
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function JourneyPage() {
  const timelineEvents = await prisma.timelineEvent.findMany({
    orderBy: { order: 'asc' },
  })

  return <JourneyClient timelineEvents={timelineEvents} />
}
