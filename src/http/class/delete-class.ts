import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface DeleteClassPayload {
  id: number
}

interface DeleteClassResponse {
  meta: Metadata
}

export const deleteClassHandler = async ({ id }: DeleteClassPayload): Promise<DeleteClassResponse> => {
  const { data } = await api.delete<DeleteClassResponse>(`/classes/${id}`)

  return data
}

export const useDeleteClass = (
  options?: Partial<UseMutationOptions<DeleteClassResponse, AxiosError<any>, DeleteClassPayload>>
) => {
  return useMutation({
    mutationFn: deleteClassHandler,
    ...options
  })
}
