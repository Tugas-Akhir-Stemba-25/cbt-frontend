import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { loginApiHandler } from '@/http/auth/login'
import { logoutApiHandler } from '@/http/auth/logout'
import { meApiHandler } from '@/http/auth/me'

import { LoginType } from '@/validators/auth/login-validator'

import { Auth } from '@/types/common/auth'

declare module 'next-auth' {
  interface User {
    token?: string
  }

  interface Session {
    user: Auth
    access_token: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {}
      },
      authorize: async (credentials) => {
        const { username, password } = credentials as LoginType

        if (!username || !password) return null

        try {
          const { data } = await loginApiHandler({
            username,
            password
          })

          if (!data) return null

          return data
        } catch (error: any) {
          console.error(error)
          return null
        }
      }
    })
  ],
  events: {
    signOut: async (message) => {
      const token = (message as { token: { access_token: string } }).token
      await logoutApiHandler({ token: token.access_token })
    }
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (!user) return token
      return { ...token, sub: user.id, access_token: user.token }
    },
    session: async ({ session, token }) => {
      const access_token = token.access_token as string
      const auth = await meApiHandler({ token: access_token as string })

      return {
        ...session,
        user: auth.data,
        access_token: access_token
      }
    },
    redirect: ({ url }) => {
      return url
    }
  }
})
