import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export default async function LayoutTeacher({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (session?.user.role !== 'teacher') return redirect('/dashboard')
  return <>{children}</>
}
