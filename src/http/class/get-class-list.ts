import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { Class } from '@/types/class/class-list'
import { MetadataWithPagination } from '@/types/common/metadata'

export interface GetClassListParams {
  search?: string
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  major_id: number
}

interface GetClassListResponse {
  meta: MetadataWithPagination
  data: Class[]
}

export const getClassKey = (params: GetClassListParams): string[] => {
  return ['class', 'list', ...extractSortedObject(params)]
}

export const getClassListHandler = async ({
  search,
  page,
  per_page = 10,
  sort_by,
  sort_order,
  major_id
}: GetClassListParams) => {
  const { data } = await api.get<GetClassListResponse>(`/majors/${major_id}/classes`, {
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

export const useClassList = (
  { search, page, per_page, sort_by, sort_order, major_id }: GetClassListParams,
  options?: Partial<UseQueryOptions<GetClassListResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getClassKey({ search, page, per_page, sort_by, sort_order, major_id }),
    queryFn: () => getClassListHandler({ search, page, per_page, sort_by, sort_order, major_id }),
    ...options
  })
}
