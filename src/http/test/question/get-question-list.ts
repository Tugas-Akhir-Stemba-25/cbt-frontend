import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { MetadataWithPagination } from '@/types/common/metadata'
import { QuestionList } from '@/types/question/question'

export interface GetQuestionListParams {
  testId: number
  search?: string
  page?: number
  per_page?: number
}

export interface GetQuestionListResponse {
  meta: MetadataWithPagination
  data: QuestionList[]
}

export const getQuestionListKey = (params: GetQuestionListParams): string[] => {
  return ['question', 'list', ...extractSortedObject(params)]
}

export const getQuestionListHandler = async ({
  testId,
  search,
  page,
  per_page = 10
}: GetQuestionListParams): Promise<GetQuestionListResponse> => {
  const { data } = await api.get<GetQuestionListResponse>(`/tests/${testId}/questions`, {
    params: {
      search,
      page,
      per_page
    }
  })

  return data
}

export const useGetQuestionList = (
  { testId, search, page, per_page }: GetQuestionListParams,
  options?: Partial<UseQueryOptions<GetQuestionListResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getQuestionListKey({ testId, search, page, per_page }),
    queryFn: () => getQuestionListHandler({ testId, search, page, per_page }),
    ...options
  })
}
