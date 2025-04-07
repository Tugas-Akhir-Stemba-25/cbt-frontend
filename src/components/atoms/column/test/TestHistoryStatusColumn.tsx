import { Badge } from '@/components/ui/badge'

import { TestResult } from '@/types/test/test'

type StatusVariant = 'destructive' | 'primary' | 'success'

type StatusType = {
  text: string
  variant: StatusVariant
}

const statusMap = (data: TestResult): StatusType => {
  if (data.history) {
    if (data.history.status === 1) {
      return {
        text: 'Belum Mengerjakan',
        variant: 'destructive'
      }
    } else if (data.history.status === 2) {
      return {
        text: 'Berlangsung',
        variant: 'primary'
      }
    } else if (data.history.status === 3) {
      return {
        text: 'Selesai',
        variant: 'success'
      }
    }
  }

  return {
    text: 'Belum Mengerjakan',
    variant: 'destructive'
  }
}

const TestHistoryStatusColumn: React.FC<{ row: { original: TestResult } }> = ({ row }) => {
  const data = statusMap(row.original)

  return <Badge variant={data.variant}>{data.text}</Badge>
}

export default TestHistoryStatusColumn
