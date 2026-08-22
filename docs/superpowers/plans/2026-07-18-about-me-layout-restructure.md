# About Me Layout Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure About Me section — large circular photo leads the left column, credentials card loses photo and title.

**Architecture:** Move headshot + name + LinkedIn from the credentials card into the left column above the bio. Make photo circular and larger (160px). Remove "■ Credentials" heading from the card.

**Tech Stack:** Next.js 15, React, Tailwind CSS, Vitest, React Testing Library

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `components/About.tsx` | Modify | Restructure layout — photo left, credentials right |
| `tests/components/About.test.tsx` | Modify | Update tests for new layout |

---

### Task 1: Restructure About.tsx layout

**Files:**
- Modify: `components/About.tsx`

- [ ] **Step 1: Replace the left column content (lines 51-74)**

The left column currently has: heading + bio paragraphs. Replace with: photo + name + LinkedIn + bio.

Replace lines 51-74 (the `<div className="lg:col-span-7 space-y-8">` inner content) with:

```tsx
<div className="lg:col-span-7 space-y-8">
  <FadeIn>
    <div className="space-y-4">
      <span className="text-xs font-bold tracking-widest text-glacier uppercase">
        About Me
      </span>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
        Bridging the gap between digital strategy and platform execution
      </h2>
    </div>
  </FadeIn>

  <FadeIn delay={0.15}>
    <div className="flex flex-col items-center lg:items-start gap-4">
      <Image
        src="/images/sergey-headshot.jpg"
        alt="Sergey Pochikovskiy"
        width={160}
        height={160}
        className="w-40 h-40 rounded-full object-cover"
        priority
      />
      <div className="text-center lg:text-left space-y-1">
        <p className="text-navy font-bold text-xl">Sergey Pochikovskiy</p>
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
  </FadeIn>

  <StaggerChildren stagger={0.12} className="text-dark-gray text-base sm:text-lg leading-relaxed space-y-6">
    <StaggerItem>
      <p className="font-medium text-navy/95 text-lg sm:text-xl">
        {"I'm"} Sergey Pochikovskiy — 16 years in financial services, from credit unions to enterprise commercial banking. I help financial institutions migrate to modern digital banking platforms, owning the governance and delivery from Discovery through production.
      </p>
    </StaggerItem>
    <StaggerItem>
      <p>
        My experience spans the full spectrum: a small FinTech startup, a Canadian credit union, a fast-growing bank in Belarus, and high-scale enterprise commercial banking in North America. That range means I understand the constraints and realities at every level — from a 35,000-member credit union to a top-6 Canadian bank.
      </p>
    </StaggerItem>
  </StaggerChildren>
</div>
```

- [ ] **Step 2: Replace the right column credentials card (lines 77-145)**

Remove the headshot + LinkedIn + "■ Credentials" heading. Keep just the credential groups.

Replace the entire `<FadeIn delay={0.3} className="lg:col-span-5">` block with:

```tsx
<FadeIn delay={0.3} className="lg:col-span-5">
  <div className="relative bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
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
</FadeIn>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Note: Pre-existing ESLint errors in other files may cause build failure. Verify your About.tsx changes compile correctly by checking the error output doesn't mention About.tsx.

- [ ] **Step 4: Commit**

```bash
git add components/About.tsx
git commit -m "feat: restructure About Me — large circular photo, clean credentials card"
```

---

### Task 2: Update About tests

**Files:**
- Modify: `tests/components/About.test.tsx`

- [ ] **Step 1: Update the "introduces Sergey by name" test**

The name now appears once (in the left column), not twice. Change line 23-24 from:

```tsx
const matches = screen.getAllByText(/Sergey Pochikovskiy/i)
expect(matches.length).toBeGreaterThanOrEqual(2)
```

to:

```tsx
expect(screen.getByText(/Sergey Pochikovskiy/i)).toBeInTheDocument()
```

- [ ] **Step 2: Verify the headshot test still passes**

The headshot is now in the left column with the same `alt` and `src`. The existing test should still pass.

- [ ] **Step 3: Verify the LinkedIn test still passes**

The LinkedIn link is now in the left column with the same `href` and `target`. The existing test should still pass.

- [ ] **Step 4: Run tests**

```bash
npm run test -- --run tests/components/About.test.tsx
```

Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add tests/components/About.test.tsx
git commit -m "test: update About tests for restructured layout"
```

---

### Task 3: Final verification

- [ ] **Step 1: Run full test suite**

```bash
npm run test -- --run
```

Expected: All tests pass

- [ ] **Step 2: Push to GitHub**

```bash
git push
```

Expected: Vercel auto-deploys
