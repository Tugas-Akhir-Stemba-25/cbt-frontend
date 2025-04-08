import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'
import { TestResult } from '@/types/test/test'

export interface RestartTestPayload {
  testId: number
  userId: number
}

export interface RestartTestResponse {
  meta: Metadata
  data: TestResult
}

export const restartTestHandler = async ({ testId, userId }: RestartTestPayload): Promise<RestartTestResponse> => {
  const response = await api.delete<RestartTestResponse>(`/tests/${testId}/restart`, {
    data: { user_id: userId }
  })

  return response.data
}

export const useRestartTest = (
  options?: Partial<UseMutationOptions<RestartTestResponse, AxiosError<any>, RestartTestPayload>>
) => {
  return useMutation({
    mutationFn: restartTestHandler,
    ...options
  })
}
