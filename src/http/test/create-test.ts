import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'
import { CreateTestForm } from '@/types/test/test'

interface CreateTestPayload {
  form: CreateTestForm
  material_id: number
}

interface CreateTestResponse {
  meta: Metadata
  data: {
    id: number
  }
}

export const createTestHandler = async ({ form, material_id }: CreateTestPayload): Promise<CreateTestResponse> => {
  const { data } = await api.post<CreateTestResponse>(`/materials/${material_id}/tests`, form)

  return data
}

export const useCreateTest = (
  options?: Partial<UseMutationOptions<CreateTestResponse, AxiosError<any>, CreateTestPayload>>
) => {
  return useMutation({
    mutationFn: createTestHandler,
    ...options
  })
}
