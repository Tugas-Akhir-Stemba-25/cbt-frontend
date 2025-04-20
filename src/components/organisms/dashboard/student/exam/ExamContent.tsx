'use client'

import { useEffect, useState } from 'react'

import { SearchInput } from '@/components/atoms/input/SearchInput'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

import ExamList from './ExamList'
import ExamMaterialSelect from './ExamMaterialSelect'

const ExamContent = () => {
  const { setBreadcrumbs } = useBreadcrumbs()

  const [filter, setFilter] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    setBreadcrumbs([
      {
        label: 'Ujian',
        href: '/dashboard/student/exam'
      }
    ])
  }, [setBreadcrumbs])

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Ujianmu</h1>
      </div>

      <div className="h-full w-full space-y-5 rounded-xl border bg-primary-surface p-4 @3xl:h-full">
        <div className="w-full">
          <SearchInput
            placeholder="Cari"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full @3xl:w-1/2"
          />
        </div>
        <ExamMaterialSelect setFilter={setFilter} />
        <ExamList search={search} filter={filter} />
      </div>
    </div>
  )
}

export default ExamContent
