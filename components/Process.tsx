'use client'

import { Search, Settings, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'I learn your business, your members, and your current technology landscape. Together we define what success looks like and build a roadmap to get there.',
      icon: <Search className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      number: '02',
      title: 'Implementation',
      description: 'Hands-on delivery — platform configuration, system integration, data migration, and custom development. I work alongside your team as part of the delivery, not just an advisor pointing at slides.',
      icon: <Settings className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      number: '03',
      title: 'Launch & Support',
      description: 'Testing, training, go-live support, and post-launch optimization. I stay involved until the platform is running smoothly and your team is confident.',
      icon: <Rocket className="w-6 h-6" strokeWidth={1.5} />,
    },
  ]

  return (
    <section id="process" className="py-24 bg-off-white">
      <div className="container mx-auto px-6 md:px-12">

        <FadeIn>
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-glacier uppercase">
              How I Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
              From first call to production
            </h2>
          </div>
        </FadeIn>

        <StaggerChildren stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="relative"
                >
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)]">
                      <div style={{ borderTop: '1px dashed rgba(74,144,217,0.3)' }} />
                    </div>
                  )}
                  <div className="text-center space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-navy/5 border border-navy/10 text-glacier"
                    >
                      {step.icon}
                    </motion.div>
                    <div>
                      <span className="text-xs font-bold text-glacier/60 uppercase tracking-widest">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-navy">
                      {step.title}
                    </h3>
                    <p className="text-dark-gray text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>

      </div>
    </section>
  )
}
