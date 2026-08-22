'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from './animation/FadeIn'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({})

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formState.honeypot) return

    if (!validateEmail(formState.email)) {
      setFieldErrors({ email: 'Please enter a valid email address' })
      return
    }
    setFieldErrors({})

    setStatus('submitting')

    const formspreeUrl = 'https://formspree.io/f/meajdzkz'

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormState({ name: '', email: '', message: '', honeypot: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-24 bg-off-white">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">

        <FadeIn>
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs font-bold tracking-widest text-glacier uppercase">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
              Let&apos;s talk
            </h2>
            <p className="text-base sm:text-lg text-dark-gray max-w-xl mx-auto">
              Have a digital banking project in mind? I&apos;d love to hear about it. Drop me a message and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-lg shadow-gray-100/40 min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-center space-y-6 py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 mx-auto rounded-full bg-forest/10 flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-navy">Message sent!</h3>
                    <p className="text-dark-gray max-w-sm mx-auto">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-glacier font-semibold hover:underline focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded focus:outline-none"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-center space-y-6 py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-navy">Couldn&apos;t send message</h3>
                    <p className="text-dark-gray max-w-sm mx-auto">
                      Double-check your email address and try again. If it keeps failing, email me directly at{' '}
                      <a href="mailto:hello@adanacalpine.ca" className="text-glacier font-semibold hover:underline">hello@adanacalpine.ca</a>
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-glacier font-semibold hover:underline focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded focus:outline-none"
                  >
                    Try again
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 w-full"
                >
                  {/* Honeypot anti-spam field */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formState.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-navy mb-2">
                        Name <span className="text-red-500 font-bold" aria-hidden="true">*</span>
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        autoComplete="name"
                        required
                        aria-required="true"
                        className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-lg text-navy placeholder-medium-gray focus:outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/25 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-navy mb-2">
                        Email <span className="text-red-500 font-bold" aria-hidden="true">*</span>
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        aria-required="true"
                        className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-lg text-navy placeholder-medium-gray focus:outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/25 transition-all duration-300"
                      />
                      {fieldErrors.email && (
                        <p className="mt-1.5 text-sm text-red-600" role="alert">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-navy mb-2">
                      Message <span className="text-red-500 font-bold" aria-hidden="true">*</span>
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-lg text-navy placeholder-medium-gray focus:outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/25 transition-all duration-300 resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-glacier hover:bg-glacier-600 disabled:bg-glacier/50 text-white font-bold tracking-wide py-4 rounded-xl shadow-lg shadow-glacier/25 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus:outline-none flex items-center justify-center"
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-sm text-dark-gray mb-3">
              Prefer to book a time directly?
            </p>
            <a
              href="https://calendar.app.google/vDV9rooe9Ghp37Ls6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-glacier font-semibold hover:underline focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Book a meeting
              <span className="sr-only">(opens in a new tab)</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
