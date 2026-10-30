# Adanac Alpine Advisory — building with this design system

Brand: a fintech consulting site. Navy surfaces, glacier-blue accents, Inter type, a subtle
triangle "mountain" texture. Components live on `window.AdanacDS`.

## Setup

No provider or wrapper is needed: link `styles.css` once and render components directly. It
loads Inter (300–800) from Google Fonts, the CSS tokens, and the compiled Tailwind utilities.
Set `font-family: var(--font-family-primary)` on your root so your own text matches.

## Styling idiom: Tailwind utility classes + CSS tokens

Style your own layout glue with Tailwind classes. **Only classes compiled into
`_ds_bundle.css` exist** — the build is purged, so before using a class outside the families
below, grep `_ds_bundle.css` for it; if it isn't there, use a token or an inline style instead.

| Family | Guaranteed classes |
|---|---|
| Brand colour | `bg-` / `text-` / `border-` / `ring-` + `navy`, `glacier`, `forest`, each also `-50` … `-900`, all with `hover:` |
| Neutrals | `bg-off-white` (alternate sections), `bg-white`, `text-dark-gray` (body), `text-medium-gray` (muted), `border-gray-200`; on navy: `text-white/70`, `bg-white/5`, `border-white/10` |
| Type | `font-extrabold` headings, `tracking-tight leading-tight`; eyebrows `text-xs font-bold uppercase tracking-widest text-glacier` |
| Layout | `container mx-auto px-6 md:px-12`, sections `py-24`, cards `rounded-xl shadow-sm` |

Tokens (in `_ds_bundle.css` `:root`) for anything without a class: `--color-navy` `#1a2332`,
`--color-glacier` `#4a90d9`, `--color-forest` `#2d6a4f`, `--color-off-white`,
`--color-dark-gray` (body text), `--space-xs`…`--space-3xl`, `--radius-sm`…`--radius-xl`,
`--text-display`/`--text-h1`…`--text-overline`. Page sections alternate `bg-white` and
`bg-off-white`; cards that aren't links get no hover lift.

## Components

- **Brand** — `AdanacMark` (logo glyph; `tile={false} fill="#ffffff"` on navy), `AdanacWordmark`
  (`color="#ffffff" incColor="rgba(255,255,255,0.35)"` on navy), `TrianglePattern` (no intrinsic
  size: put it `absolute inset-0 w-full h-full` inside a `relative overflow-hidden` parent;
  `variant="dark"` on navy, `"light"` on light backgrounds, `opacity` 0.04–0.12).
- **Animation** — `FadeIn`, `StaggerChildren` + `StaggerItem` wrap content and animate it in on
  first scroll into view. Content starts invisible, so never wrap something that must show
  in a static screenshot.
- **Sections** — `Navigation`, `Hero`, `About`, `WhatIBring`, `Services`, `Process`, `TechStack`,
  `ToolsWorkflow`, `Scoutloop`, `SocialProof`, `Contact`, `Footer`: full-width page sections with
  fixed site copy and **no props**. Reuse them whole for Adanac pages; for new content, compose
  your own section in the same idiom. `Navigation` is `position: fixed` with white links over a
  transparent bar — place it over the navy `Hero`.

Per-component API: `components/<group>/<Name>/<Name>.d.ts` and `.prompt.md`.

## Example

```jsx
const { FadeIn, TrianglePattern, AdanacMark } = window.AdanacDS;

<section className="relative overflow-hidden py-24 bg-navy text-white">
  <TrianglePattern variant="dark" opacity={0.06} className="absolute inset-0 w-full h-full" />
  <div className="relative container mx-auto px-6 md:px-12">
    <FadeIn>
      <span className="text-xs font-bold uppercase tracking-widest text-glacier">Insights</span>
      <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
        Digital banking, delivered
      </h2>
      <p className="mt-4 max-w-2xl text-white/70">Notes from the field.</p>
      <button className="mt-8 bg-glacier hover:bg-glacier-600 text-white font-semibold px-8 py-4 rounded-lg">
        Get in touch
      </button>
    </FadeIn>
  </div>
</section>
```
