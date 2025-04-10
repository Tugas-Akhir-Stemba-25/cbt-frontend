import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { GetStudentListResponse } from '@/types/common/studentResponse'

export interface StudentParams {
  search?: string
  classId: number
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}

export const getStudentKey = (params: StudentParams): string[] => {
  return ['student', 'list', ...extractSortedObject(params)]
}

export const getStudentListHandler = async ({
  search,
  page,
  per_page = 10,
  sort_by,
  classId,
  sort_order
}: StudentParams) => {
  const { data } = await api.get<GetStudentListResponse>(`/classes/${classId}/students`, {
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

export const useGetStudentList = (
  { search, page, per_page, sort_by, classId, sort_order }: StudentParams,
  options?: Partial<UseQueryOptions<GetStudentListResponse>>
) => {
  return useQuery({
    queryKey: getStudentKey({ search, page, per_page, sort_by, classId, sort_order }),
    queryFn: () => getStudentListHandler({ search, page, per_page, sort_by, classId, sort_order }),
    ...options
  })
}
