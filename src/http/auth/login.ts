import { Metadata } from 'next'

import { api } from '@/lib/axios'

import { LoginType } from '@/validators/auth/login-validator'

type LoginResponse = {
  meta: Metadata
  data: {
    token: string
    id: string
  }
}

export const loginApiHandler = async (body: LoginType): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/auth/login', body)
  return data
}
