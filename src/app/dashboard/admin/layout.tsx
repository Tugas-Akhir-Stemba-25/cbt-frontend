import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export default async function LayoutAdmin({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (session?.user.role !== 'admin') return redirect('/dashboard')
  return <>{children}</>
}
