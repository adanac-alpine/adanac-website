'use client'

import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'
import TrianglePattern from './brand/TrianglePattern'

export default function WhatIBring() {
  const differentiators = [
    {
      title: 'Vendor Liaison',
      description: 'I speak both languages — the vendor\'s technical team and your business stakeholders. I translate between them so nothing gets lost.',
    },
    {
      title: 'Hands-On Delivery',
      description: 'I don\'t just advise from the sidelines. I configure, I test, I sit in the room with your team during UAT. Delivery, not decks.',
    },
    {
      title: 'Coaching & Team Building',
      description: 'I\'ve hired and coached new consultants at Modes. I help your team build internal capability, not dependency.',
    },
    {
      title: 'Bilingual',
      description: 'English and Russian. Useful when working with diverse teams and international stakeholders.',
    },
  ]

  return (
    <section className="relative overflow-hidden py-24 bg-navy text-white">
      <TrianglePattern variant="dark" opacity={0.08} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 container mx-auto px-6 md:px-12">

        <FadeIn>
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-glacier uppercase">
              Why Me
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              What I bring to your project
            </h2>
          </div>
        </FadeIn>

        <StaggerChildren stagger={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="space-y-3">
                  <div className="h-1 w-12 bg-glacier rounded-full" />
                  <h3 className="text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>

      </div>
    </section>
  )
}
