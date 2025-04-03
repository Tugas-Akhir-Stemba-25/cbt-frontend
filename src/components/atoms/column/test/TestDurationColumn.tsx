import { formatSeconds } from '@/utils/time'

import { TestResult } from '@/types/test/test'

const TestDurationColumn: React.FC<{ row: { original: TestResult } }> = ({ row }) => {
  const data = row.original

  return <p>{formatSeconds(data.work_time)}</p>
}

export default TestDurationColumn
