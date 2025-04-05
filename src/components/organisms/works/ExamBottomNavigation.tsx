import React from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import { useFlagQuestion } from '@/http/work/flag-question'
import { getWorkAnswerKey } from '@/http/work/get-work-answer'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'
import { useWorkAnswerStore } from '@/stores/useWorkAnswerStore'
import useWorkHashStore from '@/stores/useWorkHashStore'

import { Button } from '@/components/ui/button'

import { WorkAnswer } from '@/types/work/work'

interface ExamBottomNavigationProps {
  setOpenFinishTestModal: (isTimeout: boolean) => void
}

const ExamBottomNavigation = ({ setOpenFinishTestModal }: ExamBottomNavigationProps) => {
  const { hash } = useWorkHashStore()
  const { activeQuestion, setActiveQuestion } = useActiveQuestionStore()

  const queryClient = useQueryClient()

  const { workAnswers, editWorkAnswer } = useWorkAnswerStore()

  const { mutate: flagQuestion } = useFlagQuestion({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getWorkAnswerKey(hash as string)
      })
    },
    onError: (err) => {
      toast.error('Error Menandai Soal', {
        description: err.response?.data.meta.message || err.response?.data.meta.error
      })
    }
  })

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

  const handleFlagQuestion = () => {
    if (!activeQuestion) return
    const answer = workAnswers?.find((ans) => ans.test_question_id === activeQuestion?.id)
    editWorkAnswer(
      {
        ...answer,
        flagged: answer?.flagged ? !answer.flagged : true
      } as WorkAnswer,
      activeQuestion.id
    )
    flagQuestion({
      hash: hash as string,
      form: {
        question_id: activeQuestion?.id as number
      }
    })
  }

  return (
    <div className="col-span-1 row-start-4 flex w-full flex-col justify-center gap-6 rounded-xl bg-background p-5 md:col-span-2 md:row-start-3">
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
          onClick={handleFlagQuestion}
          variant={
            workAnswers?.find((ans) => ans.test_question_id === activeQuestion?.id)?.flagged ? 'secondary' : 'outline'
          }
          className="cursor-pointer"
        >
          <span>Ragu-Ragu</span>
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
      <Button onClick={() => setOpenFinishTestModal(false)} className="inline-block md:hidden" variant={'destructive'}>
        Akhiri Ujian
      </Button>
    </div>
  )
}

export default ExamBottomNavigation
