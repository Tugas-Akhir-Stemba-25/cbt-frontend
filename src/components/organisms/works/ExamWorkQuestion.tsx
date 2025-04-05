import { useEffect, useState } from 'react'

import { useGetWorkAnswer } from '@/http/work/get-work-answer'
import { useGetWorkQuestion } from '@/http/work/get-work-question'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'
import useWorkHashStore from '@/stores/useWorkHashStore'

import AnswerButton from '@/components/atoms/button/AnswerButton'
import { RadioGroup } from '@/components/ui/radio-group'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { WorkAnswer, WorkQuestion } from '@/types/work/work'

import ExamBottomNavigation from './ExamBottomNavigation'

interface ExamWorkQuestionProps {}

const ExamWorkQuestion = ({}: ExamWorkQuestionProps) => {
  const [question, setQuestion] = useState<WorkQuestion | null>(null)
  const [answer, setAnswer] = useState<WorkAnswer | null>(null)

  const { activeQuestion } = useActiveQuestionStore()
  const { hash } = useWorkHashStore()

  const { data: workQuestion } = useGetWorkQuestion(
    {
      hash: hash as string
    },
    {
      enabled: !!hash,
      refetchOnWindowFocus: false
    }
  )

  const { data: workAnswer } = useGetWorkAnswer(
    {
      hash: hash as string
    },
    {
      enabled: !!hash
    }
  )

  useEffect(() => {
    if (activeQuestion && workQuestion?.data) {
      setAnswer(workAnswer?.data.find((wa) => wa.test_question_id === activeQuestion?.id) ?? null)
      setQuestion(workQuestion?.data.find((q) => q.id === activeQuestion.id) ?? null)
    }
  }, [activeQuestion, workQuestion, workAnswer])

  return (
    <>
      <div className="col-span-2 col-start-1 row-start-2 space-y-5 rounded-xl bg-background p-5">
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
      <ExamBottomNavigation />
    </>
  )
}

export default ExamWorkQuestion
