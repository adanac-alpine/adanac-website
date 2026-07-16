'use client'

import { FadeIn } from './animation/FadeIn'
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

          {/* Brand column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <AdanacMark size={32} fill="#ffffff" tile={false} />
              <AdanacWordmark color="#ffffff" incColor="rgba(255,255,255,0.35)" fontSize={14} showInc={true} />
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Strategic Technology Consulting — British Columbia
            </p>
          </div>

          {/* Nav links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Navigate</h4>
            {[
              { name: 'About', href: '#about' },
              { name: 'Services', href: '#services' },
              { name: 'How I Work', href: '#process' },
              { name: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="block text-sm text-white/60 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded focus:outline-none"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Contact</h4>
            <a href="mailto:sergey@adanacadvisory.ca" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded focus:outline-none">
              <Mail className="w-4 h-4" strokeWidth={2} />
              sergey@adanacadvisory.ca
            </a>
            <a href="https://linkedin.com/in/pochikovskiy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded focus:outline-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              linkedin.com/in/pochikovskiy
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-wide text-white/30">
          <div>
            © {currentYear} Adanac Advisory Inc. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-white/60 focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded focus:outline-none">Privacy Policy</a>
            <span>·</span>
            <a href="/terms" className="hover:text-white/60 focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded focus:outline-none">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
