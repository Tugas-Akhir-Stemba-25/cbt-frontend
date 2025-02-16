import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import ContentDashboard from '@/components/organisms/dashboard/admin/ContentDashboard'

export default async function Test() {
  const session = await auth()
  if (session?.user.role !== 'admin') return redirect('/dashboard')

  return <ContentDashboard />
}
