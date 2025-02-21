'use client'

import { useEffect } from 'react'

import { LineChart, Users } from 'lucide-react'

import { ExamStatPie } from '@/components/molecules/charts/ExamStatPie'
import { Separator } from '@/components/ui/separator'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

export default function ContentDashboard() {
  const { setBreadcrumbs } = useBreadcrumbs()
  useEffect(() => {
    setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }])
  }, [])
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-5">
          <div className="border-muted/1 flex flex-1 justify-between rounded-xl border-2 border-solid p-5">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Total Kelas</p>
              <span className="text-3xl font-semibold">62</span>
            </div>
            <div className="icon">
              <Users size={20} />
            </div>
          </div>
          <div className="border-muted/1 flex flex-1 justify-between rounded-xl border-2 border-solid p-5">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Total Mata Pelajaran</p>
              <span className="text-3xl font-semibold">6</span>
            </div>
            <div className="icon">
              <Users size={20} />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <ExamStatPie totals={{ finished: 127, actives: 7, soon: 9 }} />

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
                  <p className="text-2xl font-semibold text-primary">143</p>
                </div>
                <div className="flex flex-col gap-2 py-4">
                  <p className="font-semibold">Ujian Selesai</p>
                  <p className="text-2xl font-semibold text-success">127</p>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-5" />

              <div className="flex flex-1 flex-col gap-10 text-center">
                <div className="flex flex-col gap-2 py-4">
                  <p className="font-semibold">Ujian Aktif</p>
                  <p className="m- text-2xl font-semibold text-destructive">7</p>
                </div>
                <div className="flex flex-col gap-2 py-4">
                  <p className="font-semibold">Ujian Mendatang</p>
                  <p className="text-2xl font-semibold text-secondary">9</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
