import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { EditMaterialType } from '@/validators/material/edit-material-validator'

import { Metadata } from '@/types/common/metadata'

interface UpdateMaterialPayload {
  form: EditMaterialType
  id: number
}

interface UpdateMaterialResponse {
  meta: Metadata
}

export const updateMaterialHandler = async ({ form, id }: UpdateMaterialPayload): Promise<UpdateMaterialResponse> => {
  const { data } = await api.put<UpdateMaterialResponse>(`/materials/${id}`, form)

  return data
}

export const useUpdateMaterial = (
  options?: Partial<UseMutationOptions<UpdateMaterialResponse, AxiosError<any>, UpdateMaterialPayload>>
) => {
  return useMutation({
    mutationFn: updateMaterialHandler,
    ...options
  })
}
