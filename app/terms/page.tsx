import Section from '@/components/layout/Section'
import PageShell from '@/components/layout/PageShell'

export default function TermsPage() {
  return (
    <PageShell title="Terms of Service">
      <section className="py-20 bg-white">
        <Section maxWidth="2xl">
          <div className="prose prose-lg max-w-none">
            <h2>Terms of Service</h2>
            <p>Last updated: December 2024</p>
            
            <h3>Agreement to Terms</h3>
            <p>
              By accessing and using this website, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access the service.
            </p>

            <h3>Use License</h3>
            <p>
              Permission is granted to temporarily access the materials on Nextera Digital's website 
              for personal, non-commercial transitory viewing only.
            </p>

            <h3>Services</h3>
            <p>
              Nextera Digital provides software development, consulting, and related services. 
              All services are subject to separate agreements and terms.
            </p>

            <h3>Limitations</h3>
            <p>
              In no event shall Nextera Digital or its suppliers be liable for any damages 
              arising out of the use or inability to use the materials on this website.
            </p>

            <h3>Revisions</h3>
            <p>
              Nextera Digital may revise these terms at any time without notice. By using this 
              website you are agreeing to be bound by the then current version of these Terms of Service.
            </p>

            <h3>Contact Information</h3>
            <p>
              If you have any questions about these Terms, please contact us at 
              <a href="mailto:hello@nextera.digital"> hello@nextera.digital</a>.
            </p>
          </div>
        </Section>
      </section>
    </PageShell>
  )
}

