import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { Metadata } from '@/types/common/metadata'

interface GetTestQuestionIdsParams {
  testId: number
}

interface GetTestQuestionIdsResponse {
  meta: Metadata
  data: {
    question_ids: number[]
  }
}

export const getTestQuestionIdsKey = (params: GetTestQuestionIdsParams): string[] => {
  return ['test', 'question', 'ids', ...extractSortedObject(params)]
}

export const getTestQuestionIdsHandler = async ({
  testId
}: GetTestQuestionIdsParams): Promise<GetTestQuestionIdsResponse> => {
  const { data } = await api.get<GetTestQuestionIdsResponse>(`/tests/${testId}/questions/ids`)

  return data
}

export const useGetTestQuestionIds = (
  { testId }: GetTestQuestionIdsParams,
  options?: Partial<UseQueryOptions<GetTestQuestionIdsResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getTestQuestionIdsKey({ testId }),
    queryFn: () => getTestQuestionIdsHandler({ testId }),
    ...options
  })
}
