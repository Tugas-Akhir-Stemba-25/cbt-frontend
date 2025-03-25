import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { CreateMajorType } from '@/validators/major/create-major-validator'

import { Metadata } from '@/types/common/metadata'

interface CreateMajorPayload {
  form: CreateMajorType
}

interface CreateMajorResponse {
  meta: Metadata
}

export const createMajorHandler = async ({ form }: CreateMajorPayload): Promise<CreateMajorResponse> => {
  const { data } = await api.post<CreateMajorResponse>('/majors', form)

  return data
}

export const useCreateMajor = (
  options?: Partial<UseMutationOptions<CreateMajorResponse, AxiosError<any>, CreateMajorPayload>>
) => {
  return useMutation({
    mutationFn: createMajorHandler,
    ...options
  })
}
