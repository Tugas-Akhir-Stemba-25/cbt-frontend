import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface GetTeacherCountResponse {
  meta: Metadata
  data: {
    count: number
  }
}
export const TEACHER_COUNT_QUERY_KEY = ['teacher', 'count']

export const getTeacherCountHandler = async (): Promise<GetTeacherCountResponse> => {
  const { data } = await api.get<GetTeacherCountResponse>('/teachers/count')

  return data
}

export const useGetTeacherCount = (options?: Partial<UseQueryOptions<GetTeacherCountResponse, AxiosError>>) => {
  return useQuery({
    queryKey: TEACHER_COUNT_QUERY_KEY,
    queryFn: getTeacherCountHandler,
    ...options
  })
}
