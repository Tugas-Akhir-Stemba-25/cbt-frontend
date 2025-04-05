import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'

import { defineMetadata } from '@/lib/metadata'

import { Toaster } from '@/components/ui/sonner'

import GlobalProvider from '@/providers/GlobalProvider'

import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin']
})

export const metadata: Metadata = defineMetadata({
  title: 'LuminaQA - CBT System',
  description: 'LuminaQA adalah sistem Computer Based Test (CBT) yang memudahkan pengelolaan ujian berbasis komputer.'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/assets/images/logo-icon.svg" type="image/svg" />
      </head>
      <body className={`${plusJakartaSans.className} bg-background text-foreground antialiased`}>
        <GlobalProvider>
          <main>{children}</main>
          <Toaster richColors />
        </GlobalProvider>
      </body>
    </html>
  )
}
