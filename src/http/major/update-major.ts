import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { EditMajorType } from '@/validators/major/edit-major-validator'

import { Metadata } from '@/types/common/metadata'

interface UpdateMajorPayload {
  form: EditMajorType
  id: number
}

interface UpdateMajorResponse {
  meta: Metadata
}

export const updateMajorHandler = async ({ form, id }: UpdateMajorPayload): Promise<UpdateMajorResponse> => {
  const { data } = await api.put<UpdateMajorResponse>(`/majors/${id}`, form)

  return data
}

export const useUpdateMajor = (
  options?: Partial<UseMutationOptions<UpdateMajorResponse, AxiosError<any>, UpdateMajorPayload>>
) => {
  return useMutation({
    mutationFn: updateMajorHandler,
    ...options
  })
}
