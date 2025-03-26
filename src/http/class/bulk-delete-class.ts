import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface BulkDeleteClassPayload {
  ids: number[]
}

interface BulkDeleteClassResponse {
  meta: Metadata
}

export const bulkDeleteClassHandler = async ({ ids }: BulkDeleteClassPayload): Promise<BulkDeleteClassResponse> => {
  const { data } = await api.delete<BulkDeleteClassResponse>('/classes/bulk-delete', {
    data: {
      ids
    }
  })

  return data
}

export const useBulkDeleteClass = (
  options?: Partial<UseMutationOptions<BulkDeleteClassResponse, AxiosError<any>, BulkDeleteClassPayload>>
) => {
  return useMutation({
    mutationFn: bulkDeleteClassHandler,
    ...options
  })
}
