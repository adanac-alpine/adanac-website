'use client'

import { FadeIn } from './animation/FadeIn'

export default function Scoutloop() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="bg-off-white rounded-2xl p-8 sm:p-12 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-widest text-glacier uppercase">
                    Personal Project
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
                    Scoutloop
                  </h2>
                  <p className="text-dark-gray text-lg">
                    AI-native development in practice. Not just advising on digital transformation — building it.
                  </p>
                </div>

                <p className="text-dark-gray leading-relaxed">
                  A pre-trip briefing layer for backcountry users in BC. Aggregates weather, avalanche danger, road closures, and fire bans into a single briefing. Built with Next.js, Supabase, and Vercel — powered by Claude for AI risk assessment.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'Supabase', 'Vercel', 'Claude AI'].map((tech) => (
                    <span key={tech} className="text-xs bg-navy/5 text-navy font-semibold px-2.5 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href="https://scoutloop.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-glacier font-semibold hover:underline"
                >
                  scoutloop.me
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="bg-navy rounded-xl p-8 text-white">
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-glacier">
                    AI-Native Development
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Scoutloop is built using AI-assisted development workflows — Claude for code generation and risk assessment, Codex for rapid prototyping. This is the same approach I bring to client projects: modern tooling, fast iteration, production-quality output.
                  </p>
                  <div className="pt-2 border-t border-white/10">
                    <div className="text-xs text-white/40">
                      This website was also built using AI-native development workflows.
                    </div>
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
