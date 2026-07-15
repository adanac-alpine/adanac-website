## 2026-07-15 - Interactive Overlay & Modal Keyboard Trap Traversal
**Learning:** In responsive layouts, hidden mobile navigation links styled with off-screen translations or opacity adjustments remain interactive and tabbable in the accessibility tree. This creates a confusing screen reader and keyboard user experience where focus is pulled off-screen into hidden interactive elements.
**Action:** Always conditionally disable tab traversal on hidden overlays by setting `tabIndex={isOpen ? 0 : -1}` dynamically, or by utilizing conditional rendering.

## 2026-07-15 - Dual Sensory Reinforcement on Form Submission Statuses
**Learning:** Plain text alerts indicating asynchronous operation success/failure are easy to overlook, especially for cognitive or screen reader accessibility. Including explicit SVGs with color contrast (e.g., forest green checkmark, amber warning alert) alongside explicit ARIA attributes (`role="status"`, `aria-live="polite"`) guarantees immediate clarity across both visual and audio dimensions.
**Action:** Enhance all form status banners with an intuitive visual icon and screen reader live-announcements to achieve dual sensory validation.
