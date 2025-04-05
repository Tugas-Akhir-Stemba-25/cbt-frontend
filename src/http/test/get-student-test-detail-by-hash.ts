import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'
import { TestDetailStudent } from '@/types/test/test'

interface GetStudentTestDetailByHashParams {
  hash: string
}

export interface GetStudentTestDetailByHashResponse {
  meta: Metadata
  data: TestDetailStudent
}

export const getStudentTestDetailByHashKey = (hash: string) => {
  return ['test', 'student', 'detail', hash]
}

export const getStudentTestDetailByHashHandler = async ({
  hash
}: GetStudentTestDetailByHashParams): Promise<GetStudentTestDetailByHashResponse> => {
  const { data } = await api.get<GetStudentTestDetailByHashResponse>(`/works/${hash}/tests`)

  return data
}

export const useGetStudentTestDetailByHash = (
  { hash }: GetStudentTestDetailByHashParams,
  options?: Partial<UseQueryOptions<GetStudentTestDetailByHashResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getStudentTestDetailByHashKey(hash),
    queryFn: () => getStudentTestDetailByHashHandler({ hash }),
    ...options
  })
}
