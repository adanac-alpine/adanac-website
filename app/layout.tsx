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
  description: 'IT consulting and digital transformation for financial services. Backbase, Salesforce, and VeriPark implementation experts.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Adanac Advisory — Digital Enablement for Financial Services',
    description: 'IT consulting and digital transformation for financial services. Backbase, Salesforce, and VeriPark implementation experts.',
    url: 'https://adanacadvisory.ca',
    siteName: 'Adanac Advisory',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Analytics />
    </html>
  )
}
