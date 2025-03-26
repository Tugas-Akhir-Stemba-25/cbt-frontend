import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { Metadata } from '@/types/common/metadata'

export interface GerClassCountParams {
  major_id: number
}

interface GetClassCountResponse {
  meta: Metadata
  data: {
    count: number
  }
}

export const getClassCountKey = (params: GerClassCountParams): string[] => {
  return ['class', 'count', ...extractSortedObject(params)]
}

export const getClassCountHandler = async ({ major_id }: GerClassCountParams): Promise<GetClassCountResponse> => {
  const { data } = await api.get<GetClassCountResponse>(`/majors/${major_id}/classes/count`)

  return data
}

export const useGetClassCount = (
  { major_id }: GerClassCountParams,
  options?: Partial<UseQueryOptions<GetClassCountResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getClassCountKey({ major_id }),
    queryFn: () => getClassCountHandler({ major_id }),
    ...options
  })
}
