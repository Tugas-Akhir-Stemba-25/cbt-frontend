import React from 'react'

import { CheckCircle2, XCircle } from 'lucide-react'

import { cn } from '@/utils/shadcn'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'

import { QuestionAnswer, WorkAnswer } from '@/types/work/work'

interface AnswerButtonResultProps {
  data: QuestionAnswer
  answer: WorkAnswer | null
  isShowAnswer?: boolean
}

const AnswerButtonResult = ({ answer, data, isShowAnswer = false }: AnswerButtonResultProps) => {
  return (
    <>
      <Label
        htmlFor={`option-${data.id}`}
        className={cn('flex justify-start gap-3 rounded-xl border px-5 py-4 text-start text-foreground', {
          'border-primary-border bg-primary-surface hover:bg-primary-surface':
            answer?.test_answer_id === data.id && !isShowAnswer,
          '!border-success bg-success-surface text-success hover:bg-success-surface':
            data?.id === answer?.correct?.id && isShowAnswer,
          '!border-destructive bg-destructive-surface text-destructive hover:bg-destructive-surface':
            answer?.test_answer_id !== answer?.correct?.id && answer?.test_answer_id === data.id && isShowAnswer
        })}
      >
        <RadioGroupItem
          disabled={true}
          className={cn('border-gray-300', {
            '!border-primary-border bg-primary-surface hover:bg-primary-surface':
              answer?.test_answer_id === data.id && !isShowAnswer,
            '!border-success bg-success-surface text-success hover:bg-success-surface':
              data?.id === answer?.correct?.id && isShowAnswer,
            '!border-destructive bg-destructive-surface text-destructive hover:bg-destructive-surface':
              answer?.test_answer_id !== answer?.correct?.id && answer?.test_answer_id === data.id && isShowAnswer
          })}
          value={data.id.toString()}
          id={`option-${data.id}`}
        />
        <p>{data.answer}</p>
      </Label>
      <Button
        className={cn(
          'flex w-16 cursor-default items-center justify-center rounded-xl border border-gray-300 bg-transparent py-6 outline-none',
          {
            '!border-primary-border bg-primary-surface hover:bg-primary-surface':
              answer?.test_answer_id === data.id && !isShowAnswer,
            '!border-success bg-success-surface text-success hover:bg-success-surface':
              answer?.test_answer_id === answer?.correct?.id && answer?.test_answer_id === data.id && isShowAnswer,
            '!border-destructive bg-destructive-surface text-destructive hover:bg-destructive-surface':
              answer?.test_answer_id !== answer?.correct?.id && answer?.test_answer_id === data.id && isShowAnswer
          }
        )}
        variant={'subtle'}
      >
        {answer?.test_answer_id === answer?.correct?.id && answer?.test_answer_id === data.id && isShowAnswer && (
          <CheckCircle2 />
        )}
        {answer?.test_answer_id !== answer?.correct?.id && answer?.test_answer_id === data.id && isShowAnswer && (
          <XCircle />
        )}
      </Button>
    </>
  )
}

export default AnswerButtonResult
