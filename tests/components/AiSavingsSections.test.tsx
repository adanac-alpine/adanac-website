import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  CalculatorSection,
  CtaBand,
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

  it('hero has one h1, both calls to action and a computed typical result', () => {
    render(<LandingHero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/hours of your week back/i)
    expect(screen.getByRole('link', { name: /estimate my savings/i })).toHaveAttribute('href', '#calculator')
    expect(screen.getByRole('link', { name: /book a free call/i })).toHaveAttribute('href', '#contact')
    expect(screen.getByText(/hours a week/i).parentElement).toHaveTextContent(/^7/)
    expect(screen.getByText(/from \$850/i)).toBeInTheDocument()
  })

  it('shows four task cards with their typical saving', () => {
    render(<PlateSection />)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4)
    expect(screen.getByText('~40% faster')).toBeInTheDocument()
    expect(screen.getByText('~60% faster')).toBeInTheDocument()
  })

  it('wraps the calculator in a #calculator section', () => {
    render(
      <CalculatorSection>
        <div>calc</div>
      </CalculatorSection>,
    )
    expect(document.querySelector('#calculator')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/estimate your savings/i)
  })

  it('lists three how-it-works steps', () => {
    render(<HowItWorksSection />)
    expect(within(screen.getByRole('list')).getAllByRole('listitem')).toHaveLength(3)
  })

  it('CTA band points at the contact form', () => {
    render(<CtaBand />)
    expect(screen.getByRole('link', { name: /book a free call/i })).toHaveAttribute('href', '#contact')
  })

  it('FAQ answers are collapsed until opened', () => {
    render(<FaqSection />)
    expect(screen.getAllByRole('group')).toHaveLength(FAQS.length)
    const first = screen.getByText(FAQS[0].q).closest('details')!
    expect(first).not.toHaveAttribute('open')
    fireEvent.click(screen.getByText(FAQS[0].q))
    expect(first).toHaveAttribute('open')
  })
})

describe('Contact copy override', () => {
  it('keeps the home page wording by default', () => {
    render(<Contact />)
    expect(screen.getByText(/digital banking project/i)).toBeInTheDocument()
  })

  it('accepts landing page wording', () => {
    render(<Contact heading="Let's look at your week" intro="Book a call." messagePlaceholder="Your week" />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent("Let's look at your week")
    expect(screen.queryByText(/digital banking project/i)).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your week')).toBeInTheDocument()
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
