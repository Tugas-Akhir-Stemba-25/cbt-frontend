import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { GetStudentCountResponse } from '@/types/common/studentResponse'

export const STUDENT_COUNT_QUERY_KEY = ['student', 'count']

export const getStudentCountHandler = async (): Promise<GetStudentCountResponse> => {
  const { data } = await api.get<GetStudentCountResponse>('/students/count')

  return data
}

export const useStudentCount = (options?: Partial<UseQueryOptions<GetStudentCountResponse, AxiosError>>) => {
  return useQuery({
    queryKey: STUDENT_COUNT_QUERY_KEY,
    queryFn: getStudentCountHandler,
    ...options
  })
}
