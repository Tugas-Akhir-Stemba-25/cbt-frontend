import React from 'react'

import { Badge } from '@/components/ui/badge'

import { Test } from '@/types/test/test-list'

const statusMap: Record<
  number,
  {
    text: string
    variant: 'primary' | 'success' | 'destructive'
  }
> = {
  1: {
    text: 'Belum Dimulai',
    variant: 'destructive'
  },
  2: {
    text: 'Berlangsung',
    variant: 'primary'
  },
  3: {
    text: 'Selesai',
    variant: 'success'
  }
}

const TestStatusColumn: React.FC<{ row: { original: Test } }> = ({ row }) => {
  const data = statusMap[row.original.status]

  return <Badge variant={data.variant}>{data.text}</Badge>
}

export default TestStatusColumn
