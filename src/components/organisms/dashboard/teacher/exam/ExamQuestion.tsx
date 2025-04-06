import { Fragment, useEffect, useState } from 'react'

import Image from 'next/image'

import { FileX2 } from 'lucide-react'

import { useGetTestQuestionIds } from '@/http/test/get-test-question-ids'
import { useGetQuestionDetail } from '@/http/test/question/get-question-detail'

import { buildStorageUrl } from '@/utils/common'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface ExamQuestionProps {
  id: number
}
const ExamQuestion = ({ id }: ExamQuestionProps) => {
  const [selectedId, setSelectedId] = useState<number | null>()
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)

  const { data: questionIds } = useGetTestQuestionIds(
    {
      testId: id
    },
    {
      enabled: !!id
    }
  )

  const { data: questionDetail, isLoading: questionDetailLoading } = useGetQuestionDetail(
    {
      questionId: selectedId as number
    },
    {
      enabled: !!selectedId
    }
  )

  useEffect(() => {
    if ((questionIds?.data.question_ids.length ?? 0) > 0) {
      setSelectedId(questionIds?.data.question_ids[0])
      setSelectedNumber(1)
    }
  }, [questionIds])

  const handleSelectQuestion = (questionId: number, num: number) => {
    setSelectedId(questionId)
    setSelectedNumber(num)
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {questionIds?.data.question_ids.map((questionId, index) => (
          <Button
            onClick={() => handleSelectQuestion(questionId, index + 1)}
            variant={selectedId === questionId ? 'default' : 'outline'}
            key={questionId}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      {questionDetailLoading ? (
        <ExamQuestionContentSkeleton />
      ) : questionIds?.data.question_ids.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center gap-4 rounded-2xl border border-neutral-800/10 px-5 py-12 dark:border-neutral-50/15">
          <FileX2 className="h-16 w-16 text-primary" />
          <h5 className="text-lg font-semibold text-muted">Tidak ada data pertanyaan</h5>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-neutral-800/10 px-5 py-3 dark:border-neutral-50/15">
          <h5 className="text-base font-semibold md:text-lg">Soal {selectedNumber}</h5>
          {questionDetail?.data.image && (
            <div className="flex w-full justify-center">
              <Image
                src={buildStorageUrl(questionDetail?.data.image ?? '') as string}
                width={500}
                height={500}
                className="w-full lg:w-1/3"
                alt="question image"
              />
            </div>
          )}
          <div
            className="rounded-xl border border-dashed p-5"
            dangerouslySetInnerHTML={{
              __html: questionDetail?.data.question || ''
            }}
          ></div>
          <h5 className="text-base font-semibold md:text-lg">Opsi Jawaban</h5>
          <div className="grid grid-cols-[75px_1fr] gap-y-3 rounded-xl border border-dashed p-5 text-sm">
            {questionDetail?.data.answers.map((answer, index) => (
              <Fragment key={index}>
                <p className="font-medium">Opsi {index + 1}</p>
                <p>{answer.answer}</p>
              </Fragment>
            ))}
          </div>
          <h5 className="text-base font-semibold md:text-lg">Kunci Jawaban</h5>
          <div className="grid grid-cols-[75px_1fr] gap-y-3 rounded-xl border border-dashed p-5 text-sm">
            {questionDetail?.data.answers.find((answer) => answer.correct)?.answer && (
              <Fragment>
                <p className="font-medium">
                  Opsi {questionDetail?.data.answers.findIndex((answer) => answer.correct) + 1}
                </p>
                <p>{questionDetail?.data.answers.find((answer) => answer.correct)?.answer}</p>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const ExamQuestionContentSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-2xl border border-neutral-800/10 px-5 py-3 dark:border-neutral-50/15">
      <h5 className="text-base font-semibold md:text-lg">Soal</h5>
      <div className="flex w-full justify-center">
        <Skeleton className="h-72 w-full lg:w-1/3" />
      </div>
      <div className="rounded-xl border border-dashed p-5">
        <Skeleton className="h-16 w-full" />
      </div>
      <h5 className="text-base font-semibold md:text-lg">Opsi Jawaban</h5>
      <div className="flex flex-col gap-y-3 rounded-xl border border-dashed p-5 text-sm">
        <Skeleton className="h-6 w-full lg:w-1/3" />
        <Skeleton className="h-6 w-full lg:w-1/3" />
        <Skeleton className="h-6 w-full lg:w-1/3" />
        <Skeleton className="h-6 w-full lg:w-1/3" />
        <Skeleton className="h-6 w-full lg:w-1/3" />
      </div>
      <h5 className="text-base font-semibold md:text-lg">Kunci Jawaban</h5>
      <div className="flex flex-col gap-y-3 rounded-xl border border-dashed p-5 text-sm">
        <Skeleton className="h-6 w-full lg:w-1/3" />
      </div>
    </div>
  )
}

export default ExamQuestion
