'use client'

import { useState } from 'react'
import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'
import TrianglePattern from './brand/TrianglePattern'

const projects = {
  VeriPark: [
    { description: 'Delivery lead for VeriChannel digital banking implementation at a Manitoba credit union serving 35,000+ members across 19 branches.', type: 'Credit Union' },
    { description: 'Product owner advisor for VeriChannel rollout at an Ontario credit union with 65,000+ members and $3.5B in assets under administration.', type: 'Credit Union' },
  ],
  Backbase: [
    { description: "Delivered commercial banking digital channels for a top-6 Canadian bank — recognized as one of Backbase's most successful commercial banking implementations in North America.", type: 'Bank' },
    { description: "Contributed to digital banking platform delivery for a $200B+ US bank — J.D. Power's #1 ranked mobile banking app for customer satisfaction.", type: 'Bank' },
  ],
  Salesforce: [
    { description: 'Leading data quality and case management automation across multiple workstreams on Salesforce Financial Services Cloud at a mid-sized Ontario credit union.', type: 'Credit Union' },
    { description: 'Implemented Fiserv DNA data synchronization and integration workflows at a Manitoba credit union on Salesforce Financial Services Cloud.', type: 'Credit Union' },
  ],
}

const tabs = ['VeriPark', 'Backbase', 'Salesforce'] as const

export default function SocialProof() {
  const [activeTab, setActiveTab] = useState<string>('VeriPark')
  const activeProjects = projects[activeTab as keyof typeof projects]

  return (
    <section className="relative overflow-hidden py-24 bg-navy text-white">
      <TrianglePattern variant="dark" opacity={0.08} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 container mx-auto px-6 md:px-12">

        <FadeIn>
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-glacier uppercase">
              Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Where I&apos;ve delivered
            </h2>
            <p className="text-white/60 text-lg">
              I&apos;ve worked with banks and credit unions across North America to deliver production-ready digital banking platforms.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="flex gap-3 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 focus-visible:ring-offset-navy focus:outline-none ${
                  activeTab === tab
                    ? 'bg-white text-navy'
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </FadeIn>

        <StaggerChildren stagger={0.1} key={activeTab}>
          <div className={`grid gap-6 ${activeProjects.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {activeProjects.map((client, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-glacier/30 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-glacier bg-glacier/10 px-2.5 py-1 rounded">
                      {activeTab}
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
