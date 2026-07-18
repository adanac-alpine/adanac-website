---
type: Business Case
title: Website Design Spec
description: Landing page website spec for Adanac Advisory — Next.js + Vercel, deployed as adanac-website project.
Dependencies: []
Test_Suite: [tests/components/]
Status: Final (Jul 2026)
resource: https://website-nu-one-11.vercel.app
tags: [website, design, landing-page, nextjs, vercel]
timestamp: "2026-07-14T00:00:00Z"
---

# Website Design Spec

## Executive Summary

Single-page landing page for Adanac Advisory Inc. — a solo IT consulting practice specializing in fintech digital transformation. Modern, clean, professional. Built with Next.js + Vercel.

---

## Overview

| Field | Value |
|-------|-------|
| Domain | `adanacadvisory.ca` (pending registration) |
| Tech Stack | Next.js 15 (App Router) + Tailwind CSS v4 |
| Hosting | Vercel (free tier) |
| Analytics | Vercel Analytics |
| Type | Single-page scroll (11 sections) |
| Vercel Project | `adanac-website` |
| Production URL | https://website-nu-one-11.vercel.app |

---

## Design Direction

### Theme

Light, clean, modern — similar to Aequilibrium's approachability with Modes' professional polish. Not dark/moody. Approachable but authoritative.

### Color Palette

| Token | Hex | Use |
|-------|-----|-----|
| Navy | `#1a2332` | Primary text, dark backgrounds |
| Glacier Blue | `#4a90d9` | Primary accent, links, buttons |
| White | `#ffffff` | Backgrounds, text on dark |
| Light Gray | `#f8f9fa` | Section backgrounds, subtle fills |
| Green Accent | `#2d6a4f` | Secondary accent, highlights, Scoutloop section |

### Typography

- **Font:** Inter (Google Fonts)
- **Weights:** 400 (body), 500 (emphasis), 600 (subheadings), 700 (headings), 800 (hero)
- **Headings:** Inter 700, navy `#1a2332`
- **Body:** Inter 400, dark gray `#333333`
- **Links:** Glacier Blue `#4a90d9`

### Visual Elements

- Subtle mountain imagery in hero background (abstract/geometric, not photo-heavy)
- Clean card-based service sections
- Generous whitespace
- Subtle shadows and rounded corners on cards
- Smooth scroll between sections

---

## Navigation

**Fixed top nav** with smooth scroll to sections:

```
[Logo/Name]    About    Services    Tools    Contact
```

- Sticky on scroll
- Blur backdrop on scroll
- Mobile: hamburger menu
- Scroll-reveal brand lockup appears after hero

---

## Sections

### 1. Hero

**Layout:** Full viewport height, centered content, subtle mountain background

**Content:**
- **Headline:** Launch your digital banking platform.
- **Subtitle:** Implementation consulting for credit unions, banks, and FinTechs.
- **CTA Button:** Get in touch → scrolls to Contact section
- **Secondary:** Learn more → scrolls to About section

---

### 2. About Me

**Layout:** Two-column on desktop, stacked on mobile

**Content:**
- **Headshot:** Professional photo in credentials card
- **Name:** Sergey Pochikovskiy (introduced in first line of copy)
- **LinkedIn:** Icon + link in credentials card
- **Bio:** 16 years in financial services
- **Credentials:** Education, Certifications, Teaching & Community

---

### 3. Services

**Layout:** Three platform cards

- VeriChannel Migration
- Backbase Delivery
- Salesforce Implementation

---

### 4. SocialProof (Track Record)

**Layout:** Tabbed showcase (VeriPark / Backbase / Salesforce)

Shows relevant projects per platform. Tabs switch content with stagger animation.

---

### 5. Process

**Layout:** 3-step horizontal flow

- Discovery → Implementation → Launch & Support

---

### 6. ToolsWorkflow

**Layout:** Marquee scrolling tool logos

Two rows of tool logos scrolling in opposite directions.

---

### 7. WhatIBring

**Layout:** 4-card grid

- Multi-Vendor Governance, Hands-On Delivery, Coaching & Team Building, Bilingual

---

### 8. TechStack

**Layout:** Grid of platform brand logos

Backbase, VeriPark, JUDI.AI, Salesforce, Azure, Fiserv, Central 1, Azure DevOps

---

### 9. Scoutloop

**Layout:** Full-width section with green accent

Personal project showcase with tech stack logos.

---

### 10. Contact

**Layout:** Centered form (Formspree)

- Name, Email, Message, Submit
- Success/error states

---

### 11. Footer

**Layout:** Full-screen navy background (min-h-screen mobile, min-h-[60vh] desktop)

- Brand lockup
- Navigate links
- Contact info (email, LinkedIn)
- Copyright + legal links

---

## Technical Requirements

### Performance

- Static generation (SSG) — no server-side rendering needed
- Target: 100 Lighthouse score
- Optimized images (Next.js Image component)
- Minimal JavaScript bundle

### SEO

- Meta title: "Adanac Advisory — Digital Enablement for Financial Services"
- Meta description: "Implementation consulting for credit unions, banks, and FinTechs."
- Open Graph image
- Sitemap.xml
- Robots.txt

### Responsive

- Mobile-first design
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly navigation
- Readable on all screen sizes

### Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Sufficient color contrast (WCAG AA)
- Alt text on images

### Contact Form

- Client-side validation
- Formspree (no backend)
- Anti-spam: honeypot field
- Success/error states

---

## See Also

- [Project Overview](context-project-overview.md) — tech stack and deployment details

---

## Implementation Status

| Area | Status | Notes |
|------|--------|-------|
| Spec | ✅ Done | This document |
| Content | ✅ Done | All copy finalized |
| Brand System | ✅ Done | TrianglePattern, AdanacMark, AdanacWordmark |
| Hero | ✅ Done | With CTA + Learn more |
| About Me | ✅ Done | Name, headshot, LinkedIn, bio + credentials grid |
| Services | ✅ Done | 3 platform cards |
| SocialProof | ✅ Done | Tabbed project showcase |
| Process | ✅ Done | 3-step flow |
| ToolsWorkflow | ✅ Done | Marquee logos |
| WhatIBring | ✅ Done | 4-card grid |
| TechStack | ✅ Done | Platform brand logos |
| Scoutloop | ✅ Done | Personal project |
| Contact | ✅ Done | Formspree form |
| Footer | ✅ Done | Full-screen navy |
| Navigation | ✅ Done | Fixed nav + scroll-reveal |
| Testing | ✅ Done | All tests pass |
| SEO | ✅ Done | Sitemap, OG, meta |
| Sentry | ✅ Done | Error monitoring |
| Deploy | ✅ Done | Production live |
| Domain | 📅 Planned | Pending registration |
