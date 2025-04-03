import { z } from 'zod'

export const testSettingSchema = z.object({
  is_randomize_question: z.boolean().default(false),
  is_randomize_answer: z.boolean().default(false),
  is_show_grade: z.boolean().default(false),
  is_show_answer: z.boolean().default(false)
})

export type TestSettingType = z.infer<typeof testSettingSchema>
