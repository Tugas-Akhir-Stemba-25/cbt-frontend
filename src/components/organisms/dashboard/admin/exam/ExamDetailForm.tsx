'use client'

import { useEffect, useState } from 'react'

import { addMinutes, differenceInMinutes, format, parse } from 'date-fns'
import { UseFormReturn } from 'react-hook-form'

import useMaterialStore from '@/stores/useMaterialStore'

import { TestDetailType } from '@/validators/test/test-detail-validator'

import MaterialCombobox from '@/components/atoms/combobox/MaterialCombobox'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface ExamDetailFormProps {
  form: UseFormReturn<TestDetailType>
  setTab: (tab: string) => void
}

const ExamDetailForm = ({ form, setTab }: ExamDetailFormProps) => {
  const [startTime, setStartTime] = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)

  const { selectedMaterial } = useMaterialStore()

  const onSubmit = () => {
    if (selectedMaterial) {
      console.log(form.getValues())
    }
  }

  const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      const parsedValue = parseInt(value, 10)
      if (!isNaN(parsedValue) && parsedValue > 0 && date) {
        const dateOnly = format(date, 'yyyy-MM-dd')

        const startDate = parse(`${dateOnly} ${startTime}:00`, 'yyyy-MM-dd HH:mm:ss', new Date())

        const endDate = addMinutes(startDate, parsedValue)

        const endTime = format(endDate, 'HH:mm')
        setEndTime(endTime)
        setDuration(parsedValue)
      }
    }
  }

  const handleChangeDate = (date: Date | undefined) => {
    if (date) {
      setDate(date)
    }
  }

  const handleChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value && date) {
      const dateOnly = format(date, 'yyyy-MM-dd')

      const startDate = parse(`${dateOnly} ${startTime}:00`, 'yyyy-MM-dd HH:mm:ss', new Date())

      const endDate = parse(`${dateOnly} ${value}:00`, 'yyyy-MM-dd HH:mm:ss', new Date())

      const duration = differenceInMinutes(endDate, startDate)

      setDuration(duration)
      setEndTime(value)
    }
  }

  const handleChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value && date) {
      const dateOnly = format(date, 'yyyy-MM-dd')

      const startDate = parse(`${dateOnly} ${value}:00`, 'yyyy-MM-dd HH:mm:ss', new Date())

      const endDate = addMinutes(startDate, duration || 1)

      const endTime = format(endDate, 'HH:mm')

      setDuration(duration || 1)
      setEndTime(endTime)
      setStartTime(value)
    }
  }

  useEffect(() => {
    if (startTime) {
      form.setValue('start_time', `${startTime}:00`)
      form.trigger('start_time')
    }

    if (duration) {
      form.setValue('duration', duration as number)
      form.trigger('duration')
    }

    if (date) {
      form.setValue('date', format(date, 'yyyy-MM-dd'))

      form.trigger('date')
    }

    if (selectedMaterial) {
      form.setValue('material', selectedMaterial as number)
      form.trigger('material')
    }

    if (endTime) {
      form.setValue('end_time', `${endTime}:00`)
      form.trigger('end_time')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime, date, startTime, duration, selectedMaterial])

  useEffect(() => {
    if (form.getValues('start_time')) {
      const parsedStartTime = parse(form.getValues('start_time'), 'HH:mm:ss', new Date())
      const formattedStartTime = format(parsedStartTime, 'HH:mm')

      setStartTime(formattedStartTime)
    }

    if (form.getValues('end_time')) {
      const parsedEndTime = parse(form.getValues('end_time'), 'HH:mm:ss', new Date())
      const formattedEndTime = format(parsedEndTime, 'HH:mm')

      setEndTime(formattedEndTime)
    }

    if (form.getValues('date')) {
      setDate(new Date(form.getValues('date')))
    }

    if (form.getValues('duration')) {
      setDuration(form.getValues('duration'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <h3 className="text-lg font-semibold">1. Deskripsi Ujian</h3>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Ujian</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="material"
            render={() => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Mata Pelajaran</FormLabel>
                <FormControl>
                  <MaterialCombobox length={-1} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-lg font-semibold">2. Waktu Ujian</h3>

          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="date"
              render={() => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Tanggal</FormLabel>
                  <FormControl>
                    <DatePicker
                      initialValue={date ?? new Date()}
                      onChange={(e) => {
                        handleChangeDate(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={() => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Durasi</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={duration ?? 0}
                      disabled={!startTime}
                      onChange={(e) => {
                        handleChangeDuration(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_time"
              render={() => (
                <FormItem>
                  <FormLabel>Waktu Mulai</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      id="time"
                      value={startTime ?? ''}
                      aria-label="Pilih waktu"
                      onChange={(e) => {
                        handleChangeStartTime(e)
                      }}
                    />
                  </FormControl>
                  <FormDescription>*Menunjukkan waktu ujian dapat dikerjakan peserta</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_time"
              render={() => (
                <FormItem>
                  <FormLabel>Waktu Selesai</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      id="time"
                      aria-label="Pilih waktu"
                      value={endTime ?? ''}
                      onChange={(e) => {
                        handleChangeEndTime(e)
                      }}
                    />
                  </FormControl>
                  <FormDescription>*Menunjukkan waktu ujian ditutup</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isValid} onClick={() => setTab('settings')}>
              Selanjutnya
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ExamDetailForm
