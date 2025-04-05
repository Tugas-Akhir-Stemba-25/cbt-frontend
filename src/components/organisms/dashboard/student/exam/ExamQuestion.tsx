'use client'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'

interface ExamQuestionProps {
  hash: string
}

const ExamQuestion = ({ hash }: ExamQuestionProps) => {
  const { activeQuestion } = useActiveQuestionStore()
  return (
    <div>
      {hash} {activeQuestion?.id}
    </div>
  )
}

export default ExamQuestion
