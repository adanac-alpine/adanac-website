# Design: Personal About Me + Scoutloop Restoration

## Summary

Make the About section personal — add name, headshot, LinkedIn link. Restore the Scoutloop section. Both changes reinforce that Adanac Advisory is Sergey Pochikovskiy, a solo consultant who also builds things for fun.

---

## About Me Section

### Label
- Section label: "About Me" (small caps, same styling as current "About")
- Nav link stays "About" — shorter, cleaner
- Section `id="about"` stays the same (no anchor change)

### Name in Copy
- First line introduces name naturally: "I'm Sergey Pochikovskiy — 16 years in financial services..."
- Tone: professional + light personal (credentials first, one sentence about what drives you)
- Second paragraph stays largely as-is — experience range is strong copy

### Headshot
- Photo: `~/Downloads/GVBOT-53.jpg` → copy to `public/images/sergey-headshot.jpg`
- Placement: top of the white credentials card, above the credential groups
- Style: circular or rounded-2xl crop, ~96px (w-24 h-24)
- Use Next.js `Image` component with `priority` (above the fold)

### LinkedIn Link
- Inside the credentials card, below the photo
- LinkedIn icon (inline SVG) + "LinkedIn" text, glacier blue, links to `https://linkedin.com/in/pochikovskiy`
- Opens in new tab with `rel="noopener noreferrer"`

### What Stays the Same
- Two-column layout (bio left, credentials card right)
- All credential groups (Education, Certifications, Teaching & Community)
- All animations (FadeIn, StaggerChildren, motion.div)
- `LOGO_MAP` and `CREDENTIAL_GROUPS_DATA` unchanged

---

## Scoutloop Section

### Changes
- Import `Scoutloop` in `app/page.tsx`
- Render after `WhatIBring`, before `Contact`
- No component changes — `components/Scoutloop.tsx` is already built

### Section Order (after)
1. Hero
2. About Me
3. Services
4. SocialProof
5. Process
6. ToolsWorkflow
7. WhatIBring
8. **Scoutloop** (restored)
9. Contact

---

## Copy Changes

### About Me — Revised First Lines

**Current:**
> 16 years in financial services — from credit unions to enterprise commercial banking. I help financial institutions migrate to modern digital banking platforms, owning the governance and delivery from Discovery through production.

**Proposed:**
> I'm Sergey Pochikovskiy — 16 years in financial services, from credit unions to enterprise commercial banking. I help financial institutions migrate to modern digital banking platforms, owning the governance and delivery from Discovery through production.

**Current second paragraph:**
> My experience spans the full spectrum: a small FinTech startup, a Canadian credit union, a fast-growing bank in Belarus, and high-scale enterprise commercial banking in North America. That range means I understand the constraints and realities at every level — from a 35,000-member credit union to a top-6 Canadian bank.

**Proposed:** Keep as-is. The "My" pronoun already works with the personal framing. No rewrite needed.

---

## File Changes

| File | Change |
|------|--------|
| `public/images/sergey-headshot.jpg` | New — copy from `~/Downloads/GVBOT-53.jpg`, resize to ~400px wide |
| `components/About.tsx` | Label "About" → "About Me", add headshot + LinkedIn to credentials card, update first line of copy |
| `app/page.tsx` | Import and render `Scoutloop` before `Contact` |
| `specs/spec-website-design.md` | Update section 2 description, add Scoutloop to section order |

---

## Testing

- Visual: headshot loads, LinkedIn link works, credentials unchanged
- Responsive: headshot + LinkedIn layout works on mobile (stacked) and desktop (side-by-side)
- Scoutloop: section renders before Contact
- All existing tests pass — update `About.test.tsx` for new label and elements
- Build passes

---

## Out of Scope

- Nav link change (stays "About")
- Footer LinkedIn (already exists)
- Scoutloop component changes
- Full copy rewrite beyond the name introduction line
