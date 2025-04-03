import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { MetadataWithPagination } from '@/types/common/metadata'
import { TestResult } from '@/types/test/test'

interface GetTestResultParams {
  test_id: number
  page?: number
  per_page?: number
  search?: string
}

interface GetTestResultResponse {
  data: TestResult[]
  meta: MetadataWithPagination
}

export const getTestResultKey = (params: GetTestResultParams): string[] => {
  return ['test', 'result', ...extractSortedObject(params)]
}

export const getTestResultHandler = async ({
  test_id,
  page,
  per_page = 10,
  search
}: GetTestResultParams): Promise<GetTestResultResponse> => {
  const { data } = await api.get<GetTestResultResponse>(`/tests/${test_id}/results`, {
    params: {
      page,
      per_page,
      search
    }
  })

  return data
}

export const useGetTestResult = (
  { test_id, page, per_page, search }: GetTestResultParams,
  options?: Partial<UseQueryOptions<GetTestResultResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getTestResultKey({ test_id, page, per_page, search }),
    queryFn: () => getTestResultHandler({ test_id, page, per_page, search }),
    ...options
  })
}
