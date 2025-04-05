import { cn } from '@/utils/shadcn'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'

import { WorkAnswer } from '@/types/work/work'

interface QuestionNavigationButtonResultProps {
  answer: WorkAnswer
  idx: number
  isShowAnswer?: boolean
}

const QuestionNavigationButtonResult = ({ answer, idx, isShowAnswer = false }: QuestionNavigationButtonResultProps) => {
  const { activeQuestion } = useActiveQuestionStore()

  const { setActiveQuestion } = useActiveQuestionStore()

  const handleClick = () => {
    setActiveQuestion(answer.test_question_id, idx)
  }

  return (
    <button
      onClick={handleClick}
      className={cn('flex justify-center gap-3 rounded-xl border px-5 py-3 text-start text-foreground', {
        'border-primary-border bg-primary-surface hover:bg-primary-surface':
          answer?.test_question_id === activeQuestion?.id,
        '!border-success bg-success-surface text-success hover:bg-success-surface':
          answer.test_answer_id === answer?.correct?.id && isShowAnswer,
        '!border-destructive bg-destructive-surface text-destructive hover:bg-destructive-surface':
          answer?.test_answer_id !== answer?.correct?.id && answer?.test_answer_id && isShowAnswer,
        '!border-secondary bg-secondary-surface text-secondary hover:bg-secondary-surface':
          answer.flagged && !isShowAnswer
      })}
    >
      {idx}
    </button>
  )
}

export default QuestionNavigationButtonResult
