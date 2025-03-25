import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { MetadataWithPagination } from '@/types/common/metadata'
import { Major } from '@/types/major/major-list'

export interface GetMajorListParams {
  search?: string
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}

interface GetMajorListResponse {
  meta: MetadataWithPagination
  data: Major[]
}

export const getMajorKey = (params: GetMajorListParams): string[] => {
  return ['major', 'list', ...extractSortedObject(params)]
}

export const getMajorListHandler = async ({ search, page, per_page = 10, sort_by, sort_order }: GetMajorListParams) => {
  const { data } = await api.get<GetMajorListResponse>('/majors', {
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

export const useGetMajorList = (
  { search, page, per_page, sort_by, sort_order }: GetMajorListParams,
  options?: Partial<UseQueryOptions<GetMajorListResponse, AxiosError>>
) => {
  console.log(getMajorKey({ search, page, per_page, sort_by, sort_order }))
  return useQuery({
    queryKey: getMajorKey({ search, page, per_page, sort_by, sort_order }),
    queryFn: () => getMajorListHandler({ search, page, per_page, sort_by, sort_order }),
    ...options
  })
}
