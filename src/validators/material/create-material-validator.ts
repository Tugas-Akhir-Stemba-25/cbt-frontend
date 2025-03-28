import { z } from 'zod'

export const createMaterialSchema = z.object({
  name: z.string().nonempty('Nama tidak boleh kosong'),
  user_id: z.number().int().positive('Guru pengampu tidak boleh kosong').optional()
})

export type CreateMaterialType = z.infer<typeof createMaterialSchema>
