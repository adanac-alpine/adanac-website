import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../../components/Footer'

describe('Footer', () => {
  it('renders the company name', () => {
    const { container } = render(<Footer />)
    expect(screen.getByText('ADANAC')).toBeInTheDocument()
    expect(screen.getByText('ADVISORY')).toBeInTheDocument()
    expect(container.textContent).toContain('Adanac Advisory Inc.')
  })

  it('renders the location tagline', () => {
    render(<Footer />)
    expect(screen.getByText(/british columbia/i)).toBeInTheDocument()
  })

  it('renders nav links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '#services')
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '#contact')
  })

  it('renders the email link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /sergey@adanacadvisory.ca/i })).toHaveAttribute('href', 'mailto:sergey@adanacadvisory.ca')
  })

  it('renders the LinkedIn link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://linkedin.com/in/pochikovskiy')
  })

  it('renders privacy and terms links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /privacy/i })).toHaveAttribute('href', '/privacy')
    expect(screen.getByRole('link', { name: /terms/i })).toHaveAttribute('href', '/terms')
  })

  it('shows the current year in copyright', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })
})
