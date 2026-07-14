import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Contact from '../../components/Contact'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Contact', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders the "Let\'s talk" heading', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/let/i)
  })

  it('renders all form fields', () => {
    render(<Contact />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('renders email contact link', () => {
    render(<Contact />)
    const emailLink = screen.getByRole('link', { name: /sergey@adanacadvisory.ca/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:sergey@adanacadvisory.ca')
  })

  it('renders LinkedIn contact link', () => {
    render(<Contact />)
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/pochikovskiy')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
  })

  it('has a hidden honeypot field', () => {
    render(<Contact />)
    const honeypot = document.querySelector('input[name="honeypot"]')
    expect(honeypot).toBeInTheDocument()
    expect(honeypot).toHaveAttribute('type', 'text')
  })
})
