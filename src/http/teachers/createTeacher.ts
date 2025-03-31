import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { CreateTeacherType } from '@/validators/teacher/create-teacher-validator'

import { CreateTeacherResponse } from '@/types/common/teacherResponse'

interface TeacherPayload {
  form: CreateTeacherType
}

export const postTeacherData = async ({ form }: TeacherPayload): Promise<CreateTeacherResponse> => {
  const { data } = await api.post<CreateTeacherResponse>('/teachers', form)

  return data
}

export const usePostTeacherData = (
  options?: UseMutationOptions<CreateTeacherResponse, AxiosError<any>, TeacherPayload>
) => {
  return useMutation({
    mutationFn: postTeacherData,
    ...options
  })
}
