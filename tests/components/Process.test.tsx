import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Process from '../../components/Process'

describe('Process', () => {
  it('renders the "How I Work" eyebrow', () => {
    render(<Process />)
    expect(screen.getByText('How I Work')).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<Process />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/from first call to production/i)
  })

  it('renders all three step titles', () => {
    render(<Process />)
    expect(screen.getByRole('heading', { level: 3, name: /discovery/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /implementation/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /launch & support/i })).toBeInTheDocument()
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
    expect(screen.getByText(/testing, training, go-live/i)).toBeInTheDocument()
  })

  it('renders Lucide icons (SVG elements)', () => {
    const { container } = render(<Process />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(3)
  })
})
