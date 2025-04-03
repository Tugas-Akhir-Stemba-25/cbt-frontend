import ExamEdit from '@/components/organisms/dashboard/admin/exam/ExamEdit'

interface Props {
  params: {
    id: number
  }
}

const page = async (props: Props) => {
  const params = await props.params
  return <ExamEdit id={params.id as number} />
}

export default page
