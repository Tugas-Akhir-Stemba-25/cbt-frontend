import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { MetadataWithPagination } from '@/types/common/metadata'
import { Material } from '@/types/material/material-list'

export interface GetMaterialListParams {
  search?: string
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  class_id?: number
}

interface GetMaterialListResponse {
  meta: MetadataWithPagination
  data: Material[]
}

export const getMaterialKey = (params: GetMaterialListParams): string[] => {
  return ['material', 'list', ...extractSortedObject(params)]
}

export const getMaterialListHandler = async ({
  search,
  page,
  per_page = 10,
  sort_by,
  sort_order,
  class_id
}: GetMaterialListParams) => {
  const { data } = await api.get<GetMaterialListResponse>(`/classes/${class_id}/materials`, {
    params: {
      search,
      page,
      per_page,
      sort_by,
      sort_order
    }
  })

  return data
}

export const useGetMaterialList = (
  { search, page, per_page, sort_by, sort_order, class_id }: GetMaterialListParams,
  options?: Partial<UseQueryOptions<GetMaterialListResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getMaterialKey({ search, page, per_page, sort_by, sort_order, class_id }),
    queryFn: () => getMaterialListHandler({ search, page, per_page, sort_by, sort_order, class_id }),
    ...options
  })
}
