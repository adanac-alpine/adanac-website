'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Check } from 'lucide-react'
import {
  DEFAULT_PRESET,
  DEFAULT_RATE,
  ESTIMATE_STORAGE_KEY,
  EXTRA_PERSON_PRICE,
  PACKAGES,
  PRESETS,
  SUBSCRIPTION_PER_MONTH,
  TASKS,
  TUNE_UP_PER_MONTH,
  WORKING_WEEKS,
  estimate,
  estimateSummary,
  formatPayback,
  money,
  oneDecimal,
  perWeekday,
  type Hours,
  type PackageId,
  type PresetId,
  type TimeUse,
} from '@/lib/aiSavings'

const USE_OPTIONS: { value: TimeUse; label: string }[] = [
  { value: 1, label: 'Bill them' },
  { value: 0.5, label: 'Half & half' },
  { value: 0, label: 'Time off' },
]

type StepId = 1 | 2 | 3

const CARD =
  'rounded-2xl border border-light-gray bg-white shadow-[0_1px_2px_rgba(26,35,50,.04),0_8px_24px_rgba(26,35,50,.06)]'

function StepSection({
  n,
  title,
  summary,
  open,
  done,
  onToggle,
  children,
}: {
  n: StepId
  title: string
  summary: React.ReactNode
  open: boolean
  done: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <section className="border-light-gray [&+&]:border-t">
      <h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`step-${n}`}
          onClick={onToggle}
          className="flex w-full items-center gap-2.5 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-glacier"
        >
          <span
            className={`inline-flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full text-xs font-bold ${
              done && !open ? 'bg-forest text-white' : 'bg-glacier-50 text-glacier'
            }`}
          >
            {done && !open ? <Check size={13} strokeWidth={3} aria-hidden /> : n}
          </span>
          <span className="text-[15px] font-bold text-navy">{title}</span>
          {!open && (
            <span className="ml-auto min-w-0 truncate pl-2 text-right text-[13px] font-medium text-medium-gray">
              {summary}
            </span>
          )}
          <ChevronDown
            size={18}
            aria-hidden
            className={`flex-none text-medium-gray transition-transform ${open ? 'ml-auto rotate-180' : ''}`}
          />
        </button>
      </h2>
      {open && (
        <div id={`step-${n}`} className="px-5 pb-5">
          {children}
        </div>
      )}
    </section>
  )
}

function NextButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <div className="mt-4 flex justify-end">
      <button
        type="button"
        onClick={onClick}
        className="rounded-[10px] bg-navy px-4 py-2 text-sm font-bold text-white hover:bg-navy-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2"
      >
        {children}
      </button>
    </div>
  )
}

export default function AiSavingsCalculator() {
  const [preset, setPreset] = useState<PresetId>(DEFAULT_PRESET)
  const [hours, setHours] = useState<Hours>({ ...PRESETS[DEFAULT_PRESET].hours })
  const [rateInput, setRateInput] = useState(String(DEFAULT_RATE))
  const [pkgId, setPkgId] = useState<PackageId>('everyday')
  const [use, setUse] = useState<TimeUse>(1)
  const [openStep, setOpenStep] = useState<StepId | null>(1)
  const [done, setDone] = useState<Record<StepId, boolean>>({ 1: false, 2: false, 3: false })
  const [showCalc, setShowCalc] = useState(false)
  const resultsRef = useRef<HTMLElement>(null)

  const rate = Math.max(0, parseFloat(rateInput) || 0)
  const pkg = PACKAGES.find((p) => p.id === pkgId) ?? PACKAGES[1]
  const est = useMemo(() => estimate(hours, pkg, rate, use), [hours, pkg, rate, use])
  const days = Math.round(est.savedDaysPerYear)
  const avgPct = est.totalHours ? Math.round((est.savedPerWeek / est.totalHours) * 100) : 0
  const pctFor = (id: string) => Math.round((est.rows.find((r) => r.id === id)?.pct ?? 0) * 100)

  function choosePreset(id: PresetId) {
    setPreset(id)
    setHours({ ...PRESETS[id].hours })
  }

  function toggle(n: StepId) {
    setOpenStep((cur) => (cur === n ? null : n))
  }

  function finish(n: StepId) {
    setDone((d) => ({ ...d, [n]: true }))
    if (n < 3) {
      setOpenStep((n + 1) as StepId)
    } else {
      setOpenStep(null)
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        resultsRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  function handOffEstimate() {
    try {
      sessionStorage.setItem(ESTIMATE_STORAGE_KEY, estimateSummary(PRESETS[preset].label, pkg, rate, use, est))
    } catch {
      // Storage blocked (private mode etc.): the form just opens empty.
    }
  }

  const freed = est.savedPerWeek - est.billedPerWeek
  let story: React.ReactNode
  if (use === 1) {
    story = (
      <>
        <strong>What this looks like:</strong> the {oneDecimal(est.savedPerWeek)} hours you used to spend on paperwork go
        to work clients pay for: billing an extra {oneDecimal(est.savedPerWeek)} hours, taking on one more small job, or
        getting quotes out faster. At ${rate}/h that&apos;s about{' '}
        <strong>{money(est.savedPerWeek * rate)} a week</strong> you weren&apos;t earning before.
      </>
    )
  } else if (use === 0.5) {
    story = (
      <>
        <strong>What this looks like:</strong> you bill about {oneDecimal(est.billedPerWeek)} more hours a week (≈{' '}
        {money(est.billedPerWeek * rate)}) and keep the other {oneDecimal(freed)} for yourself, finishing about{' '}
        <strong>{perWeekday(freed)} earlier every weekday</strong> instead of catching up on email at night.
      </>
    )
  } else {
    story = (
      <>
        <strong>What this looks like:</strong> no extra income, but you finish about{' '}
        <strong>{perWeekday(est.savedPerWeek)} earlier every weekday</strong>: {days} days a year back. Same work, done
        sooner, for {money(est.costFirstYear)} in the first year.
      </>
    )
  }

  const fieldBox =
    'w-full rounded-[10px] border border-light-gray bg-white text-[15px] text-navy focus-within:border-glacier focus-within:ring-[3px] focus-within:ring-glacier-50'

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {/* Inputs: three accordion steps */}
      <div className={`${CARD} overflow-hidden`}>
        <StepSection
          n={1}
          title="Your business"
          summary={`${PRESETS[preset].label} · $${rate}/h`}
          open={openStep === 1}
          done={done[1]}
          onToggle={() => toggle(1)}
        >
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-end">
            <div>
              <label htmlFor="preset" className="mb-1.5 block text-xs font-semibold text-medium-gray">
                Type of work (sets typical hours)
              </label>
              <select
                id="preset"
                value={preset}
                onChange={(e) => choosePreset(e.target.value as PresetId)}
                className={`${fieldBox} px-2.5 py-2 focus:outline-none`}
              >
                {(Object.keys(PRESETS) as PresetId[]).map((id) => (
                  <option key={id} value={id}>
                    {PRESETS[id].label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="rate" className="mb-1.5 block text-xs font-semibold text-medium-gray">
                Your hourly rate
              </label>
              <div className={`${fieldBox} flex items-center overflow-hidden`}>
                <span className="pl-2.5 pr-1 text-sm text-medium-gray">$</span>
                <input
                  id="rate"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={5}
                  value={rateInput}
                  onChange={(e) => setRateInput(e.target.value)}
                  className="w-full min-w-0 bg-transparent px-1.5 py-2 outline-none"
                />
              </div>
            </div>
          </div>
          <NextButton onClick={() => finish(1)}>Next: your week →</NextButton>
        </StepSection>

        <StepSection
          n={2}
          title="Your week today, without AI"
          summary={
            <>
              <span data-testid="total-hours">{oneDecimal(est.totalHours)}</span> h/wk of admin
            </>
          }
          open={openStep === 2}
          done={done[2]}
          onToggle={() => toggle(2)}
        >
          <div className="mb-1.5 flex items-baseline justify-between gap-3 rounded-[10px] bg-glacier-50 px-3.5 py-2.5">
            <div className="text-[13px] font-semibold text-navy">
              Admin &amp; paperwork per week
              <span className="block text-xs font-medium text-medium-gray">Adjust each task to match your week</span>
            </div>
            <div className="whitespace-nowrap text-[26px] font-extrabold tracking-tight text-navy tabular-nums">
              <span data-testid="total-hours-box">{oneDecimal(est.totalHours)}</span>{' '}
              <small className="text-[13px] font-semibold text-medium-gray">h/wk</small>
            </div>
          </div>
          {TASKS.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-[minmax(0,1fr)_56px] items-center gap-x-3 gap-y-1 border-dashed border-light-gray py-1.5 [&:not(:first-of-type)]:border-t sm:grid-cols-[minmax(0,1fr)_minmax(90px,1fr)_56px]"
            >
              <label htmlFor={`h-${t.id}`} className="text-sm font-semibold text-navy">
                {t.label}
                <span
                  className="ml-1.5 inline-block rounded bg-forest-50 px-1.5 py-px align-[1px] text-[11px] font-semibold text-forest"
                  title={`AI typically saves about ${pctFor(t.id)}% of this time with the ${pkg.name} package`}
                >
                  −{pctFor(t.id)}%
                </span>
                <span className="block text-xs font-medium text-medium-gray">{t.hint}</span>
              </label>
              <input
                id={`h-${t.id}`}
                type="range"
                min={0}
                max={20}
                step={0.5}
                value={hours[t.id]}
                onChange={(e) => setHours((h) => ({ ...h, [t.id]: parseFloat(e.target.value) }))}
                className="col-span-2 row-start-2 m-0 w-full accent-glacier sm:col-span-1 sm:row-start-auto"
              />
              <div className="col-start-2 row-start-1 whitespace-nowrap text-right text-sm font-bold tabular-nums sm:col-start-auto sm:row-start-auto">
                {hours[t.id]} <small className="font-medium text-medium-gray">h</small>
              </div>
            </div>
          ))}
          <p className="mt-2 text-xs text-medium-gray">
            Green tags show the typical time AI saves on each task with the {pkg.name} package.
          </p>
          <NextButton onClick={() => finish(2)}>Next: choose a package →</NextButton>
        </StepSection>

        <StepSection
          n={3}
          title="Choose a setup package"
          summary={`${pkg.name} · ${pkg.fromPrice ? 'from ' : ''}${money(pkg.price)}`}
          open={openStep === 3}
          done={done[3]}
          onToggle={() => toggle(3)}
        >
          <div className="grid gap-2.5 sm:grid-cols-3" role="group" aria-label="Setup package">
            {PACKAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={p.id === pkgId}
                onClick={() => setPkgId(p.id)}
                className={`flex flex-col gap-1 rounded-xl border-[1.5px] bg-white p-3 text-left text-navy transition hover:border-glacier focus:outline-none focus-visible:ring-2 focus-visible:ring-glacier ${
                  p.id === pkgId ? 'border-navy shadow-[0_0_0_1px_#1a2332]' : 'border-light-gray'
                }`}
              >
                <span className="flex justify-between gap-1.5 text-sm font-bold">
                  {p.name}
                  {p.badge && (
                    <span className="self-center rounded bg-forest-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-forest">
                      {p.badge}
                    </span>
                  )}
                </span>
                <span className="text-lg font-extrabold tabular-nums">
                  {p.fromPrice && <small className="mr-1 text-xs font-medium text-medium-gray">from</small>}
                  {money(p.price)}
                  <small className="block text-xs font-medium text-medium-gray">+GST, one-time</small>
                </span>
                <ul className="mt-0.5 list-disc pl-4 text-xs text-medium-gray">
                  {p.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <span className="mt-auto pt-1.5 text-xs font-semibold text-glacier-600">{p.effect}</span>
              </button>
            ))}
          </div>
          <p className="mt-3.5 text-xs text-medium-gray">
            Packages cover up to 3 people (+{money(EXTRA_PERSON_PRICE)} per extra person). Optional tune-ups after
            support ends: {money(TUNE_UP_PER_MONTH)}/month. Microsoft 365 / Copilot setups may cost more.
          </p>
          <p className="mt-1.5 text-xs text-medium-gray">
            <strong className="font-semibold text-navy">Estimate assumes:</strong> one person · AI assistant
            subscription ${SUBSCRIPTION_PER_MONTH}/month · {WORKING_WEEKS} working weeks a year · you review everything
            before it goes out.
          </p>
          <NextButton onClick={() => finish(3)}>See my results</NextButton>
        </StepSection>
      </div>

      {/* Results */}
      <aside ref={resultsRef} aria-live="polite" className={`${CARD} scroll-mt-4 p-5 lg:sticky lg:top-24`}>
        <div className="rounded-xl bg-navy px-[18px] py-4 text-white">
          <div className="flex flex-wrap items-baseline justify-between gap-2.5">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-navy-200">Time back each week</div>
              <div className="text-[40px] font-extrabold leading-tight tracking-tight tabular-nums">
                <span data-testid="saved-hours">{oneDecimal(est.savedPerWeek)}</span>{' '}
                <small className="text-[15px] font-semibold tracking-normal text-navy-200">hours</small>
              </div>
            </div>
            {est.savedPerWeek > 0 && <div className="text-[13px] text-navy-100">≈ {days} working days a year</div>}
          </div>
          <button
            type="button"
            aria-expanded={showCalc}
            aria-controls="calc-breakdown"
            onClick={() => setShowCalc((v) => !v)}
            className="mt-1 inline-flex items-center gap-1 rounded text-[12.5px] font-semibold text-glacier-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-glacier"
          >
            How is this calculated?
            <ChevronDown size={14} aria-hidden className={`transition-transform ${showCalc ? 'rotate-180' : ''}`} />
          </button>
          {showCalc && (
            <div id="calc-breakdown">
              <table className="mt-2 w-full border-collapse text-[12.5px] tabular-nums" aria-label="How the hours are calculated">
                <tbody>
                  {est.rows
                    .filter((r) => r.hours > 0)
                    .map((r) => (
                      <tr key={r.id} className="border-t border-white/10 text-navy-100">
                        <td className="py-1">{r.label}</td>
                        <td className="whitespace-nowrap py-1 pl-2 text-right">
                          {oneDecimal(r.hours)} h × {Math.round(r.pct * 100)}%
                        </td>
                        <td className="w-[52px] py-1 text-right font-bold text-white">{oneDecimal(r.saved)} h</td>
                      </tr>
                    ))}
                  <tr className="border-t border-white/35 font-bold text-white">
                    <td className="py-1">Total</td>
                    <td className="whitespace-nowrap py-1 pl-2 text-right">
                      {oneDecimal(est.totalHours)} h × {avgPct}% avg
                    </td>
                    <td className="py-1 text-right">{oneDecimal(est.savedPerWeek)} h</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-[11.5px] text-navy-200">
                Your hours on each task × the share AI typically takes off it with the {pkg.name} package. AI drafts,
                summarises and sorts; you still check and send.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="mb-2 text-sm font-bold text-navy">What will you do with those hours?</h3>
          <div className="flex gap-0.5 rounded-[10px] border border-light-gray bg-off-white p-[3px]" role="group" aria-label="How you'll use the time">
            {USE_OPTIONS.map((o) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={use === o.value}
                onClick={() => setUse(o.value)}
                className={`flex-1 rounded-lg px-1.5 py-[7px] text-[13px] font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-glacier ${
                  use === o.value ? 'bg-white text-navy shadow-[0_1px_3px_rgba(26,35,50,.12)]' : 'text-medium-gray'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 overflow-hidden rounded-xl border border-light-gray">
          <table className="w-full border-collapse text-[13.5px] tabular-nums">
            <tbody className="[&_td]:px-3 [&_td]:py-2 [&_tr+tr_td]:border-t [&_tr+tr_td]:border-light-gray">
              <tr>
                <td>
                  {use === 0 ? 'Extra income' : 'Extra income from the freed hours'}
                  <small className="block text-[11.5px] text-medium-gray">
                    {use === 0
                      ? "None: you're taking the time off"
                      : `${oneDecimal(est.billedPerWeek)} h/wk × $${rate} × ${WORKING_WEEKS} weeks`}
                  </small>
                </td>
                <td className="whitespace-nowrap text-right font-bold">{money(est.incomePerYear)}</td>
              </tr>
              <tr>
                <td>
                  AI subscription
                  <small className="block text-[11.5px] text-medium-gray">${SUBSCRIPTION_PER_MONTH}/month × 12</small>
                </td>
                <td className="whitespace-nowrap text-right font-bold text-medium-gray">−{money(est.subscriptionPerYear)}</td>
              </tr>
              <tr>
                <td>
                  {pkg.name} setup (one-time{pkg.fromPrice ? ', from' : ''})
                </td>
                <td className="whitespace-nowrap text-right font-bold text-medium-gray">−{money(est.setupFee)}</td>
              </tr>
              {use > 0 ? (
                <tr className="bg-forest-50 font-bold">
                  <td>Net, first year</td>
                  <td className="whitespace-nowrap text-right text-lg text-forest" data-testid="net">
                    {money(est.netFirstYear)}
                  </td>
                </tr>
              ) : (
                <tr className="bg-forest-50 font-bold">
                  <td>
                    Cost, first year
                    <small className="block text-[11.5px] font-medium text-medium-gray">
                      In exchange for {days} days of your time back
                    </small>
                  </td>
                  <td className="whitespace-nowrap text-right text-lg text-navy" data-testid="net">
                    {money(est.costFirstYear)}
                  </td>
                </tr>
              )}
              {use > 0 && (
                <tr className="text-[12.5px] text-medium-gray">
                  <td>Setup pays for itself in</td>
                  <td className="whitespace-nowrap text-right font-bold text-navy">{formatPayback(est.paybackWeeks)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 rounded-r-[10px] border-l-[3px] border-forest bg-off-white px-3 py-2.5 text-[13px] text-dark-gray">
          {story}
        </p>

        <Link
          href="/#contact"
          onClick={handOffEstimate}
          className="mt-3.5 block rounded-[10px] bg-glacier px-3 py-[11px] text-center text-sm font-bold text-white hover:bg-glacier-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2"
        >
          Book a free 30-min call
        </Link>
        <p className="mt-1.5 text-center text-[11.5px] text-medium-gray">Your estimate is added to the message for you.</p>
        <p className="mt-2.5 text-[11.5px] text-medium-gray">
          Estimates only. Real savings depend on your tools, your data and how closely the setup fits your work. Prices
          in CAD.
        </p>
      </aside>
    </div>
  )
}
