import { api } from '@/lib/axios'

import { Metadata } from '@/types/common/metadata'

type LogoutResponse = {
  meta: Metadata
}

type LogoutPayload = {
  token: string
}

export const logoutApiHandler = async (payload: LogoutPayload): Promise<LogoutResponse> => {
  const { data } = await api.delete<LogoutResponse>('/auth/logout', {
    headers: {
      Authorization: `Bearer ${payload.token}`
    }
  })

  return data
}
