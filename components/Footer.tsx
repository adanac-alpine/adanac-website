'use client'

import { FadeIn } from './animation/FadeIn'
import AdanacMark from './brand/AdanacMark'

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
    <footer className="bg-navy text-white/60 py-12 border-t-[3px] border-glacier relative z-10">
      <div className="container mx-auto px-6 md:px-12">
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/pochikovskiy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
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
