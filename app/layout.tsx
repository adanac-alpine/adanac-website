import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Adanac Advisory — Digital Enablement for Financial Services',
  description: 'IT consulting and digital transformation for financial services. Backbase and Salesforce implementation experts for banks and credit unions.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Adanac Advisory — Digital Enablement for Financial Services',
    description: 'IT consulting and digital transformation for financial services. Backbase and Salesforce implementation experts for banks and credit unions.',
    url: 'https://adanacadvisory.ca',
    siteName: 'Adanac Advisory',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: 'https://adanacadvisory.ca/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Adanac Advisory — Digital Enablement for Financial Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adanac Advisory — Digital Enablement for Financial Services',
    description: 'IT consulting and digital transformation for financial services. Backbase and Salesforce implementation experts for banks and credit unions.',
    images: ['https://adanacadvisory.ca/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://adanacadvisory.ca',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-glacier text-white font-semibold px-4 py-2 rounded-lg shadow-lg z-[100] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-glacier focus:ring-offset-navy"
        >
          Skip to main content
        </a>
        {children}
      </body>
      <Analytics />
    </html>
  )
}
