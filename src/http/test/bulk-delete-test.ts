import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface BulkDeleteTestParams {
  ids: number[]
}

interface BulkDeleteTestResponse {
  meta: Metadata
}

export const bulkDeleteTestHandler = async ({ ids }: BulkDeleteTestParams): Promise<BulkDeleteTestResponse> => {
  const { data } = await api.delete<BulkDeleteTestResponse>(`/tests/bulk-delete`, {
    data: { ids }
  })

  return data
}

export const useBulkDeleteTest = (
  options?: Partial<UseMutationOptions<BulkDeleteTestResponse, AxiosError<any>, BulkDeleteTestParams>>
) => {
  return useMutation({
    mutationFn: bulkDeleteTestHandler,
    ...options
  })
}
