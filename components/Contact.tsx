'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'
import { Mail } from 'lucide-react'

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
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">

        <FadeIn>
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-glacier uppercase">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
              Let&apos;s talk
            </h2>
            <p className="text-base sm:text-lg text-dark-gray max-w-2xl">
              Have a digital banking project in mind? I&apos;d love to hear about it. Drop me a message and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          <StaggerChildren stagger={0.12} className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <StaggerItem>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-navy/5 flex items-center justify-center text-glacier shrink-0">
                    <Mail className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-medium-gray uppercase tracking-widest">Email</div>
                    <a href="mailto:sergey@adanacadvisory.ca" className="text-sm sm:text-base font-bold text-navy hover:text-glacier transition-colors">
                      sergey@adanacadvisory.ca
                    </a>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-navy/5 flex items-center justify-center text-glacier shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-medium-gray uppercase tracking-widest">LinkedIn</div>
                    <a
                      href="https://linkedin.com/in/pochikovskiy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-bold text-navy hover:text-glacier transition-colors"
                    >
                      linkedin.com/in/pochikovskiy
                    </a>
                  </div>
                </div>
              </StaggerItem>
            </div>
          </StaggerChildren>

          <FadeIn delay={0.2} className="lg:col-span-7">
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
                  <div className="p-4 bg-forest/10 border border-forest text-sm font-semibold rounded-lg text-forest">
                    Thank you! I&apos;ll be in touch.
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-sm font-semibold rounded-lg text-red-700">
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
      </div>
    </section>
  )
}
