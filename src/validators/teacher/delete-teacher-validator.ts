import { z } from 'zod'

export const deleteTeacherSchema = z.object({
  username: z.string().min(1, { message: 'Username harus diisi' })
})

export type DeleteTeacherType = z.infer<typeof deleteTeacherSchema>
