import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'

import { defineMetadata } from '@/lib/metadata'

import { ThemeProvider } from '@/providers/ThemeProvider'

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
