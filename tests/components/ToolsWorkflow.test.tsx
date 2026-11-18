import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('pauses and resumes the marquee with a visible button', async () => {
    const user = userEvent.setup()
    const { container } = render(<ToolsWorkflow />)
    const rows = () => Array.from(container.querySelectorAll<HTMLElement>('.animate-marquee, .animate-marquee-reverse'))

    await user.click(screen.getByRole('button', { name: 'Pause animation' }))
    rows().forEach((row) => expect(row.style.animationPlayState).toBe('paused'))

    await user.click(screen.getByRole('button', { name: 'Play animation' }))
    rows().forEach((row) => expect(row.style.animationPlayState).toBe(''))
  })

  it('hides the duplicated loop copy from screen readers', () => {
    const { container } = render(<ToolsWorkflow />)
    const row = container.querySelector('.animate-marquee')!
    const cards = Array.from(row.children)
    const half = cards.length / 2
    expect(cards.slice(0, half).every((c) => !c.hasAttribute('aria-hidden'))).toBe(true)
    expect(cards.slice(half).every((c) => c.getAttribute('aria-hidden') === 'true')).toBe(true)
  })
})
