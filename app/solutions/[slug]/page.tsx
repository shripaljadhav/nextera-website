import Link from 'next/link'
import { notFound } from 'next/navigation'
import Section from '@/components/layout/Section'
import PageShell from '@/components/layout/PageShell'
import { prisma } from '@/lib/prisma'

export default async function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const solution = await prisma.solution.findUnique({
    where: { slug: params.slug },
  })

  if (!solution) {
    notFound()
  }

  const whoItsFor = solution.whoItsFor ? JSON.parse(solution.whoItsFor) : []
  const features = solution.features ? JSON.parse(solution.features) : []
  const architecture = solution.architecture ? JSON.parse(solution.architecture) : null
  const engagementOptions = solution.engagementOptions ? JSON.parse(solution.engagementOptions) : []

  return (
    <PageShell title={solution.name} description={solution.tagline || undefined}>
      {/* Section SOL1 - Hero */}
      <section className="py-12 bg-white">
        <Section>
          <div className="flex items-center gap-4 mb-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              solution.status === 'LIVE' ? 'bg-green-100 text-green-700' : 
              solution.status === 'BETA' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {solution.status}
            </span>
            <span className="text-gray-600">Built & maintained by Nextera Digital</span>
          </div>
        </Section>
      </section>

      {/* Section SOL2 - Who It's For */}
      {whoItsFor.length > 0 && (
        <section className="py-20 bg-gray-50">
          <Section>
            <h2 className="text-2xl font-bold mb-8">Who It's For</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {whoItsFor.map((audience: string, idx: number) => (
                <div key={idx} className="p-6 bg-white rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                  <p className="font-medium">{audience}</p>
                </div>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* Section SOL3 - Features */}
      {features.length > 0 && (
        <section className="py-20 bg-white">
          <Section>
            <h2 className="text-2xl font-bold mb-8">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature: string, idx: number) => (
                <div key={idx} className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">{feature}</h3>
                  <p className="text-sm text-gray-600">Comprehensive feature description...</p>
                </div>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* Section SOL4 - Architecture */}
      {architecture && (
        <section className="py-20 bg-gray-50">
          <Section>
            <h2 className="text-2xl font-bold mb-8">Architecture Overview</h2>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="grid md:grid-cols-3 gap-6">
                {architecture.frontend && (
                  <div>
                    <h3 className="font-semibold mb-2">Frontend</h3>
                    <p className="text-gray-600">{architecture.frontend}</p>
                  </div>
                )}
                {architecture.backend && (
                  <div>
                    <h3 className="font-semibold mb-2">Backend</h3>
                    <p className="text-gray-600">{architecture.backend}</p>
                  </div>
                )}
                {architecture.integrations && (
                  <div>
                    <h3 className="font-semibold mb-2">Integrations</h3>
                    <p className="text-gray-600">{architecture.integrations}</p>
                  </div>
                )}
              </div>
            </div>
          </Section>
        </section>
      )}

      {/* Section SOL5 - Engagement Options */}
      {engagementOptions.length > 0 && (
        <section className="py-20 bg-white">
          <Section>
            <h2 className="text-2xl font-bold mb-8">Engagement Options</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {engagementOptions.map((option: string, idx: number) => (
                <div key={idx} className="p-6 border-2 border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">{option}</h3>
                  <p className="text-sm text-gray-600">Learn more about this option...</p>
                </div>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* Section SOL6 - CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <Section>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Interested in {solution.name}?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Book a product demo
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
              >
                Get pricing deck
              </Link>
            </div>
          </div>
        </Section>
      </section>
    </PageShell>
  )
}
