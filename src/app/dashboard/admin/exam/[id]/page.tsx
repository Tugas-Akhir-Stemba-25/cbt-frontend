import ExamDetail from '@/components/organisms/dashboard/admin/exam/ExamDetail'

interface Props {
  params: {
    id: number
  }
}

const page = async (props: Props) => {
  const params = await props.params
  return <ExamDetail id={params.id} />
}

export default page
