import React from 'react'

import { Badge } from '@/components/ui/badge'

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

interface TestStatusBadgeProps {
  status: number
  className?: string
}

const TestStatusBadge = ({ status, className }: TestStatusBadgeProps) => {
  const data = statusMap[status]

  return (
    <Badge variant={data.variant} className={className}>
      {data.text}
    </Badge>
  )
}

export default TestStatusBadge
