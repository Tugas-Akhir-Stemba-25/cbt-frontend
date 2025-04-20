import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noAuth?: boolean
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

// Interceptor buat handle token
api.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    // Cek apakah kode ini jalan di client-side
    if (typeof window !== 'undefined') {
      const session = await getSession()

      // Cek apakah request butuh auth atau enggak
      if (!config.noAuth && session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

export { api }
