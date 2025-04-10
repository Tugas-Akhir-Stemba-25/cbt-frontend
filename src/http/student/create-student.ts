import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { CreateStudentType } from '@/validators/student/create-student-validator'

import { CreateStudentResponse } from '@/types/common/studentResponse'

interface CreateStudentPayload {
  form: CreateStudentType
  class_id: number
}

export const createStudentHandler = async ({
  form,
  class_id
}: CreateStudentPayload): Promise<CreateStudentResponse> => {
  const { data } = await api.post<CreateStudentResponse>(`/classes/${class_id}/students`, form)

  return data
}

export const useCreateStudent = (
  options?: Partial<UseMutationOptions<CreateStudentResponse, AxiosError<any>, CreateStudentPayload>>
) => {
  return useMutation({
    mutationFn: createStudentHandler,
    ...options
  })
}
