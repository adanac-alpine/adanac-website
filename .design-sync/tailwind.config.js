// Sync-only Tailwind config: the site's config plus a safelist so the design agent can use any
// brand-palette shade in new layouts (the site build purges shades it doesn't use).
const site = require('../tailwind.config.js')

module.exports = {
  ...site,
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './.design-sync/previews/**/*.tsx'],
  safelist: [
    {
      pattern: /^(bg|text|border|ring)-(navy|glacier|forest)(-(50|100|200|300|400|500|600|700|800|900))?$/,
      variants: ['hover'],
    },
  ],
}
