'use client'

import { PropsWithChildren } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

import { BreadcrumbProvider } from './BreadCrumbProvider'
import { ThemeProvider } from './ThemeProvider'

const queryClient = new QueryClient()

const GlobalProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <BreadcrumbProvider>{children}</BreadcrumbProvider>
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default GlobalProvider
