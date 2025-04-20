import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { Metadata } from '@/types/common/metadata'
import { TestStatistic } from '@/types/test/test'

interface GetTestStatisticParams {
  test_id: number
}

interface GetTestStatisticResponse {
  meta: Metadata
  data: TestStatistic
}

export const getTestStatisticKey = (params: GetTestStatisticParams): string[] => {
  return ['test', 'statistic', ...extractSortedObject(params)]
}

export const getTestStatisticHandler = async ({
  test_id
}: GetTestStatisticParams): Promise<GetTestStatisticResponse> => {
  const { data } = await api.get<GetTestStatisticResponse>(`/tests/${test_id}/statistics`)

  return data
}

export const useGetTestStatistic = (
  { test_id }: GetTestStatisticParams,
  options?: Partial<UseQueryOptions<GetTestStatisticResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getTestStatisticKey({ test_id }),
    queryFn: () => getTestStatisticHandler({ test_id }),
    ...options
  })
}
