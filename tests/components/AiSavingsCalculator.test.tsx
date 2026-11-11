import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AiSavingsCalculator from '../../components/AiSavingsCalculator'
import Contact from '../../components/Contact'
import {
  DEFAULT_RATE,
  DEFAULT_USE,
  ESTIMATE_EVENT,
  PACKAGES,
  PRESETS,
  SUBSCRIPTION_PER_MONTH,
  estimate,
  estimateSummary,
  formatPayback,
  perWeekday,
} from '../../lib/aiSavings'

const everyday = PACKAGES.find((p) => p.id === 'everyday')!
const tailored = PACKAGES.find((p) => p.id === 'tailored')!
const pro = PRESETS.professional.hours

describe('estimate()', () => {
  it('saves about 4.9 h/week for professional services on Everyday Assistant', () => {
    const e = estimate(pro, everyday, 120, 1)
    expect(e.totalHours).toBe(16.5)
    expect(e.savedPerWeek).toBeCloseTo(4.875, 5)
    expect(Math.round(e.savedDaysPerYear)).toBe(28)
    expect(Math.round(e.incomePerYear)).toBe(26910)
    expect(Math.round(e.netFirstYear)).toBe(24624)
  })

  it('defaults to billing half the freed hours, paying back in about 7 weeks', () => {
    const e = estimate(pro, everyday, 120, DEFAULT_USE)
    expect(DEFAULT_USE).toBe(0.5)
    expect(Math.round(e.netFirstYear)).toBe(11169)
    expect(formatPayback(e.paybackWeeks)).toBe('7 weeks')
  })

  it('scales savings with the package factor', () => {
    const base = estimate(pro, everyday, 120, 1).savedPerWeek
    const more = estimate(pro, tailored, 120, 1).savedPerWeek
    expect(more).toBeCloseTo(base * 1.25, 5)
  })

  it('earns nothing and never pays back when the time is taken off', () => {
    const e = estimate(pro, everyday, 120, 0)
    expect(e.incomePerYear).toBe(0)
    expect(e.paybackWeeks).toBeNull()
    expect(e.costFirstYear).toBe(SUBSCRIPTION_PER_MONTH * 12 + everyday.price)
  })

  it('computes first-year net as income minus subscription and setup', () => {
    const e = estimate(pro, everyday, 120, 1)
    expect(e.netFirstYear).toBeCloseTo(e.savedPerWeek * 120 * 46 - SUBSCRIPTION_PER_MONTH * 12 - everyday.price, 5)
  })

  it('treats a blank or negative rate as zero', () => {
    expect(estimate(pro, everyday, NaN, 1).incomePerYear).toBe(0)
    expect(estimate(pro, everyday, -5, 1).incomePerYear).toBe(0)
  })

  it('builds a contact-form summary with the key numbers', () => {
    const e = estimate(pro, everyday, 120, 1)
    const text = estimateSummary('Professional services', everyday, 120, 1, e)
    expect(text).toContain('Everyday Assistant package')
    expect(text).toContain('about 4.9 h/week saved')
    expect(text).toContain('If I bill the freed hours at $120/h')
    expect(text).toContain('+ GST')
    expect(text).toContain('Pays back in')
    expect(text.trimEnd().endsWith('What takes most of my week:')).toBe(true)
  })
})

describe('formatting helpers', () => {
  it('formats payback in weeks, then months', () => {
    expect(formatPayback(null)).toBe('n/a')
    expect(formatPayback(2.2)).toBe('3 weeks')
    expect(formatPayback(20)).toBe('5 months')
  })

  it('spreads weekly hours over five weekdays', () => {
    expect(perWeekday(7)).toBe('1.5 h')
    expect(perWeekday(2.5)).toBe('30 min')
  })
})

describe('AiSavingsCalculator', () => {

  const openStep = (name: RegExp) => fireEvent.click(screen.getByRole('button', { name }))

  it('opens on step 1 with the default rate and no construction preset', () => {
    render(<AiSavingsCalculator />)
    expect(screen.getByLabelText(/what an hour of your time is worth/i)).toHaveValue(DEFAULT_RATE)
    expect(screen.queryByRole('option', { name: /construction/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /your business/i })).toHaveAttribute('aria-expanded', 'true')
  })

  it('moves through the steps and leaves only summaries', () => {
    render(<AiSavingsCalculator />)
    fireEvent.click(screen.getByRole('button', { name: /next: your week/i }))
    expect(screen.getAllByRole('slider')).toHaveLength(5)
    fireEvent.click(screen.getByRole('button', { name: /next: pick a package/i }))
    for (const p of PACKAGES) expect(screen.getByRole('button', { name: new RegExp(`^${p.name}`) })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /see my results/i }))
    expect(screen.queryAllByRole('slider')).toHaveLength(0)
    expect(screen.getByRole('button', { name: /your business/i })).toHaveTextContent('$120/h · Professional')
    expect(screen.getByRole('button', { name: /pick a setup package/i })).toHaveTextContent('Everyday Assistant · $1,950')
  })

  it('shows the efficiency gain on each task', () => {
    render(<AiSavingsCalculator />)
    openStep(/your week now/i)
    expect(screen.getByLabelText(/^Email/)).toHaveAttribute('aria-valuetext', '6 hours a week')
    expect(screen.getByText('−25%')).toBeInTheDocument()
    expect(screen.getByText('−50%')).toBeInTheDocument()
  })

  it('shows the weekly total and the hours saved', () => {
    render(<AiSavingsCalculator />)
    expect(screen.getByTestId('total-hours')).toHaveTextContent('16.5')
    expect(screen.getByTestId('saved-hours')).toHaveTextContent('4.9')
  })

  it('updates the total when a task slider moves', () => {
    render(<AiSavingsCalculator />)
    openStep(/your week now/i)
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: '12' } })
    expect(screen.getByTestId('total-hours-box')).toHaveTextContent('22.5')
  })

  it('loads new hours when the business type changes', () => {
    render(<AiSavingsCalculator />)
    fireEvent.change(screen.getByLabelText(/Type of business/), { target: { value: 'retail' } })
    expect(screen.getByTestId('total-hours')).toHaveTextContent('8.5')
  })

  it('hides the calculation breakdown until asked', () => {
    render(<AiSavingsCalculator />)
    expect(screen.queryByRole('table', { name: /how the hours are calculated/i })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /how is this calculated/i }))
    expect(screen.getByRole('table', { name: /how the hours are calculated/i })).toBeInTheDocument()
  })

  it('starts on "Some of each" and switches to first-year cost when the time is taken off', () => {
    render(<AiSavingsCalculator />)
    expect(screen.getByRole('button', { name: 'Some of each' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByTestId('net')).toHaveTextContent('$11,169')
    fireEvent.click(screen.getByRole('button', { name: 'Take time off' }))
    expect(screen.getByText('Cost, first year')).toBeInTheDocument()
    expect(screen.queryByText(/Net gain, first year/)).not.toBeInTheDocument()
  })

  it('shows a jump-to-results bar while steps are open', () => {
    render(<AiSavingsCalculator />)
    expect(screen.getByRole('button', { name: /see results/i })).toHaveTextContent('4.9 h/week')
    fireEvent.click(screen.getByRole('button', { name: /your business/i }))
    expect(screen.queryByRole('button', { name: /see results/i })).not.toBeInTheDocument()
  })

  it('shows Tailored as a "from" price with GST noted', () => {
    render(<AiSavingsCalculator />)
    openStep(/pick a setup package/i)
    expect(screen.getByRole('button', { name: /^Everyday Assistant/ })).toHaveTextContent('Recommended')
    const tailoredBtn = screen.getByRole('button', { name: /^Tailored/ })
    expect(tailoredBtn).toHaveTextContent(/from\s*\$3,800/)
    expect(tailoredBtn).toHaveTextContent('+GST')
    expect(tailoredBtn).toHaveTextContent('5 days')
  })

  it('has no copy button and links the call-to-action to the on-page form', () => {
    render(<AiSavingsCalculator />)
    expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /send my estimate & book a call/i })).toHaveAttribute('href', '#contact')
  })

  it('pre-fills the contact form on the same page when Book is clicked', () => {
    render(
      <>
        <AiSavingsCalculator />
        <Contact />
      </>,
    )
    fireEvent.click(screen.getByRole('link', { name: /send my estimate & book a call/i }))
    expect((screen.getByLabelText(/message/i) as HTMLTextAreaElement).value).toContain('about 4.9 h/week saved')
  })

  it('updates an earlier pre-fill but never overwrites a message the visitor typed', () => {
    render(<Contact />)
    const send = (text: string) => act(() => window.dispatchEvent(new CustomEvent(ESTIMATE_EVENT, { detail: text })))
    send('Estimate A')
    expect(screen.getByLabelText(/message/i)).toHaveValue('Estimate A')
    send('Estimate B')
    expect(screen.getByLabelText(/message/i)).toHaveValue('Estimate B')
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'My own words' } })
    send('Estimate C')
    expect(screen.getByLabelText(/message/i)).toHaveValue('My own words')
  })
})
