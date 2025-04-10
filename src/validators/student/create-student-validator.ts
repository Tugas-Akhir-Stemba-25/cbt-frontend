import { z } from 'zod'

export const createStudentSchema = z.object({
  name: z.string().nonempty('Nama tidak boleh kosong'),
  username: z.string().nonempty('Username tidak boleh kosong'),
  year_join: z.string().nonempty('Tahun ajaran tidak boleh kosong')
})

export type CreateStudentType = z.infer<typeof createStudentSchema>
