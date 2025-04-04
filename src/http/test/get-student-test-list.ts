import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { Metadata } from '@/types/common/metadata'
import { TestItem } from '@/types/test/test'

export interface GetStudentTestListParams {
  filter: string
}

interface GetStudentTestListResponse {
  meta: Metadata
  data: TestItem[]
}

export const getStudentTestListKey = (params: GetStudentTestListParams): string[] => {
  return ['test', 'student', 'list', ...extractSortedObject(params)]
}

export const getStudentTestListHandler = async ({
  filter
}: GetStudentTestListParams): Promise<GetStudentTestListResponse> => {
  const { data } = await api.get<GetStudentTestListResponse>(`/tests`, {
    params: {
      filter
    }
  })

  return data
}

export const useGetStudentTestList = (
  { filter }: GetStudentTestListParams,
  options?: Partial<UseQueryOptions<GetStudentTestListResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getStudentTestListKey({ filter }),
    queryFn: () => getStudentTestListHandler({ filter }),
    ...options
  })
}
