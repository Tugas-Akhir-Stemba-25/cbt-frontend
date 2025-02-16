import { PropsWithChildren } from 'react'

import { SessionProvider } from 'next-auth/react'

import { BreadcrumbProvider } from './BreadCrumbProvider'
import { ThemeProvider } from './ThemeProvider'

const GlobalProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <SessionProvider>
        <BreadcrumbProvider>{children}</BreadcrumbProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default GlobalProvider
