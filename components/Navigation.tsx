'use client'

import { useState, useEffect } from 'react'
import AdanacWordmark from './brand/AdanacWordmark'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy/90 backdrop-blur-md shadow-lg border-b border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center"
        >
          <AdanacWordmark color="#ffffff" incColor="rgba(255,255,255,0.35)" fontSize={16} showInc={false} />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white/85 hover:text-glacier font-medium text-sm tracking-wide transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-glacier hover:bg-glacier/90 text-white font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded transition-all duration-200 shadow-md shadow-glacier/20"
          >
            Get in Touch
          </a>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white hover:text-glacier focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.83-4.828 4.83a1 1 0 01-1.414-1.414l4.83-4.83-4.83-4.828a1 1 0 011.414-1.414l4.828 4.83 4.829-4.83a1 1 0 011.414 1.414l-4.83 4.828 4.83 4.83z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-navy/95 backdrop-blur-lg border-b border-white/10 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white/85 hover:text-glacier font-medium text-base py-2 border-b border-white/5 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-glacier hover:bg-glacier/90 text-white font-semibold text-sm text-center tracking-wider uppercase py-3 rounded mt-2 transition-all duration-200 shadow-md shadow-glacier/20"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  )
}
