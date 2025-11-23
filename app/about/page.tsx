import Section from '@/components/layout/Section'
import { prisma } from '@/lib/prisma'
import AboutClient from '@/components/pages/AboutClient'

// Disable caching for dynamic content
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AboutPage() {
  // Get stats from settings
  const statsSetting = await prisma.setting.findUnique({
    where: { key: 'stats' },
  })

  const stats = statsSetting && statsSetting.type === 'JSON' 
    ? JSON.parse(statsSetting.value)
    : { years: 5, projects: 50, products: 10, industries: 8 }

  return <AboutClient stats={stats} />
}
