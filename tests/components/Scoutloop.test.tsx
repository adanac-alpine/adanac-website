import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Scoutloop from '../../components/Scoutloop'

describe('Scoutloop', () => {
  it('renders the heading', () => {
    render(<Scoutloop />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/scoutloop/i)
  })

  it('renders the "Built in BC" label', () => {
    render(<Scoutloop />)
    expect(screen.getByText('Built in BC')).toBeInTheDocument()
  })

  it('describes the backcountry use case', () => {
    render(<Scoutloop />)
    expect(screen.getByText(/backcountry/i)).toBeInTheDocument()
  })

  it('links to scoutloop.me', () => {
    render(<Scoutloop />)
    const link = screen.getByRole('link', { name: /visit scoutloop/i })
    expect(link).toHaveAttribute('href', 'https://scoutloop.me')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('displays tech stack tags', () => {
    render(<Scoutloop />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Supabase')).toBeInTheDocument()
  })
})
