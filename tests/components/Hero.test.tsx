import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '../../components/Hero'

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/launch your digital banking platform/i)
  })

  it('renders the subtitle describing services', () => {
    render(<Hero />)
    expect(screen.getByText(/backbase and veripark/i)).toBeInTheDocument()
  })

  it('renders "Get in touch" CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('renders "Learn more" link', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute('href', '#about')
  })

  it('renders the Adanac mark', () => {
    const { container } = render(<Hero />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
