'use client'

import { PropsWithChildren } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

import { queryClient } from '@/lib/reactQuery'

import { BreadcrumbProvider } from './BreadCrumbProvider'
import { ThemeProvider } from './ThemeProvider'

const GlobalProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        <SessionProvider>
          <BreadcrumbProvider>{children}</BreadcrumbProvider>
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default GlobalProvider
