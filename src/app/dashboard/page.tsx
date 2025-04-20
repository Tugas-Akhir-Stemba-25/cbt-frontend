import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

async function Page() {
  const session = await auth()
  if (session?.user.role === 'admin') return redirect('/dashboard/admin')
  if (session?.user.role === 'teacher') return redirect('/dashboard/teacher')
  if (session?.user.role === 'student') return redirect('/dashboard/student')
}

export default Page
