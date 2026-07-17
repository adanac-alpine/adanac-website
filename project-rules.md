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

Push to GitHub — Vercel auto-deploys. Use CLI only for urgent hotfixes:

```bash
npm run build && vercel --prod --yes
```

---

## Test Framework

- **Runner:** Vitest
- **Library:** React Testing Library
- **Location:** `tests/components/`
- **Naming:** `tests/components/[Component].test.tsx`
- **Count:** all tests must pass — run `npm run test -- --run` to verify

---

## Key Constraints

- **Anonymize clients** — never mention YNCU, Sunrise, or other client names
- **Protected files** — AGENTS.md, project-rules.md require approval to modify
- **No new dependencies** — without explicit approval
