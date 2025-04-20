import React from 'react'

import { Sidebar } from 'lucide-react'

import { useGetWorkDetail } from '@/http/work/get-work-detail'

import useWorkHashStore from '@/stores/useWorkHashStore'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'

import ExamWorkSidebar from './ExamWorkSidebar'

const ExamTitle = () => {
  const { hash } = useWorkHashStore()

  const { data, isLoading } = useGetWorkDetail(
    {
      hash: hash as string
    },
    {
      enabled: !!hash
    }
  )
  return (
    <Sheet>
      <div className="col-span-1 col-start-1 row-start-2 flex items-start justify-between gap-2 rounded-xl bg-background p-5 md:hidden">
        {isLoading ? (
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ) : (
          <div>
            <h2 className="text-start text-base font-semibold md:text-xl">{data?.data.title}</h2>
            <p className="text-start">{data?.data.material.name}</p>
          </div>
        )}
        <SheetTrigger asChild>
          <Button variant={'ghost'}>
            <Sidebar className="h-6 w-6" />
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent showX={false} className="w-[90%]">
        <SheetHeader>
          <div className="hidden">
            <SheetTitle />
            <SheetDescription />
          </div>
        </SheetHeader>
        <ExamWorkSidebar />
      </SheetContent>
    </Sheet>
  )
}

export default ExamTitle
