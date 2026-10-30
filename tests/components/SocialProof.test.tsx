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

  it('shows all six engagements without tabs', () => {
    render(<SocialProof />)
    expect(screen.queryByRole('tab')).not.toBeInTheDocument()
    expect(screen.getAllByText(/credit union|bank —|bank$/i).length).toBeGreaterThanOrEqual(6)
  })

  it('labels each card with its platform', () => {
    render(<SocialProof />)
    expect(screen.getAllByText('VeriPark')).toHaveLength(2)
    expect(screen.getAllByText('Backbase')).toHaveLength(2)
    expect(screen.getAllByText('Salesforce')).toHaveLength(2)
  })

  it('shows VeriPark, Backbase and Salesforce work together', () => {
    render(<SocialProof />)
    expect(screen.getAllByText(/VeriChannel/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Backbase commercial banking/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Salesforce Financial Services Cloud/i).length).toBeGreaterThanOrEqual(1)
  })

  it('mentions requirements coordination', () => {
    render(<SocialProof />)
    expect(screen.getByText(/requirements coordination/i)).toBeInTheDocument()
  })
})
