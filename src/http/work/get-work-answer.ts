import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { Metadata } from '@/types/common/metadata'
import { WorkAnswer } from '@/types/work/work'

interface GetWorkAnswerParams {
  hash: string
}

interface GetWorkAnswerResponse {
  meta: Metadata
  data: WorkAnswer[]
}

export const getWorkAnswerKey = (hash: string) => {
  return ['work', 'answer', ...extractSortedObject({ hash })]
}

export const getWorkAnswerHandler = async ({ hash }: GetWorkAnswerParams): Promise<GetWorkAnswerResponse> => {
  const response = await api.get<GetWorkAnswerResponse>(`/works/${hash}/answers`)

  return response.data
}

export const useGetWorkAnswer = (
  { hash }: GetWorkAnswerParams,
  options?: Partial<UseQueryOptions<GetWorkAnswerResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getWorkAnswerKey(hash),
    queryFn: () => getWorkAnswerHandler({ hash }),
    ...options
  })
}
