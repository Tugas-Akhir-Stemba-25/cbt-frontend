import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface FinishWorkParams {
  hash: string
}

interface FinishWorkResponse {
  meta: Metadata
}

export const finishWorkHandler = async ({ hash }: FinishWorkParams): Promise<FinishWorkResponse> => {
  const response = await api.patch<FinishWorkResponse>(`/works/${hash}/finish`)

  return response.data
}

export const useFinishWork = (
  options?: Partial<UseMutationOptions<FinishWorkResponse, AxiosError<any>, FinishWorkParams>>
) => {
  return useMutation({
    mutationFn: finishWorkHandler,
    ...options
  })
}
