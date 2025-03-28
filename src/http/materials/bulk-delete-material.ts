import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface BulkDeleteMaterialPayload {
  ids: number[]
}

interface BulkDeleteMaterialResponse {
  meta: Metadata
}

export const bulkDeleteMaterialHandler = async ({
  ids
}: BulkDeleteMaterialPayload): Promise<BulkDeleteMaterialResponse> => {
  const { data } = await api.delete<BulkDeleteMaterialResponse>('/materials/bulk-delete', {
    data: {
      ids
    }
  })

  return data
}

export const useBulkDeleteMaterial = (
  options?: Partial<UseMutationOptions<BulkDeleteMaterialResponse, AxiosError<any>, BulkDeleteMaterialPayload>>
) => {
  return useMutation({
    mutationFn: bulkDeleteMaterialHandler,
    ...options
  })
}
