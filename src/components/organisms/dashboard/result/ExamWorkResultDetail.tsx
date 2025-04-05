import { useEffect, useState } from 'react'

import Image from 'next/image'

import { useGetWorkQuestion } from '@/http/work/get-work-question'
import { useGetWorkResult } from '@/http/work/get-work-result'

import { buildStorageUrl } from '@/utils/common'
import { cn } from '@/utils/shadcn'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'
import { useWorkAnswerStore } from '@/stores/useWorkAnswerStore'
import useWorkHashStore from '@/stores/useWorkHashStore'

import AnswerButtonResult from '@/components/atoms/button/AnswerButtonResult'
import { RadioGroup } from '@/components/ui/radio-group'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { WorkAnswer, WorkQuestion } from '@/types/work/work'

const ExamWorkResultDetail = () => {
  const [question, setQuestion] = useState<WorkQuestion | null>(null)
  const [answer, setAnswer] = useState<WorkAnswer | null>(null)

  const { activeQuestion } = useActiveQuestionStore()
  const { hash } = useWorkHashStore()

  const {
    data: workQuestion,
    isLoading: workQuestionLoading,
    isFetched: workQuestionFetched
  } = useGetWorkQuestion(
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
      enabled: !!hash,
      refetchOnWindowFocus: false
    }
  )

  const { workAnswers } = useWorkAnswerStore()

  useEffect(() => {
    if (activeQuestion && workQuestion?.data) {
      setAnswer(workAnswers?.find((wa) => wa.test_question_id === activeQuestion?.id) ?? null)
      setQuestion(workQuestion?.data.find((q) => q.id === activeQuestion.id) ?? null)
    }
  }, [activeQuestion, workQuestion, workAnswers])

  return (
    <>
      {workQuestionLoading || (!workQuestion?.data && !workQuestionFetched) ? (
        <ExamWorkResultDetailSkeleton />
      ) : (
        <div className="col-span-1 col-start-1 row-start-4 space-y-5 rounded-xl bg-background p-5 md:col-span-2 md:row-start-3">
          <h2 className="text-base font-semibold md:text-lg">Nomor Soal: {activeQuestion?.no}</h2>

          <ScrollArea className="h-[450px] pr-4">
            <div className="flex flex-col gap-6">
              {question?.image && (
                <div className="flex w-full justify-center">
                  <Image
                    className="w-full object-cover md:w-2/3 lg:w-1/2"
                    src={buildStorageUrl(question?.image ?? '') as string}
                    alt="question image"
                    width={300}
                    height={300}
                  />
                </div>
              )}
              <p
                dangerouslySetInnerHTML={{
                  __html: question?.question ?? ''
                }}
              />
              <RadioGroup disabled={true} value={answer?.test_answer_id ? answer?.test_answer_id.toString() : ''}>
                <div className={cn('grid grid-cols-[1fr_max-content] items-center gap-2')}>
                  <p className="text-sm font-semibold text-primary">Opsi Jawaban</p>
                  <p className="text-sm font-semibold text-primary">Jawabanmu</p>
                  {question?.answers.map((ans) => (
                    <AnswerButtonResult
                      isShowAnswer={workResult?.data.is_show_answer}
                      answer={answer}
                      key={ans.id}
                      data={ans}
                    />
                  ))}
                </div>
              </RadioGroup>
              {workResult?.data.is_show_answer && (
                <div className="flex w-full justify-between text-success">
                  <p>Kunci Jawaban</p>
                  <p>Opsi {(question?.answers?.findIndex((a) => answer?.correct?.id === a.id) ?? 0) + 1}</p>
                </div>
              )}
            </div>
            <ScrollBar />
          </ScrollArea>
        </div>
      )}
    </>
  )
}

export const ExamWorkResultDetailSkeleton = () => {
  return (
    <div className="col-span-1 col-start-1 row-start-4 space-y-5 rounded-xl bg-background p-5 md:col-span-2 md:row-start-3">
      <Skeleton className="h-8 w-36" />
      <Skeleton className="h-16 w-full" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex cursor-pointer items-center justify-start gap-3 rounded-xl border px-5 py-4 text-start text-foreground"
        >
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      ))}
    </div>
  )
}

export default ExamWorkResultDetail
