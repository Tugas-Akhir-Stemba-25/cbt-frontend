import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { CreateClassType } from '@/validators/class/create-class-validator'

import { Metadata } from '@/types/common/metadata'

interface CreateClassPayload {
  form: CreateClassType
  major_id: number
}

interface CreateClassResponse {
  meta: Metadata
}

export const createClassHandler = async ({ form, major_id }: CreateClassPayload): Promise<CreateClassResponse> => {
  const { data } = await api.post<CreateClassResponse>(`/majors/${major_id}/classes`, form)

  return data
}

export const useCreateClass = (
  options?: Partial<UseMutationOptions<CreateClassResponse, AxiosError<any>, CreateClassPayload>>
) => {
  return useMutation({
    mutationFn: createClassHandler,
    ...options
  })
}
