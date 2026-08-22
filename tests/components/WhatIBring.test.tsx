import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WhatIBring from '../../components/WhatIBring'

describe('WhatIBring', () => {
  it('renders the "Why Me" eyebrow', () => {
    render(<WhatIBring />)
    expect(screen.getByText('Why Me')).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<WhatIBring />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/what i bring to your project/i)
  })

  it('renders all four differentiator titles', () => {
    render(<WhatIBring />)
    expect(screen.getByRole('heading', { level: 3, name: /multi-vendor governance/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /hands-on delivery/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /coaching & team building/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /bilingual/i })).toBeInTheDocument()
  })

  it('renders descriptions for each differentiator', () => {
    render(<WhatIBring />)
    expect(screen.getByText(/RAID management/i)).toBeInTheDocument()
    expect(screen.getByText(/don't just advise/i)).toBeInTheDocument()
    expect(screen.getByText(/worked closely with and coached/i)).toBeInTheDocument()
    expect(screen.getByText(/english and russian/i)).toBeInTheDocument()
  })

  it('renders Lucide icons (SVG elements)', () => {
    const { container } = render(<WhatIBring />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(4)
  })
})
