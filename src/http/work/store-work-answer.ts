import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface StoreWorkAnswerPayload {
  form: {
    answer_id: number
    question_id: number
  }
  hash: string
}

interface StoreWorkAnswerResponse {
  meta: Metadata
}

export const storeWorkAnswerHandler = async ({
  form,
  hash
}: StoreWorkAnswerPayload): Promise<StoreWorkAnswerResponse> => {
  const response = await api.post<StoreWorkAnswerResponse>(`/works/${hash}/answers`, form)

  return response.data
}

export const useStoreWorkAnswer = (
  options?: Partial<UseMutationOptions<StoreWorkAnswerResponse, AxiosError<any>, StoreWorkAnswerPayload>>
) => {
  return useMutation({
    mutationFn: storeWorkAnswerHandler,
    ...options
  })
}
