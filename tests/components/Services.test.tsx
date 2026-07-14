import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Services from '../../components/Services'

describe('Services', () => {
  it('renders the "What I do" heading', () => {
    render(<Services />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/what i do/i)
  })

  it('renders the "Services" eyebrow', () => {
    render(<Services />)
    expect(screen.getByText('Services', { selector: '.uppercase' })).toBeInTheDocument()
  })

  it('renders both service titles', () => {
    render(<Services />)
    expect(screen.getByRole('heading', { level: 3, name: /backbase implementation/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /salesforce implementation/i })).toBeInTheDocument()
  })

  it('lists capabilities for Backbase', () => {
    render(<Services />)
    expect(screen.getByText(/business & technical requirements/i)).toBeInTheDocument()
    expect(screen.getByText(/platform architecture/i)).toBeInTheDocument()
  })

  it('lists capabilities for Salesforce', () => {
    render(<Services />)
    expect(screen.getAllByText(/financial services cloud/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/case management & workflow automation/i)).toBeInTheDocument()
    expect(screen.getByText(/data quality frameworks & deduplication/i)).toBeInTheDocument()
  })
})
