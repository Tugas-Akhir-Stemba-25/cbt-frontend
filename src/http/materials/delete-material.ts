import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface DeleteMaterialPayload {
  id: number
}

interface DeleteMaterialResponse {
  meta: Metadata
}

export const deleteMaterialHandler = async ({ id }: DeleteMaterialPayload): Promise<DeleteMaterialResponse> => {
  const { data } = await api.delete<DeleteMaterialResponse>(`/materials/${id}`)

  return data
}

export const useDeleteMaterial = (
  options?: Partial<UseMutationOptions<DeleteMaterialResponse, AxiosError<any>, DeleteMaterialPayload>>
) => {
  return useMutation({
    mutationFn: deleteMaterialHandler,
    ...options
  })
}
