import type { Metadata } from 'next'
import AiSavingsCalculator from '@/components/AiSavingsCalculator'
import {
  CalculatorSection,
  CtaBand,
  FaqSection,
  HowItWorksSection,
  LandingHeader,
  LandingHero,
  PlateSection,
} from '@/components/AiSavingsSections'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AI Tools Setup for Small Business — Adanac Alpine Advisory',
  description:
    'Get hours of your week back with AI. Estimate how much time an AI assistant could save you on email, meeting notes, drafting and reports, then book a free call.',
  alternates: { canonical: 'https://adanacalpine.ca/ai-savings' },
  // Hidden from search until the page is promoted from the home page.
  robots: { index: false, follow: true },
}

export default function AiSavingsPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <LandingHeader />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <LandingHero />
        <PlateSection />
        <CalculatorSection>
          <AiSavingsCalculator />
        </CalculatorSection>
        <HowItWorksSection />
        <CtaBand />
        <FaqSection />
        <Contact
          eyebrow="Book a free call"
          heading="Let's look at your week"
          intro="Tell me a little about your business and I'll get back to you within 24 hours to set up a 30-minute call. If you used the calculator, your estimate is already in the message."
          messagePlaceholder="What takes up most of your week? Which email and calendar do you use?"
        />
      </main>
      <Footer />
    </div>
  )
}
