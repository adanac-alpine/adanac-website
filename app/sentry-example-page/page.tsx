'use client'

import * as Sentry from '@sentry/nextjs'

export default function SentryExamplePage() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="bg-white rounded-2xl p-10 max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold text-navy">Sentry Test Page</h1>
        <p className="text-dark-gray">
          Click the button below to trigger a test error and verify Sentry is working.
        </p>
        <button
          onClick={() => {
            throw new Error('Sentry test error from adanacalpine.ca!')
          }}
          className="bg-glacier text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
        >
          Trigger Test Error
        </button>
        <p className="text-xs text-gray-400">
          Check your Sentry dashboard for the error.
        </p>
      </div>
    </div>
  )
}
