const NumberColumn: React.FC<{ row: { index: number } }> = ({ row }) => {
  const data = row.index

  return <p>{data + 1}</p>
}

export default NumberColumn
