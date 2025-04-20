import React from 'react'

import { Test } from '@/types/test/test-list'

const TestDateColumn: React.FC<{ row: { original: Test } }> = ({ row }) => {
  const data = row.original
  const date = new Date(data.start_time)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const formattedDate = date.toLocaleDateString('id-ID', options)
  return <p>{formattedDate}</p>
}

export default TestDateColumn
