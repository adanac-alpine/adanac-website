import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    'coverage/**',
    'next-env.d.ts',
    '_Archive/**',
    '.playwright-mcp/**',
    '.design-sync/**',
    '.ds-sync/**',
    'ds-bundle/**',
  ]),
])
