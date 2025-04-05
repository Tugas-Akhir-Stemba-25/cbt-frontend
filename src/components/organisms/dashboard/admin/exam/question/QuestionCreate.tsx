'use client'

import { useEffect, useRef } from 'react'

import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getTestDetailKey, useGetTestDetail } from '@/http/test/get-test-detail'
import { useCreateQuestion } from '@/http/test/question/create-question'

import { createQuestionSchema, CreateQuestionType } from '@/validators/test/question/create-question-validator'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

import QuestionEditorCreate from './QuestionEditorCreate'

interface QuestionCreateProps {
  testId: number
}

const QuestionCreate = ({ testId }: QuestionCreateProps) => {
  const { setBreadcrumbs } = useBreadcrumbs()
  const queryClient = useQueryClient()

  const ref = useRef<{
    reset: () => void
  }>(null)

  const { data: detailTest } = useGetTestDetail({
    testId
  })

  const { mutate: createQuestion, isPending: createQuestionPending } = useCreateQuestion({
    onSuccess: (res) => {
      form.reset()
      toast.success('Sukses', {
        description: res.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getTestDetailKey({ testId })
      })
      ref.current?.reset()
    },
    onError: (err) => {
      toast.error('Error', {
        description: err.response?.data.meta.message
      })

      if (err.response?.status === 422) {
        const errors = err.response.data.meta.error

        for (const key in errors) {
          form.setError(key as keyof CreateQuestionType, {
            type: 'server',
            message: errors[key][0]
          })
        }
      }
    }
  })

  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Master Data',
        href: '/dashboard/admin'
      },
      {
        label: 'Ujian',
        href: `/dashboard/admin/exam/${testId}`
      },

      {
        label: 'Buat Soal',
        href: `/dashboard/admin/exam/${testId}/question/create`
      }
    ])
  }, [setBreadcrumbs, testId, detailTest])

  const form = useForm<CreateQuestionType>({
    defaultValues: {
      question: '',
      image: null,
      answers: [],
      correct_answer_idx: 0
    },
    resolver: zodResolver(createQuestionSchema)
  })

  const onSubmit = () => {
    const formData = form.getValues()

    createQuestion({
      testId,
      form: {
        ...formData,
        image: formData.image ?? null
      }
    })
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <Link href={`/dashboard/admin/exam/${testId}/edit`} className="text-subtle flex items-center gap-2 text-sm">
          <ArrowLeft className="text-subtle h-4 w-4" />
          Back
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        <h3 className="text-[18px] font-semibold">Buat Soal</h3>
      </div>
      <div className="flex border-b border-dashed pb-4">
        <h6 className="flex w-full items-center gap-2 text-sm">
          <span>{detailTest?.data.name}</span>
          <span>/</span>
          <span>#{(detailTest?.data.total_question ?? 0) + 1}</span>
        </h6>
      </div>
      <QuestionEditorCreate ref={ref} onSubmit={onSubmit} submitLoading={createQuestionPending} form={form} />
    </div>
  )
}

export default QuestionCreate
