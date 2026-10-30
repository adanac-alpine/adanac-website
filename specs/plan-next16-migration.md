---
type: Plan
title: Next.js 16 Migration
description: Sequenced plan to move the site from Next.js 14.2 / React 18 to Next.js 16 / React 19, with verification and rollback.
Module: Platform
Business_Case_Stage: Maintenance
Dependencies: [context-project-overview, spec-website-design]
Test_Suite: [tests/components/]
Status: In progress (Oct 2026) — implemented on chore/next-16, verifying
tags: [nextjs, react, upgrade, dependencies, plan]
timestamp: "2026-10-30T00:00:00Z"
---

# Next.js 16 Migration Plan

Replaces Dependabot PR #13 (closed), which bumped `next` alone and failed CI.

## 1. Current state (verified Oct 30, 2026)

| Item | Now | Target |
|---|---|---|
| next | 14.2.5 | 16.x |
| react / react-dom | 18.3 | 19.x |
| @types/react / react-dom | 18.3 | 19.x |
| eslint / eslint-config-next | 8.57 / 14.2.5 (`.eslintrc.json`) | 9.x / 16.x (flat `eslint.config.mjs`) |
| Node (CI `deploy.yml`) | 20 (EOL Apr 2026) | 22 LTS |
| @sentry/nextjs | 10.75 | latest 10.x |

**Docs drift:** `AGENTS.md` and `context-project-overview.md` already state "Next.js 15 / React 19";
the code is on 14.2 / 18.3. Fixed as part of this migration: versions move to the overview only.

### Impact survey

| Breaking change (15 → 16) | Affects this repo? |
|---|---|
| Async request APIs (`cookies`, `headers`, `params`, `searchParams`) | **No** — none used |
| `middleware` → `proxy` rename | **No** — no middleware |
| `next lint` removed | **Yes** — `npm run lint` and CI call it |
| `experimental.serverComponentsExternalPackages` → `serverExternalPackages` | **Yes** — `next.config.js` |
| Turbopack is the default for `next build` | **Yes** — Sentry `webpack.*` options are webpack-only |
| Sentry client config → `instrumentation-client.ts` | **Yes** — `sentry.client.config.ts` isn't loaded under Turbopack |
| `next/image` default changes (qualities, cache TTL, local patterns) | Unlikely — static local paths, default quality; verify visually |
| React 19 removals (`defaultProps` on functions, `propTypes`, legacy refs) | **No** — none used; `forwardRef` in `tests/setup.ts` still works |
| Third-party React 19 support | framer-motion 12, lucide-react 1.x, Testing Library 16: yes. `@vercel/analytics`: bump to latest 1.x |

## 2. Approach

One branch `chore/next-16`, three commits so any step can be bisected or reverted:

1. **React 19 + Next 15** — run `npx @next/codemod@latest upgrade 15`, then:
   - `react`, `react-dom`, `@types/react`, `@types/react-dom` → 19; `@vercel/analytics` → latest 1.x.
   - `next.config.js`: `experimental.serverComponentsExternalPackages` → top-level `serverExternalPackages`.
   - Gate: `npm test`, `npm run build`, `npm run lint` (still works on 15).
2. **Lint migration** — `npx @next/codemod@latest next-lint-to-eslint-cli .`:
   - ESLint 9 + `eslint-config-next` 16 flat config (`eslint.config.mjs`); delete `.eslintrc.json`.
   - `package.json` `"lint": "eslint ."`; ignore `.design-sync/`, `.ds-sync/`, `ds-bundle/`, `coverage/`.
   - CI keeps calling `npm run lint` — no workflow change for this step.
3. **Next 16** — `npx @next/codemod@latest upgrade latest`, then:
   - Build with Turbopack (the default). Move `sentry.client.config.ts` → `instrumentation-client.ts`
     (add `export const onRouterTransitionStart = Sentry.captureRouterTransitionStart`).
   - Drop or replace the webpack-only Sentry options (`webpack.treeshake`, `automaticVercelMonitors`)
     per Sentry's Turbopack docs at implementation time. Fallback if Sentry misbehaves:
     `next build --webpack` and keep the options as they are.
   - CI `node-version: "22"`; set Vercel project Node.js version to 22.x.
   - Update `context-project-overview.md` to the real versions; make `AGENTS.md` version-free (§5).

## 3. Verification (before merging)

- [x] `npm run test -- --run` — all tests pass (currently 75); no new React 19 `act` warnings
- [x] `npm run build` and `npm run lint` pass locally (CI: on the PR)
- [ ] Vercel preview: home, `/privacy`, `/terms`, a 404, all sections render; Inter (incl. 300),
      logos, headshot, Hero and Track Record animations, Tools marquee
- [ ] Contact form submits (Formspree) from the preview
- [ ] Sentry: `/sentry-example-page` error shows in Sentry from the preview (client and server)
- [ ] Vercel Analytics records a page view on the preview
- [x] Before/after screenshots of each section match (no visual changes intended)
- [x] Design sync re-run (`.design-sync/NOTES.md`): bundle now vendors React 19; check all 18 cards

## 4. Rollback

Merge as one PR. Bad production deploy → Vercel instant rollback to the previous deployment,
then `git revert` the merge commit. No data or schema changes are involved.

## 5. Decisions (Oct 30, 2026)

1. **Build tool:** Turbopack (the Next 16 default); `next build --webpack` only as the fallback if
   Sentry's integration falls short.
2. **Node:** 22 LTS for CI and Vercel.
3. **Versions live only in `context-project-overview.md`.** `AGENTS.md` stays version-free
   ("Next.js (App Router)") and points there, so upgrades never require editing it.

## 6. Effort

About half a day, most of it verification. Risk is concentrated in Sentry under Turbopack and the
ESLint 9 switch; the app code itself needs no changes.
