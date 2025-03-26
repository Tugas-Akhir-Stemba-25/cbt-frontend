import { z } from 'zod'

export const createClassSchema = z.object({
  name: z
    .string({
      message: 'Nama kelas harus berupa string'
    })
    .min(1, {
      message: 'Nama kelas tidak boleh kosong'
    })
    .max(255),
  grad_year: z
    .string({
      message: 'Tahun lulus harus berupa angka'
    })
    .nonempty({
      message: 'Tahun lulus tidak boleh kosong'
    })
    .regex(/^\d+$/, {
      message: 'Tahun lulus harus berupa angka'
    })
    .max(4, {
      message: 'Tahun lulus tidak valid'
    })
    .min(4, {
      message: 'Tahun lulus tidak valid'
    })
})

export type CreateClassType = z.infer<typeof createClassSchema>
