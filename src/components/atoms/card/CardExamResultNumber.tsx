import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useGetWorkAnswer } from '@/http/work/get-work-answer'
import { useGetWorkResult } from '@/http/work/get-work-result'

import { cn } from '@/utils/shadcn'

import useActiveQuestionStore from '@/stores/useActiveQuestionStore'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { WorkAnswer } from '@/types/work/work'

interface CardExamResultNumberProps {
  hash: string
}

const classNameMappingButton = (data: WorkAnswer, is_show_answer: boolean) => {
  if (data.flagged) {
    return 'bg-secondary-surface text-secondary border border-secondary-border'
  }

  if (data.test_answer_id && !is_show_answer) {
    return 'bg-primary-surface text-primary border border-primary-border'
  }

  if (data.test_answer_id && is_show_answer && data.correct?.id === data.test_answer_id) {
    return 'bg-success-surface text-success border border-success'
  }

  if (data.test_answer_id && is_show_answer && data.correct?.id !== data.test_answer_id) {
    return 'bg-destructive-surface text-destructive border border-destructive-border'
  }

  if (!data.test_answer_id) {
    return 'bg-accent text-muted border border-accent-border'
  }
}

const CardExamResultNumber = ({ hash }: CardExamResultNumberProps) => {
  const router = useRouter()

  const { setActiveQuestion } = useActiveQuestionStore()

  const { data: workAnswers } = useGetWorkAnswer(
    {
      hash
    },
    {
      enabled: !!hash
    }
  )

  const { data: testDetail } = useGetWorkResult(
    {
      hash
    },
    {
      enabled: !!hash
    }
  )

  const handleClick = (id: number, index: number) => {
    setActiveQuestion(id, index)
    router.push(`/dashboard/student/work/${hash}/result`)
  }

  return (
    <div className="flex h-full w-full flex-col flex-wrap gap-4 rounded-xl border border-neutral-800/10 p-5 dark:border-neutral-50/15">
      <h3 className="font-semibold">Nomor Soal</h3>
      <div className="grid w-full max-w-full grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-3">
        {workAnswers?.data.map((item, index) => (
          <button
            className={cn(
              'rounded-md px-6 py-2',
              classNameMappingButton(item, testDetail?.data.is_show_answer ?? false)
            )}
            onClick={() => handleClick(item.test_question_id, index)}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="w-full space-y-2">
        <Progress
          value={
            (testDetail?.data.is_show_answer
              ? (testDetail?.data.correct_answer ?? 0) / testDetail?.data.total
              : (testDetail?.data.answered ?? 0) / (testDetail?.data.total ?? 1)) * 100
          }
          indicatorColor={cn({
            'bg-success': testDetail?.data.is_show_answer,
            'bg-primary': !testDetail?.data.is_show_answer
          })}
          className={cn('h-2 w-full rounded-md', {
            'bg-destructive': testDetail?.data.is_show_answer,
            'bg-secondary': !testDetail?.data.is_show_answer
          })}
        />
        <div className="flex justify-between text-sm text-muted">
          <div className="flex w-full items-center justify-between text-sm text-muted">
            {testDetail?.data.is_show_answer ? (
              <>
                <p>Benar: {testDetail?.data.correct_answer}</p>
                <p>Salah: {testDetail?.data.total - (testDetail?.data.correct_answer ?? 0)}</p>
              </>
            ) : (
              <>
                <p>Dijawab: {testDetail?.data.answered}</p>
                <p>Tidak dijawab: {testDetail?.data.not_answered}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button asChild>
          <Link href={`/dashboard/student/work/${hash}/result`}>Lihat Pembahasan</Link>
        </Button>
      </div>
    </div>
  )
}

export default CardExamResultNumber
