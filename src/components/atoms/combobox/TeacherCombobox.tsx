import * as React from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'

import { useGetTeacherOption } from '@/http/teacher/get-teacher-option'

import { cn } from '@/utils/shadcn'

import useClassStore from '@/stores/useClassStore'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface TeacherComboboxProps {
  selectData?: (data: string) => void
  initialValue?: string
}

const TeacherCombobox = ({ selectData, initialValue }: TeacherComboboxProps) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const { selectedClass } = useClassStore()

  const { data: teachers } = useGetTeacherOption(
    {
      class_id: selectedClass as number
    },
    {
      enabled: !!selectedClass
    }
  )

  React.useEffect(() => {
    console.log(initialValue)
    if (initialValue) {
      setValue(initialValue)
    }
  }, [initialValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? teachers?.data.find((teacher) => String(teacher.id) === value)?.name : 'Pilih Guru...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] p-0 sm:w-[450px]">
        <Command>
          <CommandInput placeholder="Cari Guru..." className="h-9" />
          <CommandList>
            <CommandEmpty>Guru tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {teachers?.data.map((classData) => (
                <CommandItem
                  key={classData.id}
                  value={`${classData.id}#${classData.name}`}
                  onSelect={(currentValue) => {
                    const val = currentValue.split('#')[0]
                    setValue(val === value ? '' : val)
                    if (selectData) {
                      selectData(val)
                    }
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

export default TeacherCombobox
