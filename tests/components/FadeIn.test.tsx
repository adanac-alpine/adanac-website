import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FadeIn, StaggerChildren, StaggerItem } from '../../components/animation/FadeIn'

describe('FadeIn', () => {
  it('renders children', () => {
    render(<FadeIn><p>Hello</p></FadeIn>)
    expect(document.body.textContent).toContain('Hello')
  })

  it('applies custom className', () => {
    const { container } = render(<FadeIn className="test-class"><p>Content</p></FadeIn>)
    expect(container.firstChild).toHaveClass('test-class')
  })

  it('renders with default props without errors', () => {
    render(<FadeIn><div>Test</div></FadeIn>)
  })

  it('accepts custom delay and duration', () => {
    render(<FadeIn delay={0.5} duration={1.0}><span>Custom</span></FadeIn>)
    expect(document.body.textContent).toContain('Custom')
  })
})

describe('StaggerChildren', () => {
  it('renders children', () => {
    render(
      <StaggerChildren>
        <div>Item 1</div>
        <div>Item 2</div>
      </StaggerChildren>
    )
    expect(document.body.textContent).toContain('Item 1')
    expect(document.body.textContent).toContain('Item 2')
  })

  it('applies custom className', () => {
    const { container } = render(
      <StaggerChildren className="stagger-test"><div>Child</div></StaggerChildren>
    )
    expect(container.firstChild).toHaveClass('stagger-test')
  })

  it('accepts custom stagger value', () => {
    render(
      <StaggerChildren stagger={0.2}><div>Item</div></StaggerChildren>
    )
  })
})

describe('StaggerItem', () => {
  it('renders children', () => {
    render(<StaggerItem><p>Staggered content</p></StaggerItem>)
    expect(document.body.textContent).toContain('Staggered content')
  })

  it('applies custom className', () => {
    const { container } = render(
      <StaggerItem className="item-class"><div>Item</div></StaggerItem>
    )
    expect(container.firstChild).toHaveClass('item-class')
  })
})
