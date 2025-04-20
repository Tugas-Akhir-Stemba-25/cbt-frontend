import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { MetadataWithPagination } from '@/types/common/metadata'
import { Test } from '@/types/test/test-list'

export interface GetTestListParams {
  search?: string
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  material_id: number
}

interface GetTestListResponse {
  meta: MetadataWithPagination
  data: Test[]
}

export const getTestListKey = (params: GetTestListParams): string[] => {
  return ['test', 'list', ...extractSortedObject(params)]
}

export const getTestListHandler = async ({
  search,
  page,
  per_page = 10,
  sort_by,
  sort_order,
  material_id
}: GetTestListParams): Promise<GetTestListResponse> => {
  const { data } = await api.get<GetTestListResponse>(`/materials/${material_id}/tests`, {
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

export const useGetTestList = (
  { search, page, per_page, sort_by, sort_order, material_id }: GetTestListParams,
  options?: Partial<UseQueryOptions<GetTestListResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getTestListKey({ search, page, per_page, sort_by, sort_order, material_id }),
    queryFn: () => getTestListHandler({ search, page, per_page, sort_by, sort_order, material_id }),
    ...options
  })
}
