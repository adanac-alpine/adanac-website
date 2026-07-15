import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../../components/Footer'

describe('Footer', () => {
  it('renders the copyright notice with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${year}.*Adanac Advisory`))).toBeInTheDocument()
  })

  it('renders the brand tagline', () => {
    render(<Footer />)
    expect(screen.getByText(/strategic technology consulting/i)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '#services')
    expect(screen.getByRole('link', { name: /tools/i })).toHaveAttribute('href', '#tools')
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '#contact')
  })

  it('renders email contact link', () => {
    render(<Footer />)
    const emailLink = screen.getByRole('link', { name: /sergey@adanacadvisory.ca/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:sergey@adanacadvisory.ca')
  })

  it('renders LinkedIn link', () => {
    render(<Footer />)
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/pochikovskiy')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
  })

  it('renders Privacy Policy and Terms of Service links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute('href', '/privacy')
    expect(screen.getByRole('link', { name: /terms of service/i })).toHaveAttribute('href', '/terms')
  })

  it('renders the Adanac mark SVG', () => {
    const { container } = render(<Footer />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(1)
  })
})
