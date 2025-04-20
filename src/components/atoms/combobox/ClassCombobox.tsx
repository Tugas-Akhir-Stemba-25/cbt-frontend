import * as React from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'

import { useGetClassOption } from '@/http/class/get-class-option'

import { cn } from '@/utils/shadcn'

import useClassStore from '@/stores/useClassStore'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const ClassCombobox = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const { selectedClass, setSelectedClass } = useClassStore()

  const { data: classes } = useGetClassOption()

  React.useEffect(() => {
    if (selectedClass) {
      setValue(String(selectedClass))
    }
  }, [selectedClass, classes])

  React.useEffect(() => {
    if (value) {
      setSelectedClass(Number(value))
    }
  }, [value, setSelectedClass])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="relative w-full justify-between">
          {value ? classes?.data.find((classData) => String(classData.id) === value)?.name : 'Pilih Kelas...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] p-0 sm:w-[450px]">
        <Command>
          <CommandInput placeholder="Cari Kelas..." className="h-9" />
          <CommandList>
            <CommandEmpty>Kelas tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {classes?.data.map((classData) => (
                <CommandItem
                  key={classData.id}
                  value={`${classData.id}#${classData.name}`}
                  onSelect={(currentValue) => {
                    const val = currentValue.split('#')[0]
                    setValue(val === value ? '' : val)
                    setOpen(false)
                  }}
                >
                  {classData.name}
                  <Check className={cn('ml-auto', value === String(classData.id) ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ClassCombobox
