---
type: Context
title: Website Overview
description: Website content, assets, and design spec for Adanac Alpine Advisory landing page build.
Category: Operations
Decision_Status: N/A
Status: Active (Jul 2026)
tags: [website, content, assets, design]
timestamp: "2026-07-13T00:00:00Z"
---

# Adanac Alpine Advisory Website

Landing page for Adanac Alpine Advisory (`adanacalpine.ca`). Next.js 14 + Tailwind CSS, deployed to Vercel.

## Quick Start

```bash
npm install
npm run dev        # localhost:3000
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Run test suite (Vitest) |
| `npm run test:watch` | Tests in watch mode |

## Testing

Vitest + React Testing Library. Tests live in `tests/components/`.

```bash
npm test           # single run
npm run test:watch # watch mode
```

**Coverage:** Scoutloop, Hero, About, Contact, Services, Footer, Navigation.
Remaining components (SocialProof, Process, TechStack, ToolsWorkflow, WhatIBring) — add tests as design stabilises.

## CI/CD

GitHub Actions workflow (`.github/workflows/deploy.yml`):

| Trigger | What happens |
|---------|-------------|
| Push to `main` | Lint → Test → Deploy to Vercel (production) |
| Pull request to `main` | Lint → Test (no deploy) |
| Manual dispatch | Choose production or preview deploy |

### Required GitHub Secrets

Set in repo Settings → Secrets and variables → Actions:

| Secret | Value |
|--------|-------|
| `VERCEL_TOKEN` | Vercel dashboard → Settings → Tokens |
| `VERCEL_ORG_ID` | `team_PFN8aBk4T3KzjhaUoFIDJ5Az` |
| `VERCEL_PROJECT_ID` | `prj_S92QOUmkhhnQtcJeSOFBYZtkz3qX` |

## Project Structure

```
├── app/                    # Next.js app router
│   ├── page.tsx            # Home page (all sections)
│   ├── layout.tsx          # Root layout
│   ├── privacy/            # Privacy policy
│   └── terms/              # Terms of service
├── components/             # React components
│   ├── brand/              # Adanac logo/wordmark SVGs
│   ├── animation/          # FadeIn, StaggerChildren
│   ├── Hero.tsx            # Landing hero
│   ├── About.tsx           # Bio + credentials
│   ├── Services.tsx        # Backbase & VeriPark
│   ├── Scoutloop.tsx       # Personal project showcase
│   ├── Contact.tsx         # Form + contact info
│   └── Footer.tsx          # Site footer
├── tests/                  # Test suite
│   └── components/         # Component tests (Vitest)
├── public/                 # Static assets
├── vitest.config.ts        # Test config
└── tailwind.config.js      # Theme (navy, glacier, forest)
```

## Documents

| Document | Description | Status |
|----------|-------------|--------|
| [Design Spec](spec-website-design.md) | Technical spec — design, sections, deployment | Draft |
| [Content Brief](content-brief.md) | All copy, bios, and descriptions for the build | Draft |

## Related Specs

| Spec | Location | Description |
|------|----------|-------------|
| Corporate Structure | `specs/spec-corporate-structure.md` | Domain, legal name, disclosure |
| Incorporation Plan | `specs/spec-incorporation-plan.md` | Day 12 — website build task |
| Project Overview | `specs/context-project-overview.md` | Business activities, goals |
