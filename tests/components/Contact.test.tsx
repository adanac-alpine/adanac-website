import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Contact from '../../components/Contact'

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



  it('has a hidden honeypot field', () => {
    render(<Contact />)
    const honeypot = document.querySelector('input[name="honeypot"]')
    expect(honeypot).toBeInTheDocument()
    expect(honeypot).toHaveAttribute('type', 'text')
  })

  function fillForm() {
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Sergey' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there' } })
  }

  it('submits form successfully and shows success message', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true })
    render(<Contact />)

    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://formspree.io/f/meajdzkz',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        })
      )
    })

    expect(await screen.findByText(/thank you/i)).toBeInTheDocument()
  })

  it('shows error message on failed submission', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false })
    render(<Contact />)

    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('shows error message on network failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    render(<Contact />)

    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('shows "Sending..." while submitting', async () => {
    let resolveFetch!: (value: Response) => void
    mockFetch.mockImplementationOnce(
      () => new Promise((resolve) => { resolveFetch = resolve })
    )
    render(<Contact />)

    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
    })

    resolveFetch({ ok: true } as Response)

    expect(await screen.findByText(/thank you/i)).toBeInTheDocument()
  })

  it('does not submit when honeypot is filled (spam bot)', async () => {
    render(<Contact />)

    const honeypot = document.querySelector('input[name="honeypot"]') as HTMLInputElement
    fireEvent.change(honeypot, { target: { value: 'spam' } })
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    expect(mockFetch).not.toHaveBeenCalled()
  })
})
