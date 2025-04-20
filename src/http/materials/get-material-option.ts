import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'
import { MaterialOption } from '@/types/material/material-option'

interface GetMaterialOptionResponse {
  meta: Metadata
  data: MaterialOption[]
}

export const MATERIAL_OPTION_KEY = ['material', 'option']
export const getMaterialOption = async () => {
  const { data } = await api.get<GetMaterialOptionResponse>('/materials/options')

  return data
}

export const useGetMaterialOption = (options?: Partial<UseQueryOptions<GetMaterialOptionResponse, AxiosError>>) => {
  return useQuery({
    queryKey: MATERIAL_OPTION_KEY,
    queryFn: getMaterialOption,
    ...options
  })
}
