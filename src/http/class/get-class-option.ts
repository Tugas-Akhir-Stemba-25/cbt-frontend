import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { ClassOption } from '@/types/class/class-option'
import { Metadata } from '@/types/common/metadata'

interface GetClassOptionResponse {
  meta: Metadata
  data: ClassOption[]
}

export const CLASS_OPTION_KEY = ['class', 'option']

export const getClassOption = async () => {
  const { data } = await api.get<GetClassOptionResponse>('/classes/options')

  return data
}

export const useGetClassOption = (options?: Partial<UseQueryOptions<GetClassOptionResponse, AxiosError>>) => {
  return useQuery({
    queryKey: CLASS_OPTION_KEY,
    queryFn: getClassOption,
    ...options
  })
}
