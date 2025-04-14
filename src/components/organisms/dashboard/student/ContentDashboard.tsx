'use client'

import { useEffect } from 'react'

import { AlarmClock, CheckCircle, Files, Medal } from 'lucide-react'

import { useGetStudentStatistic } from '@/http/test/get-student-statistic'

import CardStudentTestStatistic from '@/components/atoms/card/CardStudentTestStatistic'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

export default function ContentDashboard() {
  const { setBreadcrumbs } = useBreadcrumbs()

  const { data: studentStatistic, isLoading: studentStatisticLoading } = useGetStudentStatistic({
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }])
  }, [setBreadcrumbs])
  return (
    <div>
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
    </div>
  )
}
