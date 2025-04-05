'use client'

import { useEffect } from 'react'

import { useGetWorkAnswer } from '@/http/work/get-work-answer'
import { useGetWorkDetail } from '@/http/work/get-work-detail'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'
import useWorkHashStore from '@/stores/useWorkHashStore'

import QuestionNavigationButton from '@/components/atoms/button/QuestionNavigationButton'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

interface ExamWorkSideProps {}

const ExamWorkSide = ({}: ExamWorkSideProps) => {
  const { setActiveQuestion, activeQuestion } = useActiveQuestionStore()

  const { hash } = useWorkHashStore()

  const {
    data: workDetail,
    isLoading: workDetailLoading,
    isFetched: workDetailFetched
  } = useGetWorkDetail(
    {
      hash: hash as string
    },
    {
      enabled: !!hash,
      refetchOnWindowFocus: false
    }
  )

  const {
    data: workAnswer,
    isLoading: workAnswerLoading,
    isFetched: workAnswerFetched
  } = useGetWorkAnswer(
    {
      hash: hash as string
    },
    {
      enabled: !!hash,
      refetchOnWindowFocus: false
    }
  )

  useEffect(() => {
    if (workAnswer?.data && workAnswer.data.length > 0) {
      if (!activeQuestion) setActiveQuestion(workAnswer.data[0].test_question_id, 1)
    }
  }, [workAnswer, setActiveQuestion, activeQuestion])

  return (
    <div className="col-span-1 col-start-1 row-span-2 row-start-2 hidden flex-col gap-3 md:col-start-3 md:flex">
      <div className="flex flex-col gap-2 rounded-xl bg-background md:items-center md:p-5">
        {workDetailLoading || (!workDetail?.data && !workDetailFetched) ? (
          <>
            <Skeleton className="h-8 w-full md:w-1/2" />
            <Skeleton className="h-5 w-3/4 md:w-1/3" />
          </>
        ) : (
          <>
            <h2 className="text-base font-semibold md:text-center md:text-xl">{workDetail?.data.title}</h2>
            <p className="text-sm md:text-center md:text-base">{workDetail?.data.material.name}</p>
          </>
        )}
      </div>
      <Separator className="h-0.5 w-full md:hidden" />
      <div className="col-span-1 row-start-3 flex h-full flex-1 flex-col gap-6 rounded-xl bg-background md:p-5">
        <h3 className="font-semibold">Nomor Soal</h3>
        <ScrollArea className="h-[250px] pr-4">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5">
            {workAnswerLoading || (!workAnswer?.data && !workAnswerFetched)
              ? Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="h-10 rounded-lg" />)
              : workAnswer?.data.map((item, index) => (
                  <QuestionNavigationButton key={item.id} data={item} idx={index + 1} />
                ))}
          </div>
          <ScrollBar />
        </ScrollArea>
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
