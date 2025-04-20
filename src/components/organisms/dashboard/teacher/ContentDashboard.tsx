'use client'

import { useEffect } from 'react'

import { School, BookOpen, LineChart } from 'lucide-react'

import { useDashboardStatistic } from '@/http/statistic/get-statistic-dashboard'

import CardStatistic from '@/components/atoms/card/CardStatistic'
import { ExamStatPie } from '@/components/molecules/charts/ExamStatPie'
import { Separator } from '@/components/ui/separator'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

export default function ContentDashboard() {
  const { setBreadcrumbs } = useBreadcrumbs()
  const { data, isLoading } = useDashboardStatistic()

  useEffect(() => {
    setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard/teacher' }])
  }, [])

  const testByStatus = data?.test_by_status || {}

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full flex-col gap-4 @xl:flex-row @2xl:gap-6">
        <CardStatistic
          title="Total Kelas"
          value={data?.total_classes ?? '-'}
          icon={School}
          variant="primary"
          isLoading={isLoading}
        />
        <CardStatistic
          title="Total Mata Pelajaran"
          value={data?.total_materials ?? '-'}
          icon={BookOpen}
          variant="secondary"
          isLoading={isLoading}
        />
      </div>

      <div className="flex w-full flex-col gap-4 @2xl:flex-row @2xl:gap-6">
        <ExamStatPie
          totals={{
            finished: testByStatus[3] ?? 0,
            actives: testByStatus[2] ?? 0,
            soon: testByStatus[1] ?? 0
          }}
        />

        <div className="border-muted/1 flex basis-2/3 flex-col gap-4 rounded-xl border-2 border-solid p-5">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Statistik Ujian</p>
            </div>
            <div className="icon">
              <LineChart size={20} />
            </div>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex flex-1 flex-col gap-10 text-center">
              <div className="flex flex-col gap-2 py-4">
                <p className="font-semibold">Total Ujian</p>
                <p className="text-2xl font-semibold text-primary">{data?.total_tests ?? '-'}</p>
              </div>
              <div className="flex flex-col gap-2 py-4">
                <p className="font-semibold">Ujian Selesai</p>
                <p className="text-2xl font-semibold text-success">{testByStatus[3] ?? 0}</p>
              </div>
            </div>

            <Separator orientation="vertical" className="mx-5" />

            <div className="flex flex-1 flex-col gap-10 text-center">
              <div className="flex flex-col gap-2 py-4">
                <p className="font-semibold">Ujian Aktif</p>
                <p className="text-2xl font-semibold text-destructive">{testByStatus[2] ?? 0}</p>
              </div>
              <div className="flex flex-col gap-2 py-4">
                <p className="font-semibold">Ujian Mendatang</p>
                <p className="text-2xl font-semibold text-secondary">{testByStatus[1] ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
