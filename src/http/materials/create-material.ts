import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { CreateMaterialType } from '@/validators/material/create-material-validator'

import { Metadata } from '@/types/common/metadata'

interface CreateMaterialPayload {
  form: CreateMaterialType
  class_id: number
}

interface CreateMaterialResponse {
  meta: Metadata
}

export const createMaterialHandler = async ({
  form,
  class_id
}: CreateMaterialPayload): Promise<CreateMaterialResponse> => {
  const { data } = await api.post<CreateMaterialResponse>(`/classes/${class_id}/materials`, form)

  return data
}

export const useCreateMaterial = (
  options?: Partial<UseMutationOptions<CreateMaterialResponse, AxiosError<any>, CreateMaterialPayload>>
) => {
  return useMutation({
    mutationFn: createMaterialHandler,
    ...options
  })
}
