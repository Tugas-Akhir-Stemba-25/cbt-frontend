import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { AssignTeacherType } from '@/validators/teacher/assign-teacher-validator'

import { AssignTeacherResponse } from '@/types/common/teacherResponse'

interface AssignTeacherPayload {
  form: AssignTeacherType
  id: number
}

export const assignTeacherClass = async ({ form, id }: AssignTeacherPayload): Promise<AssignTeacherResponse> => {
  const { data } = await api.post<AssignTeacherResponse>(`/teachers/${id}/classes`, form)
  return data
}

export const useAssignTeacherClass = (
  options?: Partial<UseMutationOptions<AssignTeacherResponse, AxiosError<any>, AssignTeacherPayload>>
) => {
  return useMutation({
    mutationFn: assignTeacherClass,
    ...options
  })
}
