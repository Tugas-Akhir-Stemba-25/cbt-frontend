interface Props {
  params: {
    hash: string
  }
}

const page = async (props: Props) => {
  const params = await props.params

  return <div>{params.hash}</div>
}

export default page
