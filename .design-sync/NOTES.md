# design-sync notes — Adanac website → Claude Design

Project: "Adanac Advisory DS" — https://claude.ai/design/p/a4f89e9c-e34e-4389-a928-94733b5921f3
Shape: package (no Storybook). This is a Next.js site, not a published library: there is no
`dist/` or `.d.ts`, so several pieces below stand in for what a library would ship.

## How the build works here

- **Run `cfg.buildCmd` before every converter/driver run.** It regenerates
  `.design-sync/.cache/public-assets.ts` (gen-assets) and `.design-sync/.cache/tailwind.css`
  (the `cssEntry`); both are gitignored, so a fresh clone fails without it.
- **Entry:** always pass `--entry ./.design-sync/entry.ts`. The converter's synthesized entry uses
  `export *`, which drops default exports — every site component is a default export.
  New component → add it to `entry.ts`, `componentSrcMap`, and `dtsPropsFor`.
- **Props:** no `.d.ts` exists, so `dtsPropsFor` is hand-written from source for the 6 prop-taking
  components; sections get a no-props stub. Re-check it when a component's props change.
- **next/image:** aliased via `.design-sync/tsconfig.json` `paths` to `.design-sync/next-image.tsx`,
  a plain `<img>` that resolves `/logos/**` and `/images/**` to data URIs (~0.9 MB of the 1.1 MB
  bundle). Bundling the real next/image crashed every card (`process is not defined`) and its
  root paths can't resolve outside Next anyway. The user approved embedding (first sync, 2026-10-29).
- **Tailwind:** compiled with `.design-sync/tailwind.config.js` = site config + previews in
  `content` + a safelist of every navy/glacier/forest shade (bg/text/border/ring, hover) so
  the design agent can use brand shades the site doesn't. Inter is loaded via a Google Fonts
  `@import` in `.design-sync/ds.css` (the site uses next/font) → `[FONT_REMOTE]`, expected.
- **Groups:** sections regrouped via `docsMap` → `.design-sync/docs/section.md` (category stub).
  Sections use `cardMode: single`, viewport 1280x900 (Navigation 1280x96).
- **Browser:** no Playwright browser cache; run validate/capture with
  `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` and
  `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i playwright` in `.ds-sync/`.
- Both `package-lock.json` and `pnpm-lock.yaml` exist; the sync used the existing `node_modules`.

## Grading animated components

Every section and FadeIn/StaggerChildren/StaggerItem animates in (framer-motion `whileInView` /
staggered `animate`). `package-capture.mjs` shoots before they finish, so its review sheets show
blank or partial cells. Previews can't fix this (they bundle a separate framer-motion copy).
Grade from a delayed capture instead:
`node .design-sync/delayed-capture.mjs ./ds-bundle <shotDir> sections/Hero animation/FadeIn:SectionHeading ...`
(3.5s wait, 1280x900). In the product the cards are live, so they settle on their own.

## Known render warns

- None at the final validate (18/18 clean). The capture-sheet blanks above are expected and are not warns.

## Site bugs found by the sync (fixed in the same PR, 2026-10-29)

- TechStack Azure DevOps logo key, `backbase.svg` cropped to its artwork, neutral colours
  (`off-white`, `medium-gray`, `dark-gray`, ...) registered in tailwind.config.js, Inter 300 loaded
  for the wordmark's "ADVISORY". If a section looks unstyled in a card, suspect a class that
  tailwind.config.js doesn't define — the site build silently drops those too.
- `AdanacWordmark` uses `cardMode: column`: at the default 32px it's wider than a grid cell.

## Re-sync risks

- `dtsPropsFor` is a hand copy of component props; it silently drifts when props change.
- `next-image.tsx` replaces next/image entirely: new next/image props (e.g. `fill` layouts,
  `sizes`) render as a plain `<img>`; new image folders outside `public/logos|images` won't embed.
- Bundle size scales with `public/logos` + `public/images`; large new images bloat every design.
- `entry.ts` and `componentSrcMap` must list new components by hand — nothing auto-discovers them.
- Inter comes from fonts.googleapis.com at render time (network-dependent).
