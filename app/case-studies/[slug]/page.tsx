import Link from 'next/link'
import { notFound } from 'next/navigation'
import Section from '@/components/layout/Section'
import PageShell from '@/components/layout/PageShell'
import { prisma } from '@/lib/prisma'

export default async function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const study = await prisma.caseStudy.findUnique({
    where: { slug: params.slug },
  })

  if (!study) {
    notFound()
  }

  const results = study.results ? JSON.parse(study.results) : []
  const techStack = study.techStack ? JSON.parse(study.techStack) : []
  const tags = study.tags ? JSON.parse(study.tags) : []

  return (
    <PageShell title={study.title}>
      {/* Hero */}
      <section className="py-12 bg-white">
        <Section>
          <div className="mb-4">
            <span className="text-gray-600">{study.client || 'Client'} • {study.industry || 'Industry'}</span>
          </div>
          {study.result && (
            <div className="text-4xl font-bold text-primary-600 mb-2">{study.result}</div>
          )}
        </Section>
      </section>

      {/* The Background */}
      {study.background && (
        <section className="py-20 bg-gray-50">
          <Section maxWidth="2xl">
            <h2 className="text-2xl font-bold mb-6">The Background</h2>
            <p className="text-gray-700 leading-relaxed">{study.background}</p>
          </Section>
        </section>
      )}

      {/* The Challenge */}
      {study.challenge && (
        <section className="py-20 bg-white">
          <Section maxWidth="2xl">
            <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
            <p className="text-gray-700 leading-relaxed">{study.challenge}</p>
          </Section>
        </section>
      )}

      {/* What We Built */}
      {study.whatWeBuilt && (
        <section className="py-20 bg-gray-50">
          <Section maxWidth="2xl">
            <h2 className="text-2xl font-bold mb-6">What We Built</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{study.whatWeBuilt}</p>
            {techStack.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Tech Stack:</h3>
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech: string, idx: number) => (
                    <span key={idx} className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Section>
        </section>
      )}

      {/* The Results */}
      {results.length > 0 && (
        <section className="py-20 bg-white">
          <Section>
            <h2 className="text-2xl font-bold mb-8 text-center">The Results</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {results.map((result: any, idx: number) => (
                <div key={idx} className="text-center p-8 bg-primary-50 rounded-lg">
                  <div className="text-5xl font-bold text-primary-600 mb-2">{result.metric}</div>
                  <div className="text-gray-700">{result.label}</div>
                </div>
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* What's Next */}
      {study.whatsNext && (
        <section className="py-20 bg-gray-50">
          <Section maxWidth="2xl">
            <h2 className="text-2xl font-bold mb-6">What's Next</h2>
            <p className="text-gray-700 leading-relaxed">{study.whatsNext}</p>
          </Section>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <Section>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Similar problem? Let's talk.</h2>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Get in Touch
            </Link>
          </div>
        </Section>
      </section>
    </PageShell>
  )
}
