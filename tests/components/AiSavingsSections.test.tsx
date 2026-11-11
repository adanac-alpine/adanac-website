import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  AboutBlock,
  CalculatorSection,
  FAQS,
  FaqSection,
  HowItWorksSection,
  LandingHeader,
  LandingHero,
  PlateSection,
} from '../../components/AiSavingsSections'
import Contact from '../../components/Contact'
import Footer from '../../components/Footer'

const routerPush = vi.hoisted(() => vi.fn())
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: routerPush }) }))

describe('AI savings landing sections', () => {
  it('header links home and to the on-page form', () => {
    render(<LandingHeader />)
    expect(screen.getByRole('link', { name: /adanac alpine advisory home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /book a free call/i })).toHaveAttribute('href', '#contact')
  })

  it('hero has one h1, both calls to action and a computed example without a payback claim', () => {
    render(<LandingHero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/hours back from email and paperwork/i)
    expect(screen.getByRole('link', { name: /estimate my savings/i })).toHaveAttribute('href', '#calculator')
    expect(screen.getByRole('link', { name: /book a free call/i })).toHaveAttribute('href', '#contact')
    expect(screen.getByText(/hours a week/i).parentElement).toHaveTextContent(/^4\.9/)
    expect(screen.getByText(/from \$850 \+ GST/i)).toBeInTheDocument()
    expect(screen.getByText(/BC small businesses/i)).toBeInTheDocument()
    expect(screen.queryByText(/pays/i)).not.toBeInTheDocument()
  })

  it('shows a card for every calculator task, with its saving and sources', () => {
    render(<PlateSection />)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(5)
    expect(screen.getByText('saves ~25%')).toBeInTheDocument()
    expect(screen.getByText('saves ~50%')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /MIT \/ Science/ })).toHaveAttribute('target', '_blank')
  })

  it('wraps the calculator in a #calculator section', () => {
    render(
      <CalculatorSection>
        <div>calc</div>
      </CalculatorSection>,
    )
    expect(document.querySelector('#calculator')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/how many hours could you get back/i)
  })

  it('lists three how-it-works steps', () => {
    render(<HowItWorksSection />)
    expect(within(screen.getByRole('list')).getAllByRole('listitem')).toHaveLength(3)
  })

  it('introduces the consultant and links to the full bio', () => {
    render(<AboutBlock />)
    expect(screen.getByRole('img', { name: /sergey pochikovskiy/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /more about me/i })).toHaveAttribute('href', '/#about')
  })

  it('FAQ answers are collapsed until opened', () => {
    render(<FaqSection />)
    expect(screen.getAllByRole('group')).toHaveLength(FAQS.length)
    const first = screen.getByText(FAQS[0].q).closest('details')!
    expect(first).not.toHaveAttribute('open')
    fireEvent.click(screen.getByText(FAQS[0].q))
    expect(first).toHaveAttribute('open')
  })

  it('answers setup time, service area and the guarantee', () => {
    render(<FaqSection />)
    for (const q of [/how long does setup take/i, /remotely or on-site/i, /doesn't save me time/i]) {
      expect(screen.getByText(q)).toBeInTheDocument()
    }
  })
})

describe('Contact copy override', () => {
  it('keeps the home page wording by default', () => {
    render(<Contact />)
    expect(screen.getByText(/digital banking project/i)).toBeInTheDocument()
  })

  it('accepts landing page wording', () => {
    render(
      <Contact
        heading="Let's look at your week"
        intro="Book a call."
        messagePlaceholder="Your week"
        submitLabel="Request my free call"
        calendarLabel="Pick a time now"
        calendarPlacement="above"
      />,
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent("Let's look at your week")
    expect(screen.queryByText(/digital banking project/i)).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your week')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Request my free call' })).toBeInTheDocument()
    const calendar = screen.getByRole('link', { name: /pick a time now/i })
    const form = screen.getByRole('button', { name: 'Request my free call' })
    expect(calendar.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})

describe('Footer on a page without home sections', () => {
  afterEach(() => routerPush.mockReset())

  it('sends section links to the home page', () => {
    render(<Footer />)
    fireEvent.click(screen.getByRole('link', { name: /services/i }))
    expect(routerPush).toHaveBeenCalledWith('/#services')
  })
})
