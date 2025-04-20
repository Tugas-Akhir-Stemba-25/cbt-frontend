import { z } from 'zod'

export const editMaterialSchema = z.object({
  name: z.string().nonempty('Nama tidak boleh kosong'),
  user_id: z.number().int().positive('Guru pengampu tidak boleh kosong').optional()
})

export type EditMaterialType = z.infer<typeof editMaterialSchema>
