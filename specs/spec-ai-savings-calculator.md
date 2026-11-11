---
type: Feature Spec
title: AI Time Savings Calculator
description: Standalone /ai-savings page where small-business owners estimate hours and money saved by an AI tools setup, with three setup packages.
Module: AI Savings Calculator
Business_Case_Stage: Prototype
Dependencies: [context-project-overview, spec-website-design]
Test_Suite: [tests/components/AiSavingsCalculator.test.tsx, tests/components/AiSavingsSections.test.tsx]
Status: Draft (Nov 2026) — page is noindex, not linked from home
resource: https://adanacalpine.ca/ai-savings
tags: [calculator, ai, lead-generation, pricing]
timestamp: "2026-11-11T00:00:00Z"
---

# AI Time Savings Calculator

## Purpose

Positions Adanac Alpine's AI tools setup service for small businesses (email, meeting notes, drafting,
reports). Visitors see a conservative, explained estimate of time saved and what it's worth, then book a call.

## Location

- Route: `app/ai-savings/page.tsx` (not linked from the landing page nav yet; `robots: noindex`; not in sitemap).
- Landing sections: `components/AiSavingsSections.tsx`. Calculator: `components/AiSavingsCalculator.tsx`.
- Data and maths: `lib/aiSavings.ts` (pure, unit-tested).
- Original HTML prototype: `prototypes/ai-savings-calculator/index.html` (not committed).

## Page structure (landing page, approved Nov 2026; UX/copy review applied 11 Nov 2026)

1. **Header**: logo → `/`, "Book a free call" → `#contact`. Not sticky.
2. **Hero** (navy): eyebrow "AI assistant setup for BC small businesses", H1 "Get hours back from email and
   paperwork every week", buttons "Estimate my savings" (`#calculator`) and "Book a free call" (`#contact`), three
   trust points, and an "Example: professional services" card computed live from the calculator defaults: hours a
   week, working days back a year and setup time (1–5 days). No money or payback claim in the hero.
3. **Where AI helps**: five task cards (one per calculator task) tagged "saves ~X%" from `TASKS`, plus a sources
   line linking the MIT/Science 2023, Microsoft 2023 and UK government 2025 studies.
4. **Calculator** (`#calculator`): the accordion calculator below.
5. **How it works**: free call → setup on your accounts (1–5 days, ~2 h a day of the client's time) → training &
   tune-ups.
6. **Who you'll work with** (`AboutBlock`): headshot, two lines, "More about me →" `/#about`.
7. **FAQ**: native `<details>` items (data safety, setup time, remote/on-site, guarantee, which AI, technical
   skill, Microsoft 365, running costs, GST/people, calculator accuracy with source links).
8. **Contact form** (`components/Contact.tsx` with page-specific props: calendar link "Pick a time now" above the
   form, submit "Request my free call", reply "within one business day"), then the site footer. Footer section
   links fall back to `/#section` when the section isn't on the current page.

Packages are shown only inside the calculator (no separate pricing section). No testimonials until real ones exist.

Owner commitments stated on the page: BC, remote; on-site in Squamish. Guarantee: if it isn't saving time 30 days
after setup, one extra tune-up session free (client must have done the learning sessions; no refunds). The owner
keeps no logins or copies of client data.

Accessibility: primary buttons use `glacier-600` (hover `glacier-700`) for 4.5:1 contrast with white text; small
text is 12px minimum; sliders have `aria-valuetext`; FAQ summaries have a visible focus ring.

## Inputs

The three steps are an accordion: one open at a time, "Next" buttons advance, and collapsed steps show a
one-line summary (green tick once completed). "See my results" collapses all three.

1. **Type of business** (Professional services [default], Trades & field services, Retail & hospitality,
   Other or mixed) and **what an hour of your time is worth** (default $120). Collapsed summary: `$120/h · Professional`.
2. **Hours per week** for five tasks, each tagged with its typical saving (e.g. −40%) for the chosen
   package, with a live weekly total above them.
3. **Setup package** (CAD, +GST, up to 3 people, +$200 per extra person; optional $250/month tune-ups;
   Microsoft 365 / Copilot setups may cost more):

   | Package | Price | Setup time | Savings factor | Includes |
   |---|---|---|---|---|
   | Quick Start | $850 | 1 day | 0.7 | Setup with privacy settings checked · email & calendar · one 2-h session · 14 days email support |
   | Everyday Assistant (Recommended) | $1,950 | 3 days | 1.0 | + files & meeting notes · workflows for 3 biggest tasks · three 2-h sessions · 30 days support |
   | Tailored | from $3,800 | 5 days | 1.25 | + templates for quotes/reports/letters · morning brief · five 2-h sessions · 60 days support & tune-ups |

   Prices from Nov 2026 market research: Canadian small-business AI setup offers start ~$1,500–3,500;
   priced at ~$150/h effective (≈ 6 / 13 / 25 h of effort). No grants advertised.

Fixed assumptions shown as text, not inputs: one person, AI subscription ~$28/month CAD per person (varies by
tool; Claude Pro ≈ $28), 46 working weeks.

## Calculation

- Saved per task = hours × min(75%, task rate × package factor).
- Task rates (Everyday Assistant): email 25%, meeting notes 50%, drafting & reports 35%, long documents 35%,
  admin & filing 15%. Set below lab results (e.g. 40% less time on writing, Noy & Zhang, Science 2023) because
  real-world averages are lower (Microsoft Copilot studies; UK government trial 2025: ~26 min/day).
- Preset hours are deliberately modest; the default (Professional services) is 16.5 h/week of admin, ≈ 4.9 h
  saved, ≈ 28 working days a year.
- "What will you do with those hours?": Bill them (100%), Some of each (50%, the default), Take time off (0%).
  Defaults give: Some of each → net first year $11,169, pays back in ~7 weeks; Bill them → net $24,624.
  - Extra income = saved × share × rate × 46.
  - Net, first year = income − subscription − setup. Payback = setup ÷ weekly net.
  - Time off shows first-year cost instead of a net figure.
- The results card shows the hours saved; the per-task working (hours × % = saved) sits behind a
  collapsed "How is this calculated?" toggle. A plain-language example follows the money table; billing examples
  add "if you have the work to fill it".
- Phones (<1024px): a sticky "≈ X h/week back · See results ↓" bar shows while a step is open. "See my results"
  scrolls to the results after step 3 has collapsed (scrolling before the collapse overshoots).

## Call to action

"Send my estimate & book a call" scrolls to the contact form on the same page (`#contact`). On click it dispatches a
window event `adanac:ai-savings-estimate` (`ESTIMATE_EVENT`) whose detail is a plain-text summary
(`estimateSummary()`, which ends with a "What takes most of my week:" prompt). `components/Contact.tsx` listens and pre-fills the Message field. A later click replaces
an earlier pre-fill, but never text the visitor typed. Nothing is stored or put in the URL. The Google Calendar
"Pick a time now" link can't be pre-filled.

## Open items

- [x] Package prices and names set (Nov 2026).
- [ ] Link the page from the landing page (nav or Services) — structural change, needs approval.
- [ ] Remove `noindex` and add to `app/sitemap.ts` once pricing is final.
