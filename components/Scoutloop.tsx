'use client'

import Image from 'next/image'
import { FadeIn } from './animation/FadeIn'

function ScoutloopMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Scoutloop"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M50 11 A39 39 0 1 0 50 89 A39 39 0 1 0 50 11 Z M12.3 60 L33 42 L48 58 L62 35 L87.7 60 A39 39 0 0 1 12.3 60 Z"
      />
    </svg>
  )
}

export default function Scoutloop() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="rounded-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content side */}
              <div className="bg-off-white p-8 sm:p-12 space-y-6">
                <div className="flex items-center gap-4">
                  <ScoutloopMark className="w-12 h-12 text-forest" />
                  <div className="space-y-1">
                    <span className="text-xs font-bold tracking-widest text-glacier uppercase">
                      Built in BC
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
                      Scoutloop
                    </h2>
                  </div>
                </div>

                <p className="text-dark-gray text-lg leading-relaxed">
                  I spend as much time as I can in the BC backcountry — trailrunning, hiking, and ski touring. Scoutloop came from a real need: knowing what conditions actually look like before you drive three hours to a trailhead.
                </p>

                <p className="text-dark-gray leading-relaxed">
                  It pulls weather, avalanche danger, road closures, and fire bans into one pre-trip briefing. Built with the same modern stack I bring to client work — and built using AI-assisted development workflows with Claude, Codex, Gemini, and OpenCode.
                </p>

                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Next.js', icon: 'nextjs' },
                    { name: 'React', icon: 'react' },
                    { name: 'Supabase', icon: 'supabase' },
                    { name: 'Vercel', icon: 'vercel' },
                    { name: 'Tailwind', icon: 'tailwind' },
                    { name: 'Python', icon: 'python' },
                    { name: 'FastAPI', icon: 'fastapi' },
                  ].map((tech) => (
                    <div key={tech.name} className="flex items-center gap-1.5 bg-glacier/5 text-glacier rounded-lg px-2.5 py-1.5">
                      <Image
                        src={`/logos/tools/${tech.icon}.svg`}
                        alt={`${tech.name} logo`}
                        width={16}
                        height={16}
                        className="w-4 h-4 shrink-0"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                      <span className="text-xs font-semibold">{tech.name}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://scoutloop.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-glacier font-semibold hover:underline group focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded focus:outline-none"
                >
                  Visit Scoutloop
                  <span className="sr-only">(opens in a new tab)</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Visual side — topo pattern + logo */}
              <div className="bg-navy relative flex items-center justify-center p-12 min-h-[320px]">
                {/* Subtle topo line pattern */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-10"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <defs>
                    <pattern id="topo" width="60" height="60" patternUnits="userSpaceOnUse">
                      <circle cx="30" cy="30" r="20" fill="none" stroke="white" strokeWidth="0.5" />
                      <circle cx="30" cy="30" r="35" fill="none" stroke="white" strokeWidth="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#topo)" />
                </svg>

                <div className="relative z-10 text-center space-y-6">
                  <ScoutloopMark className="w-24 h-24 text-white mx-auto drop-shadow-lg" />
                  <div className="space-y-2">
                    <p className="text-white/90 font-semibold text-lg">
                      Know before you go.
                    </p>
                    <p className="text-white/50 text-sm">
                      scoutloop.me
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
