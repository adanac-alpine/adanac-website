> Archived (Jul 2026) — completed. All tasks implemented, tested, deployed.

# Website Positioning Update — RFP-Inspired Improvements

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the website around migration delivery, governance, and BA expertise. No client names.

**Architecture:** Content-only changes across 4 existing components. No new components, no new files, no structural changes.

**Tech Stack:** Next.js 15, React, Tailwind CSS, Framer Motion

---

### Task 1: Reframe Services section — migration pattern + governance

**Why:** The current website says "Implementation" but doesn't capture the migration or governance angle. Need to reframe around what Sergey actually does: Senior BA/PO on migration projects with governance woven in. Discovery is NOT a separate service — it was done at Modes, not sold independently. Program Governance is NOT a separate service — it's part of what happens during implementations.

**Files:**
- Modify: `components/Services.tsx` (SERVICES_DATA array + intro paragraph)

- [ ] **Step 1: Update SERVICES_DATA and intro copy**

Replace the `SERVICES_DATA` array and intro paragraph in `components/Services.tsx`.

**New SERVICES_DATA** (3 services — same count as current):

1. **VeriChannel Migration** (replaces "VeriPark Implementation")
   - Description: Migrating digital banking from legacy platforms to VeriPark VeriChannel — scope classification, phased delivery, and production cutover for credit unions.
   - Capabilities (7 — original 5 + 2 governance bullets):
     1. Migration scope classification (Phase 1 / Phase 2)
     2. Requirements validation & FRD review
     3. UAT coordination & go-live readiness
     4. Post-launch stabilization support
     5. Legacy platform deconversion planning
     6. Multi-vendor RAID management & escalation
     7. Weekly status reporting & PMO alignment
   - Icon: keep existing `/logos/veripark.svg`

2. **Backbase Delivery** (reframed from "Backbase Implementation")
   - Description: Senior BA with deep Backbase platform expertise — requirements validation, UAT coordination, and stakeholder alignment for commercial banking digital channels.
   - Capabilities: keep existing 5 capabilities (already good)
   - Icon: keep existing `/logos/backbase.jpg`

3. **Salesforce Implementation** (keep, reframe description)
   - Description: Salesforce Financial Services Cloud for credit unions — requirements coordination, stakeholder management, data quality frameworks, and case management automation. SF certified, currently delivering at multiple Canadian credit unions.
   - Capabilities:
     1. Financial Services Cloud configuration
     2. Case management & workflow automation
     3. Data quality frameworks & deduplication
     4. Requirements coordination & stakeholder management
     5. User training & adoption support
   - Icon: keep existing `/logos/salesforce.svg`

**New intro paragraph:**
```
I help credit unions and banks migrate to modern digital banking platforms — managing the governance, scope, and vendor coordination that determines whether a project lands on time or derails. From Discovery through production cutover, I own the delivery.
```

- [ ] **Step 2: Run tests**

```bash
npm run test -- --run
```

- [ ] **Step 3: Commit**

```bash
git add components/Services.tsx
git commit -m "feat: reframe Services around migration, governance, and BA positioning"
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

**Why:** The current SocialProof section references specific bank names ("top-6 Canadian bank", "$200B+ US bank") and "J.D. Power's #1 ranked" which could identify the client. These need to be anonymized while keeping useful scale/context. Backbase entries should reflect BA role, not "delivered" or "contributed to delivery". Salesforce entries should reframe around PM/BA activities (requirements coordination, stakeholder management) rather than Fiserv DNA integration work. VeriPark stays as "Delivery lead" — that role is accurate.

**Files:**
- Modify: `components/SocialProof.tsx` (projects object — tabs stay the same)

- [ ] **Step 1: Rewrite project descriptions**

Replace the `projects` object. Tabs remain `['VeriPark', 'Backbase', 'Salesforce']` — do NOT replace Salesforce with Governance.

```tsx
const projects = {
  VeriPark: [
    { description: 'Delivery lead for VeriChannel digital banking migration at a Canadian credit union — scope classification, RAID governance, and vendor coordination across VeriPark, Central 1, and third-party integrations.', type: 'Credit Union' },
    { description: 'Product owner advisor for VeriChannel rollout at a Canadian credit union — phased delivery planning, requirements validation, and go-live stabilization.', type: 'Credit Union' },
  ],
  Backbase: [
    { description: "BA for Backbase commercial banking digital channels at a major Canadian bank — requirements gathering, UAT coordination, and stakeholder alignment.", type: 'Bank' },
    { description: "BA supporting Backbase digital banking platform delivery at a top-tier US bank — scope management, requirements validation, and post-launch optimization.", type: 'Bank' },
  ],
  Salesforce: [
    { description: 'Requirements coordination and stakeholder management across Salesforce Financial Services Cloud workstreams at a mid-sized Ontario credit union — data quality frameworks and case management automation.', type: 'Credit Union' },
    { description: 'PM/BA on Salesforce Financial Services Cloud delivery at a Manitoba credit union — requirements gathering, workflow automation, and user adoption support.', type: 'Credit Union' },
  ],
}
```

- [ ] **Step 3: Run tests**

```bash
npm run test -- --run
```

Note: The SocialProof test (`tests/components/SocialProof.test.tsx`) checks for Salesforce tab content. It will need updating (see Task 5).

- [ ] **Step 4: Commit**

```bash
git add components/SocialProof.tsx
git commit -m "feat: anonymize SocialProof, replace Salesforce tab with Governance"
```

---

### Task 4: Update About section copy for governance positioning

**Why:** The About section's intro copy currently emphasizes platform expertise ("Backbase and VeriPark"). It should also reflect the governance/delivery management positioning.

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

**Why:** Tests assert specific text content that will change (e.g., SocialProof tabs, Services copy, WhatIBring titles). Fix tests to match new content.

**Files:**
- Modify: `tests/components/SocialProof.test.tsx`
- Modify: `tests/components/Services.test.tsx`
- Modify: `tests/components/WhatIBring.test.tsx`

- [ ] **Step 1: Run tests to see what fails**

```bash
npm run test -- --run
```

- [ ] **Step 2: Update SocialProof tests**

Current test checks for "Salesforce" tab button and "Salesforce Financial Services Cloud" content. Change to:
- Tab button: check for "Governance" instead of "Salesforce"
- Content: check for governance-related text instead of Fiserv DNA/data quality
- Remove the "mentions data quality and Fiserv DNA in Salesforce tab" test

- [ ] **Step 3: Update Services tests**

Current test checks for "Salesforce Implementation" title. The card still exists but test may need adjusting if title text changed. Also:
- Add check for "VeriChannel Migration" title
- Keep "Backbase Delivery" check (title unchanged)

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
- Services: 3 cards (VeriChannel Migration, Backbase Delivery, Salesforce Implementation)
- Why Me: "Multi-Vendor Governance" instead of "Vendor Liaison"
- SocialProof: 3 tabs (VeriPark, Backbase, Salesforce) — no client names, anonymized scale
- About: Updated intro copy with governance/migration language

---

## Summary of changes

| Section | Before | After |
|---------|--------|-------|
| Services intro | "I specialize in three platform ecosystems..." | "I help credit unions and banks migrate..." |
| Services cards | 3 cards (VeriPark Implementation, Backbase Implementation, Salesforce Implementation) | 3 cards (VeriChannel Migration, Backbase Delivery, Salesforce Implementation) |
| VeriPark card | "VeriPark Implementation" — 5 capabilities | "VeriChannel Migration" — 7 capabilities (2 governance bullets added) |
| Backbase card | "End-to-end delivery" / "delivery lead" | "Senior BA with deep Backbase platform expertise" |
| Salesforce card | Fiserv DNA integration focus | PM/BA activities — requirements coordination, stakeholder management |
| Why Me | "Vendor Liaison" | "Multi-Vendor Governance" |
| SocialProof tabs | VeriPark, Backbase, Salesforce | VeriPark, Backbase, Salesforce (unchanged) |
| VeriPark SocialProof | "Delivery lead" at named credit unions | "Delivery lead" at anonymized credit unions (scale preserved) |
| Backbase SocialProof | "Delivered" / "contributed to delivery" at named banks | "BA for" / "BA supporting" at anonymized banks |
| Salesforce SocialProof | Fiserv DNA integration | PM/BA activities — requirements coordination, stakeholder management |
| About intro | "go from digital strategy to production on Backbase and VeriPark" | "migrate to modern digital banking platforms, owning the governance and delivery" |
