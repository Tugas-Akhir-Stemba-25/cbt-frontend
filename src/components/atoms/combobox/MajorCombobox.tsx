import * as React from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'

import { useGetMajorOption } from '@/http/major/get-major-option'

import { cn } from '@/utils/shadcn'

import useMajorStore from '@/stores/useMajorStore'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const MajorCombobox = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const { selectedMajor, setSelectedMajor } = useMajorStore()

  const { data: majors } = useGetMajorOption()

  React.useEffect(() => {
    if (selectedMajor) {
      setValue(String(selectedMajor))
    }
  }, [selectedMajor, majors])

  React.useEffect(() => {
    if (value) {
      setSelectedMajor(Number(value))
    }
  }, [value, setSelectedMajor])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? majors?.data.find((major) => String(major.id) === value)?.short_name : 'Pilih Jurusan...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Cari Jurusan..." className="h-9" />
          <CommandList>
            <CommandEmpty>Jurusan tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {majors?.data.map((major) => (
                <CommandItem
                  key={major.id}
                  value={`${major.id}#${major.short_name}`}
                  onSelect={(currentValue) => {
                    const val = currentValue.split('#')[0]
                    setValue(val === value ? '' : val)
                    setOpen(false)
                  }}
                >
                  {major.short_name}
                  <Check className={cn('ml-auto', value === String(major.id) ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default MajorCombobox
