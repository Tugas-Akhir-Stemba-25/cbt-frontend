import { z } from 'zod'

const isClient = typeof window !== 'undefined'

export const editQuestionSchema = z
  .object({
    question: z.string().min(1, { message: 'Pertanyaan tidak boleh kosong' }),
    image: isClient
      ? z
          .instanceof(File)
          .refine((f) => ['image/jpg', 'image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(f.type))
          .optional()
          .nullable()
      : z.any().optional().nullable(),
    answers: z
      .array(
        z.object({
          id: z.number().nullable(),
          answer: z.string().min(1, { message: 'Jawaban tidak boleh kosong' })
          // correct: z.boolean().default(false)
        })
      )
      .min(1, { message: 'Jawaban tidak boleh kosong' }),
    correct_answer_idx: z.number().min(0, { message: 'Jawaban tidak boleh kosong' })
  })
  .refine(
    (data) => {
      const { answers, correct_answer_idx } = data
      return answers.length > correct_answer_idx
    },
    {
      message: 'Jawaban tidak valid',
      path: ['correct_answer_idx']
    }
  )
  .refine(
    (data) => {
      const { answers } = data
      return answers.length >= 2
    },
    {
      message: 'Minimal 2 jawaban'
    }
  )

export type EditQuestionType = z.infer<typeof editQuestionSchema>
