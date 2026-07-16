> Archived (Jul 2026) — completed. All tasks implemented and deployed.

# Mobile Fixes & Navigation Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix mobile header issues (double logo, scroll trigger, footer hiding), replace 3 certification logos, and update navigation links.

**Architecture:** All changes are in `components/Navigation.tsx` (scroll logic + nav links), `components/About.tsx` (logo images), `components/Footer.tsx` (nav links), and `components/Process.tsx` (add section id). No new files needed.

**Tech Stack:** Next.js 15, React, Tailwind CSS, Framer Motion, next/image

---

### Task 1: Replace certification logos (UBC, Backbase, UCW)

**Files:**
- Modify: `public/logos/certs/ubc.jpg` (overwrite)
- Modify: `public/logos/certs/backbase.jpg` (overwrite)
- Modify: `public/logos/certs/ucw.png` (overwrite)

- [ ] **Step 1: Copy updated logos from ~/Downloads/ to public/logos/certs/**

```bash
cp ~/Downloads/667dd493462f37d28f3cdbb2_UBC-Sauder-965993980.jpg public/logos/certs/ubc.jpg
cp ~/Downloads/backbase_logo.jpeg public/logos/certs/backbase.jpg
cp ~/Downloads/UCW.png public/logos/certs/ucw.png
```

- [ ] **Step 2: Verify files replaced**

```bash
ls -la public/logos/certs/ubc.jpg public/logos/certs/backbase.jpg public/logos/certs/ucw.png
```

- [ ] **Step 3: Build to verify no breakage**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add public/logos/certs/ubc.jpg public/logos/certs/backbase.jpg public/logos/certs/ucw.png
git commit -m "fix: replace UBC, Backbase, UCW logos with LinkedIn versions"
```

---

### Task 2: Fix double logo on mobile header

**Problem:** On mobile, when scrolled past hero, both the desktop logo lockup (lines 73-91) and the mobile logo (lines 107-122) render simultaneously. The desktop lockup is missing `hidden md:flex`.

**Files:**
- Modify: `components/Navigation.tsx:73-91`

- [ ] **Step 1: Add responsive hiding to desktop logo lockup**

Change line 73 from:
```tsx
<AnimatePresence>
```
to:
```tsx
<AnimatePresence>
```

Actually, the fix is on the `motion.a` element. Change line 80 from:
```tsx
className="flex items-center focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded-lg focus:outline-none"
```
to:
```tsx
className="hidden md:flex items-center focus-visible:ring-2 focus-visible:ring-glacier focus-visible:ring-offset-2 rounded-lg focus:outline-none"
```

This hides the full logo lockup (mark + divider + wordmark) on mobile, leaving only the mobile-specific AdanacMark next to the hamburger.

- [ ] **Step 2: Verify in browser**

Open mobile viewport, scroll past hero. Should see only one logo (AdanacMark) next to hamburger, not two.

- [ ] **Step 3: Run tests**

```bash
npm run test -- --run
```

- [ ] **Step 4: Commit**

```bash
git add components/Navigation.tsx
git commit -m "fix: hide desktop logo lockup on mobile to prevent double logo"
```

---

### Task 3: Show header logo when hero logo scrolls out (not entire hero)

**Problem:** Currently `pastHero` triggers when `#hero` bottom <= 64px. The user wants it to trigger when the hero's logo (the large AdanacMark) scrolls out of view — slightly earlier.

**Files:**
- Modify: `components/Navigation.tsx:22-30`

- [ ] **Step 1: Change scroll detection to target hero logo element**

The hero logo is the first `AdanacMark` inside `#hero`. We can target it by finding the first SVG or the logo container inside `#hero`. However, a simpler approach: the hero logo sits at the top of the hero section. Since the hero is `min-h-screen`, the logo is roughly at `heroTop + ~100px`. We can check if the logo's bottom has scrolled past the nav bar.

Replace lines 22-30:
```tsx
const hero = document.querySelector('#hero')
if (hero) {
  const heroBottom = hero.getBoundingClientRect().bottom
  const isPast = heroBottom <= 64
  setPastHero((prev) => {
    if (prev !== isPast) return isPast
    return prev
  })
}
```

with:
```tsx
const hero = document.querySelector('#hero')
if (hero) {
  const heroTop = hero.getBoundingClientRect().top
  const isPast = heroTop <= -64
  setPastHero((prev) => {
    if (prev !== isPast) return isPast
    return prev
  })
}
```

This triggers when the hero section's top edge has scrolled 64px above the viewport — meaning the logo (which is near the top of the hero) is gone from view. This is slightly earlier than waiting for the hero bottom to reach 64px.

- [ ] **Step 2: Verify in browser**

Scroll slowly on desktop and mobile. The header logo should appear sooner — when the hero logo scrolls out, not when the entire hero section ends.

- [ ] **Step 3: Run tests**

```bash
npm run test -- --run
```

- [ ] **Step 4: Commit**

```bash
git add components/Navigation.tsx
git commit -m "fix: trigger header logo when hero logo scrolls out, not entire hero"
```

---

### Task 4: Hide header when footer is visible

**Problem:** When the user scrolls to the footer, the header logo should disappear (or the entire header should hide), since the footer already has full navigation.

**Files:**
- Modify: `components/Navigation.tsx` (add `nearFooter` state + scroll detection)

- [ ] **Step 1: Add nearFooter state**

After line 11, add:
```tsx
const [nearFooter, setNearFooter] = useState(false)
```

- [ ] **Step 2: Add footer detection to scroll handler**

Inside the `handleScroll` function, after the `pastHero` block (after line 30), add:
```tsx
const footer = document.querySelector('footer')
if (footer) {
  const footerTop = footer.getBoundingClientRect().top
  const isNear = footerTop <= window.innerHeight
  setNearFooter((prev) => {
    if (prev !== isNear) return isNear
    return prev
  })
}
```

- [ ] **Step 3: Hide header logo when near footer**

On the desktop logo lockup `motion.a` (line 75), add a condition to also check `!nearFooter`:

Change line 74 from:
```tsx
{pastHero && (
```
to:
```tsx
{pastHero && !nearFooter && (
```

Do the same for the mobile logo lockup on line 108:
```tsx
{pastHero && !nearFooter && (
```

- [ ] **Step 4: Optionally hide entire header at footer**

If the user wants the entire header to hide (not just the logo), wrap the `<nav>` element's content or add a className. The simplest approach: when `nearFooter` is true, set the nav to `opacity-0 pointer-events-none` with a transition.

On the `<nav>` element (line 65), add:
```tsx
className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
  nearFooter ? 'opacity-0 pointer-events-none' : ''
} ${
  isScrolled
    ? 'bg-navy/90 backdrop-blur-md shadow-lg border-b border-white/10 py-4'
    : 'bg-transparent py-6'
}`}
```

- [ ] **Step 5: Verify in browser**

Scroll to footer. Header should fade out. Scroll back up. Header should reappear.

- [ ] **Step 6: Run tests**

```bash
npm run test -- --run
```

- [ ] **Step 7: Commit**

```bash
git add components/Navigation.tsx
git commit -m "fix: hide header when footer is visible"
```

---

### Task 5: Update navigation links

**Problem:** Nav shows "Tools" but user wants "How I Work" instead. "Tools" should move down before Contact.

**Files:**
- Modify: `components/Navigation.tsx:48-53` (navLinks array)
- Modify: `components/Footer.tsx:41-55` (footer nav links)
- Modify: `components/Process.tsx:29` (add section id)

- [ ] **Step 1: Add id to Process section**

In `components/Process.tsx`, change line 29 from:
```tsx
<section className="py-24 bg-off-white">
```
to:
```tsx
<section id="process" className="py-24 bg-off-white">
```

- [ ] **Step 2: Update Navigation navLinks**

In `components/Navigation.tsx`, replace lines 48-53:
```tsx
const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Tools', href: '#tools' },
  { name: 'Contact', href: '#contact' },
]
```
with:
```tsx
const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'How I Work', href: '#process' },
  { name: 'Contact', href: '#contact' },
]
```

- [ ] **Step 3: Update Footer nav links**

In `components/Footer.tsx`, find the nav links array (around line 41) and replace:
```tsx
{ name: 'About', href: '#about' },
{ name: 'Services', href: '#services' },
{ name: 'Tools', href: '#tools' },
{ name: 'Contact', href: '#contact' },
```
with:
```tsx
{ name: 'About', href: '#about' },
{ name: 'Services', href: '#services' },
{ name: 'How I Work', href: '#process' },
{ name: 'Tools', href: '#tools' },
{ name: 'Contact', href: '#contact' },
```

- [ ] **Step 4: Verify in browser**

Header nav: About | Services | How I Work | Contact
Footer nav: About | Services | How I Work | Tools | Contact

All links scroll to correct sections.

- [ ] **Step 5: Run tests**

```bash
npm run test -- --run
```

- [ ] **Step 6: Commit**

```bash
git add components/Navigation.tsx components/Footer.tsx components/Process.tsx
git commit -m "feat: replace Tools with How I Work in header nav, move Tools to footer"
```

---

### Task 6: Build, test, and deploy

- [ ] **Step 1: Run full test suite**

```bash
npm run test -- --run
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

- [ ] **Step 3: Deploy**

```bash
vercel --prod --yes
```

- [ ] **Step 4: Final verification on live site**

Check mobile and desktop:
- Only one logo in mobile header (no double)
- Header logo appears when hero logo scrolls out
- Header hides at footer
- Nav shows: About | Services | How I Work | Contact
- Footer nav shows: About | Services | How I Work | Tools | Contact
- Updated logos render correctly
