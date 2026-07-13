'use client'

import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'

function ToolLogo({ name, className = '' }: { name: string; className?: string }) {
  const logos: Record<string, JSX.Element> = {
    jira: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#2684FF" />
        <path d="M28.5 11.5L18 22l-4.5-4.5L10 21l8 8 12.5-12.5L28.5 11.5z" fill="#fff" />
        <path d="M18 22l-4.5-4.5L10 21l8 8V22z" fill="#fff" opacity="0.7" />
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
        <rect width="40" height="40" rx="10" fill="#fff" />
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
    azuredevops: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#0078D7" />
        <path d="M10 28l4-16h4l-2 8h6l-8 12v-6h-4z" fill="#fff" />
        <path d="M22 12l8 4-8 4V12z" fill="#fff" opacity="0.8" />
        <circle cx="30" cy="16" r="3" fill="#F25022" />
      </svg>
    ),
    claude: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#D97757" />
        <path d="M14 28V14c0-3 2-5 5-5s4 2 4 4c0 1-.3 2-1 3l-2 3h8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    codex: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1a1a2e" />
        <path d="M12 20l5-5v3h6v4h-6v3l-5-5z" fill="#10a37f" />
        <path d="M28 20l-5 5v-3h-6v-4h6v-3l5 5z" fill="#10a37f" opacity="0.6" />
      </svg>
    ),
  }

  return logos[name] || null
}

export default function ToolsWorkflow() {
  const tools = [
    { name: 'JIRA', category: 'Project Tracking', logo: 'jira' },
    { name: 'Confluence', category: 'Documentation', logo: 'confluence' },
    { name: 'Slack', category: 'Communication', logo: 'slack' },
    { name: 'Azure DevOps', category: 'CI/CD & Repos', logo: 'azuredevops' },
    { name: 'Claude', category: 'AI Assistant', logo: 'claude' },
    { name: 'Codex', category: 'AI-Native Development', logo: 'codex' },
  ]

  return (
    <section className="py-24 bg-off-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <FadeIn>
            <div className="space-y-4">
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

          <StaggerChildren stagger={0.08}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tools.map((tool, idx) => (
                <StaggerItem key={idx}>
                  <div className="bg-white rounded-xl p-4 border border-gray-100 hover:border-glacier/30 hover:shadow-lg hover:shadow-glacier/5 transition-all duration-300">
                    <div className="h-10 flex items-center mb-2">
                      <ToolLogo name={tool.logo} className="h-10 w-10" />
                    </div>
                    <div className="text-sm font-bold text-navy">{tool.name}</div>
                    <div className="text-xs text-medium-gray mt-0.5">{tool.category}</div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>

        </div>
      </div>
    </section>
  )
}
