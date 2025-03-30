'use client'

import * as React from 'react'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/utils/shadcn'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type DatePickerProps = {
  initialValue?: Date
  onChange?: (date: Date | undefined) => void
}

export function DatePicker({ initialValue, onChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(initialValue)

  React.useEffect(() => {
    setDate(initialValue) // Sinkronisasi jika initialValue berubah
  }, [initialValue])

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onChange?.(selectedDate) // Trigger onChange jika diberikan
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
