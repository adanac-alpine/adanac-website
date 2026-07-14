import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navigation from '../../components/Navigation'

describe('Navigation', () => {
  it('renders all nav links (desktop + mobile)', () => {
    render(<Navigation />)
    // Desktop and mobile navs both render these links
    expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('link', { name: /services/i }).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('link', { name: /contact/i }).length).toBeGreaterThanOrEqual(1)
  })

  it('renders the "Get in Touch" CTA button', () => {
    render(<Navigation />)
    expect(screen.getAllByRole('link', { name: /get in touch/i }).length).toBeGreaterThanOrEqual(1)
  })

  it('renders the mobile menu toggle', () => {
    render(<Navigation />)
    expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toBeInTheDocument()
  })
})
