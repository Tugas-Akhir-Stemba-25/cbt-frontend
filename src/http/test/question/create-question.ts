import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { CreateQuestionType } from '@/validators/test/question/create-question-validator'

import { Metadata } from '@/types/common/metadata'

interface CreateQuestionPayload {
  testId: number
  form: CreateQuestionType
}

interface CreateQuestionResponse {
  meta: Metadata
}

export const createQuestionHandler = async ({
  testId,
  form
}: CreateQuestionPayload): Promise<CreateQuestionResponse> => {
  const formData = new FormData()
  formData.append('question', form.question)
  if (form.image) formData.append('image', form.image)
  formData.append('correct_answer_idx', form.correct_answer_idx.toString())

  form.answers.forEach((answer) => {
    formData.append(`answers[]`, answer)
  })

  const { data } = await api.post<CreateQuestionResponse>(`/tests/${testId}/questions`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data
}

export const useCreateQuestion = (
  options?: Partial<UseMutationOptions<CreateQuestionResponse, AxiosError<any>, CreateQuestionPayload>>
) => {
  return useMutation({
    mutationFn: createQuestionHandler,
    ...options
  })
}
