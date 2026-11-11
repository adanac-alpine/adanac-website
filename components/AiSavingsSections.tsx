'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  BookOpen,
  CalendarCheck,
  Check,
  ChevronDown,
  FileText,
  GraduationCap,
  Mail,
  NotebookPen,
  Phone,
  Settings,
} from 'lucide-react'
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
  money,
  oneDecimal,
} from '@/lib/aiSavings'

const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2'
const primaryButton = `rounded-xl bg-glacier-600 font-bold text-white shadow-lg shadow-glacier/25 transition-colors hover:bg-glacier-700 ${focusRing}`
const textLink = 'font-semibold text-glacier-700 underline-offset-2 hover:underline'

const SOURCES = [
  {
    label: 'MIT / Science, 2023',
    href: 'https://economics.mit.edu/news/study-finds-chatgpt-boosts-worker-productivity-some-writing-tasks',
  },
  {
    label: 'Microsoft, 2023',
    href: 'https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work',
  },
  {
    label: 'UK government, 2025',
    href: 'https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report/microsoft-365-copilot-experiment-cross-government-findings-report-html',
  },
]

function SourceLinks() {
  return (
    <>
      {SOURCES.map((s, i) => (
        <span key={s.href}>
          {i > 0 && ', '}
          <a href={s.href} target="_blank" rel="noopener noreferrer" className={textLink}>
            {s.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </span>
      ))}
    </>
  )
}

function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <span className={`text-xs font-bold uppercase tracking-widest ${onDark ? 'text-glacier-300' : 'text-glacier-700'}`}>
      {children}
    </span>
  )
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
  'Runs on your own accounts and AI subscription',
  `Fixed prices from ${money(PACKAGES[0].price)} + GST`,
]

export function LandingHero() {
  const examplePkg = PACKAGES.find((p) => p.id === 'everyday') ?? PACKAGES[1]
  // Hours only: the money depends on whether you bill the freed time, which the calculator asks.
  const example = estimate(PRESETS[DEFAULT_PRESET].hours, examplePkg, DEFAULT_RATE, 0)
  const minDays = Math.min(...PACKAGES.map((p) => p.days))
  const maxDays = Math.max(...PACKAGES.map((p) => p.days))

  return (
    <section id="hero" className="relative overflow-hidden bg-navy pb-20 pt-32 text-white sm:pb-24 sm:pt-36">
      <TrianglePattern variant="dark" opacity={0.04} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 container mx-auto grid items-center gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <FadeIn y={16} scale={1}>
          <div className="space-y-6">
            <Eyebrow onDark>AI assistant setup for BC small businesses</Eyebrow>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
              Get hours back from email and paperwork every week
            </h1>
            <p className="max-w-xl text-lg text-white/75">
              I connect an AI assistant like ChatGPT or Claude to your email, calendar and files, set it up for the way
              you work, and train you to use it. It drafts and sorts. You check and send.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#calculator" className={`${primaryButton} px-6 py-3.5 focus-visible:ring-offset-navy`}>
                Estimate my savings
              </a>
              <a
                href="#contact"
                className={`rounded-xl border border-white/25 px-6 py-3.5 font-bold text-white transition-colors hover:border-white hover:bg-white/10 ${focusRing} focus-visible:ring-offset-navy`}
              >
                Book a free call
              </a>
            </div>
            <ul className="grid gap-2 pt-4 text-sm text-white/75 sm:grid-cols-3 sm:gap-4">
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
            <div className="text-xs font-semibold uppercase tracking-widest text-white/60">Example: professional services</div>
            <div className="mt-2 text-6xl font-extrabold tracking-tight tabular-nums">
              {oneDecimal(example.savedPerWeek)}
              <span className="ml-2 text-xl font-semibold text-white/70">hours a week</span>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="text-white/60">Working days back a year</dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums">≈ {Math.round(example.savedDaysPerYear)}</dd>
              </div>
              <div>
                <dt className="text-white/60">Setup takes</dt>
                <dd className="mt-1 text-2xl font-bold">
                  {minDays}–{maxDays} days
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-xs text-white/60">
              Based on {oneDecimal(example.totalHours)} h/week of admin, the {examplePkg.name} package and $
              {DEFAULT_RATE}/h. Your numbers will differ. Try the calculator below.
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
    body: 'Long threads summarized, urgent items flagged, replies drafted in your voice. You review and send.',
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
    body: 'Contracts, specs and RFPs boiled down to what matters, with key dates and obligations pulled out.',
  },
  {
    task: 'admin',
    icon: CalendarCheck,
    title: 'Admin & scheduling',
    body: 'Meeting times found, invites drafted, files named and to-dos pulled out of your inbox.',
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PLATE.map(({ task, icon: Icon, title, body }) => {
              const cut = TASKS.find((t) => t.id === task)?.cut ?? 0
              return (
                <StaggerItem key={task}>
                  <div className="h-full rounded-2xl border border-light-gray bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy/5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-glacier-50 text-glacier-700">
                        <Icon size={22} strokeWidth={1.75} aria-hidden />
                      </span>
                      <span className="rounded-md bg-forest-50 px-2 py-1 text-xs font-semibold text-forest">
                        saves ~{Math.round(cut * 100)}%
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
        <p className="mt-6 max-w-3xl text-sm text-dark-gray">
          Typical estimates for a well-set-up assistant, not guarantees. They&apos;re based on published studies of AI on
          writing, email and meeting tasks (<SourceLinks />
          ). Real results vary. The calculator uses the same figures.
        </p>
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
          title="How many hours could you get back?"
          intro="Three quick steps, about a minute. Start from a typical week for your type of business, then adjust."
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
    body: 'I connect an AI assistant to your email, calendar and files on your own subscription, and set it up for your work. Done in 1–5 days depending on the package, with about 2 hours a day of your time.',
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
                    <span className="text-xs font-bold uppercase tracking-widest text-glacier-700">Step 0{i + 1}</span>
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

/* ---------- Who you'll work with ---------- */

export function AboutBlock() {
  return (
    <section id="about-me" className="bg-white pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-light-gray bg-off-white p-7 sm:flex-row sm:items-center sm:p-9">
            <Image
              src="/images/sergey-headshot.jpg"
              alt="Sergey Pochikovskiy"
              width={112}
              height={112}
              className="h-24 w-24 flex-none rounded-full object-cover sm:h-28 sm:w-28"
            />
            <div className="space-y-2">
              <Eyebrow>Who you&apos;ll work with</Eyebrow>
              <p className="max-w-3xl text-lg font-medium leading-relaxed text-navy">
                I&apos;m Sergey Pochikovskiy, a Squamish-based consultant with 16 years in banking systems, where data
                security comes first. I do every setup myself, on your accounts, and train you on your real work.
              </p>
              <Link href="/#about" className={`inline-block rounded text-sm ${textLink} ${focusRing}`}>
                More about me →
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */

const dayCount = (d: number) => `${d} ${d === 1 ? 'day' : 'days'}`

export const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Is my business data safe?',
    a: "Your email and files stay in your own accounts. The assistant reads them only when you ask, through your own AI subscription, under the provider's business privacy terms. I'll set you up on a plan and settings where your data isn't used to train AI models. I don't keep your logins or copies of your data: what I bring, and keep, is the workflows and know-how.",
  },
  {
    q: 'How long does setup take?',
    a: `Done in 1–5 days depending on the package: ${PACKAGES.map((p) => `${dayCount(p.days)} for ${p.name}`).join(', ')}. Plan on about 2 hours a day of your time to learn and try things on your real work.`,
  },
  {
    q: 'Do you work remotely or on-site?',
    a: "Remote anywhere in BC. On-site if you're in Squamish.",
  },
  {
    q: "What if it doesn't save me time?",
    a: "If it isn't saving you time 30 days after setup, I'll run one extra tune-up session free. That applies when you've done the learning sessions during setup.",
  },
  {
    q: 'Which AI tool do you use?',
    a: 'Usually Claude or ChatGPT, whichever fits your tools and budget best. If you already pay for Microsoft Copilot or Google Gemini, we can start there.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'No. If you can use email and a phone app, you can use this. Training is hands-on, using your own real work, not generic examples.',
  },
  {
    q: 'I use Outlook / Microsoft 365. Does that work?',
    a: "Yes. Microsoft setups can need extra admin permissions, so they may cost a little more. I'll confirm on our call before you commit.",
  },
  {
    q: 'What does it cost after setup?',
    a: `Just the AI subscription, about $${SUBSCRIPTION_PER_MONTH}/month per person, depending on the AI tool you choose, paid directly to the provider. Optional tune-ups are ${money(TUNE_UP_PER_MONTH)}/month once the included support ends.`,
  },
  {
    q: 'Are prices before tax? How many people are covered?',
    a: `All prices are in CAD and exclude GST. Each package covers up to 3 people; each extra person is ${money(EXTRA_PERSON_PRICE)}.`,
  },
  {
    q: 'How accurate is the calculator?',
    a: (
      <>
        It&apos;s an estimate: your hours times typical savings per task. The per-task figures come from published
        studies (<SourceLinks />
        ), set below their lab results because everyday gains are smaller. Real results depend on your work and how much
        you use the assistant. We&apos;ll check the numbers together on the call.
      </>
    ),
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="bg-off-white py-24">
      <div className="container mx-auto grid gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <SectionHeading eyebrow="FAQ" title="Common questions" intro="Something else on your mind? Ask me on the call." />
        <div className="divide-y divide-light-gray rounded-2xl border border-light-gray bg-white">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="-mx-2 flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-2 py-5 text-left font-semibold text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-glacier">
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
