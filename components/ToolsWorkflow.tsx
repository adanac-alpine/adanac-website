'use client'

import { FadeIn } from './animation/FadeIn'

function ToolIcon({ name, className = '' }: { name: string; className?: string }) {
  const icons: Record<string, JSX.Element> = {
    jira: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#2684FF" />
        <path d="M28.5 11.5L18 22l-4.5-4.5L10 21l8 8 12.5-12.5L28.5 11.5z" fill="#fff" />
      </svg>
    ),
    confluence: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#172B4D" />
        <path d="M26.5 14c-1.5 0-3 .8-3.8 2.2l-2.4 4.3c-.5.9-.5 2 0 2.9l2.4 4.3c.8 1.4 2.3 2.2 3.8 2.2 2.2 0 4-1.8 4-4 0-1.1-.5-2.2-1.3-2.9l-1.7-1.4c-.5-.4-.5-1.1 0-1.5l1.7-1.4c.8-.7 1.3-1.8 1.3-2.9 0-2.2-1.8-4-4-4z" fill="#0052CC" />
        <path d="M13.5 14c-2.2 0-4 1.8-4 4 0 1.1.5 2.2 1.3 2.9l1.7 1.4c.5.4.5 1.1 0 1.5l-1.7 1.4c-.8.7-1.3 1.8-1.3 2.9 0 2.2 1.8 4 4 4 1.5 0 3-.8 3.8-2.2l2.4-4.3c.5-.9.5-2 0-2.9l-2.4-4.3C16.5 14.8 15 14 13.5 14z" fill="#2684FF" />
      </svg>
    ),
    slack: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#4A154B" />
        <circle cx="13" cy="20" r="3" fill="#E01E5A" />
        <circle cx="27" cy="20" r="3" fill="#36C5F0" />
        <circle cx="20" cy="13" r="3" fill="#2EB67D" />
        <circle cx="20" cy="27" r="3" fill="#ECB22E" />
        <rect x="12" y="17" width="2" height="6" rx="1" fill="#E01E5A" />
        <rect x="26" y="17" width="2" height="6" rx="1" fill="#36C5F0" />
        <rect x="17" y="12" width="6" height="2" rx="1" fill="#2EB67D" />
        <rect x="17" y="26" width="6" height="2" rx="1" fill="#ECB22E" />
      </svg>
    ),
    teams: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#5059C9" />
        <circle cx="26" cy="14" r="4" fill="#fff" />
        <rect x="16" y="12" width="14" height="10" rx="2" fill="#fff" opacity="0.3" />
        <rect x="10" y="20" width="20" height="3" rx="1.5" fill="#fff" opacity="0.5" />
        <circle cx="14" cy="28" r="3" fill="#fff" opacity="0.7" />
        <circle cx="22" cy="28" r="3" fill="#fff" opacity="0.7" />
      </svg>
    ),
    azuredevops: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#0078D7" />
        <path d="M10 28l4-16h4l-2 8h6l-8 12v-6h-4z" fill="#fff" />
        <path d="M22 12l8 4-8 4V12z" fill="#fff" opacity="0.8" />
      </svg>
    ),
    claude: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#D97757" />
        <path d="M14 28V14c0-3 2-5 5-5s4 2 4 4c0 1-.3 2-1 3l-2 3h8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    chatgpt: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#10A37F" />
        <path d="M20 10c-5.5 0-10 4-10 9 0 3 1.5 5.5 4 7.2v2.8l2.5-1.4c.8.2 1.7.4 2.5.4 5.5 0 10-4 10-9s-4.5-9-10-9z" fill="#fff" opacity="0.9" />
      </svg>
    ),
    copilot: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1F1F1F" />
        <circle cx="20" cy="18" r="6" fill="#fff" opacity="0.9" />
        <path d="M14 28c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
    gemini: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1C1C1C" />
        <path d="M20 10c-3 0-5 2-5 5v10c0 3 2 5 5 5s5-2 5-5V15c0-3-2-5-5-5z" fill="#4285F4" opacity="0.8" />
        <path d="M20 10c-3 0-5 2-5 5v5h10v-5c0-3-2-5-5-5z" fill="#EA4335" opacity="0.6" />
        <circle cx="20" cy="20" r="3" fill="#fff" />
      </svg>
    ),
    codex: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1a1a2e" />
        <path d="M12 20l5-5v3h6v4h-6v3l-5-5z" fill="#10a37f" />
        <path d="M28 20l-5 5v-3h-6v-4h6v-3l5 5z" fill="#10a37f" opacity="0.6" />
      </svg>
    ),
    opencode: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#6366F1" />
        <path d="M14 16l6 4-6 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 20h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    jules: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#8B5CF6" />
        <circle cx="20" cy="20" r="8" fill="#fff" opacity="0.9" />
        <text x="20" y="24" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontWeight="800" fontFamily="Inter, sans-serif">J</text>
      </svg>
    ),
    nextjs: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#000" />
        <path d="M15 12v16l6-6V12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 22l5 6V12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    react: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#20232A" />
        <circle cx="20" cy="20" r="3" fill="#61DAFB" />
        <ellipse cx="20" cy="20" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" />
        <ellipse cx="20" cy="20" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="20" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 20 20)" />
      </svg>
    ),
    tailwind: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#0F172A" />
        <path d="M14 18c1-4 4-5 8-5 6 0 7 4 9 6-2 2-4 3-7 3-3 0-5-1-6-3-1-1-2-1-4-1zm0 6c1-4 4-5 8-5 6 0 7 4 9 6-2 2-4 3-7 3-3 0-5-1-6-3-1-1-2-1-4-1z" fill="#38BDF8" />
      </svg>
    ),
    python: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#3776AB" />
        <path d="M20 10c-5 0-5 3-5 5v3h6v1h-8c-3 0-5 2-5 5s2 5 5 5h3v-3c0-3 2-5 5-5h8c2 0 3-1 3-3V18c0-2-1-4-4-4h-5" fill="#fff" opacity="0.9" />
        <circle cx="16" cy="16" r="1.5" fill="#3776AB" />
      </svg>
    ),
    fastapi: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#009688" />
        <text x="20" y="24" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">Fast</text>
      </svg>
    ),
    vercel: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#000" />
        <path d="M12 28L20 12l8 16H12z" fill="#fff" />
      </svg>
    ),
    supabase: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#3ECF8E" />
        <path d="M20 10l-8 18h6l2-5h8l-2 5h6L20 10z" fill="#fff" />
      </svg>
    ),
    render: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#46E3B7" />
        <path d="M13 26V14l7 6-7 6z" fill="#000" opacity="0.85" />
        <path d="M20 20l7-6v12l-7-6z" fill="#000" opacity="0.6" />
      </svg>
    ),
    posthog: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1D4AFF" />
        <circle cx="20" cy="16" r="5" fill="#fff" />
        <path d="M12 28c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#fff" strokeWidth="2" fill="none" />
      </svg>
    ),
    sentry: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#362D59" />
        <circle cx="20" cy="20" r="8" fill="#fff" opacity="0.9" />
        <circle cx="20" cy="20" r="4" fill="#362D59" />
      </svg>
    ),
    playwright: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#2EAD33" />
        <circle cx="20" cy="20" r="8" fill="#fff" opacity="0.9" />
        <circle cx="20" cy="20" r="4" fill="#2EAD33" />
      </svg>
    ),
  }

  return icons[name] || null
}

const row1 = [
  { name: 'JIRA', icon: 'jira' },
  { name: 'Slack', icon: 'slack' },
  { name: 'Claude', icon: 'claude' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'Vercel', icon: 'vercel' },
  { name: 'Sentry', icon: 'sentry' },
  { name: 'PostHog', icon: 'posthog' },
  { name: 'Azure DevOps', icon: 'azuredevops' },
]

const row2 = [
  { name: 'Confluence', icon: 'confluence' },
  { name: 'MS Teams', icon: 'teams' },
  { name: 'ChatGPT', icon: 'chatgpt' },
  { name: 'React', icon: 'react' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Playwright', icon: 'playwright' },
  { name: 'Copilot', icon: 'copilot' },
  { name: 'Render', icon: 'render' },
]

const row3 = [
  { name: 'Gemini', icon: 'gemini' },
  { name: 'Codex', icon: 'codex' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'Python', icon: 'python' },
  { name: 'FastAPI', icon: 'fastapi' },
  { name: 'OpenCode', icon: 'opencode' },
  { name: 'Jules', icon: 'jules' },
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
              How I work
            </h2>
            <p className="text-dark-gray text-lg">
              The tools I use daily to deliver projects, communicate with teams, and build products.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-4">
          <MarqueeRow tools={row1} />
          <MarqueeRow tools={row2} reverse />
          <MarqueeRow tools={row3} />
        </div>

      </div>
    </section>
  )
}
