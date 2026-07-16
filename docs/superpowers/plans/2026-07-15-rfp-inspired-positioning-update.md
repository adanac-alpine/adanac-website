# Website Positioning Update — RFP-Inspired Improvements

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the website around the PM/BA/PO positioning revealed in the Modes RFP — governance, migration delivery, multi-vendor coordination, and Discovery as an entry-point service. No client names.

**Architecture:** Content-only changes across 4 existing components. No new components, no new files, no structural changes.

**Tech Stack:** Next.js 15, React, Tailwind CSS, Framer Motion

---

### Task 1: Reframe Services section — migration pattern + governance + Discovery

**Why:** The RFP positions Sergey as a "Delivery Manager & Senior Business Analyst" who leads governance, RAID, vendor coordination, and scope management across multi-vendor VeriChannel migrations. The current website says "implementation" but doesn't capture the migration or governance angle. Discovery is a natural gateway service mentioned in the RFP as a prior engagement type.

**Files:**
- Modify: `components/Services.tsx` (SERVICES_DATA array + intro paragraph)

- [ ] **Step 1: Update SERVICES_DATA and intro copy**

Replace the `SERVICES_DATA` array and intro paragraph in `components/Services.tsx`.

**New SERVICES_DATA** (4 services):

1. **VeriChannel Migration** (replaces "VeriPark Implementation")
   - Description: Migrating digital banking from legacy platforms to VeriPark VeriChannel — scope classification, phased delivery, and production cutover for credit unions.
   - Capabilities:
     - Migration scope classification (Phase 1 / Phase 2)
     - Requirements validation & FRD review
     - UAT coordination & go-live readiness
     - Post-launch stabilization support
     - Legacy platform deconversion planning
   - Icon: keep existing `/logos/veripark.svg`

2. **Program Governance** (new)
   - Description: Multi-vendor delivery coordination — RAID management, weekly status reporting, dependency tracking, and PMO alignment across VeriPark, core banking, and third-party vendors.
   - Capabilities:
     - RAID log management & escalation
     - Weekly status reporting & PMO alignment
     - Vendor & third-party coordination
     - Dependency management across workstreams
     - Release governance & production readiness reviews
   - Icon: use `Shield` from lucide-react (represents governance/oversight)

3. **Backbase Delivery** (reframed from "Backbase Implementation")
   - Description: End-to-end delivery of Backbase digital banking — from commercial and retail banking channels to mobile apps. I act as BA, delivery lead, or product owner advisor to get your platform from architecture to production.
   - Capabilities: keep existing 5 capabilities (already good)
   - Icon: keep existing `/logos/backbase.jpg`

4. **Digital Strategy & Discovery** (new)
   - Description: Systems architecture assessment, digital maturity evaluation, and transformation roadmap — the starting point for institutions exploring digital banking modernization.
   - Capabilities:
     - Systems architecture documentation
     - Digital maturity assessment
     - Transformation roadmap development
     - Technology evaluation & vendor shortlisting
     - Business case development
   - Icon: use `Search` from lucide-react (already used in Process.tsx)

**New intro paragraph:**
```
I help credit unions and banks migrate to modern digital banking platforms — managing the governance, scope, and vendor coordination that determines whether a project lands on time or derails. From Discovery through production cutover, I own the delivery.
```

- [ ] **Step 2: Update import statement**

Add `Shield` and `Search` to the lucide-react import (currently no lucide imports in Services.tsx — icons were inline JSX). Add:
```tsx
import { Shield, Search } from 'lucide-react'
```

Replace the inline JSX icon blocks in SERVICES_DATA with:
```tsx
icon: <Image src="/logos/veripark.svg" ... />  // keep as-is for VeriPark
icon: <Shield className="w-6 h-6" strokeWidth={1.5} />  // for Program Governance
icon: <Image src="/logos/backbase.jpg" ... />  // keep as-is for Backbase
icon: <Search className="w-6 h-6" strokeWidth={1.5} />  // for Discovery
```

- [ ] **Step 3: Run tests**

```bash
npm run test -- --run
```

- [ ] **Step 4: Commit**

```bash
git add components/Services.tsx
git commit -m "feat: reframe Services around migration, governance, and Discovery"
```

---

### Task 2: Add multi-vendor coordination to WhatIBring (Why Me)

**Why:** The RFP repeatedly emphasizes multi-vendor coordination as a core value proposition. The current "Why Me" section has 4 items: Vendor Liaison, Hands-On Delivery, Coaching, Bilingual. "Vendor Liaison" is close but too generic — it should be upgraded to specifically call out multi-vendor governance.

**Files:**
- Modify: `components/WhatIBring.tsx` (differentiators array)

- [ ] **Step 1: Replace "Vendor Liaison" with "Multi-Vendor Governance"**

In the `differentiators` array, replace the first item:

```tsx
{
  title: 'Multi-Vendor Governance',
  description: "Digital banking projects involve VeriPark, core banking vendors, payment processors, and internal teams. I coordinate across all of them — RAID management, dependency tracking, and escalation — so nothing falls through the cracks.",
  icon: <Handshake className="w-6 h-6" strokeWidth={1.5} />,
},
```

- [ ] **Step 2: Run tests**

```bash
npm run test -- --run
```

- [ ] **Step 3: Commit**

```bash
git add components/WhatIBring.tsx
git commit -m "feat: upgrade Vendor Liaison to Multi-Vendor Governance in Why Me"
```

---

### Task 3: Anonymize SocialProof project descriptions

**Why:** The current SocialProof section references specific bank names ("top-6 Canadian bank", "$200B+ US bank") and "J.D. Power's #1 ranked" which could identify the client. These need to be anonymized while keeping the credibility signals. Also, the Salesforce tab content references "Fiserv DNA data synchronization" which is integration work — reframe around PM/BA/PO activities.

**Files:**
- Modify: `components/SocialProof.tsx` (projects object)

- [ ] **Step 1: Rewrite project descriptions**

Replace the `projects` object:

```tsx
const projects = {
  VeriPark: [
    { description: 'Delivery lead for VeriChannel digital banking migration at a Canadian credit union — scope classification, RAID governance, and vendor coordination across VeriPark, Central 1, and third-party integrations.', type: 'Credit Union' },
    { description: 'Product owner advisor for VeriChannel rollout at a Canadian credit union — phased delivery planning, requirements validation, and go-live stabilization.', type: 'Credit Union' },
  ],
  Backbase: [
    { description: "BA and delivery lead for Backbase commercial banking digital channels at a major Canadian bank — requirements gathering, UAT coordination, and production cutover.", type: 'Bank' },
    { description: "Product owner advisor for Backbase digital banking platform delivery at a top-tier US bank — scope management, stakeholder alignment, and post-launch optimization.", type: 'Bank' },
  ],
  Governance: [
    { description: 'Program governance across multi-vendor digital banking ecosystems — weekly status reporting, RAID and dependency management, and PMO alignment for credit unions migrating to modern platforms.', type: 'Credit Unions' },
    { description: 'Scope management and requirements validation across phased delivery programs — Phase 1/Phase 2 classification, FRD review, and vendor coordination.', type: 'Banks & Credit Unions' },
  ],
}
```

- [ ] **Step 2: Update tabs array**

Change from:
```tsx
const tabs = ['VeriPark', 'Backbase', 'Salesforce'] as const
```
to:
```tsx
const tabs = ['VeriPark', 'Backbase', 'Governance'] as const
```

- [ ] **Step 3: Run tests**

```bash
npm run test -- --run
```

Note: The SocialProof test (`tests/components/SocialProof.test.tsx`) likely checks for tab content. It will need updating too (see Task 5).

- [ ] **Step 4: Commit**

```bash
git add components/SocialProof.tsx
git commit -m "feat: anonymize SocialProof, replace Salesforce tab with Governance"
```

---

### Task 4: Update About section copy for governance positioning

**Why:** The About section's intro copy currently emphasizes platform expertise ("Backbase and VeriPark"). It should also reflect the governance/delivery management positioning. The phrase "digital strategy to production" is good but can be tightened.

**Files:**
- Modify: `components/About.tsx` (paragraphs in StaggerChildren)

- [ ] **Step 1: Update the bold intro line**

Change from:
```tsx
16 years in financial services — from credit unions to enterprise commercial banking. I help financial institutions go from digital strategy to production on Backbase and VeriPark.
```
to:
```tsx
16 years in financial services — from credit unions to enterprise commercial banking. I help financial institutions migrate to modern digital banking platforms, owning the governance and delivery from Discovery through production.
```

- [ ] **Step 2: Run tests**

```bash
npm run test -- --run
```

- [ ] **Step 3: Commit**

```bash
git add components/About.tsx
git commit -m "feat: update About copy to reflect governance and migration positioning"
```

---

### Task 5: Update tests for changed content

**Why:** Tests assert specific text content that will change (e.g., SocialProof tabs, Services copy). Fix tests to match new content.

**Files:**
- Modify: `tests/components/SocialProof.test.tsx`
- Modify: `tests/components/Services.test.tsx`
- Modify: `tests/components/WhatIBring.test.tsx`

- [ ] **Step 1: Check which tests need updating**

Run tests first to see what fails:
```bash
npm run test -- --run
```

- [ ] **Step 2: Update SocialProof tests**

If tests check for "Salesforce" tab content, update to check for "Governance" tab instead. The test likely checks for tab rendering and project card content.

- [ ] **Step 3: Update Services tests**

If tests check for "VeriPark Implementation" or "Salesforce Implementation" titles, update to new titles ("VeriChannel Migration", "Program Governance", "Digital Strategy & Discovery").

- [ ] **Step 4: Update WhatIBring tests**

If tests check for "Vendor Liaison" title, update to "Multi-Vendor Governance".

- [ ] **Step 5: Run tests to confirm all pass**

```bash
npm run test -- --run
```

- [ ] **Step 6: Commit**

```bash
git add tests/
git commit -m "fix: update tests for Services, SocialProof, WhatIBring content changes"
```

---

### Task 6: Build, verify, and deploy

- [ ] **Step 1: Run build**

```bash
npm run build
```

- [ ] **Step 2: Deploy**

```bash
vercel --prod --yes
```

- [ ] **Step 3: Visual verification on live site**

Check all sections:
- Services: 4 cards (VeriChannel Migration, Program Governance, Backbase Delivery, Digital Strategy & Discovery)
- Why Me: "Multi-Vendor Governance" instead of "Vendor Liaison"
- SocialProof: 3 tabs (VeriPark, Backbase, Governance) — no client names
- About: Updated intro copy with governance/migration language

---

## Summary of changes

| Section | Before | After |
|---------|--------|-------|
| Services intro | "I specialize in three platform ecosystems..." | "I help credit unions and banks migrate..." |
| Services cards | 3 cards (VeriPark, Backbase, Salesforce) | 4 cards (VeriChannel Migration, Program Governance, Backbase Delivery, Discovery) |
| Why Me | "Vendor Liaison" | "Multi-Vendor Governance" |
| SocialProof tabs | VeriPark, Backbase, Salesforce | VeriPark, Backbase, Governance |
| SocialProof projects | Named bank references ("top-6 Canadian bank") | Anonymized ("major Canadian bank") |
| About intro | "go from digital strategy to production on Backbase and VeriPark" | "migrate to modern digital banking platforms, owning the governance and delivery" |
