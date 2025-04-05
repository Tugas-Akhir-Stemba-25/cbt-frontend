import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { Metadata } from '@/types/common/metadata'
import { WorkQuestion } from '@/types/work/work'

interface GetWorkQuestionParams {
  hash: string
}

interface GetWorkQuestionResponse {
  meta: Metadata
  data: WorkQuestion[]
}

export const getWorkQuestionKey = (hash: string) => {
  return ['work', 'question', ...extractSortedObject({ hash })]
}

export const GetWorkQuestionHandler = async ({ hash }: GetWorkQuestionParams): Promise<GetWorkQuestionResponse> => {
  const response = await api.get<GetWorkQuestionResponse>(`/works/${hash}/questions`)

  return response.data
}

export const useGetWorkQuestion = (
  { hash }: GetWorkQuestionParams,
  options?: Partial<UseQueryOptions<GetWorkQuestionResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getWorkQuestionKey(hash),
    queryFn: () => GetWorkQuestionHandler({ hash }),
    ...options
  })
}
