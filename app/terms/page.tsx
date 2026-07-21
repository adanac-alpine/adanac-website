import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Adanac Alpine Advisory',
  description: 'Terms of service for Adanac Alpine Advisory Inc.',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12 py-24 max-w-3xl">
        <Link href="/" className="text-glacier text-sm font-semibold hover:underline mb-8 inline-block focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded focus:outline-none">
          ← Back to home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-8">
          Terms of Service
        </h1>

        <p className="text-sm text-medium-gray mb-8">
          Effective date: July 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-dark-gray leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">1. Introduction</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of the Adanac Alpine Advisory website and services. By accessing our website or engaging our services, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">2. Services</h2>
            <p>
              Adanac Alpine Advisory Inc. provides IT consulting and digital transformation services to financial services organizations. Specific scope, deliverables, and fees are defined in individual service agreements or statements of work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">3. Website Use</h2>
            <p>You may use our website for lawful purposes only. You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use the website in any way that violates applicable laws</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Use automated systems to scrape or extract content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">4. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and design, is the property of Adanac Alpine Advisory Inc. and is protected by copyright law. You may not reproduce or distribute content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">5. Confidentiality</h2>
            <p>
              We treat all client information as confidential. We will not disclose your business information to third parties without your consent, except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">6. Limitation of Liability</h2>
            <p>
              Adanac Alpine Advisory Inc. provides services on an &quot;as is&quot; basis. We are not liable for any indirect, incidental, or consequential damages arising from the use of our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">7. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Changes will be posted on this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">8. Contact</h2>
            <p>
              For questions about these Terms, contact us at{' '}
              <a href="mailto:sergey@adanacalpine.ca" className="text-glacier hover:underline focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded focus:outline-none">
                sergey@adanacalpine.ca
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
