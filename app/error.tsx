'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }) {
  // Log the error or send to Sentry if needed
  useEffect(() => {
    console.error(error)
    // Optionally call Sentry.captureException(error)
  }, [error])

  return (
    <section className="flex min-h-screen items-center justify-center bg-white p-8">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-6">{error.message || 'An unexpected error occurred.'}</p>
        <button
          onClick={() => reset()}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Try again
        </button>
      </div>
    </section>
  )
}
