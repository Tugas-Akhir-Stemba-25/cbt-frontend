import { useImperativeHandle, useRef, useState } from 'react'

import { Plus, Trash } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { CreateQuestionType } from '@/validators/test/question/create-question-validator'

import BasicRTEditor from '@/components/atoms/editor/BasicRTEditor'
import DefaultSelect from '@/components/atoms/select/DefaultSelect'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { triggerClassName } from '../ExamTabs'

interface QuestionEditorCreateProps {
  form: UseFormReturn<CreateQuestionType>
  isEdit?: boolean
  onSubmit: () => void
  fetchLoading?: boolean
  submitLoading?: boolean
  ref: React.Ref<{
    reset: () => void
  }>
}

const QuestionEditorCreate = ({
  form,
  onSubmit,
  isEdit,
  fetchLoading,
  submitLoading,
  ref
}: QuestionEditorCreateProps) => {
  const [answers, setAnswer] = useState<string[]>([''])
  const questionWatch = form.watch('question')

  const imageRef = useRef<HTMLInputElement>(null)

  const addAnswer = () => {
    setAnswer((prev) => [...prev, ''])
  }

  const reset = () => {
    form.reset()
    setAnswer([''])
    imageRef.current!.value = ''
  }

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        reset()
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Tambahkan Gambar</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Pilih file"
                  ref={imageRef}
                  onChange={(e) => {
                    form.setValue('image', e.target.files?.[0] ?? null)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="question"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              <FormControl>
                <BasicRTEditor onChange={(c) => form.setValue('question', c)} value={questionWatch} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Tabs className="flex w-full flex-col gap-6" defaultValue="answers">
          <TabsList className="w-max justify-stretch rounded-none border-b border-disabled bg-transparent px-0 text-sm">
            <TabsTrigger value="answers" className={triggerClassName}>
              Pilihan Jawaban
            </TabsTrigger>
            <TabsTrigger value="correct_answer" className={triggerClassName}>
              Kunci Jawaban
            </TabsTrigger>
          </TabsList>
          <TabsContent value="answers" className="mt-0 w-full p-0">
            <div className="flex flex-col gap-5">
              <div className="flex w-full justify-between">
                <p>Buat opsi jawaban sesuai kebutuhan soal</p>
                <Button variant={'subtle'} onClick={addAnswer} type="button" disabled={fetchLoading || submitLoading}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Opsi
                </Button>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="answers"
                  render={() => (
                    <FormItem className="flex flex-col gap-2">
                      <FormControl>
                        <div className="flex flex-col gap-2">
                          {answers.map((ans, index) => (
                            <div key={index} className="flex w-full items-center gap-1">
                              <FormLabel className="h-full w-24 rounded border border-gray-200 bg-slate-100 py-3 text-center">
                                Opsi {index + 1}
                              </FormLabel>
                              <Input
                                type="text"
                                value={ans}
                                onChange={(e) => {
                                  const newAnswers = [...answers]
                                  newAnswers[index] = e.target.value
                                  setAnswer(newAnswers)
                                  form.setValue('answers', newAnswers)
                                }}
                              />
                              <Button
                                variant="destructive"
                                type="button"
                                onClick={() => {
                                  const newAnswers = [...answers]
                                  newAnswers.splice(index, 1)
                                  setAnswer(newAnswers)
                                  form.setValue('answers', newAnswers)
                                }}
                                disabled={fetchLoading || submitLoading}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="correct_answer" className="mt-0 w-full p-0">
            <div className="flex flex-col gap-5">
              <div className="flex w-full justify-between">
                <p>Pilih kunci jawaban</p>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="correct_answer_idx"
                  render={() => (
                    <FormItem className="flex flex-col gap-2">
                      <FormControl>
                        <DefaultSelect
                          data={[
                            ...Array.from({ length: answers.length }, (_, i) => ({
                              value: String(i),
                              label: `Opsi ${i + 1} - ${answers[i] || ''}`
                            }))
                          ]}
                          defaultValue={String(form.getValues('correct_answer_idx'))}
                          onValueChange={(val: string) => {
                            form.setValue('correct_answer_idx', Number(val))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end">
          <Button type="submit" isLoading={submitLoading}>
            {isEdit ? 'Simpan' : 'Buat Soal'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default QuestionEditorCreate
