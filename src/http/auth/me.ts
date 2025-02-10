import { api } from '@/lib/axios'

import { Auth } from '@/types/common/auth'
import { Metadata } from '@/types/common/metadata'

type MeResponse = {
  meta: Metadata
  data: Auth
}

type MePayload = {
  token: string
}

export const meApiHandler = async (payload: MePayload): Promise<MeResponse> => {
  const { data } = await api.get<MeResponse>('/auth/me', {
    headers: {
      Authorization: `Bearer ${payload.token}`
    }
  })

  return data
}
