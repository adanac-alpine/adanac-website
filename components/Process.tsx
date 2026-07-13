'use client'

import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'I learn your business, your members, and your current technology landscape. Together we define what success looks like and build a roadmap to get there.',
    },
    {
      number: '02',
      title: 'Implementation',
      description: 'Hands-on delivery — platform configuration, system integration, data migration, and custom development. I work alongside your team as part of the delivery, not just an advisor pointing at slides.',
    },
    {
      number: '03',
      title: 'Launch & Support',
      description: 'Testing, training, go-live support, and post-launch optimization. I stay involved until the platform is running smoothly and your team is confident.',
    },
  ]

  return (
    <section className="py-24 bg-off-white">
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
                <div className="relative">
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-glacier/20" />
                  )}
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy text-white text-xl font-extrabold">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-navy">
                      {step.title}
                    </h3>
                    <p className="text-dark-gray text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>

      </div>
    </section>
  )
}
