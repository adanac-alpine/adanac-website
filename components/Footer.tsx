'use client'

import { FadeIn } from './animation/FadeIn'
import AdanacMark from './brand/AdanacMark'
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
    <footer className="relative overflow-hidden bg-navy text-white/60 py-12 border-t-[3px] border-glacier z-10">
      <TrianglePattern variant="dark" opacity={0.08} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">

            <div className="flex items-center gap-4">
              <AdanacMark size={36} fill="#ffffff" tile={false} />
              <div>
                <div className="text-white font-bold text-sm">Adanac Advisory Inc.</div>
                <div className="text-xs text-white/40">IT Consulting — British Columbia</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold tracking-wide">
              <a href="#about" onClick={(e) => handleScrollToSection(e, '#about')} className="hover:text-white transition-colors">
                About
              </a>
              <a href="#services" onClick={(e) => handleScrollToSection(e, '#services')} className="hover:text-white transition-colors">
                Services
              </a>
              <a href="#contact" onClick={(e) => handleScrollToSection(e, '#contact')} className="hover:text-white transition-colors">
                Contact
              </a>
            </div>

            <div className="flex items-center gap-6">
              <a href="mailto:sergey@adanacadvisory.ca" className="hover:text-white transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" strokeWidth={2} />
              </a>
              <a href="https://linkedin.com/in/pochikovskiy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>

          </div>
        </FadeIn>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-wide text-white/40">
          <div>
            © {currentYear} Adanac Advisory Inc. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-white/60">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-white/60">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
