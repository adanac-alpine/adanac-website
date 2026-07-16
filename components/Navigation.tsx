'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AdanacMark from './brand/AdanacMark'
import AdanacWordmark from './brand/AdanacWordmark'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled((prev) => {
        if (prev !== scrolled) return scrolled
        return prev
      })

      const hero = document.querySelector('#hero')
      if (hero) {
        const heroTop = hero.getBoundingClientRect().top
        const isPast = heroTop <= -64
        setPastHero((prev) => {
          if (prev !== isPast) return isPast
          return prev
        })
      }

      const footer = document.querySelector('footer')
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top
        const isNear = footerTop <= window.innerHeight
        setNearFooter((prev) => {
          if (prev !== isNear) return isNear
          return prev
        })
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'How I Work', href: '#process' },
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
        nearFooter ? 'opacity-0 pointer-events-none' : ''
      } ${
        isScrolled
          ? 'bg-navy/90 backdrop-blur-md shadow-lg border-b border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <AnimatePresence>
          {pastHero && !nearFooter && (
            <motion.a
              key="lockup"
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              aria-label="Adanac Advisory home"
              className="hidden md:flex items-center focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded-lg focus:outline-none"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <AdanacMark size={24} tile={false} fill="#ffffff" />
              <div className="w-px h-5 bg-white/20 mx-3" />
              <AdanacWordmark color="#ffffff" incColor="rgba(255,255,255,0.35)" fontSize={14} showInc={false} />
            </motion.a>
          )}
        </AnimatePresence>

        <div className="hidden md:flex items-center gap-8 ml-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white/85 hover:text-glacier font-medium text-sm tracking-wide transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded-lg focus:outline-none"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <AnimatePresence>
            {pastHero && !nearFooter && (
              <motion.a
                key="mobile-lockup"
                href="#hero"
                onClick={(e) => handleNavClick(e, '#hero')}
                aria-label="Adanac Advisory home"
                className="flex items-center focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded-lg focus:outline-none"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <AdanacMark size={20} tile={false} fill="#ffffff" />
              </motion.a>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-glacier focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-menu"
        aria-hidden={!isMobileMenuOpen}
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
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="text-white/85 hover:text-glacier font-medium text-base py-2 border-b border-white/5 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded-lg focus:outline-none"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
