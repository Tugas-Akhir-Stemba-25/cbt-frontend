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

import { Skeleton } from '@/components/ui/skeleton'

interface ExamWorkHeaderProps {
  hash: string
}

const ExamWorkHeader = ({ hash }: ExamWorkHeaderProps) => {
  const { remainingSeconds, setRemainingSeconds, decrement } = useTimerStore()

  const { data, isLoading } = useGetWorkDetail(
    {
      hash
    },
    {
      enabled: !!hash
    }
  )

  useEffect(() => {
    if (data?.data.remaining_seconds) {
      setRemainingSeconds(data.data.remaining_seconds)
    }
  }, [data, setRemainingSeconds])

  useEffect(() => {
    const interval = setInterval(() => {
      decrement()
    }, 1000)

    return () => clearInterval(interval)
  }, [decrement])

  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-background p-5">
      <div className="flex items-center gap-2">
        <Image src="/assets/images/logo-icon.svg" width={48} height={48} alt="logo-icon-luminaqa" />
        <p className="hidden text-lg font-semibold text-primary md:block">LuminaQA</p>
      </div>
      <div className="text-center font-semibold">
        <p>
          {format(new Date(), 'EEEE, dd MMMM yyyy', {
            locale: id
          })}
        </p>
      </div>
      <div>
        {isLoading ? (
          <Skeleton className="h-6 w-24" />
        ) : (
          <p className="flex items-center font-semibold">
            <Clock className="mr-2 inline h-4 w-4 text-primary" />
            <span
              className={cn({
                'animate-blink text-red-600': remainingSeconds <= 60
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
