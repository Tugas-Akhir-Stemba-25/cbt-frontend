import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { DeleteTeacherResponse } from '@/types/common/teacherResponse'

interface DeleteTeacherPayload {
  id: number
}

export const deleteTeacherHandler = async ({ id }: DeleteTeacherPayload): Promise<DeleteTeacherResponse> => {
  const { data } = await api.delete<DeleteTeacherResponse>(`/teachers/${id}`)

  return data
}

export const useDeleteTeacher = (
  options?: Partial<UseMutationOptions<DeleteTeacherResponse, AxiosError<any>, DeleteTeacherPayload>>
) => {
  return useMutation({
    mutationFn: deleteTeacherHandler,
    ...options
  })
}
