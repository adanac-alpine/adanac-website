## 2026-07-15 - Interactive Overlay & Modal Keyboard Trap Traversal
**Learning:** In responsive layouts, hidden mobile navigation links styled with off-screen translations or opacity adjustments remain interactive and tabbable in the accessibility tree. This creates a confusing screen reader and keyboard user experience where focus is pulled off-screen into hidden interactive elements.
**Action:** Always conditionally disable tab traversal on hidden overlays by setting `tabIndex={isOpen ? 0 : -1}` dynamically, or by utilizing conditional rendering.

## 2026-07-15 - Dual Sensory Reinforcement on Form Submission Statuses
**Learning:** Plain text alerts indicating asynchronous operation success/failure are easy to overlook, especially for cognitive or screen reader accessibility. Including explicit SVGs with color contrast (e.g., forest green checkmark, amber warning alert) alongside explicit ARIA attributes (`role="status"`, `aria-live="polite"`) guarantees immediate clarity across both visual and audio dimensions.
**Action:** Enhance all form status banners with an intuitive visual icon and screen reader live-announcements to achieve dual sensory validation.

## 2026-07-16 - WAI-ARIA Role Transitions & Automated Selector Mapping
**Learning:** Upgrading interface filtering controls or tabs to meet proper WAI-ARIA semantic standards (e.g., mapping lists to `role="tablist"` and controls to `role="tab"`) significantly clarifies accessibility contexts. However, test suites like Testing Library often query by role directly. Changing the semantic roles of these components without adjusting the test selectors will break continuous integration tests.
**Action:** Always couple ARIA role enhancements with a comprehensive update of corresponding unit/component test assertions to look for the correct updated roles.
