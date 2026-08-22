---
type: Context
title: Project Overview
description: Authoritative overview of Adanac Alpine Advisory website — tech stack, architecture, deployment, and constraints.
tags: [overview, context, project, tech-stack]
timestamp: "2026-07-14T00:00:00Z"
---

# Project Overview

> **`context-` file — authoritative.** Read this before any work on the codebase.

---

## Project Snapshot

Single-page landing page for Adanac Alpine Advisory Inc. — a solo IT consulting practice specializing in fintech digital transformation. Modern, clean, professional. Built with Next.js + Vercel.

- **Frontend:** https://website-nu-one-11.vercel.app (Next.js 15 → Vercel)
- **Repo:** github.com/Segey-P/adanac-website
- **Domain:** adanacalpine.ca (registered, DNS configured)

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| UI | React | 19.x |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | 11.x |
| Testing | Vitest + React Testing Library | latest |
| Linting | ESLint | latest |
| Icons | Lucide React | latest |
| Error Monitoring | Sentry | latest |
| Hosting | Vercel (free tier) | — |

---

## Architecture

### Component Structure

```
components/
├── brand/              # Brand system (AdanacMark, AdanacWordmark, TrianglePattern)
├── animation/          # Shared animation primitives (FadeIn, StaggerChildren)
├── Hero.tsx            # Full-viewport hero with CTA
├── About.tsx           # Bio + credentials grid
├── Services.tsx        # 3 platform service cards
├── SocialProof.tsx     # Tabbed project showcase (VeriPark/Backbase/Salesforce)
├── Process.tsx         # 3-step delivery process
├── ToolsWorkflow.tsx   # Marquee tool logos
├── WhatIBring.tsx      # Value props grid
├── Scoutloop.tsx       # Personal project showcase
├── TechStack.tsx       # Platform brand logos grid
├── Contact.tsx         # Formspree contact form
├── Navigation.tsx      # Fixed nav with scroll-reveal lockup
└── Footer.tsx          # Full-screen footer
```

### Page Section Order

```
Hero → About → Services → SocialProof → Process → ToolsWorkflow →
WhatIBring → TechStack → Scoutloop → Contact → Footer
```

### Brand System

| Token | Value | Use |
|-------|-------|-----|
| Navy | `#1a2332` | Primary text, dark backgrounds |
| Glacier | `#4a90d9` | Primary accent, links, buttons |
| Forest | `#2d6a4f` | Secondary accent, Scoutloop section |
| Off-white | `#f8f9fa` | Light section backgrounds |

### Color Classes (Tailwind)

- `bg-navy`, `text-navy` — dark backgrounds
- `bg-glacier`, `text-glacier` — accent blue
- `bg-forest`, `text-forest` — green accent
- `bg-off-white` — light backgrounds

---

## Testing

- **Framework:** Vitest + React Testing Library
- **Location:** `tests/components/`
- **Count:** 66 tests across 11 files
- **Command:** `npm run test -- --run`

---

## Deployment

### Current

Vercel-GitHub integration active. Push to `main` → auto-deploy production. PR branches → preview deployments.

### Auto-deploy

Vercel-GitHub integration is active. Pushes to `main` auto-deploy to production. PR previews work on non-main branches.

---

## Key URLs

| Resource | URL |
|----------|-----|
| Production | https://www.adanacalpine.ca |
| Vercel Dashboard | https://vercel.com/segey-ps-projects/adanac-website |
| GitHub Repo | https://github.com/Segey-P/adanac-website |
| Formspree Endpoint | https://formspree.io/f/xbjnkygq |

---

## Hard Rules

1. **Tests must pass before commit** — `npm run test -- --run`
2. **Build must pass before deploy** — `npm run build`
3. **Anonymize client names** — never mention YNCU, Sunrise, or other client names in copy
4. **This file is locked** — do not modify without explicit approval
