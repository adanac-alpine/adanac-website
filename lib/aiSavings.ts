// Data and maths for the AI time-savings calculator (/ai-savings).
// Kept free of React so the numbers can be unit-tested on their own.

export type TaskId = 'email' | 'meetings' | 'drafting' | 'reading' | 'admin'

export interface Task {
  id: TaskId
  label: string
  hint: string
  /** Share of the task's time AI typically removes, on the Everyday Assistant package. */
  cut: number
}

// Per-task cuts sit below lab-study results (e.g. 40% less time on writing tasks, Noy & Zhang, Science 2023)
// because real-world averages are lower (Microsoft Copilot studies 2023-25, UK government trial 2025).
export const TASKS: Task[] = [
  { id: 'email', label: 'Email', hint: 'Reading, sorting, replying', cut: 0.25 },
  { id: 'meetings', label: 'Meeting notes', hint: 'Write-ups, decisions, actions', cut: 0.5 },
  { id: 'drafting', label: 'Drafting & reports', hint: 'Quotes, proposals, letters, reports', cut: 0.35 },
  { id: 'reading', label: 'Long documents', hint: 'Contracts, specs, RFPs', cut: 0.35 },
  { id: 'admin', label: 'Admin & filing', hint: 'Scheduling, files, photos, to-dos', cut: 0.15 },
]

export type Hours = Record<TaskId, number>

export type PresetId = 'professional' | 'trades' | 'retail' | 'custom'

export const PRESETS: Record<PresetId, { label: string; short: string; hours: Hours }> = {
  professional: {
    label: 'Professional services',
    short: 'Professional',
    hours: { email: 6, meetings: 2, drafting: 3.5, reading: 2, admin: 3 },
  },
  trades: {
    label: 'Trades & field services',
    short: 'Trades',
    hours: { email: 2, meetings: 1, drafting: 3, reading: 0.5, admin: 3.5 },
  },
  retail: {
    label: 'Retail & hospitality',
    short: 'Retail',
    hours: { email: 2, meetings: 0.5, drafting: 2, reading: 0.5, admin: 3.5 },
  },
  custom: {
    label: 'Other or mixed',
    short: 'Other',
    hours: { email: 3, meetings: 1.5, drafting: 3, reading: 1.5, admin: 2 },
  },
}

export type PackageId = 'quick' | 'everyday' | 'tailored'

export interface Package {
  id: PackageId
  name: string
  /** One-time price, CAD, before GST. Used as-is in the maths. */
  price: number
  /** Show the price as "from $X" (scope-dependent). */
  fromPrice?: boolean
  /** Scales each task's cut: a more tailored setup saves more. */
  factor: number
  /** Working days the setup takes, at about 2 hours a day of the client's time. */
  days: number
  effect: string
  badge?: string
  items: string[]
}

// Prices per Nov 2026 market research (BC, ~$150/h effective). Cover up to 3 people.
export const PACKAGES: Package[] = [
  {
    id: 'quick',
    name: 'Quick Start',
    price: 850,
    factor: 0.7,
    days: 1,
    effect: 'Lighter savings (≈70% of typical)',
    items: [
      'AI assistant set up on your subscription, with privacy settings checked',
      'Connected to your email and calendar',
      'One 2-hour hands-on session',
      '14 days of email support',
    ],
  },
  {
    id: 'everyday',
    name: 'Everyday Assistant',
    price: 1950,
    factor: 1,
    days: 3,
    effect: 'Typical savings (baseline)',
    badge: 'Recommended',
    items: [
      'Everything in Quick Start',
      'Files and meeting notes connected',
      'Workflows for your 3 most time-consuming tasks',
      'Three 2-hour sessions on your real work',
      '30 days of support',
    ],
  },
  {
    id: 'tailored',
    name: 'Tailored',
    price: 3800,
    fromPrice: true,
    factor: 1.25,
    days: 5,
    effect: 'Bigger savings (≈125% of typical)',
    items: [
      'Everything in Everyday Assistant',
      'Templates for your quotes, reports and letters',
      'A morning brief of what needs you today',
      'Five 2-hour sessions on your real work',
      '60 days of support and tune-ups',
    ],
  },
]

export const EXTRA_PERSON_PRICE = 200
export const TUNE_UP_PER_MONTH = 250

/** Share of freed hours put to paid work: bill all, half, or take the time off. */
export type TimeUse = 1 | 0.5 | 0

export const DEFAULT_RATE = 120
export const DEFAULT_PRESET: PresetId = 'professional'
/** Default answer to "What will you do with those hours?": bill half, keep half. */
export const DEFAULT_USE: TimeUse = 0.5
/** Approximate CAD per person per month; varies by AI tool (Claude Pro is about $28). */
export const SUBSCRIPTION_PER_MONTH = 28
export const WORKING_WEEKS = 46
export const MAX_CUT = 0.75

export interface TaskResult {
  id: TaskId
  label: string
  hours: number
  pct: number
  saved: number
}

export interface Estimate {
  rows: TaskResult[]
  totalHours: number
  savedPerWeek: number
  savedDaysPerYear: number
  billedPerWeek: number
  incomePerYear: number
  subscriptionPerYear: number
  setupFee: number
  netFirstYear: number
  costFirstYear: number
  /** Weeks until the setup fee is earned back; null when it never is. */
  paybackWeeks: number | null
}

export function estimate(hours: Hours, pkg: Package, rate: number, use: TimeUse): Estimate {
  const rows = TASKS.map((t) => {
    const pct = Math.min(MAX_CUT, t.cut * pkg.factor)
    const h = Math.max(0, hours[t.id] ?? 0)
    return { id: t.id, label: t.label, hours: h, pct, saved: h * pct }
  })
  const totalHours = rows.reduce((s, r) => s + r.hours, 0)
  const savedPerWeek = rows.reduce((s, r) => s + r.saved, 0)
  const safeRate = Number.isFinite(rate) && rate > 0 ? rate : 0
  const billedPerWeek = savedPerWeek * use
  const incomePerYear = billedPerWeek * safeRate * WORKING_WEEKS
  const subscriptionPerYear = SUBSCRIPTION_PER_MONTH * 12
  const netPerWeek = billedPerWeek * safeRate - subscriptionPerYear / 52
  return {
    rows,
    totalHours,
    savedPerWeek,
    savedDaysPerYear: (savedPerWeek * WORKING_WEEKS) / 8,
    billedPerWeek,
    incomePerYear,
    subscriptionPerYear,
    setupFee: pkg.price,
    netFirstYear: incomePerYear - subscriptionPerYear - pkg.price,
    costFirstYear: subscriptionPerYear + pkg.price,
    paybackWeeks: netPerWeek > 0 ? pkg.price / netPerWeek : null,
  }
}

export function formatPayback(weeks: number | null): string {
  if (weeks === null) return 'n/a'
  if (weeks < 9) return `${Math.max(1, Math.ceil(weeks))} weeks`
  return `${Math.ceil(weeks / 4.33)} months`
}

/** Hours per week spread over 5 weekdays, rounded to 15 minutes. */
export function perWeekday(hoursPerWeek: number): string {
  const mins = Math.round(((hoursPerWeek / 5) * 60) / 15) * 15
  return mins >= 60 ? `${oneDecimal(mins / 60)} h` : `${mins} min`
}

export function oneDecimal(n: number): string {
  return (Math.round(n * 10) / 10).toString()
}

export function money(n: number): string {
  return (n < 0 ? '−$' : '$') + Math.round(Math.abs(n)).toLocaleString('en-CA')
}

/** Window event (detail: summary string) that hands the estimate to the contact form on the same page. */
export const ESTIMATE_EVENT = 'adanac:ai-savings-estimate'

const USE_TEXT: Record<TimeUse, string> = {
  1: 'If I bill the freed hours',
  0.5: 'If I bill half the freed hours',
  0: 'Taking the time off',
}

/** Plain-text summary used to pre-fill the contact form message. */
export function estimateSummary(presetLabel: string, pkg: Package, rate: number, use: TimeUse, e: Estimate): string {
  const days = Math.round(e.savedDaysPerYear)
  return [
    "Hi Sergey, I tried the AI time-savings calculator and I'd like to talk about a setup.",
    '',
    `My estimate (${presetLabel}, ${pkg.name} package):`,
    `• Admin now: ${oneDecimal(e.totalHours)} h/week → about ${oneDecimal(e.savedPerWeek)} h/week saved (~${days} working days a year)`,
    use > 0
      ? `• ${USE_TEXT[use]} at $${rate}/h: about ${money(e.incomePerYear)}/year`
      : `• ${USE_TEXT[use]}: no extra income`,
    `• Costs: AI subscription ~${money(e.subscriptionPerYear)}/year + setup ${pkg.fromPrice ? 'from ' : ''}${money(e.setupFee)} + GST`,
    use > 0
      ? `• Net, first year: ${money(e.netFirstYear)} · Pays back in ${formatPayback(e.paybackWeeks)}`
      : `• First-year cost: ${money(e.costFirstYear)}`,
    '',
    'What takes most of my week: ',
  ].join('\n')
}
