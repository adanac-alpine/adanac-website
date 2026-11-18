See [AGENTS.md](./AGENTS.md) — it is the authoritative guide for all work on this project.

---

## Workflow rules

1. **Resolve merge conflicts before creating a PR.** Always run
   `git fetch origin main && git rebase origin/main` before pushing.

2. **End every task with a summary** that ALWAYS includes:
   - **What shipped** — concise bullets of code changes and commits
   - **Your next steps** — only things the user truly must do themselves (e.g. approve something
     in a dashboard), in plain language. If there is nothing, say so.

5. **The user is not a developer.** Do the work yourself — run installs, pulls, tests, deploy
   checks and verification instead of handing over commands. Never ask the user to run terminal
   commands. Report results in plain language and avoid jargon (stashes, lockfiles, engines, etc.).

3. **AGENTS.md is locked.** Do not modify it without explicit permission. Add detail to `specs/`
   instead. Keep AGENTS.md lean (~50 lines) as an entry point only.

4. **Plan before implementing.** For any structural change, new dependency, or spec-level decision:
   present the approach and wait for approval before writing code.

---

## Git commands

Never prepend `cd <directory>` to a git command. Always use `git -C <directory>` instead.

```bash
# Wrong — triggers security prompt:
cd "/path/to/project" && git log

# Correct:
git -C "/path/to/project" log
```
