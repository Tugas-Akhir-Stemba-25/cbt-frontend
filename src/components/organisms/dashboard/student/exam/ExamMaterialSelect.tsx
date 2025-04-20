'use client'

import { useEffect, useState } from 'react'

import { useGetMaterialOption } from '@/http/materials/get-material-option'

import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

interface ExamMaterialSelectProps {
  setFilter: (filter: string) => void
}

const ExamMaterialSelect = ({ setFilter }: ExamMaterialSelectProps) => {
  const [materials, setMaterials] = useState<{ id: number; name: string }[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const { data: materialOption, isLoading } = useGetMaterialOption()

  useEffect(() => {
    if (materialOption?.data) {
      const formatted = materialOption.data.map((item) => ({
        id: item.id,
        name: item.name
      }))
      setMaterials(formatted)
    }
  }, [materialOption])

  const handleMaterialSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    setSelectedIds([])
  }

  const isSelected = (id: number) => selectedIds.includes(id)
  const isSelectAll = selectedIds.length === 0

  useEffect(() => {
    if (isSelectAll) {
      setFilter('all')
    } else {
      setFilter(selectedIds.join(','))
    }
  }, [selectedIds, setFilter, isSelectAll])

  return (
    <div className="w-full">
      <ScrollArea className="w-full">
        <div className="flex w-max items-center gap-x-4 pb-4">
          <Button onClick={handleSelectAll} size={'sm'} variant={isSelectAll ? 'default' : 'outline'}>
            Semua
          </Button>
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-28 animate-pulse rounded-md" />
              <Skeleton className="h-10 w-28 animate-pulse rounded-md" />
              <Skeleton className="h-10 w-28 animate-pulse rounded-md" />
            </>
          ) : (
            materials.map((item) => (
              <Button
                size={'sm'}
                onClick={() => handleMaterialSelect(item.id)}
                variant={isSelected(item.id) ? 'default' : 'outline'}
                key={item.id}
              >
                {item.name}
              </Button>
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default ExamMaterialSelect
