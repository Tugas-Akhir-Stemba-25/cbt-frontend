import { PropsWithChildren } from 'react'

import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

async function Layout({ children }: PropsWithChildren) {
  const session = await auth()
  if (!session) return redirect('/login')

  return <>{children}</>
}

export default Layout
