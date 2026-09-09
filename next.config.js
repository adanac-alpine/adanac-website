const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['@sentry/server-utils', '@apm-js-collab/tracing-hooks'],
  },
}

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: 'team_PFN8aBk4T3KzjhaUoFIDJ5Az',
  project: 'javascript-nextjs',
  widenClientFileUpload: true,
  hideSourceMaps: true,
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
    automaticVercelMonitors: true,
  },
})
