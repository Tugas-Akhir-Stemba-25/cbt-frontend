import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import Login from '@/components/organisms/auth/Login'

export default async function Page() {
  const session = await auth()

  if (session) return redirect('/dashboard')

  return <Login />
}
