import type { Metadata } from 'next'
import AiSavingsCalculator from '@/components/AiSavingsCalculator'
import {
  AboutBlock,
  CalculatorSection,
  FaqSection,
  HowItWorksSection,
  LandingHeader,
  LandingHero,
  PlateSection,
} from '@/components/AiSavingsSections'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AI Assistant Setup for Small Business in BC — Adanac Alpine Advisory',
  description:
    'I set up an AI assistant on your email, calendar and files and train you to use it. See how many hours you could save. Fixed prices from $850.',
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
        <AboutBlock />
        <FaqSection />
        <Contact
          eyebrow="Free 30-minute call"
          heading="Let's look at your week"
          intro="Pick a time now, or send a note and I'll reply within one business day to set up a 30-minute call. If you used the calculator, your estimate is already in the message."
          messagePlaceholder="What takes up most of your week? Which email and calendar do you use?"
          submitLabel="Request my free call"
          replyTime="within one business day"
          calendarPrompt="Rather pick a time yourself?"
          calendarLabel="Pick a time now"
          calendarPlacement="above"
        />
      </main>
      <Footer />
    </div>
  )
}
