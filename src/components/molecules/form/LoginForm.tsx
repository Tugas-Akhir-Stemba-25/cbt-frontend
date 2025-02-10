'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { LoginType, loginSchema } from '@/validators/auth/login-validator'

import { PasswordInput } from '@/components/atoms/input/PasswordInput'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<LoginType>({
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onChange',
    resolver: zodResolver(loginSchema)
  })

  const router = useRouter()

  const onSubmit = async (data: LoginType) => {
    setIsLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      ...data
    })

    if (!res || res.error == '') {
      toast.error('Gagal Masuk', { description: 'Terjadi kesalahan, coba lagi.' })
      setIsLoading(false)
      return
    }

    if (res.error === 'CredentialsSignin') {
      toast.error('Gagal Masuk', { description: 'Username atau password salah' })
      setIsLoading(false)
      return
    }

    toast.success('Berhasil Masuk', { description: 'Anda akan diarahkan ke dashboard dalam beberapa saat' })
    setIsLoading(false)
    return router.push('/dashboard')
  }

  return (
    <div className="flex w-full flex-col items-center gap-8 sm:w-3/4 lg:w-full xl:w-2/3">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-medium">Masuk Akun</h1>
        <p className="text-sm">Masukkan username dan password akun Anda</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 p-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="*****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid || isLoading}
            isLoading={isLoading}
          >
            Masuk
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
