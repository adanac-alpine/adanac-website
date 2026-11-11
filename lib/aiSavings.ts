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

export const TASKS: Task[] = [
  { id: 'email', label: 'Email', hint: 'Reading, sorting, replying', cut: 0.4 },
  { id: 'meetings', label: 'Meeting notes', hint: 'Write-ups, decisions, actions', cut: 0.6 },
  { id: 'drafting', label: 'Drafting & reports', hint: 'Letters, quotes, progress reports', cut: 0.5 },
  { id: 'reading', label: 'Long documents', hint: 'Contracts, specs, RFPs', cut: 0.45 },
  { id: 'admin', label: 'Admin & filing', hint: 'Scheduling, files, photos, to-dos', cut: 0.25 },
]

export type Hours = Record<TaskId, number>

export type PresetId = 'professional' | 'trades' | 'retail' | 'custom'

export const PRESETS: Record<PresetId, { label: string; hours: Hours }> = {
  professional: {
    label: 'Professional services',
    hours: { email: 6, meetings: 2, drafting: 3.5, reading: 2, admin: 3 },
  },
  trades: {
    label: 'Trades & field services',
    hours: { email: 2, meetings: 1, drafting: 3, reading: 0.5, admin: 3.5 },
  },
  retail: {
    label: 'Retail & hospitality',
    hours: { email: 2, meetings: 0.5, drafting: 2, reading: 0.5, admin: 3.5 },
  },
  custom: {
    label: 'Something else',
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
    effect: '70% of typical savings',
    items: ['AI assistant set up on your accounts', 'Connected to email & calendar', 'One training session'],
  },
  {
    id: 'everyday',
    name: 'Everyday Assistant',
    price: 1950,
    factor: 1,
    effect: 'Typical savings',
    badge: 'Popular',
    items: ['Everything in Quick Start', 'Files, notes & email drafting set up', '2 sessions + 30 days support'],
  },
  {
    id: 'tailored',
    name: 'Tailored',
    price: 3800,
    fromPrice: true,
    factor: 1.25,
    effect: '125% of typical savings',
    items: ['Everything in Everyday Assistant', 'Reports & daily brief in your voice', '60 days of tune-ups'],
  },
]

export const EXTRA_PERSON_PRICE = 200
export const TUNE_UP_PER_MONTH = 250

/** Share of freed hours put to paid work: bill all, half, or take the time off. */
export type TimeUse = 1 | 0.5 | 0

export const DEFAULT_RATE = 120
export const DEFAULT_PRESET: PresetId = 'professional'
export const SUBSCRIPTION_PER_MONTH = 30
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
  1: 'billing the freed hours',
  0.5: 'billing half the freed hours',
  0: 'taking the time off',
}

/** Plain-text summary used to pre-fill the contact form message. */
export function estimateSummary(presetLabel: string, pkg: Package, rate: number, use: TimeUse, e: Estimate): string {
  const days = Math.round(e.savedDaysPerYear)
  return [
    "Hi Sergey, I used the AI time-savings calculator and I'd like to talk about a setup.",
    '',
    `My estimate (${presetLabel}, ${pkg.name} package):`,
    `• Admin today: ${oneDecimal(e.totalHours)} h/week → AI saves ~${oneDecimal(e.savedPerWeek)} h/week (~${days} days/year)`,
    `• Assuming ${USE_TEXT[use]} at $${rate}/h: ${money(e.incomePerYear)}/year extra`,
    `• Costs: subscription ${money(e.subscriptionPerYear)}/year + setup ${pkg.fromPrice ? 'from ' : ''}${money(e.setupFee)}`,
    use > 0
      ? `• Net, first year: ${money(e.netFirstYear)} · Pays back in ${formatPayback(e.paybackWeeks)}`
      : `• First-year cost: ${money(e.costFirstYear)}`,
  ].join('\n')
}
