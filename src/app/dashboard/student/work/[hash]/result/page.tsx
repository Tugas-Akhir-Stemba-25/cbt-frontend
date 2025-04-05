import ExamQuestion from '@/components/organisms/dashboard/student/exam/ExamQuestion'

interface Props {
  params: {
    hash: string
  }
}

const page = async (props: Props) => {
  const params = await props.params
  return <ExamQuestion hash={params.hash} />
}

export default page
