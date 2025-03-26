import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface BulkDeleteMajorPayload {
  ids: number[]
}

interface BulkDeleteMajorResponse {
  meta: Metadata
}

export const bulkDeleteMajorHandler = async ({ ids }: BulkDeleteMajorPayload): Promise<BulkDeleteMajorResponse> => {
  const { data } = await api.delete<BulkDeleteMajorResponse>('/majors/bulk-delete', {
    data: {
      ids
    }
  })

  return data
}

export const useBulkDeleteMajor = (
  options?: Partial<UseMutationOptions<BulkDeleteMajorResponse, AxiosError<any>, BulkDeleteMajorPayload>>
) => {
  return useMutation({
    mutationFn: bulkDeleteMajorHandler,
    ...options
  })
}
