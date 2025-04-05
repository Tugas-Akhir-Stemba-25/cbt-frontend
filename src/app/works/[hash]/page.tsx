import ExamWork from '@/components/organisms/works/ExamWork'

interface Props {
  params: {
    hash: string
  }
}

const page = async (props: Props) => {
  const params = await props.params

  return <ExamWork hash={params.hash} />
}

export default page
