import Link from 'next/link'
import { notFound } from 'next/navigation'
import Section from '@/components/layout/Section'
import PageShell from '@/components/layout/PageShell'
import { prisma } from '@/lib/prisma'

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug },
  })

  if (!job || !job.isOpen) {
    notFound()
  }

  const responsibilities = job.responsibilities ? JSON.parse(job.responsibilities) : []
  const requirements = job.requirements ? JSON.parse(job.requirements) : []
  const niceToHave = job.niceToHave ? JSON.parse(job.niceToHave) : []

  return (
    <PageShell title={job.title}>
      <section className="py-20 bg-white">
        <Section maxWidth="2xl">
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
              {job.department && <span>{job.department}</span>}
              {job.location && (
                <>
                  <span>•</span>
                  <span>{job.location}</span>
                </>
              )}
              {job.type && (
                <>
                  <span>•</span>
                  <span>{job.type}</span>
                </>
              )}
            </div>
            {job.summary && (
              <p className="text-lg text-gray-700">{job.summary}</p>
            )}
          </div>

          <div className="space-y-8">
            {responsibilities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {responsibilities.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {requirements.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {requirements.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {niceToHave.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Nice to Have</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {niceToHave.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-6 bg-primary-50 rounded-lg border border-primary-200">
              <h2 className="text-2xl font-bold mb-4">How to Apply</h2>
              <p className="text-gray-700 mb-4">{job.howToApply || 'Send your resume and portfolio to careers@nextera.digital'}</p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </Section>
      </section>
    </PageShell>
  )
}
