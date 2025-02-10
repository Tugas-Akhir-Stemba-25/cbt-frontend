import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'

import { defineMetadata } from '@/lib/metadata'

import { Toaster } from '@/components/ui/sonner'

import GlobalProvider from '@/providers/GlobalProvider'

import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans()

export const metadata: Metadata = defineMetadata()

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.className} bg-background text-foreground antialiased`}>
        <GlobalProvider>
          <main>{children}</main>
          <Toaster />
        </GlobalProvider>
      </body>
    </html>
  )
}
