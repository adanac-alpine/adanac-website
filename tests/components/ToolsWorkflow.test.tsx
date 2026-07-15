import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ToolsWorkflow from '../../components/ToolsWorkflow'

describe('ToolsWorkflow', () => {
  it('renders the "Tools & Workflow" eyebrow', () => {
    render(<ToolsWorkflow />)
    expect(screen.getByText('Tools & Workflow')).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<ToolsWorkflow />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/tools i use/i)
  })

  it('renders key tool names across marquee rows', () => {
    render(<ToolsWorkflow />)
    expect(screen.getAllByText('JIRA').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Slack').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Claude').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Next.js').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Vercel').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Sentry').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Python').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Supabase').length).toBeGreaterThanOrEqual(1)
  })

  it('renders tool cards with icons', () => {
    const { container } = render(<ToolsWorkflow />)
    const icons = container.querySelectorAll('img')
    expect(icons.length).toBeGreaterThanOrEqual(20)
  })
})
