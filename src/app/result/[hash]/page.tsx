import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import ExamWorkResult from '@/components/organisms/dashboard/result/ExamWorkResult'

interface Props {
  params: Promise<{
    hash: string
  }>
}

const page = async (props: Props) => {
  const params = await props.params

  const session = await auth()

  if (session?.user.role !== 'student' || !session) return redirect('/dashboard')

  return <ExamWorkResult hash={params.hash} />
}

export default page
