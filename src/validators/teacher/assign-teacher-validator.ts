import { z } from 'zod'

export const assignTeacherSchema = z.object({
  class_id: z.number({ invalid_type_error: 'Kelas harus dipilih' }).int().positive({ message: 'Kelas tidak valid' })
})

export type AssignTeacherType = z.infer<typeof assignTeacherSchema>
