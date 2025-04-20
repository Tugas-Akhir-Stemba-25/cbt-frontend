import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export default async function LayoutStudent({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (session?.user.role !== 'student') return redirect('/dashboard')
  return <>{children}</>
}
