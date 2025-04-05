import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import ExamWork from '@/components/organisms/works/ExamWork'

interface Props {
  params: {
    hash: string
  }
}

const page = async (props: Props) => {
  const params = await props.params

  const session = await auth()

  if (session?.user.role !== 'student' || !session) return redirect('/dashboard')

  return <ExamWork hash={params.hash} />
}

export default page
