'use client'

import { useEffect, useState } from 'react'

import { AlarmClock, CheckCircle, Files, Medal } from 'lucide-react'

import { useGetStudentStatistic } from '@/http/test/get-student-statistic'

import CardStudentTestStatistic from '@/components/atoms/card/CardStudentTestStatistic'
import { SearchInput } from '@/components/atoms/input/SearchInput'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

import ExamList from './ExamList'
import ExamMaterialSelect from './ExamMaterialSelect'

const ExamContent = () => {
  const { setBreadcrumbs } = useBreadcrumbs()

  const [filter, setFilter] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Ujian',
        href: '/dashboard/student/exam'
      }
    ])
  }, [setBreadcrumbs])

  const { data: studentStatistic, isLoading: studentStatisticLoading } = useGetStudentStatistic({
    refetchOnWindowFocus: false
  })

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Ujianmu</h1>
      </div>
      <div className="grid grid-cols-1 gap-5 @xl:grid-cols-2 @4xl:grid-cols-4">
        <CardStudentTestStatistic
          label="Total Ujian"
          icon={Files}
          value={studentStatistic?.data.total_tests}
          isLoading={studentStatisticLoading}
        />
        <CardStudentTestStatistic
          label="Ujian Aktif"
          icon={AlarmClock}
          variant="secondary"
          value={studentStatistic?.data.count_by_status.ongoing}
          isLoading={studentStatisticLoading}
        />
        <CardStudentTestStatistic
          label="Ujian Selesai"
          icon={CheckCircle}
          variant="success"
          value={studentStatistic?.data.count_by_status.finished}
          isLoading={studentStatisticLoading}
        />
        <CardStudentTestStatistic
          label="Rata-Rata Nilai"
          icon={Medal}
          variant="destructive"
          value={Number(studentStatistic?.data.average_grade).toFixed(2)}
          isLoading={studentStatisticLoading}
        />
      </div>
      <div className="h-[600px] w-full space-y-5 rounded-xl border bg-primary-surface p-4 @3xl:h-[500px]">
        <div className="w-full">
          <SearchInput
            placeholder="Cari"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full @3xl:w-1/2"
          />
        </div>
        <ExamMaterialSelect setFilter={setFilter} />
        <ExamList search={search} filter={filter} />
      </div>
    </div>
  )
}

export default ExamContent
