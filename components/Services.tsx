'use client'

import { motion } from 'framer-motion'
import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'

export default function Services() {
  const services = [
    {
      title: 'Backbase Implementation',
      description:
        'End-to-end delivery of Backbase digital banking — from commercial and retail banking channels to mobile apps. I act as BA, delivery lead, or product owner advisor to get your platform from architecture to production.',
      capabilities: [
        'Business & technical requirements gathering',
        'Platform architecture and configuration',
        'Core banking system integration',
        'UAT coordination and testing',
        'Go-live support and post-launch optimization',
      ],
      icon: (
        <svg className="w-8 h-8 text-glacier" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      title: 'VeriPark Implementation',
      description:
        'VeriChannel, VeriTouch CRM, and VeriLoan LOS delivery for credit unions. I help Canadian financial institutions modernize their digital banking on Microsoft Azure and Dynamics — from vendor selection support through to go-live.',
      capabilities: [
        'VeriChannel internet & mobile banking delivery',
        'VeriTouch CRM configuration and data migration',
        'VeriLoan LOS rollout and workflow design',
        'Core banking integration (Fiserv DNA, Central 1)',
        'Member experience design and UAT',
      ],
      icon: (
        <svg className="w-8 h-8 text-glacier" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
    },
  ]

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">

        <FadeIn>
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-glacier uppercase">
              Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
              What I do
            </h2>
            <p className="text-dark-gray text-lg">
              I specialize in two platforms: Backbase and VeriPark. That depth means I can deliver faster, catch issues earlier, and actually help your team — not just advise from the sidelines.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <FadeIn key={idx} delay={idx * 0.15}>
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(74, 144, 217, 0.15)' }}
                transition={{ duration: 0.3 }}
                className="group bg-off-white rounded-2xl p-8 border border-gray-100 hover:border-glacier/30 transition-colors duration-300 flex flex-col h-full"
              >
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="h-14 w-14 rounded-xl bg-navy/5 flex items-center justify-center transition-colors group-hover:bg-glacier/10"
                  >
                    {service.icon}
                  </motion.div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-navy group-hover:text-glacier transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-dark-gray leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs font-bold text-navy uppercase tracking-wider mb-3">
                      What I deliver
                    </div>
                    <ul className="space-y-2">
                      {service.capabilities.map((cap, capIdx) => (
                        <li key={capIdx} className="flex items-center gap-2 text-sm text-dark-gray">
                          <span className="h-1.5 w-1.5 rounded-full bg-glacier shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
