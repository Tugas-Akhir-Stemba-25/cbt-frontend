import { z } from 'zod'

export const createMajorSchema = z.object({
  name: z
    .string({
      message: 'Nama jurusan harus berupa string'
    })
    .min(1, {
      message: 'Nama jurusan tidak boleh kosong'
    })
    .max(255),
  short_name: z
    .string({
      message: 'Nama singkat jurusan harus berupa string'
    })
    .min(1, {
      message: 'Nama singkat jurusan tidak boleh kosong'
    })
    .max(255)
})

export type CreateMajorType = z.infer<typeof createMajorSchema>
