---
type: Feature Spec
title: AI Time Savings Calculator
description: Standalone /ai-savings page where small-business owners estimate hours and money saved by an AI tools setup, with three setup packages.
Module: AI Savings Calculator
Business_Case_Stage: Prototype
Dependencies: [context-project-overview, spec-website-design]
Test_Suite: [tests/components/AiSavingsCalculator.test.tsx]
Status: Draft (Nov 2026) — page is noindex, not linked from home
resource: https://adanacalpine.ca/ai-savings
tags: [calculator, ai, lead-generation, pricing]
timestamp: "2026-11-10T00:00:00Z"
---

# AI Time Savings Calculator

## Purpose

Positions Adanac Alpine's AI tools setup service for small businesses (email, meeting notes, drafting,
reports). Visitors see a conservative, explained estimate of time saved and what it's worth, then book a call.

## Location

- Route: `app/ai-savings/page.tsx` (not linked from the landing page nav yet; `robots: noindex`; not in sitemap).
- Component: `components/AiSavingsCalculator.tsx` (client component).
- Data and maths: `lib/aiSavings.ts` (pure, unit-tested).
- Original HTML prototype: `prototypes/ai-savings-calculator/index.html` (not committed).

## Inputs

The three steps are an accordion: one open at a time, "Next" buttons advance, and collapsed steps show a
one-line summary (green tick once completed). "See my results" collapses all three.

1. **Business type** (Professional services [default], Trades & field services, Retail & hospitality,
   Something else) and **hourly rate** (default $120).
2. **Hours per week** for five tasks, each tagged with its typical saving (e.g. −40%) for the chosen
   package, with a live weekly total above them.
3. **Setup package** (CAD, +GST, up to 3 people, +$200 per extra person; optional $250/month tune-ups;
   Microsoft 365 / Copilot setups may cost more):

   | Package | Price | Savings factor |
   |---|---|---|
   | Quick Start | $850 | 0.7 |
   | Everyday Assistant (Popular) | $1,950 | 1.0 |
   | Tailored | from $3,800 | 1.25 |

   Prices from Nov 2026 market research: Canadian small-business AI setup offers start ~$1,500–3,500;
   priced at ~$150/h effective (≈ 6 / 13 / 25 h of effort). No grants advertised.

Fixed assumptions shown as text, not inputs: one person, $30/month AI subscription, 46 working weeks.

## Calculation

- Saved per task = hours × min(75%, task rate × package factor).
- Task rates (Everyday Assistant): email 40%, meeting notes 60%, drafting & reports 50%, long documents 45%,
  admin & filing 25%.
- Preset hours are deliberately modest; the default (Professional services) is 16.5 h/week of admin, ≈ 7 h saved.
- "What will you do with those hours?": Bill them (100%), Half & half (50%), Time off (0%).
  - Extra income = saved × share × rate × 46.
  - Net, first year = income − subscription − setup. Payback = setup ÷ weekly net.
  - Time off shows first-year cost instead of a net figure.
- The results card shows the hours saved; the per-task working (hours × % = saved) sits behind a
  collapsed "How is this calculated?" toggle. A plain-language example follows the money table.

## Call to action

"Book a free 30-min call" links to `/#contact`. On click it writes a plain-text summary of the estimate
(`estimateSummary()`) to `sessionStorage` under `adanac:ai-savings-estimate`. `components/Contact.tsx`
reads and clears it after mount and pre-fills the Message field if empty. Nothing goes in the URL. The
Google Calendar "Book a meeting" link can't be pre-filled.

## Open items

- [x] Package prices and names set (Nov 2026).
- [ ] Link the page from the landing page (nav or Services) — structural change, needs approval.
- [ ] Remove `noindex` and add to `app/sitemap.ts` once pricing is final.
