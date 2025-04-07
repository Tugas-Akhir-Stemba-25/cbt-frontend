import ExamDetail from '@/components/organisms/dashboard/teacher/exam/ExamDetail'

interface Props {
  params: Promise<{
    id: number
  }>
}

const page = async (props: Props) => {
  const params = await props.params
  return <ExamDetail id={params.id} />
}

export default page
