import { z } from 'zod'

export const editMajorSchema = z.object({
  name: z
    .string({
      message: 'Nama jurusan harus berupa string'
    })
    .optional(),
  // .min(1, {
  //   message: 'Nama jurusan tidak boleh kosong'
  // })
  // .max(255),
  short_name: z
    .string({
      message: 'Nama singkat jurusan harus berupa string'
    })
    .optional()
  // .min(1, {
  //   message: 'Nama singkat jurusan tidak boleh kosong'
  // })
  // .max(255)
})

export type EditMajorType = z.infer<typeof editMajorSchema>
