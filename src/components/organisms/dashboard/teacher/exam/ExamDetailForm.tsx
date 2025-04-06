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
  isEdit?: boolean
  onSubmit: () => void
  fetchLoading?: boolean
  submitLoading?: boolean
}

const ExamDetailForm = ({ form, onSubmit, isEdit, fetchLoading, submitLoading }: ExamDetailFormProps) => {
  const { selectedMaterial } = useMaterialStore()

  // 🔹 State untuk menyimpan data lokal
  const [startTime, setStartTime] = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)

  // 🔹 Watch untuk mendeteksi perubahan nilai di form
  const watchStartTime = form.watch('start_time')
  const watchEndTime = form.watch('end_time')
  const watchDate = form.watch('date')
  const watchDuration = form.watch('duration')

  useEffect(() => {
    if (watchStartTime) {
      setStartTime(format(parse(watchStartTime, 'HH:mm:ss', new Date()).toString(), 'HH:mm'))
    }

    if (watchEndTime) {
      setEndTime(format(parse(watchEndTime, 'HH:mm:ss', new Date()).toString(), 'HH:mm'))
    }

    if (watchDate) {
      setDate(new Date(watchDate))
    }

    if (watchDuration) {
      setDuration(watchDuration)
    }

    if (isEdit && !fetchLoading) {
      form.trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchStartTime, watchEndTime, watchDate, watchDuration, isEdit])

  useEffect(() => {
    if (selectedMaterial) {
      form.setValue('material', selectedMaterial as number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMaterial])

  const handleChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value && date) {
      const dateOnly = format(date, 'yyyy-MM-dd')
      const startDate = parse(`${dateOnly} ${value}:00`, 'yyyy-MM-dd HH:mm:ss', new Date())
      const endDate = addMinutes(startDate, duration || 1)

      const formattedEndTime = format(endDate, 'HH:mm')

      setStartTime(value)
      setEndTime(formattedEndTime)
      setDuration(duration || 1)

      form.setValue('start_time', `${value}:00`)
      form.setValue('end_time', `${formattedEndTime}:00`)
      form.setValue('duration', duration as number)

      form.trigger('start_time')
      form.trigger('end_time')
      form.trigger('duration')
    }
  }

  const handleChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value && date) {
      const dateOnly = format(date, 'yyyy-MM-dd')
      const startDate = parse(`${dateOnly} ${startTime}:00`, 'yyyy-MM-dd HH:mm:ss', new Date())
      const endDate = parse(`${dateOnly} ${value}:00`, 'yyyy-MM-dd HH:mm:ss', new Date())

      const calculatedDuration = differenceInMinutes(endDate, startDate)

      setEndTime(value)
      setDuration(calculatedDuration)

      form.setValue('end_time', `${value}:00`)
      form.setValue('duration', calculatedDuration)

      form.trigger('end_time')
      form.trigger('duration')
      form.trigger('start_time')
    }
  }

  const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0 && date) {
      const dateOnly = format(date, 'yyyy-MM-dd')
      const startDate = parse(`${dateOnly} ${startTime}:00`, 'yyyy-MM-dd HH:mm:ss', new Date())
      const endDate = addMinutes(startDate, value)

      const formattedEndTime = format(endDate, 'HH:mm')

      setDuration(value)
      setEndTime(formattedEndTime)

      form.setValue('duration', value)
      form.setValue('end_time', `${formattedEndTime}:00`)

      form.trigger('duration')
      form.trigger('end_time')
      form.trigger('start_time')
    }
  }

  const handleChangeDate = (date: Date | undefined) => {
    if (date) {
      setDate(date)
    }
  }

  return (
    <div className="h-full w-full flex-col rounded-xl border border-neutral-800/10 p-5 dark:border-neutral-50/15">
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(onSubmit, (e) => console.log(e))()
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
                    <DatePicker initialValue={date ?? new Date()} onChange={handleChangeDate} />
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
                    <Input type="number" value={duration ?? 0} onChange={handleChangeDuration} disabled={!startTime} />
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
                    <Input type="time" value={startTime ?? ''} onChange={handleChangeStartTime} />
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
                    <Input type="time" value={endTime ?? ''} onChange={handleChangeEndTime} />
                  </FormControl>
                  <FormDescription>*Menunjukkan waktu ujian ditutup</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isValid} isLoading={submitLoading}>
              {isEdit ? 'Simpan' : 'Selanjutnya'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ExamDetailForm
