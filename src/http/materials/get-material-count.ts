import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

interface GetMaterialCountParams {
  class_id: number
}

interface GetMaterialCountResponse {
  meta: Metadata
  data: {
    count: number
  }
}

export const getMaterialCountKey = (params: GetMaterialCountParams): string[] => {
  return ['material', 'count', String(params.class_id)]
}

export const getMaterialCountHandler = async ({
  class_id
}: GetMaterialCountParams): Promise<GetMaterialCountResponse> => {
  const { data } = await api.get<GetMaterialCountResponse>(`/classes/${class_id}/materials/count`)

  return data
}

export const useGetMaterialCount = (
  { class_id }: GetMaterialCountParams,
  options?: Partial<UseQueryOptions<GetMaterialCountResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getMaterialCountKey({ class_id }),
    queryFn: () => getMaterialCountHandler({ class_id }),
    ...options
  })
}
