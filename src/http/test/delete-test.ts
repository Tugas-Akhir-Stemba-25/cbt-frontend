import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface DeleteTestParams {
  id: number
}

interface DeleteTestResponse {
  meta: Metadata
}

export const deleteTestHandler = async ({ id }: DeleteTestParams): Promise<DeleteTestResponse> => {
  const { data } = await api.delete<DeleteTestResponse>(`/tests/${id}`)
  return data
}

export const useDeleteTest = (
  options?: Partial<UseMutationOptions<DeleteTestResponse, AxiosError<any>, DeleteTestParams>>
) => {
  return useMutation({
    mutationFn: deleteTestHandler,
    ...options
  })
}
