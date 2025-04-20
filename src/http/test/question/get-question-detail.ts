import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { Metadata } from '@/types/common/metadata'
import { QuestionDetail } from '@/types/question/question'

export interface GetQuestionDetailParams {
  questionId: number
}

interface GetQuestionDetailResponse {
  meta: Metadata
  data: QuestionDetail
}

export const getQuestionDetailKey = (params: GetQuestionDetailParams): string[] => {
  return ['question', 'detail', ...extractSortedObject(params)]
}

export const getQuestionDetailHandler = async ({
  questionId
}: GetQuestionDetailParams): Promise<GetQuestionDetailResponse> => {
  const { data } = await api.get<GetQuestionDetailResponse>(`/questions/${questionId}`)

  return data
}

export const useGetQuestionDetail = (
  { questionId }: GetQuestionDetailParams,
  options?: Partial<UseQueryOptions<GetQuestionDetailResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getQuestionDetailKey({ questionId }),
    queryFn: () => getQuestionDetailHandler({ questionId }),
    ...options
  })
}
