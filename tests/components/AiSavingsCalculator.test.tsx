import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import AiSavingsCalculator from '../../components/AiSavingsCalculator'
import Contact from '../../components/Contact'
import {
  DEFAULT_RATE,
  ESTIMATE_STORAGE_KEY,
  PACKAGES,
  PRESETS,
  estimate,
  estimateSummary,
  formatPayback,
  perWeekday,
} from '../../lib/aiSavings'

const everyday = PACKAGES.find((p) => p.id === 'everyday')!
const tailored = PACKAGES.find((p) => p.id === 'tailored')!
const pro = PRESETS.professional.hours

describe('estimate()', () => {
  it('saves about 7 h/week for professional services on Everyday Assistant', () => {
    const e = estimate(pro, everyday, 120, 1)
    expect(e.totalHours).toBe(16.5)
    expect(e.savedPerWeek).toBeCloseTo(7, 2)
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
    expect(e.costFirstYear).toBe(360 + everyday.price)
  })

  it('computes first-year net as income minus subscription and setup', () => {
    const e = estimate(pro, everyday, 120, 1)
    expect(e.netFirstYear).toBeCloseTo(e.savedPerWeek * 120 * 46 - 360 - everyday.price, 5)
  })

  it('treats a blank or negative rate as zero', () => {
    expect(estimate(pro, everyday, NaN, 1).incomePerYear).toBe(0)
    expect(estimate(pro, everyday, -5, 1).incomePerYear).toBe(0)
  })

  it('builds a contact-form summary with the key numbers', () => {
    const e = estimate(pro, everyday, 120, 1)
    const text = estimateSummary('Professional services', everyday, 120, 1, e)
    expect(text).toContain('Everyday Assistant package')
    expect(text).toContain('AI saves ~7 h/week')
    expect(text).toContain('Pays back in')
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
  beforeEach(() => sessionStorage.clear())

  const openStep = (name: RegExp) => fireEvent.click(screen.getByRole('button', { name }))

  it('opens on step 1 with the default rate and no construction preset', () => {
    render(<AiSavingsCalculator />)
    expect(screen.getByLabelText(/your hourly rate/i)).toHaveValue(DEFAULT_RATE)
    expect(screen.queryByRole('option', { name: /construction/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /your business/i })).toHaveAttribute('aria-expanded', 'true')
  })

  it('moves through the steps and leaves only summaries', () => {
    render(<AiSavingsCalculator />)
    fireEvent.click(screen.getByRole('button', { name: /next: your week/i }))
    expect(screen.getAllByRole('slider')).toHaveLength(5)
    fireEvent.click(screen.getByRole('button', { name: /next: choose a package/i }))
    for (const p of PACKAGES) expect(screen.getByRole('button', { name: new RegExp(`^${p.name}`) })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /see my results/i }))
    expect(screen.queryAllByRole('slider')).toHaveLength(0)
    expect(screen.getByRole('button', { name: /your business/i })).toHaveTextContent('Professional services · $120/h')
    expect(screen.getByRole('button', { name: /choose a setup package/i })).toHaveTextContent('Everyday Assistant · $1,950')
  })

  it('shows the efficiency gain on each task', () => {
    render(<AiSavingsCalculator />)
    openStep(/your week today/i)
    expect(screen.getByLabelText(/^Email/)).toBeInTheDocument()
    expect(screen.getByText('−40%')).toBeInTheDocument()
    expect(screen.getByText('−60%')).toBeInTheDocument()
  })

  it('shows the weekly total and the hours saved', () => {
    render(<AiSavingsCalculator />)
    expect(screen.getByTestId('total-hours')).toHaveTextContent('16.5')
    expect(screen.getByTestId('saved-hours')).toHaveTextContent('7')
  })

  it('updates the total when a task slider moves', () => {
    render(<AiSavingsCalculator />)
    openStep(/your week today/i)
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: '12' } })
    expect(screen.getByTestId('total-hours-box')).toHaveTextContent('22.5')
  })

  it('loads new hours when the business type changes', () => {
    render(<AiSavingsCalculator />)
    fireEvent.change(screen.getByLabelText(/Type of work/), { target: { value: 'retail' } })
    expect(screen.getByTestId('total-hours')).toHaveTextContent('8.5')
  })

  it('hides the calculation breakdown until asked', () => {
    render(<AiSavingsCalculator />)
    expect(screen.queryByRole('table', { name: /how the hours are calculated/i })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /how is this calculated/i }))
    expect(screen.getByRole('table', { name: /how the hours are calculated/i })).toBeInTheDocument()
  })

  it('switches to first-year cost when the time is taken off', () => {
    render(<AiSavingsCalculator />)
    fireEvent.click(screen.getByRole('button', { name: 'Time off' }))
    expect(screen.getByText('Cost, first year')).toBeInTheDocument()
    expect(screen.queryByText('Net, first year')).not.toBeInTheDocument()
  })

  it('shows Tailored as a "from" price with GST noted', () => {
    render(<AiSavingsCalculator />)
    openStep(/choose a setup package/i)
    const tailoredBtn = screen.getByRole('button', { name: /^Tailored/ })
    expect(tailoredBtn).toHaveTextContent(/from\s*\$3,800/)
    expect(tailoredBtn).toHaveTextContent('+GST')
  })

  it('has no copy button and hands the estimate to the contact form', () => {
    render(<AiSavingsCalculator />)
    expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument()
    const cta = screen.getByRole('link', { name: /book a free 30-min call/i })
    expect(cta).toHaveAttribute('href', '/#contact')
    fireEvent.click(cta)
    expect(sessionStorage.getItem(ESTIMATE_STORAGE_KEY)).toContain('AI saves ~7 h/week')
  })

  it('pre-fills the contact form message from the handed-over estimate', () => {
    sessionStorage.setItem(ESTIMATE_STORAGE_KEY, 'My estimate: 7 h/week')
    render(<Contact />)
    expect(screen.getByLabelText(/message/i)).toHaveValue('My estimate: 7 h/week')
    expect(sessionStorage.getItem(ESTIMATE_STORAGE_KEY)).toBeNull()
  })
})
