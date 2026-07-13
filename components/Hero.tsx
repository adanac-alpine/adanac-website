'use client'

import { motion } from 'framer-motion'
import AdanacMark from './brand/AdanacMark'
import AdanacWordmark from './brand/AdanacWordmark'
import TrianglePattern from './brand/TrianglePattern'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const } },
}

const line = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const } },
}

export default function Hero() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-navy text-white overflow-hidden pt-20"
    >
      {/* Brand triangle pattern background */}
      <TrianglePattern variant="dark" opacity={0.04} className="absolute inset-0 w-full h-full" />

      {/* Hero content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl px-6"
      >
        <motion.div variants={item}>
          <AdanacMark size={120} tile={false} fill="#ffffff" />
        </motion.div>

        <motion.div variants={line} className="w-px h-8 bg-white/20" />

        <motion.div variants={item}>
          <AdanacWordmark color="#ffffff" incColor="rgba(255,255,255,0.35)" fontSize={24} />
        </motion.div>

        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mt-4"
        >
          Launch your digital banking platform.
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg sm:text-xl text-white/70 font-normal max-w-2xl leading-relaxed"
        >
          Backbase and VeriPark implementation consulting for credit unions, banks, and FinTechs. I help financial institutions go from digital strategy to production — on time, on budget.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <button
            onClick={handleScrollToContact}
            className="bg-glacier hover:bg-glacier-600 text-white font-semibold tracking-wide px-8 py-4 rounded-lg shadow-lg shadow-glacier/25 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Get in touch
          </button>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold tracking-wide px-8 py-4 rounded-lg transition-all duration-300"
          >
            Learn more
          </a>
        </motion.div>
      </motion.div>

      {/* Glacier blue accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-glacier" />
    </section>
  )
}
