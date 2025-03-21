'use client'

import { useEffect, useState } from 'react'

import { ColumnDef } from '@tanstack/react-table'
import { Users } from 'lucide-react'

import { useTeachers } from '@/http/teachers/getTeachers'

import DataTable from '@/components/ui/datatable'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'
import { Teacher } from '@/types/common/teacher'

export default function TeacherContent() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')

  // panggil API dengan parameter terbaru
  const { data, isLoading } = useTeachers({
    page: currentPage,
    per_page: pageSize,
    search: searchQuery
  })

  // cetak data untuk debug
  useEffect(() => {
    console.log('Fetched data:', data)
  }, [data])

  // Breadcrumb dan columns tidak berubah
  const { setBreadcrumbs } = useBreadcrumbs()
  useEffect(() => {
    setBreadcrumbs([
      { label: 'Master Data', href: '/dashboard/admin' },
      { label: 'Guru', href: '/dashboard/admin/guru' }
    ])
  }, [])

  const columns: ColumnDef<Teacher>[] = [
    {
      accessorKey: 'name',
      header: 'Nama'
    },
    {
      accessorKey: 'username',
      header: 'Username'
    }
  ]
  return (
    <>
      <div>
        <p>Data Guru</p>
      </div>
      <div className="flex flex-col justify-start gap-5 py-5">
        <div className="border-muted/1 flex w-1/4 justify-between rounded-xl border-2 border-solid p-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm">Total Guru</p>
            <span className="text-3xl font-semibold text-primary">{data?.meta?.pagination?.total || 0}</span>
          </div>
          <div className="icon">
            <Users size={20} />
          </div>
        </div>

        {/* datatable */}
        <DataTable
          columns={columns}
          data={data?.data ?? []}
          role="teacher"
          isLoading={isLoading}
          placeholder="Cari Guru"
          currentPage={currentPage}
          totalPages={data?.meta?.pagination?.total_pages || 1}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setCurrentPage(1)
          }}
          onSearchChange={(search) => {
            setSearchQuery(search)
            setCurrentPage(1)
          }}
        />
      </div>
    </>
  )
}
