'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from './animation/FadeIn'

function TechLogo({ name, label, className = '' }: { name: string; label: string; className?: string }) {
  const [src, setSrc] = useState(`/logos/${name}.svg`)

  const handleError = () => {
    if (src === `/logos/${name}.svg`) {
      setSrc(`/logos/${name}.png`)
    } else if (src === `/logos/${name}.png`) {
      setSrc(`/logos/${name}.jpg`)
    }
  }

  return (
    <Image
      src={src}
      alt={`${label} logo`}
      width={120}
      height={32}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  )
}

export default function TechStack() {
  const platforms = [
    { name: 'Backbase', description: 'Digital Banking Platform', logo: 'backbase', label: 'Backbase' },
    { name: 'VeriPark VeriChannel', description: 'Omnichannel Banking', logo: 'veripark', label: 'VeriPark' },
    { name: 'VeriPark VeriTouch', description: 'CRM & Engagement', logo: 'veripark', label: 'VeriPark' },
    { name: 'JUDI.AI', description: 'Loan Origination & Adjudication', logo: 'judiai', label: 'JUDI.AI' },
    { name: 'Salesforce', description: 'CRM & Financial Services Cloud', logo: 'salesforce', label: 'Salesforce' },
    { name: 'Microsoft Azure', description: 'Cloud Infrastructure', logo: 'azure', label: 'Azure' },
    { name: 'Fiserv DNA', description: 'Core Banking Integration', logo: 'fiserv', label: 'Fiserv' },
    { name: 'Central 1', description: 'Canadian Payments', logo: 'central1', label: 'Central 1' },
    { name: 'Azure DevOps', description: 'CI/CD & Project Tracking', logo: 'azuredevops', label: 'Azure DevOps' },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">

        <FadeIn>
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-glacier uppercase">
              Tech Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
              Platforms I work with
            </h2>
            <p className="text-dark-gray text-lg">
              Deep expertise in Backbase and VeriPark, with working knowledge of the broader financial services technology ecosystem.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {platforms.map((platform, idx) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    y: -2,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
                    borderColor: 'rgba(74, 144, 217, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
                  className="group bg-off-white rounded-xl p-5 border border-gray-100 hover:border-glacier/30 hover:shadow-lg hover:shadow-glacier/5"
                >
                  <div className="h-8 flex items-center mb-2">
                    <TechLogo name={platform.logo} label={platform.label} className="max-h-8 max-w-[120px] w-auto object-contain" />
                  </div>
                  <div className="text-xs text-medium-gray">
                    {platform.description}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
