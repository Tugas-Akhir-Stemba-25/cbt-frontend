import QuestionCreate from '@/components/organisms/dashboard/admin/exam/question/QuestionCreate'

interface Props {
  params: Promise<{
    id: number
  }>
}

const page = async (props: Props) => {
  const params = await props.params
  return <QuestionCreate testId={params.id} />
}

export default page
