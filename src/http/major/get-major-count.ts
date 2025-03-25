import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface GetMajorCountResponse {
  meta: Metadata
  data: {
    count: number
  }
}

export const MAJOR_COUNT_QUERY_KEY = ['major', 'count']

export const getMajorCountHandler = async (): Promise<GetMajorCountResponse> => {
  const { data } = await api.get<GetMajorCountResponse>('/majors/count')

  return data
}

export const useGetMajorCount = (options?: Partial<UseQueryOptions<GetMajorCountResponse, AxiosError>>) => {
  return useQuery({
    queryKey: MAJOR_COUNT_QUERY_KEY,
    queryFn: getMajorCountHandler,
    ...options
  })
}
