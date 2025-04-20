import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'
import { MajorOption } from '@/types/major/major-option'

interface GetMajorOptionResponse {
  meta: Metadata
  data: MajorOption[]
}

export const MAJOR_OPTION_KEY = ['major', 'option']

export const getMajorOption = async () => {
  const { data } = await api.get<GetMajorOptionResponse>('/majors/options')

  return data
}

export const useGetMajorOption = (options?: Partial<UseQueryOptions<GetMajorOptionResponse, AxiosError>>) => {
  return useQuery({
    queryKey: MAJOR_OPTION_KEY,
    queryFn: getMajorOption,
    ...options
  })
}
