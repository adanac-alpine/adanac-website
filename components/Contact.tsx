'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from './animation/FadeIn'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formState.honeypot) return

    setStatus('submitting')

    const formspreeUrl = 'https://formspree.io/f/xbjnkygq'

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
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-lg shadow-gray-100/40">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-lg text-navy placeholder-medium-gray focus:outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/25 transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-navy mb-2">
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-lg text-navy placeholder-medium-gray focus:outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/25 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-navy mb-2">
                  Message
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
                  className="w-full px-4 py-3 bg-off-white border border-gray-200 rounded-lg text-navy placeholder-medium-gray focus:outline-none focus:border-glacier focus:ring-2 focus:ring-glacier/25 transition-all duration-200 resize-none"
                />
              </div>

              {status === 'success' && (
                <div role="status" aria-live="polite" className="p-4 bg-forest/10 border border-forest text-sm font-semibold rounded-lg text-forest">
                  Thank you! I&apos;ll be in touch.
                </div>
              )}

              {status === 'error' && (
                <div role="alert" aria-live="assertive" className="p-4 bg-red-50 border border-red-200 text-sm font-semibold rounded-lg text-red-700">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-glacier hover:bg-glacier-600 disabled:bg-glacier/50 text-white font-bold tracking-wide py-4 rounded-lg shadow-lg shadow-glacier/20 transition-colors duration-300"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </div>
        </FadeIn>



      </div>
    </section>
  )
}
