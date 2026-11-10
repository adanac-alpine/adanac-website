import type { Metadata } from 'next'
import Link from 'next/link'
import AiSavingsCalculator from '@/components/AiSavingsCalculator'

export const metadata: Metadata = {
  title: 'AI Time Savings Calculator — Adanac Alpine Advisory',
  description:
    'Estimate how many hours a week AI could save your small business on email, meeting notes, drafting and reports, and what that time is worth.',
  alternates: { canonical: 'https://adanacalpine.ca/ai-savings' },
  // Hidden from search until package pricing is final.
  robots: { index: false, follow: true },
}

export default function AiSavingsPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <header className="bg-navy px-4 pb-16 pt-7 text-white">
        <div className="mx-auto max-w-[1160px]">
          <Link
            href="/"
            className="mb-4 inline-block rounded text-sm font-semibold text-glacier hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            ← Back to home
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-glacier">Adanac Alpine · AI tools setup</p>
          <h1 className="mb-2 mt-1.5 text-2xl font-extrabold leading-tight tracking-tight sm:text-[34px]">
            How much time could AI give back to your week?
          </h1>
          <p className="max-w-[720px] text-[15px] text-navy-100">
            Tell us how your week goes today. We&apos;ll show how many hours AI could take off your plate, how
            that&apos;s worked out, and what it&apos;s worth if you put those hours to paid work.
          </p>
        </div>
      </header>
      <main className="-mt-11 px-4 pb-12">
        <div className="mx-auto max-w-[1160px]">
          <AiSavingsCalculator />
        </div>
      </main>
    </div>
  )
}
