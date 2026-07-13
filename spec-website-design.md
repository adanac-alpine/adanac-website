---
type: Business Case
title: Website Design Spec
description: Landing page website spec for Adanac Advisory — Next.js + Vercel, deployed as adanac-website project.
Category: Operations
Decision_Status: Resolved
Dependencies: [spec-corporate-structure.md]
Status: Draft (Jul 2026)
tags: [website, design, landing-page, nextjs, vercel]
timestamp: "2026-07-11T00:00:00Z"
---

# Website Design Spec

## Executive Summary

Single-page landing page for Adanac Alpine Advisory Inc. — a solo IT consulting practice specializing in fintech digital transformation. Modern, clean, professional. Built with Next.js + Vercel. Designed to be handed off to Jules for implementation.

---

## Overview

| Field | Value |
|-------|-------|
| Domain | `adanacadvisory.ca` (pending registration) |
| Tech Stack | Next.js 14 (App Router) + Tailwind CSS v3 |
| Hosting | Vercel (free tier) |
| Analytics | Vercel Analytics |
| Type | Single-page scroll (11 sections) |
| Vercel Project | `adanac-website` |
| Production URL | https://adanac-website.vercel.app |

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
[Logo/Name]    About    Services    Scoutloop    Contact
```

- Sticky on scroll
- Blur backdrop on scroll
- Mobile: hamburger menu
- Logo: Text-based "Adanac Alpine" for now (brand/logo is separate TODO)

---

## Sections

### 1. Hero

**Layout:** Full viewport height, centered content, subtle mountain background

**Content:**
- **Headline:** Digital enablement for financial services
- **Subtitle:** We help financial services organizations modernize their digital channels, implement enterprise platforms, and build products that drive real business outcomes.
- **CTA Button:** Get in touch → scrolls to Contact section

**Design:**
- Large, bold heading (Inter 800, ~48-64px)
- Subtitle in lighter weight
- CTA button: Glacier Blue background, white text, rounded
- Background: Abstract mountain/geometric pattern (CSS or SVG, not heavy image)

---

### 2. About

**Layout:** Two-column on desktop (photo left, text right), stacked on mobile

**Content:**
- **Photo:** Stock placeholder (mountain/landscape theme) — user will provide personal photo later
- **Bio:** Full bio from content brief
- **Credentials:** Bullet list of certifications and education

**Design:**
- Rounded photo with subtle shadow
- Credentials as clean badge-style list
- Light gray background `#f8f9fa`

---

### 3. Services

**Layout:** Two cards side by side on desktop, stacked on mobile

**Card 1: Fintech & Product Consulting**
- Title
- Description
- Capabilities list (5 items)

**Card 2: Implementation Consulting**
- Title
- Description
- Platforms list (Backbase, Salesforce, VeriPark)
- Capabilities list (5 items)

**Design:**
- White cards with subtle shadow
- Glacier Blue accent on hover
- Icons or simple visual indicators for each capability
- Generous padding

---

### 4. Scoutloop

**Layout:** Full-width section with green accent background

**Content:**
- **Title:** Scoutloop
- **Tagline:** Know Before You Go
- **Description:** From content brief
- **Features:** 4 feature cards (Smart Briefing, AI Verdicts, Offline Maps, Telegram Bot)
- **CTA:** Visit Scoutloop → links to scoutloop.me (target="_blank")

**Design:**
- Green accent background `#2d6a4f` with white text
- Feature cards in a 2x2 grid (stacked on mobile)
- CTA button: White background, green text
- This section should feel distinct — it's a product, not a service

---

### 5. Contact

**Layout:** Centered, clean form

**Content:**
- **Heading:** Let's talk
- **Subtext:** Have a digital project in mind? We'd love to hear about it.
- **Form:** Name, Email, Message (textarea), Submit button
- **Alternative:** Email link (sergey@adanacalpine.ca)
- **LinkedIn:** linkedin.com/in/pochikovskiy

**Design:**
- Simple, clean form with good spacing
- Form submission: Formspree or similar (no backend)
- Success state: "Thank you! We'll be in touch."
- Light background

---

### Footer

**Content:**
- Copyright: © 2026 Adanac Alpine Advisory Inc. All rights reserved.
- Legal: Operated by Adanac Alpine Advisory Inc.
- Links: LinkedIn, Email
- Privacy Policy (placeholder link)

---

## Technical Requirements

### Performance

- Static generation (SSG) — no server-side rendering needed
- Target: 100 Lighthouse score
- Optimized images (Next.js Image component)
- Minimal JavaScript bundle

### SEO

- Meta title: "Adanac Alpine Advisory — Digital Enablement for Financial Services"
- Meta description: "IT consulting and digital transformation for financial services. Backbase, Salesforce, and VeriPark implementation experts."
- Open Graph image (generated or placeholder)
- Structured data (Organization schema)
- Sitemap.xml
- Robots.txt

### Analytics

- Vercel Analytics (enabled)
- Web Vitals tracking
- No cookies required

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
- Formspree or similar service (no backend)
- Anti-spam: honeypot field or similar
- Success/error states

---

## Assets

| Asset | Status | Notes |
|-------|--------|-------|
| Logo | Placeholder | Text-based for now. Brand/logo is separate TODO |
| Photo | Placeholder | Stock mountain/landscape. User will provide personal photo later |
| Hero background | Create | Abstract mountain/geometric (CSS/SVG) |
| Icons | Use Lucide React | Consistent icon set |
| Favicons | Create | Standard favicons from logo |

---

## Reference Sites

| Site | What to reference |
|------|-------------------|
| [Aequilibrium](https://aequilibrium.com/) | Light theme, service cards, approachable feel |
| [Modes](https://modesinc.com/) | Professional polish, service descriptions |
| [Scoutloop](https://scoutloop.me) | Green accent section, mountain theme |

---

## File Structure

```
website/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   ├── page.tsx            # Main landing page
│   │   └── globals.css         # Tailwind + custom styles
│   ├── components/
│   │   ├── Navbar.tsx          # Fixed navigation
│   │   ├── Hero.tsx            # Hero section
│   │   ├── About.tsx           # About section
│   │   ├── Services.tsx        # Services cards
│   │   ├── Scoutloop.tsx       # Scoutloop product section
│   │   ├── Contact.tsx         # Contact form
│   │   └── Footer.tsx          # Footer
│   └── lib/
│       └── constants.ts        # Site constants (colors, links, copy)
├── public/
│   ├── og-image.png            # Open Graph image
│   └── favicon.ico             # Favicon
├── tailwind.config.ts          # Tailwind config
├── next.config.ts              # Next.js config
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript config
```

---

## Dependencies

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "tailwindcss": "^4.0.0",
  "@vercel/analytics": "^1.0.0",
  "lucide-react": "^0.300.0",
  "clsx": "^2.0.0"
}
```

---

## Deployment

1. Build and test locally
2. Deploy to Vercel (connect GitHub repo)
3. Add `adanacalpine.ca` domain in Vercel dashboard
4. Configure DNS on Porkbun (A record or CNAME to Vercel)
5. SSL auto-configured by Vercel

---

## See Also

- [Content Brief](content-brief.md) — All copy and descriptions
- [Corporate Structure](../specs/spec-corporate-structure.md) — Domain, legal name, disclosure
- [Incorporation Plan](../specs/spec-incorporation-plan.md) — Day 12 website task

---

## Implementation Status

| Area | Status | Notes |
|------|--------|-------|
| Spec | ✅ Done | This document |
| Content brief | ✅ Done | content-brief.md |
| Build | 🔲 Pending | Hand off to Jules |
| Deploy | 🔲 Pending | After domain registration |
