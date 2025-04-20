import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { BulkDeleteStudentResponse } from '@/types/common/studentResponse'

interface BulkDeleteStudentPayload {
  ids: number[]
}

export const bulkStudentHandler = async ({ ids }: BulkDeleteStudentPayload): Promise<BulkDeleteStudentResponse> => {
  const { data } = await api.delete<BulkDeleteStudentResponse>('/students/bulk-delete', {
    data: {
      ids
    }
  })

  return data
}

export const useBulkDeleteStudent = (
  option?: Partial<UseMutationOptions<BulkDeleteStudentResponse, AxiosError<any>, BulkDeleteStudentPayload>>
) => {
  return useMutation({
    mutationFn: bulkStudentHandler,
    ...option
  })
}
