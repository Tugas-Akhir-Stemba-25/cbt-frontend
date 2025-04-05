import { useEffect, useState } from 'react'

import { useGetWorkQuestion } from '@/http/work/get-work-question'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'
import { useWorkAnswerStore } from '@/stores/useWorkAnswerStore'
import useWorkHashStore from '@/stores/useWorkHashStore'

import AnswerButton from '@/components/atoms/button/AnswerButton'
import { RadioGroup } from '@/components/ui/radio-group'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { WorkAnswer, WorkQuestion } from '@/types/work/work'

interface ExamWorkQuestionProps {}

const ExamWorkQuestion = ({}: ExamWorkQuestionProps) => {
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
        <ExamWorkQuestionSkeleton />
      ) : (
        <div className="col-span-1 col-start-1 row-start-3 space-y-5 rounded-xl bg-background p-5 md:col-span-2 md:row-start-2">
          <h2 className="text-base font-semibold md:text-lg">Nomor Soal: {activeQuestion?.no}</h2>

          <ScrollArea className="h-[450px]">
            <div className="flex flex-col gap-6">
              <p
                dangerouslySetInnerHTML={{
                  __html: question?.question ?? ''
                }}
              />
              <div className="flex flex-col">
                <RadioGroup value={answer?.test_answer_id.toString()}>
                  {question?.answers.map((ans) => <AnswerButton answer={answer} key={ans.id} data={ans} />)}
                </RadioGroup>
              </div>
            </div>
            <ScrollBar />
          </ScrollArea>
        </div>
      )}
    </>
  )
}

export const ExamWorkQuestionSkeleton = () => {
  return (
    <div className="col-span-1 col-start-1 row-start-3 space-y-5 rounded-xl bg-background p-5 md:col-span-2 md:row-start-2">
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

export default ExamWorkQuestion
