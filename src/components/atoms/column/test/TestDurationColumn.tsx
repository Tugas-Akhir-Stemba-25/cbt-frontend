import { formatSeconds } from '@/utils/time'

import { TestResult } from '@/types/test/test'

const TestDurationColumn: React.FC<{ row: { original: TestResult } }> = ({ row }) => {
  const data = row.original

  return <p>{data.history && data.history.work_time ? formatSeconds(data.history.work_time) : '-'}</p>
}

export default TestDurationColumn
