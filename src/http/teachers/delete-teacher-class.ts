import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { DeleteTeacherClassResponse } from '@/types/common/teacherResponse'

interface DeleteTeacherClassParams {
  teacherId: number
  classId: number
}

export const deleteTeacherClassHandler = async ({ teacherId, classId }: DeleteTeacherClassParams) => {
  const { data } = await api.delete(`/teachers/${teacherId}/classes/${classId}`)
  return data
}

export const useDeleteTeacherClass = (
  options?: Partial<UseMutationOptions<DeleteTeacherClassResponse, AxiosError<any>, DeleteTeacherClassParams>>
) => {
  return useMutation({
    mutationFn: deleteTeacherClassHandler,
    ...options
  })
}
