import Link from 'next/link'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Eye } from 'lucide-react'

import { formatSeconds } from '@/utils/time'

import { Skeleton } from '@/components/ui/skeleton'

import { TestItem } from '@/types/test/test'

import TestStatusColumn from '../column/test/TestStatusColumn'

interface CardStudentTest {
  data: TestItem
}
const CardStudentTest = ({ data }: CardStudentTest) => {
  return (
    <div className="grid grid-cols-3 gap-3 rounded-xl bg-background px-4 py-3">
      <h3 className="col-span-3 text-sm font-semibold @3xl:col-span-2 md:text-base">{data.name}</h3>
      <p className="col-span-2 text-start text-sm font-medium text-primary @3xl:col-span-1 @3xl:text-end">
        {format(new Date(data.start_time), 'EEEE, dd MMMM yyyy • HH:mm', {
          locale: id
        })}
      </p>
      <div className="col-span-3 row-start-3 grid grid-cols-4 gap-x-16 text-sm @3xl:row-start-2 @3xl:grid-cols-3">
        <p className="col-span-2 @3xl:col-span-1">Mata Pelajaran :</p>
        <p className="hidden @3xl:block">Guru Pengampu :</p>
        <p className="col-span-2 text-end @3xl:col-span-1 @3xl:text-start">Lama Waktu :</p>
        <p className="col-span-2 text-[#4B5563] @3xl:col-span-1">{data.material.name}</p>
        <p className="hidden text-[#4B5563] @3xl:block">{data.material.teaching_teacher}</p>
        <p className="col-span-2 text-end text-[#4B5563] @3xl:col-span-1 @3xl:text-start">
          {formatSeconds(data.duration, true)}
        </p>
      </div>
      <div className="flex items-center justify-end gap-4 @3xl:col-start-3">
        <Link href={`/dashboard/student/exam/${data.id}`} className="hidden text-primary @3xl:inline-block">
          <Eye className="h-4 w-4" />
        </Link>
        <TestStatusColumn
          row={{
            original: data
          }}
        />
      </div>
      <div className="col-span-3 flex justify-end @3xl:hidden">
        <Link href={`/dashboard/student/exam/${data.id}`} className="text-primary">
          <Eye className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export const CardStudentSkeleton = () => {
  return (
    <div className="grid animate-pulse grid-cols-3 gap-3 rounded-xl bg-background px-4 py-3">
      <Skeleton className="col-span-3 h-5 w-3/4 rounded @3xl:col-span-2 md:h-6" />
      <Skeleton className="col-span-2 h-4 w-full rounded text-start @3xl:col-span-1 @3xl:text-end" />

      <div className="col-span-3 row-start-3 grid grid-cols-4 gap-x-16 gap-y-2 text-sm @3xl:row-start-2 @3xl:grid-cols-3">
        <Skeleton className="col-span-2 h-4 w-1/2 rounded @3xl:col-span-1" />
        <Skeleton className="hidden h-4 w-1/2 rounded @3xl:block" />
        <Skeleton className="col-span-2 h-4 w-1/2 rounded text-end @3xl:col-span-1 @3xl:text-start" />

        <Skeleton className="col-span-2 h-4 w-2/3 rounded @3xl:col-span-1" />
        <Skeleton className="hidden h-4 w-2/3 rounded @3xl:block" />
        <Skeleton className="col-span-2 h-4 w-2/3 rounded text-end @3xl:col-span-1 @3xl:text-start" />
      </div>

      <div className="flex items-center justify-end gap-4 @3xl:col-start-3">
        <Skeleton className="hidden h-4 w-4 rounded-full @3xl:inline-block" />
        <Skeleton className="h-6 w-20 rounded" />
      </div>

      <div className="col-span-3 flex justify-end @3xl:hidden">
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
    </div>
  )
}

export default CardStudentTest
