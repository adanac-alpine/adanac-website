import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import About from '../../components/About'

describe('About', () => {
  it('renders the About heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/bridging the gap/i)
  })

  it('renders the "About" eyebrow', () => {
    render(<About />)
    expect(screen.getByText('About', { selector: '.uppercase' })).toBeInTheDocument()
  })

  it('mentions 16 years of experience', () => {
    render(<About />)
    expect(screen.getByText(/16 years/i)).toBeInTheDocument()
  })

  it('renders credential groups', () => {
    render(<About />)
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Certifications')).toBeInTheDocument()
    expect(screen.getByText('Teaching & Community')).toBeInTheDocument()
  })

  it('lists MBA from UBC Sauder', () => {
    render(<About />)
    expect(screen.getByText(/MBA — UBC Sauder/i)).toBeInTheDocument()
  })

  it('lists CBAP certification', () => {
    render(<About />)
    const matches = screen.getAllByText(/CBAP/)
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })
})
