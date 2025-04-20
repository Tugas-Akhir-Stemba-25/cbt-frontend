import * as React from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'

import { useGetMaterialOption } from '@/http/materials/get-material-option'

import { cn } from '@/utils/shadcn'

import useMaterialStore from '@/stores/useMaterialStore'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { MaterialOption } from '@/types/material/material-option'

const processLabel = (materials: MaterialOption[], value: string, length: number = 20) => {
  const material = materials?.find((material) => material.id === Number(value))
  if (!material) return ''

  // Format label to be more readable
  const label = `${material.class.name} ${material.class.grad_year} - ${material.name}`

  if (length < 0) {
    return label
  }

  return label.length > length ? `${label.slice(0, length)}...` : label
}

interface MaterialComboboxProps {
  length?: number
}

const MaterialCombobox = ({ length }: MaterialComboboxProps) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const { selectedMaterial, setSelectedMaterial } = useMaterialStore()

  const { data: materials } = useGetMaterialOption()

  React.useEffect(() => {
    if (selectedMaterial) {
      setValue(String(selectedMaterial))
    }
  }, [selectedMaterial, materials])

  React.useEffect(() => {
    if (value) {
      setSelectedMaterial(Number(value))
    }
  }, [value, setSelectedMaterial])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="relative w-full justify-between overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {value
            ? processLabel(materials?.data as MaterialOption[], value, length ? length : 20)
            : 'Pilih Mata Pelajaran...'}
          <ChevronsUpDown className="absolute right-2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] p-0 sm:w-[450px]">
        <Command>
          <CommandInput placeholder="Cari Mata Pelajaran..." className="h-9" />
          <CommandList>
            <CommandEmpty>Mata Pelajaran tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {materials?.data.map((material) => (
                <CommandItem
                  key={material.id}
                  value={`${material.id}#${material.name}`}
                  onSelect={(currentValue) => {
                    const val = currentValue.split('#')[0]
                    setValue(val === value ? '' : val)
                    setOpen(false)
                  }}
                >
                  {processLabel(materials?.data as MaterialOption[], String(material.id), length ? length : -1)}
                  <Check className={cn('ml-auto', value === String(material.id) ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default MaterialCombobox
