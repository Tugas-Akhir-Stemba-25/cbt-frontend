import { useDebounceValue } from 'usehooks-ts'

import { useGetTestResult } from '@/http/test/get-test-result'

import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/datatable'

import { testResultColumns } from '@/constants/columns/test-result-columns'

interface ExamResultProps {
  id: number
}

const ExamResult = ({ id }: ExamResultProps) => {
  // Table State
  const [search, setSearch] = useDebounceValue<string>('', 250)
  const [page, setPage] = useDebounceValue<number>(1, 250)
  const [perPage, setPerPage] = useDebounceValue<number>(10, 250)

  const { data: resultTest, isLoading: examsResultLoading } = useGetTestResult(
    {
      test_id: id,
      page,
      per_page: perPage,
      search
    },
    {
      enabled: !!id
    }
  )
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h5 className="text-base font-semibold md:text-lg">Hasil Ujian</h5>
        <Button size={'sm'}>Export</Button>
      </div>
      <div>
        <DataTable
          withActions={false}
          withSelect={false}
          columns={testResultColumns}
          data={resultTest?.data ?? []}
          placeholder="Cari Siswa"
          showDetail={true}
          setSearch={setSearch}
          pagination={resultTest?.meta.pagination}
          setPage={setPage}
          setPerPage={setPerPage}
          isLoading={examsResultLoading}
        />
      </div>
    </div>
  )
}

export default ExamResult
