import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { EditTeacherType } from '@/validators/teacher/edit-teacher-validator'

import { UpdateTeacherResponse } from '@/types/common/teacherResponse'

interface UpdateTeacherPayload {
  form: EditTeacherType
  id: number
}

export const updateTeacherHandler = async ({ form, id }: UpdateTeacherPayload): Promise<UpdateTeacherResponse> => {
  const { data } = await api.put<UpdateTeacherResponse>(`/teachers/${id}`, form)

  return data
}

export const useUpdateTeacher = (
  options?: Partial<UseMutationOptions<UpdateTeacherResponse, AxiosError<any>, UpdateTeacherPayload>>
) => {
  return useMutation({
    mutationFn: updateTeacherHandler,
    ...options
  })
}
