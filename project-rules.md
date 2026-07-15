# Project Rules — Adanac Advisory Website

> Project-specific overrides and commands. Source of truth for test/build/deploy.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run test -- --run` | Run test suite (Vitest, single run) |
| `npm run test:watch` | Tests in watch mode |
| `vercel --prod --yes` | Deploy to production |

---

## Pre-Commit Checklist

1. `npm run test -- —run` — all tests pass
2. `npm run build` — build succeeds
3. `npm run lint` — no lint errors

---

## Deploy

Vercel-GitHub integration is broken. Always deploy via CLI:

```bash
npm run build && vercel --prod --yes
```

---

## Test Framework

- **Runner:** Vitest
- **Library:** React Testing Library
- **Location:** `tests/components/`
- **Naming:** `tests/components/[Component].test.tsx`
- **Count:** 66 tests across 11 files

---

## Key Constraints

- **No auto-deploy** — GitHub integration broken, use CLI only
- **Anonymize clients** — never mention YNCU, Sunrise, or other client names
- **Protected files** — AGENTS.md, project-rules.md require approval to modify
- **No new dependencies** — without explicit approval
