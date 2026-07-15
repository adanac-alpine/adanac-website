'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'

// Move static services array outside of the component to prevent recreation on every render cycle.
const SERVICES_DATA = [
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
      <Image src="/logos/veripark.svg" alt="VeriPark logo" className="w-10 h-10 object-contain" loading="lazy" decoding="async" width={40} height={40} />
    ),
  },
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
      <Image src="/logos/backbase.jpg" alt="Backbase logo" width={40} height={40} className="object-contain" />
    ),
  },
  {
    title: 'Salesforce Implementation',
    description:
      'Salesforce Financial Services Cloud and Service Cloud for credit unions — member data unification, case management automation, advisor consoles, and data quality frameworks. SF certified, currently delivering at multiple Canadian credit unions.',
    capabilities: [
      'Financial Services Cloud configuration',
      'Case management & workflow automation',
      'Data quality frameworks & deduplication',
      'Core banking data synchronization (Fiserv DNA)',
      'User training & adoption support',
    ],
    icon: (
      <Image src="/logos/salesforce.svg" alt="Salesforce logo" className="w-10 h-10 object-contain" loading="lazy" decoding="async" width={40} height={40} />
    ),
  },
]

export default function Services() {
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
              I specialize in three platform ecosystems: Backbase commercial banking, Salesforce Financial Services Cloud, and VeriPark omnichannel (VeriTouch). That depth means I can deliver faster, catch issues earlier, and actually help your team — not just advise from the sidelines.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => (
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
