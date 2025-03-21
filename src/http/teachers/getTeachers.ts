import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { TEACHERS } from '@/types/query_key/teacher'

interface TeacherParams {
  page?: number
  per_page?: number
  search?: string
}

interface Teacher {
  id: number
  name: string
  username: string
}

export const fetchTeachers = async (
  params?: TeacherParams
): Promise<{
  data: Teacher[]
  meta: {
    message: string
    pagination: {
      total: number
      current_page: number
      total_pages: number
      per_page: number
    }
  }
}> => {
  const { data } = await api.get('/teachers', { params })
  return data
}

export const useTeachers = (
  params?: TeacherParams,
  options?: Partial<
    UseQueryOptions<
      {
        data: Teacher[]
        meta: {
          message: string
          pagination: {
            total: number
            per_page: number
            current_page: number
            total_pages: number
          }
        }
      },
      AxiosError
    >
  >
) => {
  return useQuery({
    queryKey: [TEACHERS.list(params)],
    queryFn: () => fetchTeachers(params),
    ...options
  })
}
