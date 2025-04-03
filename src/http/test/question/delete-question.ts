import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface DeleteQuestionParams {
  id: number
}

interface DeleteQuestionResponse {
  meta: Metadata
}

export const deleteQuestionHandler = async ({ id }: DeleteQuestionParams): Promise<DeleteQuestionResponse> => {
  const { data } = await api.delete<DeleteQuestionResponse>(`/questions/${id}`)
  return data
}

export const useDeleteQuestion = (
  options?: Partial<UseMutationOptions<DeleteQuestionResponse, AxiosError<any>, DeleteQuestionParams>>
) => {
  return useMutation({
    mutationFn: deleteQuestionHandler,
    ...options
  })
}
