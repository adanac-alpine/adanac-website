import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SocialProof from '../../components/SocialProof'

describe('SocialProof', () => {
  it('renders the "Track Record" eyebrow', () => {
    render(<SocialProof />)
    expect(screen.getByText('Track Record')).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<SocialProof />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/where i've delivered/i)
  })

  it('renders all 5 client cards', () => {
    const { container } = render(<SocialProof />)
    const cards = container.querySelectorAll('[class*="bg-white/5"]')
    expect(cards.length).toBe(5)
  })

  it('renders Backbase platform badges', () => {
    render(<SocialProof />)
    const badges = screen.getAllByText('Backbase')
    expect(badges.length).toBe(2)
  })

  it('renders VeriPark platform badges', () => {
    render(<SocialProof />)
    const badges = screen.getAllByText('VeriPark')
    expect(badges.length).toBe(2)
  })

  it('renders Salesforce platform badge', () => {
    render(<SocialProof />)
    expect(screen.getByText('Salesforce')).toBeInTheDocument()
  })

  it('mentions YNCU and Sunrise Credit Union', () => {
    render(<SocialProof />)
    expect(screen.getByText(/YNCU/i)).toBeInTheDocument()
    expect(screen.getByText(/Sunrise Credit Union/i)).toBeInTheDocument()
  })

  it('renders client type labels', () => {
    render(<SocialProof />)
    const banks = screen.getAllByText('Bank')
    const cus = screen.getAllByText('Credit Union')
    expect(banks.length).toBe(2)
    expect(cus.length).toBe(3)
  })
})
