> Archived (Jul 2026) — completed. All tasks implemented and deployed.

# Recover Build & Hide Scoutloop — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the broken build caused by antigravity's Scoutloop hiding attempt, recover clean code, apply PR 3 (Jules) enhancements, and hide Scoutloop cleanly.

**Architecture:** Reset broken files to the Jules merge state (`91801ec`), apply PR 3 changes on top, keep Scoutloop hidden from `page.tsx`. Two files need deletion/reset, five files need targeted edits.

**Tech Stack:** Next.js 15, React, TypeScript, Tailwind CSS, next/image

---

## File Map

| File | Action | Why |
|------|--------|-----|
| `app/error.tsx` | Delete | Broken TS types, not in Jules merge. PR 3 uses `not-found.tsx` instead |
| `components/Scoutloop.tsx` | Reset to `91801ec` + apply PR 3 Image | Duplicate JSX from antigravity |
| `components/TechStack.tsx` | Replace TechLogo with PR 3's useState pattern | Cleaner fallback logic |
| `components/ToolsWorkflow.tsx` | Replace ToolIcon with PR 3's Image version | Consistent styling |
| `components/Contact.tsx` | No change needed | Already has a11y attrs + antigravity UI |
| `components/Services.tsx` | No change needed | Already has module-level data + Image |
| `tailwind.config.js` | Add `darkMode: 'class'` | PR 3 enhancement |
| `public/robots.txt` | Remove blank line | PR 3 cleanup |

---

### Task 1: Delete broken `app/error.tsx`

**Files:**
- Delete: `app/error.tsx`

- [ ] **Step 1: Remove the file**

```bash
rm app/error.tsx
```

- [ ] **Step 2: Verify deletion**

```bash
ls app/error.tsx 2>&1
# Expected: "No such file or directory"
```

---

### Task 2: Restore `components/Scoutloop.tsx` cleanly

**Files:**
- Reset: `components/Scoutloop.tsx` to Jules merge state, then apply PR 3 Image conversion

- [ ] **Step 1: Restore from Jules merge**

```bash
git show 91801ec:components/Scoutloop.tsx > components/Scoutloop.tsx
```

- [ ] **Step 2: Apply PR 3 Image conversion**

Replace the `<img>` tag for tech logos with `<Image>`. Edit `components/Scoutloop.tsx`:

Add `import Image from 'next/image'` after the `'use client'` line (line 1).

Replace the `<img>` block (around line 65-74 in the restored file):

```tsx
<img
  src={`/logos/tools/${tech.icon}.svg`}
  alt={`${tech.name} logo`}
  className="w-4 h-4 shrink-0"
  loading="lazy"
  decoding="async"
  onError={(e) => {
    const target = e.target as HTMLImageElement
    target.style.display = 'none'
  }}
/>
```

With:

```tsx
<Image
  src={`/logos/tools/${tech.icon}.svg`}
  alt={`${tech.name} logo`}
  width={16}
  height={16}
  className="w-4 h-4 shrink-0"
  loading="lazy"
  onError={(e) => {
    const target = e.currentTarget as HTMLImageElement
    target.style.display = 'none'
  }}
/>
```

- [ ] **Step 3: Verify Scoutloop is hidden from page.tsx**

Confirm `app/page.tsx` does NOT import or render `<Scoutloop />`. Current state already has it removed — no action needed.

---

### Task 3: Update `components/TechStack.tsx` with PR 3's useState fallback

**Files:**
- Modify: `components/TechStack.tsx:1-27`

- [ ] **Step 1: Replace TechLogo function**

Replace the entire `TechLogo` function (lines 1-27) with:

```tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FadeIn } from './animation/FadeIn'

function TechLogo({ name, label, className = '' }: { name: string; label: string; className?: string }) {
  const [src, setSrc] = useState(`/logos/${name}.svg`)

  const handleError = () => {
    if (src === `/logos/${name}.svg`) {
      setSrc(`/logos/${name}.png`)
    } else if (src === `/logos/${name}.png`) {
      setSrc(`/logos/${name}.jpg`)
    }
  }

  return (
    <Image
      src={src}
      alt={`${label} logo`}
      width={120}
      height={32}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  )
}
```

---

### Task 4: Update `components/ToolsWorkflow.tsx` with PR 3's Image styling

**Files:**
- Modify: `components/ToolsWorkflow.tsx:1-23`

- [ ] **Step 1: Replace ToolIcon function**

Replace the entire `ToolIcon` function (lines 1-23) with:

```tsx
'use client'

import Image from 'next/image'
import { FadeIn } from './animation/FadeIn'

function ToolIcon({ name, className = '' }: { name: string; className?: string }) {
  const src = `/logos/tools/${name}.svg`
  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={32}
      height={32}
      className={`${className} object-contain`}
      loading="lazy"
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement
        target.style.display = 'none'
      }}
    />
  )
}
```

---

### Task 5: Add `darkMode` to `tailwind.config.js`

**Files:**
- Modify: `tailwind.config.js:2`

- [ ] **Step 1: Add darkMode config**

Add `darkMode: 'class',` after `module.exports = {`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
```

---

### Task 6: Clean up `public/robots.txt`

**Files:**
- Modify: `public/robots.txt`

- [ ] **Step 1: Remove extra blank line**

Current content:
```
User-agent: *
Allow: /

Sitemap: https://adanacadvisory.ca/sitemap.xml
```

Replace with:
```
User-agent: *
Allow: /
Sitemap: https://adanacadvisory.ca/sitemap.xml
```

---

### Task 7: Verify build and tests

- [ ] **Step 1: Run tests**

```bash
npm run test -- --run
```

Expected: 67 tests pass (or more), 0 failures

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Build succeeds with no type errors

- [ ] **Step 3: Deploy to Vercel**

```bash
vercel --prod --yes
```

Expected: Deployment succeeds, returns preview URL
