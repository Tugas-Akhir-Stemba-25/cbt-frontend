import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface DeleteQuestionImageParams {
  questionId: number
}

interface DeleteQuestionImageResponse {
  meta: Metadata
}

export const deleteQuestionImageHandler = async ({
  questionId
}: DeleteQuestionImageParams): Promise<DeleteQuestionImageResponse> => {
  const { data } = await api.delete<DeleteQuestionImageResponse>(`/questions/${questionId}/images`)

  return data
}

export const useDeleteQuestionImage = (
  options?: Partial<UseMutationOptions<DeleteQuestionImageResponse, AxiosError<any>, DeleteQuestionImageParams>>
) => {
  return useMutation({
    mutationFn: ({ questionId }: DeleteQuestionImageParams) => deleteQuestionImageHandler({ questionId }),
    ...options
  })
}
