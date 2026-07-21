'use client'

import { motion } from 'framer-motion'
import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'
import AdanacMark from './brand/AdanacMark'
import AdanacWordmark from './brand/AdanacWordmark'
import TrianglePattern from './brand/TrianglePattern'
import { Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative overflow-hidden bg-navy text-white/60 py-16 min-h-screen md:min-h-[60vh] border-t-[3px] border-glacier z-10">
      <TrianglePattern variant="dark" opacity={0.08} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center">

        <StaggerChildren stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

            {/* Brand column */}
            <StaggerItem className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <AdanacMark size={32} fill="#ffffff" tile={false} />
                <AdanacWordmark color="#ffffff" incColor="rgba(255,255,255,0.35)" fontSize={14} showInc={true} />
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                Elevated Technology Consulting — British Columbia
              </p>
            </StaggerItem>

            {/* Nav links */}
            <StaggerItem className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Navigate</h4>
              {[
                { name: 'About', href: '#about' },
                { name: 'Services', href: '#services' },
                { name: 'How I Work', href: '#process' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollToSection(e, link.href)}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="block text-sm text-white/60 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded focus:outline-none"
                >
                  {link.name}
                </motion.a>
              ))}
            </StaggerItem>

            {/* Contact */}
            <StaggerItem className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Contact</h4>
              <motion.a
                href="mailto:sergey@adanacalpine.ca"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded focus:outline-none"
              >
                <Mail className="w-4 h-4" strokeWidth={2} />
                sergey@adanacalpine.ca
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/pochikovskiy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                linkedin.com/in/pochikovskiy
                <span className="sr-only">(opens in a new tab)</span>
              </motion.a>
            </StaggerItem>

          </div>
        </StaggerChildren>

        {/* Bottom bar */}
        <FadeIn delay={0.3}>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-wide text-white/30">
            <div>
              © {currentYear} Adanac Alpine Advisory Inc. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-white/60 focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded focus:outline-none">Privacy Policy</a>
              <span>·</span>
              <a href="/terms" className="hover:text-white/60 focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded focus:outline-none">Terms of Service</a>
            </div>
          </div>
        </FadeIn>

      </div>
    </footer>
  )
}
