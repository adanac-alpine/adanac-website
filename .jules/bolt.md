# Bolt's Journal

## 2026-07-14 - Journal Initialization
**Learning:** Initializing Bolt's performance optimization journal for the Adanac Advisory website repo.
**Action:** Keep track of codebase-specific performance patterns and anti-patterns.

## 2026-07-14 - High-Frequency Scroll Listener Optimization
**Learning:** High-frequency event listeners (like window scroll) that invoke state setters unconditionally cause React to perform virtual DOM reconciliation checks even when the values are identical.
Instead of adding state variables to the `useEffect` dependencies (which causes event listener recreation), using functional state updates like `setIsScrolled((prev) => prev !== scrolled ? scrolled : prev)` allows React to bail out of rendering entirely at the state setter level.
**Action:** Always use functional updates with equality checks in high-frequency state updates to prevent unnecessary virtual DOM diffing.

## 2026-07-14 - SVG Asset and Vector Optimization
**Learning:** Next.js `<Image />` is superb for raster files (.jpg, .png) because it handles resizing, compression, and modern format generation (WebP/AVIF). However, for static SVGs below the fold, importing `<Image />` is overkill. Instead, standard `<img>` elements with `loading="lazy"` and `decoding="async"` allow the browser to asynchronously load and parse vector graphics without blocking the main rendering thread or TTI.
**Action:** Use Next.js `<Image />` for all rasters, but keep static SVGs as standard `<img>` with explicit async loading/decoding attributes to achieve maximum Lighthouse scores.
