import * as Sentry from '@sentry/nextjs'

// Only NEXT_PUBLIC_* variables reach the browser bundle.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || 'development',
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0.5,
  enabled: process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
