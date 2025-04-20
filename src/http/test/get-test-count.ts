import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface GetTestCountParams {
  material_id: number
}

interface GetTestCountResponse {
  meta: Metadata
  data: {
    count: number
  }
}

export const getTestCountKey = (params: GetTestCountParams): string[] => {
  return ['test', 'count', String(params.material_id)]
}

export const getTestCountHandler = async ({ material_id }: GetTestCountParams): Promise<GetTestCountResponse> => {
  const { data } = await api.get<GetTestCountResponse>(`/materials/${material_id}/tests/count`)

  return data
}

export const useGetTestCount = (
  { material_id }: GetTestCountParams,
  options?: Partial<UseQueryOptions<GetTestCountResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getTestCountKey({ material_id }),
    queryFn: () => getTestCountHandler({ material_id }),
    ...options
  })
}
