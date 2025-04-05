import React from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import { useFlagQuestion } from '@/http/work/flag-question'
import { getWorkAnswerKey, useGetWorkAnswer } from '@/http/work/get-work-answer'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'
import useWorkHashStore from '@/stores/useWorkHashStore'

import { Button } from '@/components/ui/button'

const ExamBottomNavigation = () => {
  const { hash } = useWorkHashStore()
  const { activeQuestion, setActiveQuestion } = useActiveQuestionStore()

  const queryClient = useQueryClient()

  const { data: workAnswer } = useGetWorkAnswer(
    {
      hash: hash as string
    },
    {
      enabled: !!hash
    }
  )

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
    if (workAnswer?.data) {
      setActiveQuestion(workAnswer?.data[activeQuestion?.no ?? 1]?.test_question_id, (activeQuestion?.no ?? 1) + 1)
    }
  }
  const handlePreviousQuestion = () => {
    if (workAnswer?.data) {
      setActiveQuestion(
        workAnswer?.data[(activeQuestion?.no ?? 1) - 2]?.test_question_id,
        (activeQuestion?.no ?? 1) - 1
      )
    }
  }

  const handleFlagQuestion = () => {
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
          disabled={(activeQuestion?.no ?? 1) === 1 || (workAnswer?.data.length ?? 0) < 1}
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
            workAnswer?.data.find((ans) => ans.test_question_id === activeQuestion?.id)?.flagged
              ? 'secondary'
              : 'outline'
          }
          className="cursor-pointer"
        >
          <span>Ragu-Ragu</span>
        </Button>
        <Button
          size={'sm'}
          className="flex items-center"
          disabled={(activeQuestion?.no ?? 1) === workAnswer?.data.length || (workAnswer?.data.length ?? 0) < 1}
          onClick={handleNextQuestion}
        >
          <span className="hidden md:inline">Selanjutnya</span>
          <ArrowRight />
        </Button>
      </div>
      <Button className="inline-block md:hidden" variant={'destructive'}>
        Akhiri Ujian
      </Button>
    </div>
  )
}

export default ExamBottomNavigation
