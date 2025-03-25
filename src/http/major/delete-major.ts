import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface DeleteMajorPayload {
  id: number
}

interface DeleteMajorResponse {
  meta: Metadata
}

export const deleteMajorHandler = async ({ id }: DeleteMajorPayload): Promise<DeleteMajorResponse> => {
  const { data } = await api.delete<DeleteMajorResponse>(`/majors/${id}`)

  return data
}

export const useDeleteMajor = (
  options?: Partial<UseMutationOptions<DeleteMajorResponse, AxiosError<any>, DeleteMajorPayload>>
) => {
  return useMutation({
    mutationFn: deleteMajorHandler,
    ...options
  })
}
