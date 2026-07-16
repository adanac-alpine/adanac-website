'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'

// Move static services array outside of the component to prevent recreation on every render cycle.
const SERVICES_DATA = [
  {
    title: 'VeriChannel Migration',
    description:
      'Migrating digital banking from legacy platforms to VeriPark VeriChannel — scope classification, phased delivery, and production cutover for credit unions.',
    capabilities: [
      'Migration scope classification (Phase 1 / Phase 2)',
      'Requirements validation & FRD review',
      'UAT coordination & go-live readiness',
      'Post-launch stabilization support',
      'Legacy platform deconversion planning',
      'Multi-vendor RAID management & escalation',
      'Weekly status reporting & PMO alignment',
    ],
    icon: (
      <Image src="/logos/veripark.svg" alt="VeriPark logo" className="w-10 h-10 object-contain" loading="lazy" decoding="async" width={40} height={40} />
    ),
  },
  {
    title: 'Backbase Delivery',
    description:
      'Senior BA with deep Backbase platform expertise — requirements validation, UAT coordination, and stakeholder alignment for commercial banking digital channels.',
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
      'Salesforce Financial Services Cloud for credit unions — requirements coordination, stakeholder management, data quality frameworks, and case management automation. SF certified, currently delivering at multiple Canadian credit unions.',
    capabilities: [
      'Financial Services Cloud configuration',
      'Case management & workflow automation',
      'Data quality frameworks & deduplication',
      'Requirements coordination & stakeholder management',
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
              I help credit unions and banks migrate to modern digital banking platforms — managing the governance, scope, and vendor coordination that determines whether a project lands on time or derails. From Discovery through production cutover, I own the delivery.
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
