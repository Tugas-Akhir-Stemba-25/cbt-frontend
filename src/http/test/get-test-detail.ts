import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'
import { TestDetail } from '@/types/test/test'

interface GetTestDetailParams {
  testId: number
}

interface GetTestDetailResponse {
  meta: Metadata
  data: TestDetail
}

export const getTestDetailKey = (params: GetTestDetailParams): string[] => {
  return ['test', 'detail', String(params.testId)]
}
export const getTestDetailHandler = async ({ testId }: GetTestDetailParams): Promise<GetTestDetailResponse> => {
  const { data } = await api.get<GetTestDetailResponse>(`/tests/${testId}`)

  return data
}

export const useGetTestDetail = (
  { testId }: GetTestDetailParams,
  options?: Partial<UseQueryOptions<GetTestDetailResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getTestDetailKey({ testId }),
    queryFn: () => getTestDetailHandler({ testId }),
    ...options
  })
}
