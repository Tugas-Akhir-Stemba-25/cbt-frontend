import { PropsWithChildren } from 'react'

import { SessionProvider } from 'next-auth/react'

import { ThemeProvider } from './ThemeProvider'

const GlobalProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}

export default GlobalProvider
