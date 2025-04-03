import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'
import { QuestionEditForm } from '@/types/question/question'

interface EditQuestionPayload {
  questionId: number
  form: QuestionEditForm
}

interface EditQuestionResponse {
  meta: Metadata
}

export const editQuestionHandler = async ({ questionId, form }: EditQuestionPayload): Promise<EditQuestionResponse> => {
  const formData = new FormData()

  formData.append('question', form.question)

  if (form.image) {
    formData.append('image', form.image)
  }

  form.answers.forEach((answer, index) => {
    formData.append(`answers[${index}][answer]`, answer.answer)
    if (answer.id) {
      formData.append(`answers[${index}][id]`, answer.id.toString())
    }
  })

  formData.append('correct_answer_idx', form.correct_answer_idx.toString())

  const { data } = await api.post<EditQuestionResponse>(`/questions/${questionId}/update`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data
}

export const useEditQuestion = (
  options?: Partial<UseMutationOptions<EditQuestionResponse, AxiosError<any>, EditQuestionPayload>>
) => {
  return useMutation({
    mutationFn: ({ questionId, form }: EditQuestionPayload) => editQuestionHandler({ questionId, form }),
    ...options
  })
}
