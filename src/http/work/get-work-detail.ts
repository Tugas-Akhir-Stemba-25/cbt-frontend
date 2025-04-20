import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { Metadata } from '@/types/common/metadata'
import { Work } from '@/types/work/work'

interface GetWorkDetailParams {
  hash: string
}

interface GetWorkDetailResponse {
  meta: Metadata
  data: Work
}

export const getWorkDetailKey = (hash: string) => {
  return ['work', 'detail', ...extractSortedObject({ hash })]
}

export const getWorkDetailHandler = async ({ hash }: GetWorkDetailParams): Promise<GetWorkDetailResponse> => {
  const response = await api.get<GetWorkDetailResponse>(`/works/${hash}`)

  return response.data
}

export const useGetWorkDetail = (
  { hash }: GetWorkDetailParams,
  options?: Partial<UseQueryOptions<GetWorkDetailResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getWorkDetailKey(hash),
    queryFn: () => getWorkDetailHandler({ hash }),
    ...options
  })
}
