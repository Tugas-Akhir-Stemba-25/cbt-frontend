import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { EditClassType } from '@/validators/class/edit-class-validator'

import { Metadata } from '@/types/common/metadata'

interface UpdateClassPayload {
  form: EditClassType
  id: number
}

interface UpdateClassResponse {
  meta: Metadata
}

export const updateClassHandler = async ({ form, id }: UpdateClassPayload): Promise<UpdateClassResponse> => {
  const { data } = await api.put<UpdateClassResponse>(`/classes/${id}`, form)

  return data
}

export const useUpdateClass = (
  options?: Partial<UseMutationOptions<UpdateClassResponse, AxiosError<any>, UpdateClassPayload>>
) => {
  return useMutation({
    mutationFn: updateClassHandler,
    ...options
  })
}
