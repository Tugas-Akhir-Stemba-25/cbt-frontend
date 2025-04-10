import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { EditStudentType } from '@/validators/student/edit-student-validator'

import { UpdateStudentResponse } from '@/types/common/studentResponse'

interface UpdateStudentPayload {
  id: number
  form: EditStudentType
}

export const updateStudentHandler = async ({ form, id }: UpdateStudentPayload): Promise<UpdateStudentResponse> => {
  const { data } = await api.put<UpdateStudentResponse>(`/students/${id}`, form)

  return data
}

export const useUpdateStudent = (
  option?: Partial<UseMutationOptions<UpdateStudentResponse, AxiosError<any>, UpdateStudentPayload>>
) => {
  return useMutation({
    mutationFn: updateStudentHandler,
    ...option
  })
}
