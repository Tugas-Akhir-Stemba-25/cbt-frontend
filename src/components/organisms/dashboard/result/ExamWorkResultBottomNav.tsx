import React from 'react'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'
import { useWorkAnswerStore } from '@/stores/useWorkAnswerStore'

import { Button } from '@/components/ui/button'

const ExamWorkResultBottomNav = () => {
  const { activeQuestion, setActiveQuestion } = useActiveQuestionStore()

  const { workAnswers } = useWorkAnswerStore()

  const handleNextQuestion = () => {
    if (workAnswers) {
      setActiveQuestion(workAnswers[activeQuestion?.no ?? 1]?.test_question_id, (activeQuestion?.no ?? 1) + 1)
    }
  }
  const handlePreviousQuestion = () => {
    if (workAnswers) {
      setActiveQuestion(workAnswers[(activeQuestion?.no ?? 1) - 2]?.test_question_id, (activeQuestion?.no ?? 1) - 1)
    }
  }

  return (
    <div className="col-span-1 row-start-5 flex w-full flex-col justify-center gap-6 rounded-xl bg-background p-5 md:col-span-2 md:row-start-5">
      <div className="flex w-full justify-center gap-6">
        <Button
          disabled={(activeQuestion?.no ?? 1) === 1 || (workAnswers?.length ?? 0) < 1}
          size={'sm'}
          className="flex items-center"
          onClick={handlePreviousQuestion}
        >
          <ArrowLeft />
          <span className="hidden md:inline">Sebelumnya</span>
        </Button>

        <Button
          size={'sm'}
          className="flex items-center"
          disabled={(activeQuestion?.no ?? 1) === workAnswers?.length || (workAnswers?.length ?? 0) < 1}
          onClick={handleNextQuestion}
        >
          <span className="hidden md:inline">Selanjutnya</span>
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export default ExamWorkResultBottomNav
