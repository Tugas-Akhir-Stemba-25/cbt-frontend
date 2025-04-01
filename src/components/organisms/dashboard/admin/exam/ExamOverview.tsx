import { Clock, Scroll, Users } from 'lucide-react'

import { useGetTestStatistic } from '@/http/test/get-test-statistic'

import { formatSeconds } from '@/utils/time'

interface ExamOverviewProps {
  id: number
}

const ExamOverview = ({ id }: ExamOverviewProps) => {
  const { data: testStatistic } = useGetTestStatistic({
    test_id: id
  })

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-[rgba(3,7,18,0.10)] px-5 py-3">
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

      <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-[rgba(3,7,18,0.10)] px-5 py-3">
        <h5 className="text-base font-semibold md:text-lg">Nilai Peserta</h5>
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex w-full flex-col gap-2 rounded-2xl border border-dashed px-5 py-3">
            <div className="flex w-full justify-between">
              <h5 className="text-base font-semibold">Nilai Tertinggi</h5>
              <Scroll className="h-5 w-5" />
            </div>
            <p className="text-3xl font-bold text-primary">{testStatistic?.data.grade.max}</p>
          </div>
          <div className="flex w-full flex-col gap-2 rounded-2xl border border-dashed px-5 py-3">
            <div className="flex w-full justify-between">
              <h5 className="text-base font-semibold">Nilai Rata-Rata</h5>
              <Scroll className="h-5 w-5" />
            </div>
            <p className="text-3xl font-bold text-green-600">{testStatistic?.data.grade.average}</p>
          </div>
          <div className="flex w-full flex-col gap-2 rounded-2xl border border-dashed px-5 py-3">
            <div className="flex w-full justify-between">
              <h5 className="text-base font-semibold">Nilai Terendah</h5>
              <Scroll className="h-5 w-5" />
            </div>
            <p className="text-3xl font-bold text-destructive">{testStatistic?.data.grade.min}</p>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-[rgba(3,7,18,0.10)] px-5 py-3">
        <h5 className="text-base font-semibold md:text-lg">Waktu Pengerjaan</h5>
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex w-full flex-col gap-2 rounded-2xl border border-dashed px-5 py-3">
            <div className="flex w-full justify-between">
              <h5 className="text-base font-semibold">Waktu Rata-Rata</h5>
              <Clock className="h-5 w-5" />
            </div>
            {testStatistic?.data.time.average && (
              <p className="text-3xl font-bold text-primary">{formatSeconds(testStatistic.data.time.average)}</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2 rounded-2xl border border-dashed px-5 py-3">
            <div className="flex w-full justify-between">
              <h5 className="text-base font-semibold">Waktu Tercepat</h5>
              <Clock className="h-5 w-5" />
            </div>
            {testStatistic?.data.time.min && (
              <p className="text-3xl font-bold text-green-600">{formatSeconds(testStatistic.data.time.min)} </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2 rounded-2xl border border-dashed px-5 py-3">
            <div className="flex w-full justify-between">
              <h5 className="text-base font-semibold">Waktu Terlama</h5>
              <Clock className="h-5 w-5" />
            </div>
            {testStatistic?.data.time.max && (
              <p className="text-3xl font-bold text-destructive">{formatSeconds(testStatistic.data.time.max)} </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamOverview
