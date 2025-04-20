import { Clock, Scroll, Users } from 'lucide-react'

import { useGetTestStatistic } from '@/http/test/get-test-statistic'

import { formatSeconds } from '@/utils/time'

import CardExamOverview from '@/components/atoms/card/CardExamOverview'

interface ExamOverviewProps {
  id: number
}

const ExamOverview = ({ id }: ExamOverviewProps) => {
  const { data: testStatistic, isLoading } = useGetTestStatistic({
    test_id: id
  })

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-neutral-800/10 px-5 py-3 dark:border-neutral-50/15">
        <h5 className="text-base font-semibold md:text-lg">Peserta</h5>
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex w-full flex-col gap-2 rounded-2xl border border-dashed px-5 py-3">
            <div className="flex w-full justify-between">
              <h5 className="text-base font-semibold">
                {testStatistic?.data.participants.name} {testStatistic?.data.participants.grad_year}
              </h5>
              <Users className="h-5 w-5" />
            </div>
            <p>{testStatistic?.data.participants.total} siswa</p>
          </div>
        </div>
      </div>

      <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-neutral-800/10 px-5 py-3 dark:border-neutral-50/15">
        <h5 className="text-base font-semibold md:text-lg">Nilai Peserta</h5>
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <CardExamOverview
            label="Nilai Tertinggi"
            value={testStatistic?.data.grade.max}
            icon={Scroll}
            isLoading={isLoading}
          />
          <CardExamOverview
            label="Nilai Rata-Rata"
            value={testStatistic?.data.grade.average}
            icon={Scroll}
            isLoading={isLoading}
            variant="success"
          />
          <CardExamOverview
            label="Nilai Terendah"
            value={testStatistic?.data.grade.min}
            icon={Scroll}
            isLoading={isLoading}
            variant="destructive"
          />
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-neutral-800/10 px-5 py-3 dark:border-neutral-50/15">
        <h5 className="text-base font-semibold md:text-lg">Waktu Pengerjaan</h5>
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <CardExamOverview
            label="Waktu Rata-Rata"
            value={testStatistic?.data.time.average && formatSeconds(testStatistic?.data.time.average)}
            icon={Clock}
            isLoading={isLoading}
            variant="primary"
          />
          <CardExamOverview
            label="Waktu Tercepat"
            value={testStatistic?.data.time.min && formatSeconds(testStatistic?.data.time.min)}
            icon={Clock}
            isLoading={isLoading}
            variant="success"
          />

          <CardExamOverview
            label="Waktu Tertinggi"
            value={testStatistic?.data.time.max && formatSeconds(testStatistic?.data.time.max)}
            icon={Clock}
            isLoading={isLoading}
            variant="destructive"
          />
        </div>
      </div>
    </div>
  )
}

export default ExamOverview
