'use client'

import { FadeIn } from './animation/FadeIn'

function TechLogo({ name, className = '' }: { name: string; className?: string }) {
  const logos: Record<string, JSX.Element> = {
    backbase: (
      <svg className={className} viewBox="0 0 120 32" fill="none">
        <text x="0" y="22" fill="#4a90d9" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">Backbase</text>
      </svg>
    ),
    veripark: (
      <svg className={className} viewBox="0 0 120 32" fill="none">
        <text x="0" y="22" fill="#4a90d9" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">VeriPark</text>
      </svg>
    ),
    judiai: (
      <svg className={className} viewBox="0 0 120 32" fill="none">
        <text x="0" y="22" fill="#4a90d9" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">JUDI.AI</text>
      </svg>
    ),
    salesforce: (
      <svg className={className} viewBox="0 0 120 32" fill="none">
        <text x="0" y="22" fill="#4a90d9" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">Salesforce</text>
      </svg>
    ),
    azure: (
      <svg className={className} viewBox="0 0 120 32" fill="none">
        <text x="0" y="22" fill="#4a90d9" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">Microsoft Azure</text>
      </svg>
    ),
    fiserv: (
      <svg className={className} viewBox="0 0 120 32" fill="none">
        <text x="0" y="22" fill="#4a90d9" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">Fiserv DNA</text>
      </svg>
    ),
    central1: (
      <svg className={className} viewBox="0 0 120 32" fill="none">
        <text x="0" y="22" fill="#4a90d9" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">Central 1</text>
      </svg>
    ),
    dynamics: (
      <svg className={className} viewBox="0 0 120 32" fill="none">
        <text x="0" y="22" fill="#4a90d9" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">Dynamics 365</text>
      </svg>
    ),
    azuredevops: (
      <svg className={className} viewBox="0 0 120 32" fill="none">
        <text x="0" y="22" fill="#4a90d9" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">Azure DevOps</text>
      </svg>
    ),
  }

  return logos[name] || null
}

export default function TechStack() {
  const platforms = [
    { name: 'Backbase', description: 'Digital Banking Platform', logo: 'backbase' },
    { name: 'VeriPark VeriChannel', description: 'Omnichannel Banking', logo: 'veripark' },
    { name: 'VeriPark VeriTouch', description: 'CRM & Engagement', logo: 'veripark' },
    { name: 'JUDI.AI', description: 'Loan Origination & Adjudication', logo: 'judiai' },
    { name: 'Salesforce', description: 'CRM & Financial Services Cloud', logo: 'salesforce' },
    { name: 'Microsoft Azure', description: 'Cloud Infrastructure', logo: 'azure' },
    { name: 'Fiserv DNA', description: 'Core Banking Integration', logo: 'fiserv' },
    { name: 'Central 1', description: 'Canadian Payments', logo: 'central1' },
    { name: 'Dynamics 365', description: 'Microsoft CRM Platform', logo: 'dynamics' },
    { name: 'Azure DevOps', description: 'CI/CD & Project Tracking', logo: 'azuredevops' },
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
              <div
                key={idx}
                className="group bg-off-white rounded-xl p-5 border border-gray-100 hover:border-glacier/30 hover:shadow-lg hover:shadow-glacier/5 transition-all duration-300"
              >
                <div className="h-8 flex items-center mb-2">
                  <TechLogo name={platform.logo} className="h-5" />
                </div>
                <div className="text-xs text-medium-gray">
                  {platform.description}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
