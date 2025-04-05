import ExamResult from '@/components/organisms/dashboard/student/exam/ExamResult'

interface Props {
  params: {
    hash: string
  }
}

const page = async (props: Props) => {
  const params = await props.params

  return <ExamResult hash={params.hash} />
}

export default page
