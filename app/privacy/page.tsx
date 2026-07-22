import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Adanac Advisory',
  description: 'Privacy policy for Adanac Advisory Inc.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12 py-24 max-w-3xl">
        <Link href="/" className="text-glacier text-sm font-semibold hover:underline mb-8 inline-block focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded focus:outline-none">
          ← Back to home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-8">
          Privacy Policy
        </h1>

        <p className="text-sm text-medium-gray mb-8">
          Effective date: July 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-dark-gray leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">1. Introduction</h2>
            <p>
              Adanac Advisory Inc. (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">2. Information We Collect</h2>
            <p>We may collect the following information when you contact us through our website:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Message content</li>
            </ul>
            <p className="mt-3">
              We do not collect personal information automatically through cookies or analytics beyond what is provided by Vercel Analytics (see Section 5).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Respond to your inquiry</li>
              <li>Provide requested services</li>
              <li>Communicate with you about your project</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">4. Data Sharing</h2>
            <p>
              We do not sell, trade, or share your personal information with third parties. Your data is only used internally to respond to your communications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">5. Analytics</h2>
            <p>
              This website uses Vercel Analytics, which collects anonymous usage data (page views, referral sources, general location). Vercel Analytics does not use cookies and does not track individual users. For more information, see{' '}
              <a
                href="https://vercel.com/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-glacier hover:underline focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded focus:outline-none"
              >
                Vercel Analytics
                <span className="sr-only"> (opens in a new tab)</span>
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">6. Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">7. Your Rights</h2>
            <p>
              You may contact us at any time to request access to, correction of, or deletion of your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">9. Contact</h2>
            <p>
              For questions about this Privacy Policy, contact us at{' '}
              <a
                href="mailto:sergey@adanacadvisory.ca"
                className="text-glacier hover:underline focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded focus:outline-none"
              >
                sergey@adanacadvisory.ca
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
