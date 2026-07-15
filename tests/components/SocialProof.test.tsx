import { render, screen, fireEvent } from '@testing-library/react'
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

  it('renders tab buttons for each platform', () => {
    render(<SocialProof />)
    expect(screen.getByRole('button', { name: /VeriPark/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Backbase/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Salesforce/i })).toBeInTheDocument()
  })

  it('shows VeriPark cards by default', () => {
    render(<SocialProof />)
    const cards = screen.getAllByText(/VeriChannel/i)
    expect(cards.length).toBeGreaterThanOrEqual(1)
  })

  it('shows Backbase cards after clicking Backbase tab', () => {
    render(<SocialProof />)
    fireEvent.click(screen.getByRole('button', { name: /Backbase/i }))
    const cards = screen.getAllByText(/Backbase/i)
    expect(cards.length).toBeGreaterThanOrEqual(1)
  })

  it('shows Salesforce cards after clicking Salesforce tab', () => {
    render(<SocialProof />)
    fireEvent.click(screen.getByRole('button', { name: /^Salesforce$/i }))
    const matches = screen.getAllByText(/Salesforce Financial Services Cloud/i)
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('mentions data quality and Fiserv DNA in Salesforce tab', () => {
    render(<SocialProof />)
    fireEvent.click(screen.getByRole('button', { name: /^Salesforce$/i }))
    expect(screen.getByText(/data quality/i)).toBeInTheDocument()
    expect(screen.getByText(/Fiserv DNA/i)).toBeInTheDocument()
  })
})
