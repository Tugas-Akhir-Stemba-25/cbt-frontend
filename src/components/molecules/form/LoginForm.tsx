'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { LoginType, loginSchema } from '@/validators/auth/login-validator'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const LoginForm = () => {
  const form = useForm<LoginType>({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  })

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-[40px]">Masuk Akun</h1>
        <p>Masukkan username dan password akun Anda</p>
      </div>
      <Form {...form}>
        <form onSubmit={() => console.log('ok')} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
