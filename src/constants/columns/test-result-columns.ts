import { ColumnDef } from '@tanstack/react-table'

import TestDurationColumn from '@/components/atoms/column/test/TestDurationColumn'

import { TestResult } from '@/types/test/test'

interface TestResultFieldRowProps extends TestResult {}

export const testResultColumns: ColumnDef<TestResultFieldRowProps>[] = [
  {
    header: 'Nama Siswa',
    accessorKey: 'user.name',
    enableSorting: false
  },
  {
    header: 'Waktu Pengerjaan',
    enableSorting: false,
    cell: TestDurationColumn
  },
  {
    header: 'Soal Benar',
    accessorKey: 'correct_answer',
    enableSorting: false
  },
  {
    header: 'Soal Salah',
    accessorKey: 'wrong_answer',
    enableSorting: false
  },
  {
    header: 'Nilai',
    accessorKey: 'grade',
    enableSorting: false
  }
]
