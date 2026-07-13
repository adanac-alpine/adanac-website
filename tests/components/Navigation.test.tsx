import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navigation from '../../components/Navigation'

describe('Navigation', () => {
  it('renders all nav links', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders the "Get in Touch" CTA button', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('renders the mobile menu toggle', () => {
    render(<Navigation />)
    expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toBeInTheDocument()
  })
})
