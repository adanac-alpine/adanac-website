# Personal About Me + Scoutloop Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the About section personal (name, headshot, LinkedIn) and restore the Scoutloop section before Contact.

**Architecture:** Modify existing `About.tsx` to add name in copy, headshot, and LinkedIn link in the credentials card. Re-import `Scoutloop` in `page.tsx`. Update tests to match new elements.

**Tech Stack:** Next.js 15, React, Tailwind CSS, Vitest, React Testing Library, Next.js Image component

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `public/images/sergey-headshot.jpg` | Create | Copy + resize headshot from `~/Downloads/GVBOT-53.jpg` |
| `components/About.tsx` | Modify | Label → "About Me", name in copy, headshot + LinkedIn in credentials card |
| `app/page.tsx` | Modify | Import and render `Scoutloop` before `Contact` |
| `tests/components/About.test.tsx` | Modify | Update "About" eyebrow test, add name/headshot/LinkedIn tests |
| `tests/components/Scoutloop.test.tsx` | Modify | Replace placeholder with real tests |
| `specs/spec-website-design.md` | Modify | Update section 2 description, add Scoutloop to section order |

---

### Task 1: Copy and resize headshot

**Files:**
- Create: `public/images/sergey-headshot.jpg`

- [ ] **Step 1: Create the images directory**

```bash
mkdir -p public/images
```

- [ ] **Step 2: Copy and resize the photo**

Use sips (macOS built-in) to resize to 400px wide and copy:

```bash
sips -z 0 400 ~/Downloads/GVBOT-53.jpg --out public/images/sergey-headshot.jpg
```

Expected: `public/images/sergey-headshot.jpg` exists, ~400px wide

- [ ] **Step 3: Verify the file**

```bash
sips -g pixelWidth -g pixelHeight public/images/sergey-headshot.jpg
```

Expected: pixelWidth around 400

- [ ] **Step 4: Commit**

```bash
git add public/images/sergey-headshot.jpg
git commit -m "assets: add Sergey headshot for About Me section"
```

---

### Task 2: Update About.tsx — label, name, headshot, LinkedIn

**Files:**
- Modify: `components/About.tsx`

- [ ] **Step 1: Change section label from "About" to "About Me"**

In `components/About.tsx`, line 54, change:

```tsx
<span className="text-xs font-bold tracking-widest text-glacier uppercase">
  About
</span>
```

to:

```tsx
<span className="text-xs font-bold tracking-widest text-glacier uppercase">
  About Me
</span>
```

- [ ] **Step 2: Add name to the first line of copy**

In `components/About.tsx`, line 66, change:

```tsx
16 years in financial services — from credit unions to enterprise commercial banking. I help financial institutions migrate to modern digital banking platforms, owning the governance and delivery from Discovery through production.
```

to:

```tsx
I'm Sergey Pochikovskiy — 16 years in financial services, from credit unions to enterprise commercial banking. I help financial institutions migrate to modern digital banking platforms, owning the governance and delivery from Discovery through production.
```

- [ ] **Step 3: Add headshot and LinkedIn link to the credentials card**

Replace the credentials card content (lines 78–118) with:

```tsx
<div className="relative bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
  {/* Headshot + LinkedIn */}
  <div className="flex items-center gap-4 mb-6">
    <Image
      src="/images/sergey-headshot.jpg"
      alt="Sergey Pochikovskiy"
      width={96}
      height={96}
      className="w-24 h-24 rounded-2xl object-cover"
      priority
    />
    <div className="space-y-1">
      <p className="text-navy font-bold text-lg">Sergey Pochikovskiy</p>
      <a
        href="https://linkedin.com/in/pochikovskiy"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-glacier text-sm font-medium hover:underline focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded focus:outline-none"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </a>
    </div>
  </div>

  <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
    <span className="text-glacier">■</span> Credentials
  </h3>

  <div className="space-y-6">
    {CREDENTIAL_GROUPS_DATA.map((group, groupIdx) => (
      <div key={groupIdx} className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-glacier">
          {group.title}
        </h4>
        <div className="space-y-2">
          {group.items.map((item, itemIdx) => (
            <motion.div
              key={itemIdx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + groupIdx * 0.15 + itemIdx * 0.08, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              {item.logo && LOGO_MAP[item.logo] && (
                <Image
                  src={LOGO_MAP[item.logo].src}
                  alt={`${item.text} logo`}
                  width={LOGO_MAP[item.logo].width}
                  height={LOGO_MAP[item.logo].height}
                  className="w-10 h-10 shrink-0 rounded-lg object-contain"
                  loading="lazy"
                />
              )}
              {!item.logo && <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />}
              <span className="text-dark-gray text-sm sm:text-base font-medium">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 4: Verify the file compiles**

```bash
npm run build
```

Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add components/About.tsx
git commit -m "feat: make About section personal — add name, headshot, LinkedIn"
```

---

### Task 3: Update About tests

**Files:**
- Modify: `tests/components/About.test.tsx`

- [ ] **Step 1: Update the "About" eyebrow test to match "About Me"**

Change line 13 from:

```tsx
expect(screen.getByText('About', { selector: '.uppercase' })).toBeInTheDocument()
```

to:

```tsx
expect(screen.getByText('About Me', { selector: '.uppercase' })).toBeInTheDocument()
```

- [ ] **Step 2: Add test for name in copy**

Add after the existing "mentions 16 years" test:

```tsx
it('introduces Sergey by name', () => {
  render(<About />)
  expect(screen.getByText(/Sergey Pochikovskiy/i)).toBeInTheDocument()
})
```

- [ ] **Step 3: Add test for headshot image**

```tsx
it('renders the headshot image', () => {
  render(<About />)
  const img = screen.getByAltText('Sergey Pochikovskiy')
  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute('src', '/images/sergey-headshot.jpg')
})
```

- [ ] **Step 4: Add test for LinkedIn link**

```tsx
it('links to LinkedIn profile', () => {
  render(<About />)
  const link = screen.getByRole('link', { name: /linkedin/i })
  expect(link).toHaveAttribute('href', 'https://linkedin.com/in/pochikovskiy')
  expect(link).toHaveAttribute('target', '_blank')
})
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm run test -- --run tests/components/About.test.tsx
```

Expected: All tests pass

- [ ] **Step 6: Commit**

```bash
git add tests/components/About.test.tsx
git commit -m "test: update About tests for personal About Me section"
```

---

### Task 4: Restore Scoutloop in page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add Scoutloop import**

After the `WhatIBring` import (line 8), add:

```tsx
import Scoutloop from '@/components/Scoutloop'
```

- [ ] **Step 2: Render Scoutloop before Contact**

In the JSX, after `<WhatIBring />` (line 24) and before `<Contact />` (line 25), add:

```tsx
<Scoutloop />
```

The section order becomes:

```tsx
<WhatIBring />
<Scoutloop />
<Contact />
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: restore Scoutloop section before Contact"
```

---

### Task 5: Update Scoutloop tests

**Files:**
- Modify: `tests/components/Scoutloop.test.tsx`

- [ ] **Step 1: Replace placeholder with real tests**

Replace the entire file with:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Scoutloop from '../../components/Scoutloop'

describe('Scoutloop', () => {
  it('renders the heading', () => {
    render(<Scoutloop />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/scoutloop/i)
  })

  it('renders the "Built in BC" label', () => {
    render(<Scoutloop />)
    expect(screen.getByText('Built in BC')).toBeInTheDocument()
  })

  it('describes the backcountry use case', () => {
    render(<Scoutloop />)
    expect(screen.getByText(/backcountry/i)).toBeInTheDocument()
  })

  it('links to scoutloop.me', () => {
    render(<Scoutloop />)
    const link = screen.getByRole('link', { name: /visit scoutloop/i })
    expect(link).toHaveAttribute('href', 'https://scoutloop.me')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('displays tech stack tags', () => {
    render(<Scoutloop />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Supabase')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they pass**

```bash
npm run test -- --run tests/components/Scoutloop.test.tsx
```

Expected: All tests pass

- [ ] **Step 3: Commit**

```bash
git add tests/components/Scoutloop.test.tsx
git commit -m "test: replace Scoutloop placeholder with real tests"
```

---

### Task 6: Update spec-website-design.md

**Files:**
- Modify: `specs/spec-website-design.md`

- [ ] **Step 1: Update section 2 description**

Change lines 98–106 from:

```markdown
### 2. About

**Layout:** Two-column on desktop, stacked on mobile

**Content:**
- **Bio:** 16 years in financial services
- **Credentials:** Education, Certifications, Teaching & Community
```

to:

```markdown
### 2. About Me

**Layout:** Two-column on desktop, stacked on mobile

**Content:**
- **Headshot:** Professional photo in credentials card
- **Name:** Sergey Pochikovskiy (introduced in first line of copy)
- **LinkedIn:** Icon + link in credentials card
- **Bio:** 16 years in financial services
- **Credentials:** Education, Certifications, Teaching & Community
```

- [ ] **Step 2: Add Scoutloop to the section list and update section numbers**

Add after section 8 (TechStack) and before Contact:

```markdown
### 9. Scoutloop

**Layout:** Full-width section with green accent

Personal project showcase with tech stack logos.
```

Renumber Contact to 10 and Footer to 11.

- [ ] **Step 3: Update implementation status table**

Update the "About" row to "About Me" and update the test count note.

- [ ] **Step 4: Commit**

```bash
git add specs/spec-website-design.md
git commit -m "docs: update spec for About Me + Scoutloop restoration"
```

---

### Task 7: Final verification

- [ ] **Step 1: Run full test suite**

```bash
npm run test -- --run
```

Expected: All tests pass

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Build succeeds

- [ ] **Step 3: Push to GitHub**

```bash
git push
```

Expected: Vercel auto-deploys
