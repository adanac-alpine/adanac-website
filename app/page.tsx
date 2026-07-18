import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import SocialProof from '@/components/SocialProof'
import Services from '@/components/Services'
import Process from '@/components/Process'
import ToolsWorkflow from '@/components/ToolsWorkflow'
import WhatIBring from '@/components/WhatIBring'
import Scoutloop from '@/components/Scoutloop'

import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <SocialProof />
        <Process />
        <ToolsWorkflow />
        <WhatIBring />
        <Scoutloop />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
