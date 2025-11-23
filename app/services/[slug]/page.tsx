import Link from 'next/link'
import { notFound } from 'next/navigation'
import Section from '@/components/layout/Section'
import PageShell from '@/components/layout/PageShell'
import { prisma } from '@/lib/prisma'

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
    include: {
      caseStudies: {
        take: 2,
      },
    },
  })

  if (!service) {
    notFound()
  }

  const outcomes = service.outcomes ? JSON.parse(service.outcomes) : []
  const packages = service.packages ? JSON.parse(service.packages) : []
  const relatedServices = service.relatedServices ? JSON.parse(service.relatedServices) : []

  // Get related service names
  const relatedServiceNames = await Promise.all(
    relatedServices.map(async (slug: string) => {
      const s = await prisma.service.findUnique({ where: { slug }, select: { name: true } })
      return s?.name || slug
    })
  )

  return (
    <PageShell title={service.name} description={service.description || undefined}>
      {/* Section SD1 - Hero */}
      <section className="py-12 bg-white">
        <Section>
          <div className="flex flex-wrap gap-2 mb-6">
            {service.category && (
              <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                {service.category}
              </span>
            )}
          </div>
        </Section>
      </section>

      {/* Section SD2 - Outcomes */}
      <section className="py-20 bg-gray-50">
        <Section>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Outcomes, Not Just Deliverables</h2>
              <ul className="space-y-4">
                {outcomes.map((outcome: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Typical Timeline & Budget</h3>
              {service.timeline && (
                <p className="text-gray-600 mb-4"><strong>Timeline:</strong> {service.timeline}</p>
              )}
              {service.budgetRange && (
                <p className="text-gray-600"><strong>Budget Range:</strong> {service.budgetRange}</p>
              )}
            </div>
          </div>
        </Section>
      </section>

      {/* Section SD3 - Where This Fits */}
      {relatedServiceNames.length > 0 && (
        <section className="py-20 bg-white">
          <Section>
            <h2 className="text-2xl font-bold mb-6">Where This Fits in the Bigger System</h2>
            <p className="text-gray-600 mb-4">Works great with:</p>
            <div className="flex flex-wrap gap-3">
              {relatedServiceNames.map((related: string, idx: number) => (
                <Link
                  key={idx}
                  href="/services"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-primary-100 hover:text-primary-700 transition-colors"
                >
                  {related}
                </Link>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* Section SD4 - Selected Case Studies */}
      {service.caseStudies.length > 0 && (
        <section className="py-20 bg-gray-50">
          <Section>
            <h2 className="text-2xl font-bold mb-8">Selected Case Studies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.caseStudies.map((study) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  className="p-6 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all"
                >
                  <h3 className="font-semibold mb-2">{study.title}</h3>
                  <p className="text-sm text-gray-600">{study.problem || 'Learn more about this case study...'}</p>
                </Link>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* Section SD5 - Packages */}
      {packages.length > 0 && (
        <section className="py-20 bg-white">
          <Section>
            <h2 className="text-2xl font-bold mb-8">Packages / Levels</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg: any, idx: number) => (
                <div key={idx} className="p-6 border-2 border-gray-200 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">{pkg.name}</h3>
                  <ul className="space-y-2">
                    {pkg.features?.map((feature: string, fIdx: number) => (
                      <li key={fIdx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* Section SD6 - CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <Section>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-white/90">
              Book a discovery call to discuss your project
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Book Discovery Call
            </Link>
          </div>
        </Section>
      </section>
    </PageShell>
  )
}
