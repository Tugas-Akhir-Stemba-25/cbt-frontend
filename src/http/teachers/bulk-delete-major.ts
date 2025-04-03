import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { BulkDeleteTeacherResponse } from '@/types/common/teacherResponse'

interface BulkDeleteTeacherPayload {
  ids: number[]
}

export const bulkDeleteTeacherHandler = async ({
  ids
}: BulkDeleteTeacherPayload): Promise<BulkDeleteTeacherResponse> => {
  const { data } = await api.delete<BulkDeleteTeacherResponse>('/teachers/bulk-delete', {
    data: {
      ids
    }
  })

  return data
}

export const useBulkDeleteTeacher = (
  options?: Partial<UseMutationOptions<BulkDeleteTeacherResponse, AxiosError<any>, BulkDeleteTeacherPayload>>
) => {
  return useMutation({
    mutationFn: bulkDeleteTeacherHandler,
    ...options
  })
}
