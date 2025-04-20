import { ColumnDef } from '@tanstack/react-table'

import TestDateColumn from '@/components/atoms/column/test/TestDateColumn'
import TestMaterialColumn from '@/components/atoms/column/test/TestMaterialColumn'
import TestStatusColumn from '@/components/atoms/column/test/TestStatusColumn'

import { Test } from '@/types/test/test-list'

interface TestFieldRowProps extends Test {}

export const testColumns: ColumnDef<TestFieldRowProps>[] = [
  {
    header: 'Nama',
    accessorKey: 'name',
    enableSorting: true
  },
  {
    header: 'Mata Pelajaran',
    enableSorting: false,
    cell: TestMaterialColumn
  },
  {
    header: 'Guru Pengampu',
    accessorKey: 'teacher.name',
    enableSorting: true
  },
  {
    header: 'Total Siswa',
    accessorKey: 'class.jumlah_siswa',
    enableSorting: false
  },
  {
    header: 'Tanggal',
    enableSorting: false,
    cell: TestDateColumn
  },
  {
    header: 'Durasi',
    accessorKey: 'duration',
    enableSorting: false
  },
  {
    header: 'Status',
    enableSorting: false,
    cell: TestStatusColumn
  }
]
