import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getWorkAnswerKey } from '@/http/work/get-work-answer'
import { useStoreWorkAnswer } from '@/http/work/store-work-answer'

import { cn } from '@/utils/shadcn'

import { useWorkAnswerStore } from '@/stores/useWorkAnswerStore'
import useWorkHashStore from '@/stores/useWorkHashStore'

import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'

import { QuestionAnswer, WorkAnswer } from '@/types/work/work'

interface AnswerButtonProps {
  data: QuestionAnswer
  answer: WorkAnswer | null
}

const AnswerButton = ({ data, answer }: AnswerButtonProps) => {
  const { hash } = useWorkHashStore()
  const { editWorkAnswer, workAnswers } = useWorkAnswerStore()

  const queryClient = useQueryClient()

  const { mutate: storeAnswer } = useStoreWorkAnswer({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getWorkAnswerKey(hash as string)
      })
    },
    onError: (err) => {
      toast.error('Error Menyimpan Jawaban', {
        description: err.response?.data.meta.message || err.response?.data.meta.error
      })
    }
  })

  const handleStoreAnswer = () => {
    const answer = workAnswers?.find((ans) => ans.test_question_id === data.test_question_id)
    editWorkAnswer(
      {
        ...answer,
        test_answer_id: data.id
      } as WorkAnswer,
      data.test_question_id
    )
    storeAnswer({
      hash: hash as string,
      form: {
        answer_id: data.id,
        question_id: data.test_question_id
      }
    })
  }

  return (
    <Label
      htmlFor={`option-${data.id}`}
      className={cn('flex cursor-pointer justify-start gap-3 rounded-xl border px-5 py-4 text-start text-foreground', {
        'border-primary-border bg-primary-surface hover:bg-primary-surface': answer?.test_answer_id === data.id
      })}
      onClick={handleStoreAnswer}
    >
      <RadioGroupItem
        className="border-gray-300 focus:border-primary-border"
        value={data.id.toString()}
        id={`option-${data.id}`}
      />

      <p>{data.answer}</p>
    </Label>
  )
}

export default AnswerButton
