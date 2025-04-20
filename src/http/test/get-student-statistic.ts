import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'
import { StudentTestStatistic } from '@/types/test/test'

interface GetStudentStatisticResponse {
  meta: Metadata
  data: StudentTestStatistic
}

export const GET_STUDENT_STATISTIC_KEY = ['test', 'student', 'statistic']

export const getStudentStatisticHandler = async (): Promise<GetStudentStatisticResponse> => {
  const { data } = await api.get<GetStudentStatisticResponse>(`/tests/statistics`)

  return data
}

export const useGetStudentStatistic = (options?: Partial<UseQueryOptions<GetStudentStatisticResponse, AxiosError>>) => {
  return useQuery({
    queryKey: GET_STUDENT_STATISTIC_KEY,
    queryFn: getStudentStatisticHandler,
    ...options
  })
}
