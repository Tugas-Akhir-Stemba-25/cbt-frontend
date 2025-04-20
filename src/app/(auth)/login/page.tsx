import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { defineMetadata } from '@/lib/metadata'

import Login from '@/components/organisms/auth/Login'

export const metadata: Metadata = defineMetadata({
  title: 'Login - LuminaQA'
})

export default async function Page() {
  const session = await auth()

  if (session) return redirect('/dashboard')

  return <Login />
}
