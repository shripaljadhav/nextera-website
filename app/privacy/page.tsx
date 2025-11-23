import Section from '@/components/layout/Section'
import PageShell from '@/components/layout/PageShell'

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy Policy">
      <section className="py-20 bg-white">
        <Section maxWidth="2xl">
          <div className="prose prose-lg max-w-none">
            <h2>Privacy Policy</h2>
            <p>Last updated: December 2024</p>
            
            <h3>Introduction</h3>
            <p>
              Nextera Digital ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information.
            </p>

            <h3>Information We Collect</h3>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company information</li>
              <li>Project details and requirements</li>
            </ul>

            <h3>How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and requests</li>
              <li>Provide our services</li>
              <li>Send you updates about our services</li>
              <li>Improve our website and services</li>
            </ul>

            <h3>Data Security</h3>
            <p>
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the Internet is 100% secure.
            </p>

            <h3>Contact Us</h3>
            <p>
              If you have questions about this Privacy Policy, please contact us at 
              <a href="mailto:hello@nextera.digital"> hello@nextera.digital</a>.
            </p>
          </div>
        </Section>
      </section>
    </PageShell>
  )
}

