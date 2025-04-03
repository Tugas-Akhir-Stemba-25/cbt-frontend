import React from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DefaultSelectProps {
  defaultValue: string
  onValueChange: (value: string) => void
  data: { label: string; value: string }[]
  placeholder?: string
}

const DefaultSelect = ({ defaultValue, onValueChange, placeholder = 'Pilih Opsi', data }: DefaultSelectProps) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((d) => (
            <SelectItem key={`${d.value}-${d.label}`} value={d.value}>
              {d.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DefaultSelect
