import { cn } from '@/utils/shadcn'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'

import { Button } from '@/components/ui/button'

import { WorkAnswer } from '@/types/work/work'

interface QuestionNavigationButtonProps {
  data: WorkAnswer
  idx: number
}

const mappingVariant = ({ data, id }: { data: WorkAnswer; id: number }) => {
  if (id === data.test_question_id) return 'surface'

  if (data.flagged) return 'secondary'

  if (data.test_answer_id) return 'default'

  return 'subtle'
}

const QuestionNavigationButton = ({ data, idx }: QuestionNavigationButtonProps) => {
  const { activeQuestion, setActiveQuestion } = useActiveQuestionStore()

  const handleClick = () => {
    setActiveQuestion(data.test_question_id, idx)
  }

  return (
    <Button
      onClick={handleClick}
      variant={mappingVariant({ data, id: activeQuestion?.id as number })}
      className={cn({
        // 'bg-primary-surface border border-primary-border':
        //   activeQuestion?.id === data.test_question_id && !data.flagged,
        // 'border border-secondary-border bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground':
        //   data.flagged,
        // 'bg-accent': activeQuestion?.id !== data.test_question_id
      })}
    >
      {idx}
    </Button>
  )
}

export default QuestionNavigationButton
