import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { Metadata } from '@/types/common/metadata'
import { WorkResult } from '@/types/work/work'

interface GetWorkResultParams {
  hash: string
}

interface GetWorkResultResponse {
  meta: Metadata
  data: WorkResult
}

export const getWorkResultKey = (hash: string) => {
  return ['work', 'result', ...extractSortedObject({ hash })]
}

export const getWorkResultHandler = async ({ hash }: GetWorkResultParams): Promise<GetWorkResultResponse> => {
  const response = await api.get<GetWorkResultResponse>(`/works/${hash}/results`)

  return response.data
}

export const useGetWorkResult = (
  { hash }: GetWorkResultParams,
  options?: Partial<UseQueryOptions<GetWorkResultResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getWorkResultKey(hash),
    queryFn: () => getWorkResultHandler({ hash }),
    ...options
  })
}
