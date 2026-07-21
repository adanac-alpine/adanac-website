# Adanac Alpine Advisory Website — Agent Guide

**Read this before touching any code.** Project-specific entry point for AI-assisted work.
Global workspace rules live in `Projects/AGENTS.md` — this file adds project context on top of those.

---

## Project snapshot

Single-page landing page for Adanac Alpine Advisory Inc. — fintech digital transformation consulting. Next.js 15 + Tailwind CSS, deployed to Vercel.

- **Frontend:** https://website-nu-one-11.vercel.app (Next.js 15 → Vercel)
- **Repo:** github.com/Segey-P/adanac-website
- **Domain:** adanacalpine.ca (pending registration)

---

## Key references

| File | Read When |
|------|-----------|
| `specs/index.md` | Starting any task — find the right spec fast |
| `specs/context-project-overview.md` | Starting any task — tech stack, architecture, constraints |
| `specs/context-docs-standard.md` | Creating or updating any spec or doc |
| `specs/spec-website-design.md` | UI/UX changes, section modifications |
| `project-rules.md` | Test/build/deploy commands |

---

## Workflow rules

1. **Spec first.** Read `specs/index.md` and the relevant `spec-` file before writing code.
   `context-*` files are authoritative — follow them exactly, never infer alternatives.
2. **Test before commit.** Run `npm run test -- --run` and `npm run build` before every commit.
3. **Push to GitHub.** Vercel auto-deploys on push. Use `vercel --prod --yes` only for urgent hotfixes.
4. **End every task with a summary:**
   - **What shipped** — concise bullets of changes
   - **Next steps** — what the user must do (if anything)
5. **Anonymize client names.** Never mention YNCU, Sunrise, or other client names in copy.
6. **This file is locked.** Do not modify without explicit approval. Add detail to `specs/` instead.

---

## Hard rules

- **Push to GitHub** — Vercel auto-deploys. Use `vercel --prod --yes` only for urgent hotfixes.
- **No structural changes without approval** — component reordering, new sections, new dependencies
- **Tests must pass before commit** — `npm run test -- --run`
- **Build must pass before deploy** — `npm run build`
- **Protected files:** AGENTS.md, project-rules.md — no changes without approval

---

## Testing rules

- Run `npm run test -- --run` before every commit.
- Fix tests, never production code, to make tests pass.
- Naming: `tests/components/[Component].test.tsx`
- All tests must pass — check `project-rules.md` for current count.
