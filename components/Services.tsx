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
        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#0A2540" />
          <path d="M11 12h8c3.3 0 6 2.7 6 6s-2.7 6-6 6h-8V12z" fill="none" stroke="#00D4AA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 18h8" stroke="#00D4AA" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M19 18c2.2 0 4 1.8 4 4s-1.8 4-4 4" fill="none" stroke="#00D4AA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25 14v12" stroke="#00D4AA" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Salesforce Implementation',
      description:
        'Salesforce Financial Services Cloud and Service Cloud for credit unions — member data unification, case management automation, advisor consoles, and data quality frameworks. SF certified, currently delivering at YNCU and Sunrise Credit Union.',
      capabilities: [
        'Financial Services Cloud configuration',
        'Case management & workflow automation',
        'Data quality frameworks & deduplication',
        'Core banking data synchronization (Fiserv DNA)',
        'User training & adoption support',
      ],
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#00A1E0" />
          <path d="M20.5 10c-2.2 0-4.2 1-5.5 2.6a6.1 6.1 0 0 0-3.5 5.6c0 3.4 2.7 6.1 6.1 6.1.8 0 1.6-.2 2.3-.5a5.9 5.9 0 0 0 5.2 3.2c3.3 0 6-2.7 6-6a5.9 5.9 0 0 0-5-5.8 7.5 7.5 0 0 0-5.6-4.6z" fill="#fff" />
        </svg>
      ),
    },
    {
      title: 'VeriPark Implementation',
      description:
        'VeriPark VeriChannel and VeriTouch for credit unions — omnichannel customer journeys, digital onboarding, loan origination workflows, and front-back office integration. Deep experience with VeriChannel at Manitoba and Ontario credit unions.',
      capabilities: [
        'VeriChannel digital banking configuration',
        'Omnichannel journey orchestration',
        'Loan origination & underwriting workflows',
        'Front-back office integration',
        'Digital onboarding & KYC flows',
      ],
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="10" fill="#6C2BD9" />
          <path d="M10 26V14l5 6 5-6v12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 14h3c1.7 0 3 1.3 3 3v1c0 1.7-1.3 3-3 3h-3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 21h4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
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
              I specialize in three platform ecosystems: Backbase for digital banking, Salesforce for financial services CRM, and VeriPark for omnichannel customer journeys. That depth means I can deliver faster, catch issues earlier, and actually help your team — not just advise from the sidelines.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
