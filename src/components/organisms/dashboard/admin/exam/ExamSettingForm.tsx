import { UseFormReturn } from 'react-hook-form'

import { TestSettingType } from '@/validators/test/test-setting-validator'

import DefaultSelect from '@/components/atoms/select/DefaultSelect'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface ExamSettingFormProps {
  form: UseFormReturn<TestSettingType>
  onSubmit: () => void
  submitLoading?: boolean
  isEdit?: boolean
}
const ExamSettingForm = ({ form, onSubmit: submitForm, submitLoading, isEdit }: ExamSettingFormProps) => {
  const isShowGradeWatch = form.watch('is_show_grade')
  const isShowAnswerWatch = form.watch('is_show_answer')
  const isRandomizeQuestionWatch = form.watch('is_randomize_question')
  const isRandomizeAnswerWatch = form.watch('is_randomize_answer')

  const onSubmit = () => {
    submitForm()
  }

  return (
    <div className="h-full w-full flex-col rounded-xl border border-[rgba(3,7,18,0.10)] p-5">
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(onSubmit, (e) => {
              console.log(e)
              console.log(form.getValues())
            })()
          }}
        >
          <h3 className="text-lg font-semibold">1. Pengacakan</h3>
          <FormField
            control={form.control}
            name="is_randomize_question"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="w-1/4">Acak Soal</FormLabel>
                <div className="flex w-full flex-col gap-2">
                  <FormControl>
                    <DefaultSelect
                      defaultValue={String(isRandomizeQuestionWatch)}
                      data={[
                        { value: 'false', label: 'Jangan Acak' },
                        { value: 'true', label: 'Acak Soal' }
                      ]}
                      onValueChange={(val: string) => {
                        field.onChange(val === 'true')
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Peserta ujian akan mendapatkan urutan soal sesuai dengan yang dibuat.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_randomize_answer"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="w-1/4">Acak Jawaban</FormLabel>
                <div className="flex w-full flex-col gap-2">
                  <FormControl>
                    <DefaultSelect
                      defaultValue={String(isRandomizeAnswerWatch)}
                      data={[
                        { value: 'false', label: 'Jangan Acak' },
                        { value: 'true', label: 'Acak Jawaban' }
                      ]}
                      onValueChange={(val: string) => {
                        field.onChange(val === 'true')
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Peserta ujian akan mendapatkan urutan opsi jawaban sesuai dengan yang dibuat.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <h3 className="text-lg font-semibold">2. Hasil Ujian</h3>
          <FormField
            control={form.control}
            name="is_show_grade"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="w-1/4">Tampilkan Nilai Akhir</FormLabel>
                <div className="flex w-full flex-col gap-2">
                  <FormControl>
                    <DefaultSelect
                      defaultValue={String(isShowGradeWatch)}
                      data={[
                        { value: 'false', label: 'Jangan Tampilkan' },
                        { value: 'true', label: 'Tampilkan' }
                      ]}
                      onValueChange={(val: string) => {
                        field.onChange(val === 'true')
                      }}
                    />
                  </FormControl>
                  <FormDescription>Peserta tidak dapat melihat nilai akhir ujian.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_show_answer"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="w-1/4">Tampilkan Kunci Jawaban</FormLabel>
                <div className="flex w-full flex-col gap-2">
                  <FormControl>
                    <DefaultSelect
                      defaultValue={String(isShowAnswerWatch)}
                      data={[
                        { value: 'false', label: 'Jangan Tampilkan' },
                        { value: 'true', label: 'Tampilkan Jawaban Benar' }
                      ]}
                      onValueChange={(val: string) => {
                        field.onChange(val === 'true')
                      }}
                    />
                  </FormControl>
                  <FormDescription>Peserta tidak dapat melihat opsi jawaban yang benar.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isValid} isLoading={submitLoading}>
              {isEdit ? 'Simpan' : 'Buat Ujian'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ExamSettingForm
