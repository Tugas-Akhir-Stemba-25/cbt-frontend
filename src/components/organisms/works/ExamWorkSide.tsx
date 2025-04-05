'use client'

import { useGetWorkDetail } from '@/http/work/get-work-detail'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface ExamWorkSideProps {
  hash: string
}

const ExamWorkSide = ({ hash }: ExamWorkSideProps) => {
  const { data, isLoading } = useGetWorkDetail(
    {
      hash
    },
    {
      enabled: !!hash
    }
  )
  return (
    <div className="flex h-full w-1/4 flex-col gap-3">
      <div className="flex flex-col items-center gap-2 rounded-xl bg-background p-5">
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-full md:w-1/2" />
            <Skeleton className="h-5 w-3/4 md:w-1/3" />
          </>
        ) : (
          <>
            <h2 className="text-center text-base font-semibold md:text-xl">{data?.data.title}</h2>
            <p className="text-center">{data?.data.material.name}</p>
          </>
        )}
      </div>
      <div className="flex h-full flex-col gap-6 rounded-xl bg-background p-5">
        <h3 className="font-semibold">Nomor Soal</h3>
        <div className="h-full">
          <p></p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-lg border border-primary-surface bg-primary" />
            <p>Sudah dikerjakan</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-lg border border-neutral-800/10 bg-accent dark:border-neutral-50/15" />
            <p>Belum Dikerjakan</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-lg border border-secondary-surface bg-secondary" />
            <p>Ragu-ragu</p>
          </div>
        </div>
        <Button variant={'destructive'}>Akhiri Ujian</Button>
      </div>
    </div>
  )
}

export default ExamWorkSide
