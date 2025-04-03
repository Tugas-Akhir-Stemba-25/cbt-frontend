import { z } from 'zod'

export const testDetailSchema = z.object({
  name: z.string().min(1, 'Nama ujian tidak boleh kosong'),
  date: z.string().date('Tanggal tidak valid'),
  start_time: z.string().time('Waktu mulai harus valid'),
  end_time: z.string().time('Waktu berakhir harus valid'),
  duration: z.number().min(1, {
    message: 'Durasi harus valid'
  }),
  material: z
    .number({
      message: 'Mata pelajaran harus diisi'
    })
    .min(1, {
      message: 'Pilih mata pelajaran'
    })
})

export type TestDetailType = z.infer<typeof testDetailSchema>
