import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Process from '../../components/Process'

describe('Process', () => {
  it('renders the "How I Work" eyebrow', () => {
    render(<Process />)
    expect(screen.getByText('How I Work')).toBeInTheDocument()
  })

  it('has the correct section id for navigation', () => {
    render(<Process />)
    const section = document.querySelector('#process')
    expect(section).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<Process />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/from first call to production/i)
  })

  it('renders all three process steps', () => {
    render(<Process />)
    expect(screen.getByText('Discovery')).toBeInTheDocument()
    expect(screen.getByText('Implementation')).toBeInTheDocument()
    expect(screen.getByText('Launch & Support')).toBeInTheDocument()
  })

  it('renders step numbers', () => {
    render(<Process />)
    expect(screen.getByText('Step 01')).toBeInTheDocument()
    expect(screen.getByText('Step 02')).toBeInTheDocument()
    expect(screen.getByText('Step 03')).toBeInTheDocument()
  })

  it('renders step descriptions', () => {
    render(<Process />)
    expect(screen.getByText(/learn your business/i)).toBeInTheDocument()
    expect(screen.getByText(/hands-on delivery/i)).toBeInTheDocument()
    expect(screen.getByText(/testing, training/i)).toBeInTheDocument()
  })

  it('renders Lucide icons', () => {
    const { container } = render(<Process />)
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThanOrEqual(3)
  })
})
