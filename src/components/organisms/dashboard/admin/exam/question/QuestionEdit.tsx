'use client'

import { useEffect, useRef } from 'react'

import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useGetTestDetail } from '@/http/test/get-test-detail'
import { useEditQuestion } from '@/http/test/question/edit-question'
import { getQuestionDetailKey, useGetQuestionDetail } from '@/http/test/question/get-question-detail'

import { editQuestionSchema, EditQuestionType } from '@/validators/test/question/edit-question-validator'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'
import { QuestionEditForm } from '@/types/question/question'

import QuestionEditorEdit from './QuestionEditorEdit'

interface QuestionEditProps {
  id: number
  questionId: number
}

const QuestionEdit = ({ id, questionId }: QuestionEditProps) => {
  // Breadcrumbs
  const { setBreadcrumbs } = useBreadcrumbs()

  const queryClient = useQueryClient()

  const ref = useRef<{
    reset: () => void
  }>(null)

  const { data: detailTest } = useGetTestDetail({
    testId: id
  })

  const { data: questionDetail } = useGetQuestionDetail(
    {
      questionId
    },
    {
      enabled: !!questionId
    }
  )

  const { mutate: editQuestion, isPending: editQuestionLoading } = useEditQuestion({
    onSuccess: (res) => {
      toast.success('Sukses', {
        description: res.meta.message
      })
      queryClient.invalidateQueries({
        queryKey: getQuestionDetailKey({ questionId })
      })
    },
    onError: (err) => {
      toast.error('Error', {
        description: err.response?.data.meta.message
      })

      if (err.response?.status === 422) {
        const errors = err.response.data.meta.error

        for (const key in errors) {
          form.setError(key as keyof EditQuestionType, {
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
        href: `/dashboard/admin/exam/${id}`
      },
      {
        label: 'Edit Soal',
        href: `/dashboard/admin/exam/${id}/question/${questionId}/edit`
      }
    ])
  }, [setBreadcrumbs, questionId, id])

  const form = useForm<EditQuestionType>({
    defaultValues: {
      question: '',
      image: null,
      answers: [],
      correct_answer_idx: 0
    },
    resolver: zodResolver(editQuestionSchema)
  })

  const onSubmit = async () => {
    // Handle form submission
    const data = form.getValues()

    const payload: QuestionEditForm = {
      question: data.question,
      image: data.image,
      answers: data.answers.map((answer) => ({
        id: answer.id,
        answer: answer.answer
      })),
      correct_answer_idx: data.correct_answer_idx
    }

    editQuestion({
      questionId,
      form: payload
    })
  }

  useEffect(() => {
    if (questionDetail) {
      form.setValue('question', questionDetail.data.question)
      form.setValue('answers', questionDetail.data.answers)
      form.setValue(
        'correct_answer_idx',
        questionDetail.data.answers.findIndex((answer) => answer.correct)
      )
    }
  }, [form, questionDetail])

  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <Link href={`/dashboard/admin/exam/${id}/edit`} className="text-subtle flex items-center gap-2 text-sm">
          <ArrowLeft className="text-subtle h-4 w-4" />
          Back
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        <h3 className="text-[18px] font-semibold">Ubah Soal</h3>
      </div>
      <div className="flex border-b border-dashed pb-4">
        <h6 className="flex w-full items-center gap-2 text-sm">
          <span>{detailTest?.data.name}</span>
          {/* <span>/</span>
          <span>#{(detailTest?.data.total_question ?? 0) + 1}</span> */}
        </h6>
      </div>
      <QuestionEditorEdit
        id={questionId}
        image={questionDetail?.data.image ?? null}
        ref={ref}
        onSubmit={onSubmit}
        submitLoading={editQuestionLoading}
        form={form}
      />
    </div>
  )
}

export default QuestionEdit
