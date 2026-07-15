'use client'

import { motion } from 'framer-motion'
import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'

// Helper to render static credential logo components
function CredentialLogo({ name, className = '' }: { name: string; className?: string }) {
  switch (name) {
    case 'cbap':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1a2332" />
          <rect x="4" y="4" width="32" height="32" rx="6" fill="none" stroke="#d95f26" strokeWidth="1.5" />
          <text x="20" y="17" textAnchor="middle" fill="#d95f26" fontSize="8" fontWeight="800" fontFamily="Inter, sans-serif">CBAP</text>
          <text x="20" y="27" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="Inter, sans-serif">IIBA</text>
        </svg>
      )
    case 'cspo':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1a2332" />
          <rect x="4" y="4" width="32" height="32" rx="6" fill="none" stroke="#2d6a4f" strokeWidth="1.5" />
          <text x="20" y="17" textAnchor="middle" fill="#2d6a4f" fontSize="8" fontWeight="800" fontFamily="Inter, sans-serif">CSPO</text>
          <text x="20" y="27" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="Inter, sans-serif">Scrum</text>
        </svg>
      )
    case 'backbase':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1a2332" />
          <rect x="4" y="4" width="32" height="32" rx="6" fill="none" stroke="#00D4AA" strokeWidth="1.5" />
          <text x="20" y="17" textAnchor="middle" fill="#00D4AA" fontSize="6" fontWeight="800" fontFamily="Inter, sans-serif">BACKBASE</text>
          <text x="20" y="27" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="Inter, sans-serif">Certified</text>
        </svg>
      )
    case 'sfadmin':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1a2332" />
          <rect x="4" y="4" width="32" height="32" rx="6" fill="none" stroke="#00A1E0" strokeWidth="1.5" />
          <text x="20" y="17" textAnchor="middle" fill="#00A1E0" fontSize="6" fontWeight="800" fontFamily="Inter, sans-serif">SF ADMIN</text>
          <text x="20" y="27" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="Inter, sans-serif">Certified</text>
        </svg>
      )
    case 'ubc':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1a2332" />
          <rect x="4" y="4" width="32" height="32" rx="6" fill="none" stroke="#4a90d9" strokeWidth="1.5" />
          <text x="20" y="17" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800" fontFamily="Inter, sans-serif">UBC</text>
          <text x="20" y="27" textAnchor="middle" fill="#4a90d9" fontSize="5" fontFamily="Inter, sans-serif">Sauder</text>
        </svg>
      )
    case 'mfin':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1a2332" />
          <rect x="4" y="4" width="32" height="32" rx="6" fill="none" stroke="#4a90d9" strokeWidth="1.5" />
          <text x="20" y="17" textAnchor="middle" fill="#4a90d9" fontSize="8" fontWeight="800" fontFamily="Inter, sans-serif">MFin</text>
          <text x="20" y="27" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="Inter, sans-serif">BSUE</text>
        </svg>
      )
    case 'ucw':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1a2332" />
          <text x="20" y="16" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="700" fontFamily="Inter, sans-serif">UCW</text>
          <text x="20" y="26" textAnchor="middle" fill="#4a90d9" fontSize="5" fontFamily="Inter, sans-serif">Sessional</text>
        </svg>
      )
    case 'iiba':
      return (
        <svg className={className} viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1a2332" />
          <text x="20" y="16" textAnchor="middle" fill="#d95f26" fontSize="7" fontWeight="700" fontFamily="Inter, sans-serif">IIBA</text>
          <text x="20" y="26" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="Inter, sans-serif">VP Prof Dev</text>
        </svg>
      )
    default:
      return null
  }
}

// Move static credential groups array outside of the component to prevent recreation on every render cycle.
const CREDENTIAL_GROUPS_DATA = [
  {
    title: 'Education',
    items: [
      { text: 'MBA — UBC Sauder School of Business', logo: 'ubc' },
      { text: 'Master of Finance — Belarus State University of Economics', logo: 'mfin' },
    ],
  },
  {
    title: 'Certifications',
    items: [
      { text: 'CBAP (Certified Business Analysis Professional)', logo: 'cbap' },
      { text: 'CSPO (Certified Scrum Product Owner)', logo: 'cspo' },
      { text: 'Backbase Certified Consultant', logo: 'backbase' },
      { text: 'Salesforce Certified Administrator', logo: 'sfadmin' },
    ],
  },
  {
    title: 'Teaching & Community',
    items: [
      { text: 'Sessional Instructor — University Canada West', logo: 'ucw' },
      { text: 'VP of Professional Development — IIBA', logo: 'iiba' },
    ],
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-off-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-7 space-y-8">
            <FadeIn>
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-glacier uppercase">
                  About
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
                  Bridging the gap between digital strategy and platform execution
                </h2>
              </div>
            </FadeIn>

            <StaggerChildren stagger={0.12} className="text-dark-gray text-base sm:text-lg leading-relaxed space-y-6">
              <StaggerItem>
                <p className="font-medium text-navy/95 text-lg sm:text-xl">
                  16 years in financial services — from credit unions to enterprise commercial banking. I help financial institutions go from digital strategy to production on Backbase and VeriPark.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p>
                  My experience spans the full spectrum: a small FinTech startup, a Canadian credit union, a fast-growing bank in Belarus, and high-scale enterprise commercial banking in North America. That range means I understand the constraints and realities at every level — from a 35,000-member credit union to a top-6 Canadian bank.
                </p>
              </StaggerItem>
            </StaggerChildren>
          </div>

          <FadeIn delay={0.3} className="lg:col-span-5">
            <div className="relative bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
              <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
                <span className="text-glacier">■</span> Credentials
              </h3>

              <div className="space-y-6">
                {CREDENTIAL_GROUPS_DATA.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-glacier">
                      {group.title}
                    </h4>
                    <div className="space-y-2">
                      {group.items.map((item, itemIdx) => (
                        <motion.div
                          key={itemIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + groupIdx * 0.15 + itemIdx * 0.08, duration: 0.4 }}
                          className="flex items-center gap-3"
                        >
                          {item.logo && <CredentialLogo name={item.logo} className="w-10 h-10 shrink-0" />}
                          {!item.logo && <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />}
                          <span className="text-dark-gray text-sm sm:text-base font-medium">
                            {item.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
