import Link from 'next/link'
import Section from '@/components/layout/Section'
import { prisma } from '@/lib/prisma'
import HomeClient from '@/components/pages/HomeClient'

// Disable caching for this page to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Icon mapping
const iconMap: Record<string, string> = {
  'rocket': 'from-blue-500 to-cyan-500',
  'sparkles': 'from-purple-500 to-pink-500',
  'code': 'from-green-500 to-emerald-500',
  'chart': 'from-orange-500 to-red-500',
}

export default async function Home() {
  // Fetch data from database with error handling
  let services: any[] = []
  let featuredSolutions: any[] = []
  let caseStudies: any[] = []
  let blogPosts: any[] = []
  let timelineEvents: any[] = []
  let homepageSettings: any[] = []

  try {
    [services, featuredSolutions, caseStudies, blogPosts, timelineEvents, homepageSettings] = await Promise.all([
      prisma.service.findMany({
        where: { isFeatured: true },
        take: 5,
        orderBy: { createdAt: 'asc' },
      }),
      prisma.solution.findMany({
        where: { isFeatured: true, status: 'LIVE' },
        take: 3,
        orderBy: { createdAt: 'asc' },
      }),
      prisma.caseStudy.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.blogPost.findMany({
        where: { published: true },
        take: 3,
        orderBy: { publishedAt: 'desc' },
      }),
      prisma.timelineEvent.findMany({
        take: 3,
        orderBy: { order: 'asc' },
      }),
      prisma.setting.findMany({
        where: {
          key: {
            in: [
              'homepage_hero_title',
              'homepage_hero_subtitle',
              'homepage_hero_description',
              'homepage_hero_primary_button_text',
              'homepage_hero_primary_button_link',
              'homepage_hero_secondary_button_text',
              'homepage_hero_secondary_button_link',
              'homepage_process_steps',
            ],
          },
        },
      }),
    ])
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    // Continue with empty arrays - page will still render with fallback content
  }

  // Convert settings to object
  const settingsObj: Record<string, any> = {}
  homepageSettings.forEach((setting) => {
    if (setting.type === 'JSON') {
      settingsObj[setting.key] = JSON.parse(setting.value)
    } else {
      settingsObj[setting.key] = setting.value
    }
  })

  // Transform services data
  const servicesData = services.map((service) => ({
    ...service,
    gradient: iconMap[service.icon || 'rocket'] || 'from-blue-500 to-cyan-500',
    href: `/services/${service.slug}`,
  }))

  // Transform solutions data
  const solutionsData = featuredSolutions.map((sol, idx) => {
    const colors = [
      'from-blue-600 to-cyan-600',
      'from-purple-600 to-pink-600',
      'from-green-600 to-emerald-600',
    ]
    return {
      name: sol.name,
      tag: sol.tagline || sol.category || '',
      href: `/solutions/${sol.slug}`,
      color: colors[idx] || colors[0],
    }
  })

  return (
    <HomeClient
      services={servicesData}
      solutions={solutionsData}
      caseStudies={caseStudies}
      blogPosts={blogPosts}
      timelineEvents={timelineEvents}
      homepageSettings={settingsObj}
    />
  )
}
