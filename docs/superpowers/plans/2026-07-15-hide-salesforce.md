# Hide Salesforce — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all Salesforce references from the website to focus on VeriPark and Backbase only.

**Architecture:** Data-driven removal — delete Salesforce entries from arrays/objects, update copy strings, fix tests. No structural changes.

**Tech Stack:** Next.js 15, React, TypeScript, Tailwind CSS, Vitest

---

## File Map

| File | Change | Risk |
|------|--------|------|
| `components/Services.tsx` | Remove Salesforce card from `SERVICES_DATA`, update section copy, change grid to 2-col | Low |
| `components/SocialProof.tsx` | Remove Salesforce from `projects` + `tabs` | Low |
| `components/TechStack.tsx` | Remove Salesforce from `platforms` array | Low |
| `components/About.tsx` | Remove "Salesforce Certified Administrator" cert | Low |
| `app/layout.tsx` | Remove "Salesforce" from 3 meta description strings | Low |
| `tests/components/Services.test.tsx` | Remove Salesforce-specific assertions | Low |
| `tests/components/SocialProof.test.tsx` | Remove Salesforce tab tests | Low |
| `specs/spec-website-design.md` | Remove Salesforce from Services, SocialProof, TechStack descriptions | Low |
| `specs/context-project-overview.md` | Update SocialProof description | Low |

---

### Task 1: Remove Salesforce from Services

**Files:**
- Modify: `components/Services.tsx`

- [ ] **Step 1: Remove Salesforce card from SERVICES_DATA**

Delete the Salesforce object (lines 39-53):

```tsx
  {
    title: 'Salesforce Implementation',
    description:
      'Salesforce Financial Services Cloud and Service Cloud for credit unions — member data unification, case management automation, advisor consoles, and data quality frameworks. SF certified, currently delivering at multiple Canadian credit unions.',
    capabilities: [
      'Financial Services Cloud configuration',
      'Case management & workflow automation',
      'Data quality frameworks & deduplication',
      'Core banking data synchronization (Fiserv DNA)',
      'User training & adoption support',
    ],
    icon: (
      <Image src="/logos/salesforce.svg" alt="Salesforce logo" className="w-10 h-10 object-contain" loading="lazy" decoding="async" width={40} height={40} />
    ),
  },
```

- [ ] **Step 2: Update section copy**

Change line 70 from:

```tsx
              I specialize in three platform ecosystems: Backbase commercial banking, Salesforce Financial Services Cloud, and VeriPark omnichannel (VeriTouch). That depth means I can deliver faster, catch issues earlier, and actually help your team — not just advise from the sidelines.
```

To:

```tsx
              I specialize in two platform ecosystems: Backbase commercial banking and VeriPark omnichannel (VeriTouch). That depth means I can deliver faster, catch issues earlier, and actually help your team — not just advise from the sidelines.
```

- [ ] **Step 3: Update grid layout**

Change line 75 from:

```tsx
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

To:

```tsx
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
```

---

### Task 2: Remove Salesforce from SocialProof

**Files:**
- Modify: `components/SocialProof.tsx`

- [ ] **Step 1: Remove Salesforce from projects object**

Delete lines 16-19:

```tsx
  Salesforce: [
    { description: 'Leading data quality and case management automation across multiple workstreams on Salesforce Financial Services Cloud at a mid-sized Ontario credit union.', type: 'Credit Union' },
    { description: 'Implemented Fiserv DNA data synchronization and integration workflows at a Manitoba credit union on Salesforce Financial Services Cloud.', type: 'Credit Union' },
  ],
```

- [ ] **Step 2: Remove Salesforce from tabs array**

Change line 22 from:

```tsx
const tabs = ['VeriPark', 'Backbase', 'Salesforce'] as const
```

To:

```tsx
const tabs = ['VeriPark', 'Backbase'] as const
```

---

### Task 3: Remove Salesforce from TechStack

**Files:**
- Modify: `components/TechStack.tsx`

- [ ] **Step 1: Remove Salesforce entry**

Delete line 37:

```tsx
    { name: 'Salesforce', description: 'CRM & Financial Services Cloud', logo: 'salesforce', label: 'Salesforce' },
```

---

### Task 4: Remove Salesforce cert from About

**Files:**
- Modify: `components/About.tsx`

- [ ] **Step 1: Remove certification entry**

Delete line 99:

```tsx
      { text: 'Salesforce Certified Administrator', logo: 'sfadmin' },
```

---

### Task 5: Remove Salesforce from meta descriptions

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update description strings**

Replace all 3 occurrences of:

```
Backbase and Salesforce implementation experts for banks and credit unions.
```

With:

```
Backbase and VeriPark implementation experts for banks and credit unions.
```

(Lines 13, 19, 36)

---

### Task 6: Fix Services tests

**Files:**
- Modify: `tests/components/Services.test.tsx`

- [ ] **Step 1: Update test that checks service titles**

Change test "renders both service titles" (line 16-20) to only check VeriPark and Backbase:

```tsx
  it('renders service titles', () => {
    render(<Services />)
    expect(screen.getByRole('heading', { level: 3, name: /veripark implementation/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /backbase implementation/i })).toBeInTheDocument()
  })
```

- [ ] **Step 2: Remove Salesforce capabilities test**

Delete the entire test "lists capabilities for Salesforce" (lines 28-33):

```tsx
  it('lists capabilities for Salesforce', () => {
    render(<Services />)
    expect(screen.getAllByText(/financial services cloud/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/case management & workflow automation/i)).toBeInTheDocument()
    expect(screen.getByText(/data quality frameworks & deduplication/i)).toBeInTheDocument()
  })
```

---

### Task 7: Fix SocialProof tests

**Files:**
- Modify: `tests/components/SocialProof.test.tsx`

- [ ] **Step 1: Remove Salesforce tab assertion**

Remove line 20:

```tsx
    expect(screen.getByRole('button', { name: /Salesforce/i })).toBeInTheDocument()
```

- [ ] **Step 2: Remove Salesforce card tests**

Delete the entire tests "shows Salesforce cards after clicking Salesforce tab" and "mentions data quality and Fiserv DNA in Salesforce tab" (lines 36-48):

```tsx
  it('shows Salesforce cards after clicking Salesforce tab', () => {
    render(<SocialProof />)
    fireEvent.click(screen.getByRole('button', { name: /^Salesforce$/i }))
    const matches = screen.getAllByText(/Salesforce Financial Services Cloud/i)
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('mentions data quality and Fiserv DNA in Salesforce tab', () => {
    render(<SocialProof />)
    fireEvent.click(screen.getByRole('button', { name: /^Salesforce$/i }))
    expect(screen.getByText(/data quality/i)).toBeInTheDocument()
    expect(screen.getByText(/Fiserv DNA/i)).toBeInTheDocument()
  })
```

---

### Task 8: Update specs

**Files:**
- Modify: `specs/spec-website-design.md`
- Modify: `specs/context-project-overview.md`

- [ ] **Step 1: Update spec-website-design.md**

Line 110: Change "Three platform cards" to "Two platform cards"
Line 114: Delete "- Salesforce Implementation"
Line 120: Change "Tabbed showcase (VeriPark / Backbase / Salesforce)" to "Tabbed showcase (VeriPark / Backbase)"
Line 154: Remove "Salesforce" from the TechStack platform list

- [ ] **Step 2: Update context-project-overview.md**

Line 52: Change "Tabbed project showcase (VeriPark/Backbase/Salesforce)" to "Tabbed project showcase (VeriPark/Backbase)"

---

### Task 9: Verify

- [ ] **Step 1: Run tests**

```bash
npm run test -- --run
```

Expected: All tests pass (fewer total tests due to removed Salesforce tests)

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Build succeeds

- [ ] **Step 3: Commit and deploy**

```bash
git add -A && git commit -m "Hide Salesforce: focus on VeriPark and Backbase"
vercel --prod --yes
```
