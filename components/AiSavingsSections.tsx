'use client'

import Link from 'next/link'
import { BookOpen, Check, FileText, Mail, NotebookPen, Phone, Settings, GraduationCap, ChevronDown } from 'lucide-react'
import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'
import AdanacMark from './brand/AdanacMark'
import AdanacWordmark from './brand/AdanacWordmark'
import TrianglePattern from './brand/TrianglePattern'
import {
  DEFAULT_PRESET,
  DEFAULT_RATE,
  EXTRA_PERSON_PRICE,
  PACKAGES,
  PRESETS,
  SUBSCRIPTION_PER_MONTH,
  TASKS,
  TUNE_UP_PER_MONTH,
  estimate,
  formatPayback,
  money,
  oneDecimal,
} from '@/lib/aiSavings'

const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2'

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-bold uppercase tracking-widest text-glacier">{children}</span>
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <FadeIn>
      <div className="mb-12 max-w-3xl space-y-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">{title}</h2>
        {intro && <p className="text-base text-dark-gray sm:text-lg">{intro}</p>}
      </div>
    </FadeIn>
  )
}

/* ---------- Header ---------- */

export function LandingHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="container mx-auto flex items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" aria-label="Adanac Alpine Advisory home" className={`flex items-center rounded-lg ${focusRing} focus-visible:ring-offset-navy`}>
          <AdanacMark size={24} tile={false} fill="#ffffff" />
          <span className="hidden items-center sm:flex">
            <span className="mx-3 h-5 w-px bg-white/20" />
            <AdanacWordmark color="#ffffff" incColor="rgba(255,255,255,0.35)" fontSize={14} showInc={false} />
          </span>
        </Link>
        <a
          href="#contact"
          className={`whitespace-nowrap rounded-lg border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 ${focusRing} focus-visible:ring-offset-navy`}
        >
          Book a free call
        </a>
      </div>
    </header>
  )
}

/* ---------- Hero ---------- */

const TRUST_POINTS = [
  'Works with Gmail, Outlook and Google Drive',
  'Your data stays in your own accounts',
  `Fixed-price packages from ${money(PACKAGES[0].price)}`,
]

export function LandingHero() {
  const typicalPkg = PACKAGES.find((p) => p.id === 'everyday') ?? PACKAGES[1]
  const typical = estimate(PRESETS[DEFAULT_PRESET].hours, typicalPkg, DEFAULT_RATE, 1)

  return (
    <section id="hero" className="relative overflow-hidden bg-navy pb-20 pt-32 text-white sm:pb-24 sm:pt-36">
      <TrianglePattern variant="dark" opacity={0.04} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 container mx-auto grid items-center gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <FadeIn y={16} scale={1}>
          <div className="space-y-6">
            <Eyebrow>AI tools setup for small business</Eyebrow>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
              Get hours of your week back with AI
            </h1>
            <p className="max-w-xl text-lg text-white/70">
              I set up an AI assistant on your own email, calendar and files, tailor it to how you work, and train you
              to use it. Less time on email, notes and reports. More time for paid work.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#calculator"
                className={`rounded-xl bg-glacier px-6 py-3.5 font-bold text-white shadow-lg shadow-glacier/25 transition-colors hover:bg-glacier-600 ${focusRing} focus-visible:ring-offset-navy`}
              >
                Estimate my savings
              </a>
              <a
                href="#contact"
                className={`rounded-xl border border-white/25 px-6 py-3.5 font-bold text-white transition-colors hover:border-white hover:bg-white/10 ${focusRing} focus-visible:ring-offset-navy`}
              >
                Book a free call
              </a>
            </div>
            <ul className="grid gap-2 pt-4 text-sm text-white/70 sm:grid-cols-3 sm:gap-4">
              {TRUST_POINTS.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check size={16} strokeWidth={3} className="mt-0.5 flex-none text-forest-300" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} y={16} scale={0.97}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50">A typical result</div>
            <div className="mt-2 text-6xl font-extrabold tracking-tight tabular-nums">
              {oneDecimal(typical.savedPerWeek)}
              <span className="ml-2 text-xl font-semibold text-white/60">hours a week</span>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="text-white/50">Working days a year</dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums">≈ {Math.round(typical.savedDaysPerYear)}</dd>
              </div>
              <div>
                <dt className="text-white/50">Setup pays back in</dt>
                <dd className="mt-1 text-2xl font-bold">{formatPayback(typical.paybackWeeks)}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs text-white/40">
              Professional services, {typicalPkg.name} package, ${DEFAULT_RATE}/h. Your numbers will differ: try the
              calculator below.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ---------- What AI takes off your plate ---------- */

const PLATE = [
  {
    task: 'email',
    icon: Mail,
    title: 'Email',
    body: 'Long threads summarised, urgent items flagged, replies drafted in your tone. You review and send.',
  },
  {
    task: 'meetings',
    icon: NotebookPen,
    title: 'Meeting notes',
    body: 'Notes, decisions and action items written up after every call, ready to share.',
  },
  {
    task: 'drafting',
    icon: FileText,
    title: 'Reports & drafting',
    body: 'Weekly updates, quotes and letters drafted from your notes in minutes, not hours.',
  },
  {
    task: 'reading',
    icon: BookOpen,
    title: 'Long documents',
    body: 'Contracts, specs and RFPs boiled down to what matters, with key dates and risks pulled out.',
  },
] as const

export function PlateSection() {
  return (
    <section id="what-ai-does" className="bg-white py-24">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="Where AI helps"
          title="The paperwork that eats your week"
          intro="AI won't do your job. It takes the first pass at the admin around it, so you spend minutes checking instead of hours writing."
        />
        <StaggerChildren stagger={0.1}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLATE.map(({ task, icon: Icon, title, body }) => {
              const cut = TASKS.find((t) => t.id === task)?.cut ?? 0
              return (
                <StaggerItem key={task}>
                  <div className="h-full rounded-2xl border border-light-gray bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy/5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-glacier-50 text-glacier">
                        <Icon size={22} strokeWidth={1.75} aria-hidden />
                      </span>
                      <span className="rounded-md bg-forest-50 px-2 py-1 text-xs font-semibold text-forest">
                        ~{Math.round(cut * 100)}% faster
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-dark-gray">{body}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </div>
        </StaggerChildren>
      </div>
    </section>
  )
}

/* ---------- Calculator wrapper ---------- */

export function CalculatorSection({ children }: { children: React.ReactNode }) {
  return (
    <section id="calculator" className="scroll-mt-4 bg-off-white py-24">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="Calculator"
          title="Estimate your savings"
          intro="Three quick steps. Adjust anything to match your week, and see how the numbers are worked out."
        />
        {children}
      </div>
    </section>
  )
}

/* ---------- How it works ---------- */

const STEPS = [
  {
    icon: Phone,
    title: 'Free 30-minute call',
    body: "We look at your week, your tools and where the time goes. You get an honest view of what AI can and can't do for you.",
  },
  {
    icon: Settings,
    title: 'Setup on your accounts',
    body: 'I connect an AI assistant to your email, calendar and files on your own licence, and tailor it to your work.',
  },
  {
    icon: GraduationCap,
    title: 'Training & tune-ups',
    body: "Hands-on sessions using your real work until it's part of your routine, then tune-ups as your needs change.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading eyebrow="How it works" title="From first call to working assistant" />
        <StaggerChildren stagger={0.15}>
          <div role="list" className="grid gap-8 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <StaggerItem key={title}>
                <div role="listitem" className="relative h-full rounded-2xl bg-off-white p-7">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                      <Icon size={20} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-glacier">Step 0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark-gray">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
      </div>
    </section>
  )
}

/* ---------- CTA band ---------- */

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white">
      <TrianglePattern variant="dark" opacity={0.05} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 container mx-auto flex flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-12">
        <FadeIn y={12} scale={1}>
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to get your week back?</h2>
            <p className="text-lg text-white/70">A free 30-minute call. No obligation, no jargon.</p>
          </div>
        </FadeIn>
        <a
          href="#contact"
          className={`flex-none rounded-xl bg-glacier px-7 py-4 font-bold text-white shadow-lg shadow-glacier/25 transition-colors hover:bg-glacier-600 ${focusRing} focus-visible:ring-offset-navy`}
        >
          Book a free call
        </a>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */

export const FAQS: { q: string; a: string }[] = [
  {
    q: 'Is my business data safe?',
    a: "Everything runs on your own accounts and your own AI subscription, so your email and files stay where they are today. I'll help you pick a plan and settings that don't use your data to train AI models.",
  },
  {
    q: 'Which AI tool do you use?',
    a: 'Usually Claude or ChatGPT, whichever fits your tools and budget best. If you already pay for Microsoft Copilot or Google Gemini, we can start there.',
  },
  {
    q: 'Do I need to be technical?',
    a: "No. If you can use email and a phone app, you can use this. Training is hands-on, using your own real work, not generic examples.",
  },
  {
    q: 'I use Outlook / Microsoft 365. Does that work?',
    a: "Yes. Microsoft setups can need extra admin permissions, so they may cost a little more. I'll confirm on our call before you commit.",
  },
  {
    q: 'What does it cost after setup?',
    a: `Just the AI subscription, about $${SUBSCRIPTION_PER_MONTH}/month per person, paid directly to the provider. Optional tune-ups are ${money(TUNE_UP_PER_MONTH)}/month once the included support ends.`,
  },
  {
    q: 'Are prices before tax? How many people are covered?',
    a: `All prices are in CAD and exclude GST. Each package covers up to 3 people; each extra person is ${money(EXTRA_PERSON_PRICE)}.`,
  },
  {
    q: 'How accurate is the calculator?',
    a: 'It is deliberately conservative: your own hours times typical savings per task. Real results depend on your work and how much you use it. We will sanity-check the numbers together on the call.',
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="bg-off-white py-24">
      <div className="container mx-auto grid gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <SectionHeading eyebrow="FAQ" title="Common questions" intro="Something else on your mind? Ask it on the call." />
        <div className="divide-y divide-light-gray rounded-2xl border border-light-gray bg-white">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-navy focus:outline-none focus-visible:text-glacier">
                {q}
                <ChevronDown size={18} aria-hidden className="flex-none text-medium-gray transition-transform group-open:rotate-180" />
              </summary>
              <p className="-mt-1 pb-5 text-sm leading-relaxed text-dark-gray">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
