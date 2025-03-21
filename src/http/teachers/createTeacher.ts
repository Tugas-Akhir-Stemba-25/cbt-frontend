import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'
import { queryClient } from '@/lib/reactQuery'

import { TeacherResponse } from '@/types/common/teacherResponse'
import { TEACHERS } from '@/types/query_key/teacher'

interface TeacherPayload {
  name: string
  username: string
  password: string
}

export const postTeacherData = async (data: TeacherPayload): Promise<TeacherResponse> => {
  const response = await api.post('/teachers', data)
  return response.data
}

export const usePostTeacherData = (options?: UseMutationOptions<TeacherResponse, AxiosError, TeacherPayload>) => {
  return useMutation<TeacherResponse, AxiosError, TeacherPayload>({
    mutationFn: postTeacherData,
    onSuccess: (data) => {
      console.log('Success submit:', data)
      queryClient.invalidateQueries({
        queryKey: TEACHERS.list(),
        exact: false
      })
    },
    ...options
  })
}
