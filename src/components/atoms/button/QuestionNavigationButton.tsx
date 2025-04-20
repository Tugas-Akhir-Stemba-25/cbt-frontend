// QuestionNavigationButton.tsx
import { cn } from '@/utils/shadcn'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'

import { Button } from '@/components/ui/button'

import { WorkAnswer } from '@/types/work/work'

interface QuestionNavigationButtonProps {
  data: WorkAnswer
  idx: number
}

// 🔁 PERBAIKAN: ubah urutan kondisi
const mappingVariant = ({ data, id }: { data: WorkAnswer; id: number }) => {
  // 1. Kalau ragu-ragu, tampilkan sebagai 'secondary' (menang dari apapun termasuk active)
  if (data.flagged) return 'secondary'

  // 2. Kalau ini soal aktif, tampilkan 'surface'
  if (id === data.test_question_id) return 'surface'

  // 3. Kalau sudah dijawab, tampilkan 'default'
  if (data.test_answer_id) return 'default'

  // 4. Kalau belum dikerjakan, tampilkan 'subtle'
  return 'subtle'
}

const QuestionNavigationButton = ({ data, idx }: QuestionNavigationButtonProps) => {
  const { activeQuestion, setActiveQuestion } = useActiveQuestionStore()

  const handleClick = () => {
    setActiveQuestion(data.test_question_id, idx)
  }

  return (
    <Button onClick={handleClick} variant={mappingVariant({ data, id: activeQuestion?.id as number })} className={cn()}>
      {idx}
    </Button>
  )
}

export default QuestionNavigationButton
