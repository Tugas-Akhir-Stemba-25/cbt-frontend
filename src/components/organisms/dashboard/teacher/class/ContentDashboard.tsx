'use client'

import { useEffect } from 'react'

import DataTable from '@/components/ui/datatable'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

const columns = [
  {
    header: 'Mata Pelajaran',
    accessorKey: 'mapel',
    enableSorting: true
  },
  {
    header: 'Kelas',
    accessorKey: 'kelas',
    enableSorting: false
  },
  {
    header: 'Tahun Masuk',
    accessorKey: 'tahun_masuk',
    enableSorting: true
  },
  {
    header: 'Jumlah Siswa',
    accessorKey: 'jumlah_siswa',
    enableSorting: false
  }
]

const data = [
  { mapel: 'Infrastructure as a Service (Iaas)', kelas: 'XI SIJA 1', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Infrastructure as a Service (IaaS)', kelas: 'XII SIJA 1', tahun_masuk: '2023', jumlah_siswa: '36' },
  { mapel: 'Platform as a Service (PaaS)', kelas: 'X SIJA 1', tahun_masuk: '2025', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 2', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XI SIJA 2', tahun_masuk: '2023', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'X SIJA 2', tahun_masuk: '2025', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 3', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XI SIJA 3', tahun_masuk: '2023', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'X SIJA 3', tahun_masuk: '2025', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 4', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XI SIJA 4', tahun_masuk: '2023', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'X SIJA 4', tahun_masuk: '2025', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 5', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XI SIJA 5', tahun_masuk: '2023', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'X SIJA 5', tahun_masuk: '2025', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' },
  { mapel: 'Software as a Service (SaaS)', kelas: 'XII SIJA 6', tahun_masuk: '2024', jumlah_siswa: '36' }
]

export function ContentDashboard() {
  const { setBreadcrumbs } = useBreadcrumbs()
  useEffect(() => {
    setBreadcrumbs([
      { label: 'Menu Guru', href: '/dashboard/teacher/class' },
      { label: 'Daftar Mata Pelajaran', href: '' }
    ])
  }, [])
  return (
    <div>
      <p className="pb-4 text-lg font-semibold">Daftar Mata Pelajaran</p>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
