import Link from 'next/link'
import Section from '@/components/layout/Section'
import { prisma } from '@/lib/prisma'
import { motion } from 'framer-motion'
import ServicesClient from '@/components/pages/ServicesClient'

// Disable caching for dynamic content
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Icon mapping
const iconMap: Record<string, string> = {
  'rocket': 'from-blue-500 to-cyan-500',
  'sparkles': 'from-purple-500 to-pink-500',
  'code': 'from-green-500 to-emerald-500',
  'chart': 'from-orange-500 to-red-500',
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'asc' },
  })

  // Transform services data
  const servicesData = services.map((service) => ({
    ...service,
    gradient: iconMap[service.icon || 'rocket'] || 'from-blue-500 to-cyan-500',
    href: `/services/${service.slug}`,
    outcomes: service.outcomes ? JSON.parse(service.outcomes) : [],
  }))

  return <ServicesClient services={servicesData} />
}
