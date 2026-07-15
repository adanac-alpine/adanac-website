'use client'

import { FadeIn } from './animation/FadeIn'

function ToolIcon({ name, className = '' }: { name: string; className?: string }) {
  const src = `/logos/tools/${name}.svg`
  return (
    <img
      src={src}
      alt={`${name} logo`}
      className={className}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.style.display = 'none'
      }}
    />
  )
}

const row1 = [
  { name: 'JIRA', icon: 'jira' },
  { name: 'Confluence', icon: 'confluence' },
  { name: 'Slack', icon: 'slack' },
  { name: 'MS Teams', icon: 'teams' },
  { name: 'Claude', icon: 'claude' },
  { name: 'ChatGPT', icon: 'chatgpt' },
  { name: 'Copilot', icon: 'copilot' },
  { name: 'Gemini', icon: 'gemini' },
  { name: 'OpenCode', icon: 'opencode' },
  { name: 'Jules', icon: 'jules' },
]

const row2 = [
  { name: 'Azure DevOps', icon: 'azuredevops' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'React', icon: 'react' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'Python', icon: 'python' },
  { name: 'FastAPI', icon: 'fastapi' },
  { name: 'Vercel', icon: 'vercel' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Render', icon: 'render' },
  { name: 'PostHog', icon: 'posthog' },
  { name: 'Sentry', icon: 'sentry' },
  { name: 'Playwright', icon: 'playwright' },
]

function MarqueeRow({ tools, reverse = false }: { tools: typeof row1; reverse?: boolean }) {
  const doubled = [...tools, ...tools]

  return (
    <div className="relative overflow-hidden group">
      <div
        className={`flex gap-3 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {doubled.map((tool, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 hover:border-glacier/30 hover:shadow-md hover:shadow-glacier/5 transition-all duration-300 shrink-0"
          >
            <ToolIcon name={tool.icon} className="w-8 h-8 shrink-0" />
            <span className="text-sm font-semibold text-navy whitespace-nowrap">{tool.name}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-off-white to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-off-white to-transparent pointer-events-none" />
    </div>
  )
}

export default function ToolsWorkflow() {
  return (
    <section id="tools" className="py-24 bg-off-white">
      <div className="container mx-auto px-6 md:px-12">

        <FadeIn>
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-glacier uppercase">
              Tools & Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
              Tools I use
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-4">
          <MarqueeRow tools={row1} />
          <MarqueeRow tools={row2} reverse />
        </div>

      </div>
    </section>
  )
}
