import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'
import { UpdateTestForm } from '@/types/test/test'

interface UpdateTestPayload {
  form: UpdateTestForm
  test_id: number
}

interface UpdateTestResponse {
  meta: Metadata
}

export const updateTestHandler = async ({ form, test_id }: UpdateTestPayload): Promise<UpdateTestResponse> => {
  const { data } = await api.put<UpdateTestResponse>(`/tests/${test_id}`, form)

  return data
}

export const useUpdateTest = (
  options?: Partial<UseMutationOptions<UpdateTestResponse, AxiosError<any>, UpdateTestPayload>>
) => {
  return useMutation({
    mutationFn: updateTestHandler,
    ...options
  })
}
