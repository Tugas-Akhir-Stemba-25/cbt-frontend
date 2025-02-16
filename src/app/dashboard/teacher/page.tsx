import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import ContentDashboard from '@/components/organisms/dashboard/student/ContentDashboard'

export default async function Test() {
  const session = await auth()
  if (session?.user.role !== 'teacher') return redirect('/dashboard')
  return <ContentDashboard />
}
