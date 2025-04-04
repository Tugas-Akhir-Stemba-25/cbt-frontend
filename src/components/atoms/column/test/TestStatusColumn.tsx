import React from 'react'

import { Badge } from '@/components/ui/badge'

import { TestItem } from '@/types/test/test'
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

const TestStatusColumn: React.FC<{ row: { original: Test | TestItem }; className?: string }> = ({ row, className }) => {
  const data = statusMap[row.original.status]

  return (
    <Badge variant={data.variant} className={className}>
      {data.text}
    </Badge>
  )
}

export default TestStatusColumn
