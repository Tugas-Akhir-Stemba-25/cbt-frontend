import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface StartTestParams {
  testId: number
}

interface StartTestResponse {
  meta: Metadata
  data: {
    hash: string
  }
}

export const startTestHandler = async ({ testId }: StartTestParams): Promise<StartTestResponse> => {
  const response = await api.post<StartTestResponse>(`/tests/${testId}/start`)

  return response.data
}

export const useStartTest = (
  options?: Partial<UseMutationOptions<StartTestResponse, AxiosError<any>, StartTestParams>>
) => {
  return useMutation({
    mutationFn: startTestHandler,
    ...options
  })
}
