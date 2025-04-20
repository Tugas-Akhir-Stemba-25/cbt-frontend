import { PropsWithChildren } from 'react'

import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import LayoutDashboard from '@/components/layouts/LayoutDashboard'

async function Layout({ children }: PropsWithChildren) {
  const session = await auth()
  if (!session) return redirect('/login')

  return (
    <>
      <LayoutDashboard>{children}</LayoutDashboard>
    </>
  )
}

export default Layout
