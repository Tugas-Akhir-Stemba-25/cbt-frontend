'use client'

import { useEffect } from 'react'

import { ColumnDef } from '@tanstack/react-table'
import { Users } from 'lucide-react'

import DataTable from '@/components/ui/datatable'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

export default function TeacherContent() {
  const { setBreadcrumbs } = useBreadcrumbs()

  type Guru = {
    id: number
    name: string
    subject: string
  }

  // Definisi kolom tabel untuk data Guru
  const columns: ColumnDef<Guru>[] = [
    {
      accessorKey: 'name',
      header: 'Nama'
    },
    {
      accessorKey: 'subject',
      header: 'Username'
    }
  ]

  // Data contoh untuk ditampilkan
  const data: Guru[] = [
    { id: 1, name: 'Budi Santoso', subject: 'Matematika' },
    { id: 2, name: 'Siti Aminah', subject: 'Bahasa Indonesia' },
    { id: 3, name: 'Joko Widodo', subject: 'IPA' }
  ]
  useEffect(() => {
    setBreadcrumbs([
      { label: 'Master Data', href: '/dashboard/admin' },
      { label: 'Guru', href: '/dashboard/admin/guru' }
    ])
  }, [])
  return (
    <>
      <div>
        <p>Data Guru</p>
      </div>
      <div className="flex flex-col justify-start gap-5 py-5">
        <div className="border-muted/1 flex w-1/4 justify-between rounded-xl border-2 border-solid p-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm">Total Guru</p>
            <span className="text-3xl font-semibold text-primary">127</span>
          </div>
          <div className="icon">
            <Users size={20} />
          </div>
        </div>

        {/* datatable */}
        <DataTable columns={columns} data={data} userRole="admin" placeholder="Cari Guru" />
      </div>
    </>
  )
}
