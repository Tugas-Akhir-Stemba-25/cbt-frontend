import { z } from 'zod'

export const editTeacherSchema = z.object({
  name: z
    .string({
      message: 'Nama harus berupa string'
    })
    .min(1, {
      message: 'Nama harus diisi'
    })
    .max(255),
  username: z
    .string({
      message: 'Username harus berupa string'
    })
    .min(1, { message: 'Username harus diisi' })
    .max(255),
  password: z.string().min(1, { message: 'Password harus diisi' })
})

export type EditTeacherType = z.infer<typeof editTeacherSchema>
