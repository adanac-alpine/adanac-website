const { withSentryConfig } = require('@sentry/nextjs/config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['@sentry/server-utils', '@apm-js-collab/tracing-hooks'],
}

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: 'adanac-alpine',
  project: 'adanac-website',
  widenClientFileUpload: true,
  // Bundler-agnostic replacement for webpack.treeshake.removeDebugLogging (Turbopack is the default).
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
  },
})
