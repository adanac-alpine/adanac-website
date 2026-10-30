const { withSentryConfig } = require('@sentry/nextjs/config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['@sentry/server-utils', '@apm-js-collab/tracing-hooks'],
}

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: 'team_PFN8aBk4T3KzjhaUoFIDJ5Az',
  project: 'javascript-nextjs',
  widenClientFileUpload: true,
  // Bundler-agnostic replacement for webpack.treeshake.removeDebugLogging (Turbopack is the default).
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
  },
})
