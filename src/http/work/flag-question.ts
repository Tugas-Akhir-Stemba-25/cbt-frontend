import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface FlagQuestionPayload {
  form: {
    question_id: number
  }
  hash: string
}

interface FlagQuestionResponse {
  meta: Metadata
}

export const flagQuestionHandler = async ({ form, hash }: FlagQuestionPayload): Promise<FlagQuestionResponse> => {
  const response = await api.post<FlagQuestionResponse>(`/works/${hash}/flagged`, form)

  return response.data
}

export const useFlagQuestion = (
  options?: Partial<UseMutationOptions<FlagQuestionResponse, AxiosError<any>, FlagQuestionPayload>>
) => {
  return useMutation({
    mutationFn: flagQuestionHandler,
    ...options
  })
}
