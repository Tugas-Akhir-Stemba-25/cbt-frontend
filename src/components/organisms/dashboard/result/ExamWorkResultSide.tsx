import { useEffect } from 'react'

import { Scrollbar } from '@radix-ui/react-scroll-area'

import { useGetStudentTestDetailByHash } from '@/http/test/get-student-test-detail-by-hash'
import { useGetWorkAnswer } from '@/http/work/get-work-answer'
import { useGetWorkResult } from '@/http/work/get-work-result'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'
import { useWorkAnswerStore } from '@/stores/useWorkAnswerStore'
import useWorkHashStore from '@/stores/useWorkHashStore'

import QuestionNavigationButtonResult from '@/components/atoms/button/QuestionNavigationButtonResult'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const ExamWorkResultSide = () => {
  const { setActiveQuestion, activeQuestion } = useActiveQuestionStore()
  const { setWorkAnswers, workAnswers } = useWorkAnswerStore()

  const { hash } = useWorkHashStore()

  const {
    data: workDetail,
    isLoading: workDetailLoading,
    isFetched: workDetailFetched
  } = useGetStudentTestDetailByHash(
    {
      hash: hash as string
    },
    {
      enabled: !!hash,
      refetchOnWindowFocus: false
    }
  )

  const { data: workResult } = useGetWorkResult(
    {
      hash: hash as string
    },
    {
      enabled: !!hash
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
      if (!activeQuestion || !workAnswer.data.find((wa) => wa.test_question_id === activeQuestion.id))
        setActiveQuestion(workAnswer.data[0].test_question_id, 1)
    }
  }, [workAnswer, setActiveQuestion, activeQuestion])

  useEffect(() => {
    setWorkAnswers(workAnswer?.data ?? null)
  }, [workAnswer, setWorkAnswers])

  return (
    <div className="col-span-1 col-start-1 row-span-4 row-start-2 hidden flex-col gap-3 md:col-start-3 md:flex">
      <div className="rpw flex flex-col gap-2 rounded-xl bg-background md:items-center md:p-5">
        {workDetailLoading || (!workDetail?.data && !workDetailFetched) ? (
          <>
            <Skeleton className="h-8 w-full md:w-1/2" />
            <Skeleton className="h-5 w-3/4 md:w-1/3" />
          </>
        ) : (
          <>
            <h2 className="text-base font-semibold md:text-center md:text-xl">{workDetail?.data.name}</h2>
            <p className="text-sm md:text-center md:text-base">{workDetail?.data.material.name}</p>
          </>
        )}
      </div>
      <Separator className="h-0.5 w-full md:hidden" />
      <div className="col-span-1 row-start-3 flex h-full flex-1 flex-col gap-6 rounded-xl bg-background md:p-5">
        <h3 className="font-semibold">Nomor Soal</h3>
        <ScrollArea className="h-[350px] pr-4">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5">
            {workAnswerLoading || (!workAnswer?.data && !workAnswerFetched)
              ? Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="h-10 rounded-lg" />)
              : workAnswers?.map((item, index) => (
                  <QuestionNavigationButtonResult
                    key={item.id}
                    isShowAnswer={workResult?.data.is_show_answer}
                    answer={item}
                    idx={index + 1}
                  />
                ))}
          </div>
          <Scrollbar />
        </ScrollArea>
        <div className="space-y-3 text-sm">
          {workResult?.data.is_show_answer ? (
            <>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-lg border border-success bg-success-surface" />
                <p>Jawaban Benar</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-lg border border-destructive bg-destructive-surface" />
                <p>Jawaban Salah</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-lg border border-neutral-800/10 bg-accent dark:border-neutral-50/15" />
                <p>Tidak Dijawab</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-lg border border-primary-surface bg-primary" />
                <p>Dijawab</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-lg border border-neutral-800/10 bg-accent dark:border-neutral-50/15" />
                <p>Tidak Dijawab</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-lg border border-secondary-surface bg-secondary" />
                <p>Ragu-ragu</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExamWorkResultSide
