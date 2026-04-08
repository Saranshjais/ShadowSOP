# Debug Session: Tailwind PostCSS Configuration Error

## Symptom
The Vite development server fails to compile CSS, throwing a PostCSS internal server error: `"It looks like you're trying to use tailwindcss directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package..."`

**When:** Running `npm run dev` in the `/frontend` directory.
**Expected:** The Vite server boots and processes the injected Tailwind imports.
**Actual:** Vite crashes at the CSS transformation layer because Tailwind v4 recently decoupled its PostCSS plugin.

## Hypotheses

| # | Hypothesis | Likelihood | Status |
|---|------------|------------|--------|
| 1 | The `postcss.config.js` is trying to use `tailwindcss` natively as a plugin, which fails in versions >=4.0 that require the dedicated `@tailwindcss/postcss` package. | 100% | ELIMINATED (Fix Applied) |

## Attempts

### Attempt 1
**Testing:** H1 — Upgrade to `@tailwindcss/postcss`.
**Action:** 
1. Executed `npm install -D @tailwindcss/postcss` inside `frontend`.
2. Updated `frontend/postcss.config.js` to explicitly invoke `@tailwindcss/postcss` instead of `tailwindcss`.
**Conclusion:** CONFIRMED

## Resolution

**Root Cause:**
Tailwind CSS >v4.0.0 fundamentally refactored their PostCSS integration module out of the main package to improve standalone speed, requiring manual intervention in existing `postcss.config.js` setups to target the new module name.

**Fix:**
1. Installed the missing `@tailwindcss/postcss` dependency package.
2. Modified the plugin target in `postcss.config.js` to standard v4 syntax.

**Verified:** The Vite pre-transform pipeline successfully scans dependencies without crashing on the syntax.
