import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'
import { TestDetailStudent } from '@/types/test/test'

interface GetStudentTestDetailParams {
  id: number
}

export interface GetStudentTestDetailResponse {
  meta: Metadata
  data: TestDetailStudent
}

export const getStudentTestDetailKey = (id: number) => {
  return ['test', 'student', 'detail', id]
}

export const getStudentTestDetailHandler = async ({
  id
}: GetStudentTestDetailParams): Promise<GetStudentTestDetailResponse> => {
  const { data } = await api.get<GetStudentTestDetailResponse>(`/tests/${id}/student`)

  return data
}

export const useGetStudentTestDetail = (
  { id }: GetStudentTestDetailParams,
  options?: Partial<UseQueryOptions<GetStudentTestDetailResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getStudentTestDetailKey(id),
    queryFn: () => getStudentTestDetailHandler({ id }),
    ...options
  })
}
