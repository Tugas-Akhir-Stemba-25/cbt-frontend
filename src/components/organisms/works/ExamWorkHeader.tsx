'use client'

import { useEffect } from 'react'

import Image from 'next/image'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Clock } from 'lucide-react'

import { useGetWorkDetail } from '@/http/work/get-work-detail'

import { cn } from '@/utils/shadcn'
import { formatSeconds } from '@/utils/time'

import { useTimerStore } from '@/stores/useTimerStore'
import useWorkHashStore from '@/stores/useWorkHashStore'

import { Skeleton } from '@/components/ui/skeleton'

interface ExamWorkHeaderProps {
  setOpenFinishTestModal: (isTimeout: boolean) => void
}

const ExamWorkHeader = ({ setOpenFinishTestModal }: ExamWorkHeaderProps) => {
  const { remainingSeconds, setRemainingSeconds, decrement } = useTimerStore()

  const { hash } = useWorkHashStore()

  const { data, isLoading, isFetched } = useGetWorkDetail(
    {
      hash: hash as string
    },
    {
      enabled: !!hash
    }
  )

  useEffect(() => {
    if (data?.data.remaining_seconds !== null || data?.data.remaining_seconds !== undefined) {
      setRemainingSeconds(data?.data.remaining_seconds as number)
    }
  }, [data, setRemainingSeconds])

  useEffect(() => {
    if (remainingSeconds !== null && remainingSeconds > 0) {
      const interval = setInterval(() => {
        decrement()
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [decrement, remainingSeconds])

  useEffect(() => {
    if (remainingSeconds !== null && remainingSeconds <= 0 && !isLoading && isFetched) {
      setOpenFinishTestModal(true)
    }
  }, [remainingSeconds, isLoading, isFetched, setOpenFinishTestModal])

  return (
    <div className="col-span-1 flex w-full items-center justify-between rounded-xl bg-background p-5 md:col-span-3">
      <div className="flex items-center gap-2">
        <Image src="/assets/images/logo-icon.svg" width={48} height={48} alt="logo-icon-luminaqa" />
        <p className="hidden text-lg font-semibold text-primary md:block">LuminaQA</p>
      </div>
      <div className="hidden text-center font-semibold md:block">
        <p>
          {format(new Date(), 'EEEE, dd MMMM yyyy', {
            locale: id
          })}
        </p>
      </div>
      <div>
        {isLoading || (!data?.data && !isFetched) ? (
          <Skeleton className="h-6 w-24" />
        ) : (
          <p className="flex items-center font-semibold">
            <Clock className="mr-2 inline h-4 w-4 text-primary" />
            <span
              className={cn({
                'animate-blink text-red-600': remainingSeconds && remainingSeconds <= 60
              })}
            >
              {formatSeconds(remainingSeconds || 0, true)}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default ExamWorkHeader
