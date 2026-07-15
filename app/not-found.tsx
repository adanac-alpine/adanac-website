'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#1a2332] text-white p-6 relative overflow-hidden">
      {/* Background Topo Lines Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="topo-404" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="20" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="35" fill="none" stroke="white" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-404)" />
      </svg>

      <div className="relative z-10 text-center max-w-md space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <span className="text-xs font-bold tracking-widest text-[#4a90d9] uppercase">
            Error 404
          </span>
          <h1 className="text-7xl sm:text-8xl font-extrabold text-white tracking-tight">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-2xl font-bold text-white">
            Page not found
          </h2>
          <p className="text-[#a8b3c1] text-base leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="pt-4"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#4a90d9] text-white rounded-lg font-semibold hover:bg-[#3a73ae] transition-colors duration-200 shadow-lg shadow-[#4a90d9]/20"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
