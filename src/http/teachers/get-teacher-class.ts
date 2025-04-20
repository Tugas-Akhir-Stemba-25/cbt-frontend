import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { TeacherClassResponse } from '@/types/common/teacherResponse'

interface TeacherClassParams {
  teacherid: number
}

export const getTeacherClassKey = (id: number) => {
  return ['teacher', 'class', id]
}

export const getTeacherClassHandler = async ({ teacherid }: TeacherClassParams): Promise<TeacherClassResponse> => {
  const { data } = await api.get(`/teachers/${teacherid}/classes`)

  return data
}

export const useGetTeacherClass = (
  { teacherid }: TeacherClassParams,
  options?: Partial<UseQueryOptions<TeacherClassResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getTeacherClassKey(teacherid),
    queryFn: () => getTeacherClassHandler({ teacherid }),
    ...options
  })
}
