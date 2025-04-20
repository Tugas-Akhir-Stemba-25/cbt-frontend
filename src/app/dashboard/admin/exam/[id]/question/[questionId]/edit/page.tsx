import QuestionEdit from '@/components/organisms/dashboard/admin/exam/question/QuestionEdit'

interface Props {
  params: Promise<{
    id: number
    questionId: number
  }>
}

const page = async (props: Props) => {
  const params = await props.params
  return <QuestionEdit id={params.id} questionId={params.questionId} />
}

export default page
