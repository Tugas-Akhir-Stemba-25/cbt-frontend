import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Username tidak boleh kosong'),
  password: z.string().nonempty('Password tidak boleh kosong')
})

export type LoginType = z.infer<typeof loginSchema>
