> Archived (Jul 2026) — completed. All tasks implemented and deployed.

# Website Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply 11 user-requested improvements across navigation, credentials, copy, logos, tools, process, contact, and footer.

**Architecture:** Component-by-component updates to the existing Next.js + Tailwind + Framer Motion website. No new dependencies needed beyond what's already installed (lucide-react is available).

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3, Framer Motion, Lucide React

---

## Task 1: Fix Navigation Links

**Files:**
- Modify: `components/Navigation.tsx:30-34`

The nav currently has 3 links (About, Services, Contact) but the page has 10 sections. Update to match the actual page flow with a reasonable subset (too many nav links hurts usability).

- [ ] **Step 1: Update navLinks array**

Replace the `navLinks` array in `Navigation.tsx`:

```tsx
const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Tools', href: '#tools' },
  { name: 'Contact', href: '#contact' },
]
```

Rationale: 4 links is the sweet spot. Track Record, Process, WhatIBring, and Scoutloop are discovered by scrolling. Tools is added because it's a key differentiator.

- [ ] **Step 2: Add `id="tools"` to TechStack/ToolsWorkflow section**

In the component that renders the tools section (currently `ToolsWorkflow.tsx` or the renamed version from Task 8), ensure the section has `id="tools"`:

```tsx
<section id="tools" className="py-24 bg-off-white">
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`

---

## Task 2: Fix Credentials Structure + Add Real Logos

**Files:**
- Modify: `components/About.tsx`

Two issues: (a) Education items have inconsistent structure (MBA has logo, Master of Finance has a green dot), (b) Certification logos are placeholder SVGs that need to be more recognizable.

- [ ] **Step 1: Fix Education structure — both degrees get logos**

Update the `credentialGroups` Education section. Add a logo for Master of Finance (use a generic "MFin" badge or the university's initial):

```tsx
{
  title: 'Education',
  items: [
    { text: 'MBA — UBC Sauder School of Business', logo: 'ubc' },
    { text: 'Master of Finance — Belarus State University of Economics', logo: 'mfin' },
  ],
},
```

- [ ] **Step 2: Add `mfin` logo to CredentialLogo component**

Add a new entry to the `logos` record in `CredentialLogo`:

```tsx
mfin: (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="#1a2332" />
    <text x="20" y="16" textAnchor="middle" fill="#4a90d9" fontSize="7" fontWeight="700" fontFamily="Inter, sans-serif">MFin</text>
    <text x="20" y="26" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="Inter, sans-serif">BSUE</text>
  </svg>
),
```

- [ ] **Step 3: Improve certification logos to be more recognizable**

Update the existing certification logos to be more visually distinct:

**CBAP** — use IIBA branding colors (orange/dark):
```tsx
cbap: (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="#1a2332" />
    <rect x="4" y="4" width="32" height="32" rx="6" fill="none" stroke="#d95f26" strokeWidth="1.5" />
    <text x="20" y="17" textAnchor="middle" fill="#d95f26" fontSize="8" fontWeight="800" fontFamily="Inter, sans-serif">CBAP</text>
    <text x="20" y="27" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="Inter, sans-serif">IIBA</text>
  </svg>
),
```

**CSPO** — use Scrum Alliance green:
```tsx
cspo: (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="#1a2332" />
    <rect x="4" y="4" width="32" height="32" rx="6" fill="none" stroke="#2d6a4f" strokeWidth="1.5" />
    <text x="20" y="17" textAnchor="middle" fill="#2d6a4f" fontSize="8" fontWeight="800" fontFamily="Inter, sans-serif">CSPO</text>
    <text x="20" y="27" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="Inter, sans-serif">Scrum</text>
  </svg>
),
```

**Backbase** — use Backbase brand blue with "Certified" badge:
```tsx
backbase: (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="#1a2332" />
    <rect x="4" y="4" width="32" height="32" rx="6" fill="none" stroke="#4a90d9" strokeWidth="1.5" />
    <text x="20" y="16" textAnchor="middle" fill="#4a90d9" fontSize="6" fontWeight="800" fontFamily="Inter, sans-serif">BACKBASE</text>
    <text x="20" y="26" textAnchor="middle" fill="#ffffff" fontSize="5" fontFamily="Inter, sans-serif">Certified</text>
  </svg>
),
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`

---

## Task 3: Fix SocialProof Copy + Add Salesforce FSC

**Files:**
- Modify: `components/SocialProof.tsx`

Two issues: (a) `&apos;` HTML entities in JS strings render as literal text, not apostrophes, (b) Need to add a Salesforce FSC delivery example.

- [ ] **Step 1: Fix all `&apos;` to proper apostrophes**

In `SocialProof.tsx`, replace all `&apos;` with `'` (regular apostrophe) in the description strings. Since the strings use single-quote delimiters, switch them to double quotes or template literals:

```tsx
const clients = [
  {
    platform: 'Backbase',
    description: "Delivered commercial banking digital channels for a top-6 Canadian bank — recognized as one of Backbase's most successful commercial banking implementations in North America.",
    type: 'Bank',
  },
  {
    platform: 'Backbase',
    description: "Contributed to digital banking platform delivery for a $200B+ US bank — J.D. Power's #1 ranked mobile banking app for customer satisfaction.",
    type: 'Bank',
  },
  {
    platform: 'VeriPark',
    description: "Delivery lead for VeriChannel digital banking implementation at a Manitoba credit union serving 35,000+ members across 19 branches.",
    type: 'Credit Union',
  },
  {
    platform: 'VeriPark',
    description: "Product owner advisor for VeriChannel rollout at an Ontario credit union with 65,000+ members and $3.5B in assets under administration.",
    type: 'Credit Union',
  },
  {
    platform: 'Salesforce',
    description: "Led Salesforce Financial Services Cloud implementation for a Canadian credit union — member data unification, service cloud configuration, and advisor console rollout.",
    type: 'Credit Union',
  },
]
```

- [ ] **Step 2: Update section heading**

Change the heading from "Platforms I've delivered on" to "Where I've delivered" to be more inclusive of CRM/platform work:

```tsx
<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
  Where I&apos;ve delivered
</h2>
```

- [ ] **Step 3: Adjust grid for 5 cards**

With 5 cards, change from `md:grid-cols-2` to a layout that handles odd numbers well. Keep `md:grid-cols-2` — the 5th card will naturally sit alone on the left in the third row, which looks fine.

- [ ] **Step 4: Verify build passes**

Run: `npm run build`

---

## Task 4: Add Logos to Services Section

**Files:**
- Modify: `components/Services.tsx`

Replace the generic SVG icons with recognizable Backbase and Salesforce logos.

- [ ] **Step 1: Create Backbase logo SVG for service card**

Replace the monitor icon with a Backbase-branded icon:

```tsx
{
  title: 'Backbase Implementation',
  description: '...',
  capabilities: [...],
  icon: (
    <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="#0052FF" />
      <path d="M12 14h16v3H12zm0 5h12v3H12zm0 5h8v3H12z" fill="#fff" />
    </svg>
  ),
},
```

- [ ] **Step 2: Create Salesforce logo SVG for service card**

```tsx
{
  title: 'Salesforce Implementation',
  description: '...',
  capabilities: [...],
  icon: (
    <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="#00A1E0" />
      <path d="M20 10c-3 0-5.5 1.5-7 3.5C14.5 13 16 12.5 18 12.5c2.5 0 4.5 1 5.5 2.5C25 13.5 27 12 20 10z" fill="#fff" opacity="0.9" />
      <path d="M13 22c0-3 2.5-5.5 5.5-5.5S24 19 24 22s-2.5 5.5-5.5 5.5S13 25 13 22z" fill="#fff" />
    </svg>
  ),
},
```

Also update the section description to include Salesforce:

```tsx
<p className="text-dark-gray text-lg">
  I specialize in two platform ecosystems: Backbase for digital banking and Salesforce for financial services CRM. That depth means I can deliver faster, catch issues earlier, and actually help your team — not just advise from the sidelines.
</p>
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`

---

## Task 5: Redesign Process Section with Icons

**Files:**
- Modify: `components/Process.tsx`

The current numbered circles (01, 02, 03) are plain. Add Lucide icons and improve visual interest.

- [ ] **Step 1: Add Lucide icons import and update steps**

```tsx
import { Search, Settings, Rocket } from 'lucide-react'

// In the steps array:
const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'I learn your business, your members, and your current technology landscape. Together we define what success looks like and build a roadmap to get there.',
    icon: <Search className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    number: '02',
    title: 'Implementation',
    description: 'Hands-on delivery — platform configuration, system integration, data migration, and custom development. I work alongside your team as part of the delivery, not just an advisor pointing at slides.',
    icon: <Settings className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    number: '03',
    title: 'Launch & Support',
    description: 'Testing, training, go-live support, and post-launch optimization. I stay involved until the platform is running smoothly and your team is confident.',
    icon: <Rocket className="w-6 h-6" strokeWidth={1.5} />,
  },
]
```

- [ ] **Step 2: Replace numbered circles with icon + number combination**

Replace the circle div with a combined icon/number design:

```tsx
<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-navy/5 border border-navy/10 text-glacier">
  {step.icon}
</div>
```

And add the step number as a small label above the title:

```tsx
<span className="text-xs font-bold text-glacier/60 uppercase tracking-widest">
  Step {step.number}
</span>
<h3 className="text-xl font-bold text-navy">
  {step.title}
</h3>
```

- [ ] **Step 3: Add visual connectors between steps**

Replace the simple horizontal line with a dashed line + small triangle arrow:

```tsx
{idx < steps.length - 1 && (
  <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)]">
    <div className="h-px bg-glacier/20 border-dashed" style={{ borderTop: '1px dashed rgba(74,144,217,0.3)' }} />
  </div>
)}
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`

---

## Task 6: Add Icons to WhatIBring Section

**Files:**
- Modify: `components/WhatIBring.tsx`

Replace the plain glacier bar with Lucide icons for each differentiator.

- [ ] **Step 1: Add Lucide icons and update differentiators**

```tsx
import { Handshake, Wrench, GraduationCap, Languages } from 'lucide-react'

const differentiators = [
  {
    title: 'Vendor Liaison',
    description: "I speak both languages — the vendor's technical team and your business stakeholders. I translate between them so nothing gets lost.",
    icon: <Handshake className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    title: 'Hands-On Delivery',
    description: "I don't just advise from the sidelines. I configure, I test, I sit in the room with your team during UAT. Delivery, not decks.",
    icon: <Wrench className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    title: 'Coaching & Team Building',
    description: "I've hired and coached new consultants at Modes. I help your team build internal capability, not dependency.",
    icon: <GraduationCap className="w-6 h-6" strokeWidth={1.5} />,
  },
  {
    title: 'Bilingual',
    description: 'English and Russian. Useful when working with diverse teams and international stakeholders.',
    icon: <Languages className="w-6 h-6" strokeWidth={1.5} />,
  },
]
```

- [ ] **Step 2: Replace the glacier bar with icon container**

Replace:
```tsx
<div className="h-1 w-12 bg-glacier rounded-full" />
```

With:
```tsx
<div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-glacier">
  {item.icon}
</div>
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`

---

## Task 7: Merge TechStack + ToolsWorkflow into Tools Section

**Files:**
- Delete/Repurpose: `components/TechStack.tsx` — content removed per user request
- Modify: `components/ToolsWorkflow.tsx` — becomes the single "Tools" section
- Modify: `app/page.tsx` — remove TechStack import/render

This is the biggest change. The user wants to:
- REMOVE all platform listings (Backbase, VeriPark, JUDI.AI, Salesforce, Azure, Fiserv, Central 1, Dynamics)
- KEEP the "How I work" intro text
- ADD more tools with recognizable logos
- Focus on tools, not platforms

- [ ] **Step 1: Remove TechStack from page.tsx**

In `app/page.tsx`, remove:
```tsx
import TechStack from '@/components/TechStack'
```
And remove `<TechStack />` from the JSX.

- [ ] **Step 2: Update ToolsWorkflow.tsx — new section structure**

Rewrite `ToolsWorkflow.tsx` to be the unified "Tools" section:

```tsx
'use client'

import { FadeIn, StaggerChildren, StaggerItem } from './animation/FadeIn'

function ToolIcon({ name, className = '' }: { name: string; className?: string }) {
  const icons: Record<string, JSX.Element> = {
    // Project Management
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
    // Communication
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
    // Development
    vscode: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#007ACC" />
        <path d="M12 12l8 8-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 12l8 8-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>
    ),
    github: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#24292E" />
        <path d="M20 10C14.5 10 10 14.5 10 20c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5C27.1 28.2 30 24.4 30 20c0-5.5-4.5-10-10-10z" fill="#fff" />
      </svg>
    ),
    azuredevops: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#0078D7" />
        <path d="M10 28l4-16h4l-2 8h6l-8 12v-6h-4z" fill="#fff" />
        <path d="M22 12l8 4-8 4V12z" fill="#fff" opacity="0.8" />
      </svg>
    ),
    // AI
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
    // Frameworks
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
    // Cloud/DB
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
    azure: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#0078D7" />
        <path d="M12 26l4-14h4l-1 6h5l-6 10v-4h-6z" fill="#fff" />
        <path d="M22 12l6 3-6 3V12z" fill="#fff" opacity="0.8" />
      </svg>
    ),
    // Analytics/Monitoring
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
        <path d="M20 10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 14c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="#fff" />
      </svg>
    ),
    // Testing
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

const toolCategories = [
  {
    label: 'Project Management',
    tools: [
      { name: 'JIRA', icon: 'jira' },
      { name: 'Confluence', icon: 'confluence' },
    ],
  },
  {
    label: 'Communication',
    tools: [
      { name: 'Slack', icon: 'slack' },
      { name: 'MS Teams', icon: 'teams' },
    ],
  },
  {
    label: 'Development',
    tools: [
      { name: 'VS Code', icon: 'vscode' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Azure DevOps', icon: 'azuredevops' },
    ],
  },
  {
    label: 'AI Assistants',
    tools: [
      { name: 'Claude', icon: 'claude' },
      { name: 'ChatGPT', icon: 'chatgpt' },
      { name: 'GitHub Copilot', icon: 'copilot' },
    ],
  },
  {
    label: 'Frameworks',
    tools: [
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'React', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
    ],
  },
  {
    label: 'Cloud & Data',
    tools: [
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'Microsoft Azure', icon: 'azure' },
    ],
  },
  {
    label: 'Analytics & QA',
    tools: [
      { name: 'PostHog', icon: 'posthog' },
      { name: 'Sentry', icon: 'sentry' },
      { name: 'Playwright', icon: 'playwright' },
    ],
  },
]

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

        <div className="space-y-10">
          {toolCategories.map((category, catIdx) => (
            <FadeIn key={catIdx} delay={catIdx * 0.05}>
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-medium-gray">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.tools.map((tool, toolIdx) => (
                    <div
                      key={toolIdx}
                      className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 hover:border-glacier/30 hover:shadow-md hover:shadow-glacier/5 transition-all duration-300"
                    >
                      <ToolIcon name={tool.icon} className="w-8 h-8 shrink-0" />
                      <span className="text-sm font-semibold text-navy">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`

---

## Task 8: Reorganize Contact Section

**Files:**
- Modify: `components/Contact.tsx`

Move the form to be the dominant element (full width or wider), push email/LinkedIn to the footer or a smaller area below.

- [ ] **Step 1: Restructure the grid layout**

Change from `lg:grid-cols-12` with form on right to a stacked layout:

```tsx
<div className="space-y-12">
  {/* Contact info — compact row */}
  <FadeIn>
    <div className="flex flex-wrap gap-8 justify-center">
      <div className="flex items-center gap-3">
        <Mail className="w-5 h-5 text-glacier" strokeWidth={2} />
        <a href="mailto:sergey@adanacadvisory.ca" className="text-navy hover:text-glacier font-semibold transition-colors">
          sergey@adanacadvisory.ca
        </a>
      </div>
      <div className="flex items-center gap-3">
        <LinkedInIcon className="w-5 h-5 text-glacier" />
        <a href="https://linkedin.com/in/pochikovskiy" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-glacier font-semibold transition-colors">
          linkedin.com/in/pochikovskiy
        </a>
      </div>
    </div>
  </FadeIn>

  {/* Form — full width, dominant */}
  <FadeIn delay={0.1} className="max-w-2xl mx-auto">
    <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-lg shadow-gray-100/40">
      {/* ... form fields remain the same ... */}
    </div>
  </FadeIn>
</div>
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

---

## Task 9: Fix Scoutloop Tech Tags

**Files:**
- Modify: `components/Scoutloop.tsx`

The Scoutloop section lists "Claude AI" but the actual project uses Gemini for risk assessment. However, the user explicitly listed "Claude AI" in their request. Keep as-is per user's direction, but add more tools from the actual stack.

- [ ] **Step 1: Expand Scoutloop tech tags**

```tsx
<div className="flex flex-wrap gap-2">
  {['Next.js', 'React', 'Supabase', 'Vercel', 'Tailwind', 'Claude AI'].map((tech) => (
    <span key={tech} className="text-xs bg-forest/5 text-forest font-semibold px-2.5 py-1 rounded">
      {tech}
    </span>
  ))}
</div>
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

---

## Task 10: Redesign Footer

**Files:**
- Modify: `components/Footer.tsx`

Redesign from UX perspective: better visual hierarchy, more useful links, contact info, and brand presence.

- [ ] **Step 1: Redesign footer layout**

New footer structure:
```
┌─────────────────────────────────────────────────────────┐
│ [Logo + Wordmark]                                        │
│ Strategic Technology Consulting — British Columbia       │
│                                                          │
│ [Nav Links]    [Contact]          [Social]               │
│ About          sergey@adanac...    LinkedIn               │
│ Services       adanacadvisory.ca  GitHub                 │
│ Tools                                                  │
│ Contact                                                 │
│                                                          │
│ ─────────────────────────────────────────────────────── │
│ © 2026 Adanac Advisory Inc.    Privacy · Terms           │
└─────────────────────────────────────────────────────────┘
```

Replace the entire footer return with:

```tsx
<footer className="relative overflow-hidden bg-navy text-white/60 py-16 border-t-[3px] border-glacier z-10">
  <TrianglePattern variant="dark" opacity={0.08} className="absolute inset-0 w-full h-full" />
  <div className="relative z-10 container mx-auto px-6 md:px-12">

    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

      {/* Brand column */}
      <div className="md:col-span-5 space-y-4">
        <div className="flex items-center gap-3">
          <AdanacMark size={32} fill="#ffffff" tile={false} />
          <AdanacWordmark color="#ffffff" incColor="rgba(255,255,255,0.35)" fontSize={14} showInc={true} />
        </div>
        <p className="text-sm text-white/40 leading-relaxed">
          Strategic Technology Consulting — British Columbia
        </p>
      </div>

      {/* Nav links */}
      <div className="md:col-span-3 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Navigate</h4>
        {[
          { name: 'About', href: '#about' },
          { name: 'Services', href: '#services' },
          { name: 'Tools', href: '#tools' },
          { name: 'Contact', href: '#contact' },
        ].map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleScrollToSection(e, link.href)}
            className="block text-sm text-white/60 hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Contact */}
      <div className="md:col-span-4 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Contact</h4>
        <a href="mailto:sergey@adanacadvisory.ca" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
          <Mail className="w-4 h-4" strokeWidth={2} />
          sergey@adanacadvisory.ca
        </a>
        <a href="https://linkedin.com/in/pochikovskiy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          linkedin.com/in/pochikovskiy
        </a>
      </div>

    </div>

    {/* Bottom bar */}
    <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-wide text-white/30">
      <div>
        © {currentYear} Adanac Advisory Inc. All rights reserved.
      </div>
      <div className="flex gap-4">
        <a href="/privacy" className="hover:text-white/60">Privacy Policy</a>
        <span>·</span>
        <a href="/terms" className="hover:text-white/60">Terms of Service</a>
      </div>
    </div>

  </div>
</footer>
```

- [ ] **Step 2: Import AdanacWordmark**

Add to the imports at the top of Footer.tsx:

```tsx
import AdanacWordmark from './brand/AdanacWordmark'
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`

---

## Task 11: Update page.tsx Section Order

**Files:**
- Modify: `app/page.tsx`

Remove TechStack import/render (handled in Task 7). Verify section order makes sense.

Final section order:
1. Hero
2. About (credentials)
3. SocialProof (track record)
4. Services (what I do)
5. Process (from first call to production)
6. ToolsWorkflow (how I work — tools)
7. WhatIBring (what I bring)
8. Scoutloop (personal project)
9. Contact (let's talk)
10. Footer

- [ ] **Step 1: Update page.tsx**

```tsx
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
        <SocialProof />
        <Services />
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
```

- [ ] **Step 2: Final build verification**

Run: `npm run build`
Expected: Clean build with no errors.

- [ ] **Step 3: Commit all changes**

```bash
git add -A
git commit -m "Website improvements: nav fix, logos, tools redesign, contact reorg, footer UX

- Fix navigation links to match page sections
- Fix credential structure consistency in About
- Fix HTML entities in SocialProof descriptions
- Add Salesforce FSC to track record
- Add company logos to Services section
- Redesign Process section with Lucide icons
- Add Lucide icons to WhatIBring differentiators
- Merge TechStack + ToolsWorkflow into unified Tools section
- Add 20+ tool logos organized by category
- Reorganize Contact: form first, contact info compact
- Expand Scoutloop tech tags
- Redesign Footer with 3-column layout and better UX
- Remove redundant TechStack component"
```

---

## Questions for User

Before executing, please clarify:

1. **Scoutloop AI engine:** The codebase uses Gemini, but you listed "Claude AI." Keeping Claude per your direction — confirm?

2. **Tools list:** I've proposed 20 tools across 7 categories (Project Mgmt, Communication, Development, AI, Frameworks, Cloud, Analytics). Want to add/remove any? Specifically:
   - Figma? Miro? Notion? Google Workspace?
   - Any specific Azure services beyond DevOps?

3. **Salesforce FSC description:** I wrote a generic one. Want to provide the actual project details?

4. **Footer email:** Content brief says `sergey@adanacalpine.ca` but current site uses `sergey@adanacadvisory.ca`. Which is correct?
