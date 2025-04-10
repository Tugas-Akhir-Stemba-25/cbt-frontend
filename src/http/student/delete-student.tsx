import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { DeleteStudentResponse } from '@/types/common/studentResponse'

interface DeleteStudentPayload {
  id: number
}

export const deleteStudentHandler = async ({ id }: DeleteStudentPayload): Promise<DeleteStudentResponse> => {
  const { data } = await api.delete<DeleteStudentResponse>(`/students/${id}`)

  return data
}

export const useDeleteStudent = (
  options?: Partial<UseMutationOptions<DeleteStudentResponse, AxiosError<any>, DeleteStudentPayload>>
) => {
  return useMutation({
    mutationFn: deleteStudentHandler,
    ...options
  })
}
