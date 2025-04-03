import { ColumnDef } from '@tanstack/react-table'

import TestDateColumn from '@/components/atoms/column/test/TestDateColumn'
import TestMaterialColumn from '@/components/atoms/column/test/TestMaterialColumn'
import TestStatusColumn from '@/components/atoms/column/test/TestStatusColumn'

import { Test } from '@/types/test/test-list'

interface TestFieldRowProps extends Test {}

export const testColumns: ColumnDef<TestFieldRowProps>[] = [
  {
    header: 'Nama Ujian',
    accessorKey: 'name',
    enableSorting: false
  },
  {
    header: 'Mata Pelajaran',
    enableSorting: false,
    cell: TestMaterialColumn
  },
  {
    header: 'Tanggal Ujian',
    enableSorting: false,
    cell: TestDateColumn
  },
  {
    header: 'Status',
    enableSorting: false,
    cell: TestStatusColumn
  }
]
