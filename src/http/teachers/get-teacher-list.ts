import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { extractSortedObject } from '@/utils/object'

import { TeacherListResponse } from '@/types/common/teacherResponse'

interface TeacherParams {
  search?: string
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  teacherId?: number
}

export const getTeacherKey = (params: TeacherParams): string[] => {
  return ['teacher', 'list', ...extractSortedObject(params)]
}

export const getTeacherListHandler = async ({ search, page, per_page = 10, sort_by, sort_order }: TeacherParams) => {
  const { data } = await api.get<TeacherListResponse>('/teachers', {
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

export const useGetTeacherList = (
  { search, page, per_page, sort_by, sort_order }: TeacherParams,
  options?: Partial<UseQueryOptions<TeacherListResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getTeacherKey({ search, page, per_page, sort_by, sort_order }),
    queryFn: () => getTeacherListHandler({ search, page, per_page, sort_by, sort_order }),
    ...options
  })
}
