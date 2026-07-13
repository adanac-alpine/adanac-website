'use client'

import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'

export default function SocialProof() {
  const clients = [
    {
      platform: 'Backbase',
      description: 'Delivered commercial banking digital channels for a top-6 Canadian bank — recognized as one of Backbase&apos;s most successful commercial banking implementations in North America.',
      type: 'Bank',
    },
    {
      platform: 'Backbase',
      description: 'Contributed to digital banking platform delivery for a $200B+ US bank — J.D. Power&apos;s #1 ranked mobile banking app for customer satisfaction.',
      type: 'Bank',
    },
    {
      platform: 'VeriPark',
      description: 'Delivery lead for VeriChannel digital banking implementation at a Manitoba credit union serving 35,000+ members across 19 branches.',
      type: 'Credit Union',
    },
    {
      platform: 'VeriPark',
      description: 'Product owner advisor for VeriChannel rollout at an Ontario credit union with 65,000+ members and $3.5B in assets under administration.',
      type: 'Credit Union',
    },
  ]

  return (
    <section className="py-24 bg-navy text-white">
      <div className="container mx-auto px-6 md:px-12">

        <FadeIn>
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-glacier uppercase">
              Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Platforms I&apos;ve delivered on
            </h2>
            <p className="text-white/60 text-lg">
              I&apos;ve worked with banks and credit unions across North America to deliver production-ready digital banking platforms.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clients.map((client, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-glacier/30 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-glacier bg-glacier/10 px-2.5 py-1 rounded">
                      {client.platform}
                    </span>
                    <span className="text-xs text-white/40 uppercase tracking-wider">
                      {client.type}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    {client.description}
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
