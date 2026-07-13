import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Scoutloop from '../../components/Scoutloop'

describe('Scoutloop', () => {
  it('renders the Scoutloop heading', () => {
    render(<Scoutloop />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Scoutloop')
  })

  it('renders the "Built in BC" eyebrow', () => {
    render(<Scoutloop />)
    expect(screen.getByText('Built in BC')).toBeInTheDocument()
  })

  it('mentions backcountry / outdoors in the copy', () => {
    render(<Scoutloop />)
    expect(screen.getByText(/backcountry/i)).toBeInTheDocument()
  })

  it('mentions trailrunning in the copy', () => {
    render(<Scoutloop />)
    expect(screen.getByText(/trailrunning/i)).toBeInTheDocument()
  })

  it('links to scoutloop.me', () => {
    render(<Scoutloop />)
    const link = screen.getByRole('link', { name: /visit scoutloop/i })
    expect(link).toHaveAttribute('href', 'https://scoutloop.me')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('displays tech stack badges', () => {
    render(<Scoutloop />)
    for (const tech of ['Next.js', 'Supabase', 'Vercel', 'Claude AI']) {
      expect(screen.getByText(tech)).toBeInTheDocument()
    }
  })

  it('renders the Scoutloop badge mark SVG', () => {
    const { container } = render(<Scoutloop />)
    const marks = container.querySelectorAll('svg[aria-label="Scoutloop"]')
    expect(marks.length).toBeGreaterThanOrEqual(1)
  })

  it('shows the tagline "Know before you go."', () => {
    render(<Scoutloop />)
    expect(screen.getByText('Know before you go.')).toBeInTheDocument()
  })

  it('shows scoutloop.me domain on the visual side', () => {
    render(<Scoutloop />)
    const domains = screen.getAllByText('scoutloop.me')
    expect(domains.length).toBeGreaterThanOrEqual(1)
  })
})
