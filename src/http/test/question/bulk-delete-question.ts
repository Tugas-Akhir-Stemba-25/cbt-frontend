import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface BulkDeleteQuestionParams {
  ids: number[]
}

interface BulkDeleteQuestionResponse {
  meta: Metadata
}

export const BulkDeleteQuestionHandler = async ({
  ids
}: BulkDeleteQuestionParams): Promise<BulkDeleteQuestionResponse> => {
  const { data } = await api.delete<BulkDeleteQuestionResponse>(`/questions/bulk-delete`, {
    data: { ids }
  })

  return data
}

export const useBulkDeleteQuestion = (
  options?: Partial<UseMutationOptions<BulkDeleteQuestionResponse, AxiosError<any>, BulkDeleteQuestionParams>>
) => {
  return useMutation({
    mutationFn: BulkDeleteQuestionHandler,
    ...options
  })
}
