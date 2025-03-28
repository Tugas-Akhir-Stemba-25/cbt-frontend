import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'
import { TeacherOption } from '@/types/teacher/teacher-option'

interface GetTeacherOptionParams {
  class_id: number
}

interface GetTeacherOptionResponse {
  meta: Metadata
  data: TeacherOption[]
}

export const getTeacherOptionKey = (params: GetTeacherOptionParams): string[] => {
  return ['teacher', 'option', String(params.class_id)]
}

export const getTeacherOptionHandler = async ({
  class_id
}: GetTeacherOptionParams): Promise<GetTeacherOptionResponse> => {
  const { data } = await api.get<GetTeacherOptionResponse>('teachers/options', {
    params: {
      class_id
    }
  })

  return data
}

export const useGetTeacherOption = (
  { class_id }: GetTeacherOptionParams,
  options?: Partial<UseQueryOptions<GetTeacherOptionResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: getTeacherOptionKey({ class_id }),
    queryFn: () => getTeacherOptionHandler({ class_id }),
    ...options
  })
}
