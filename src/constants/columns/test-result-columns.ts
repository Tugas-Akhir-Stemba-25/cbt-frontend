import { ColumnDef } from '@tanstack/react-table'

import TestDurationColumn from '@/components/atoms/column/test/TestDurationColumn'
import TestHistoryStatusColumn from '@/components/atoms/column/test/TestHistoryStatusColumn'

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
    enableSorting: false,
    accessorFn: (row) => (row.history && row.history.correct_answer ? row.history.correct_answer : '-')
  },
  {
    header: 'Soal Salah',
    enableSorting: false,
    accessorFn: (row) =>
      row.history && row.history.total && row.history.correct_answer
        ? row.history.total - row.history.correct_answer
        : '-'
  },
  {
    header: 'Total Soal',
    enableSorting: false,
    accessorFn: (row) => (row.history && row.history.total ? row.history.total : '-')
  },
  {
    header: 'Nilai',
    enableSorting: false,
    accessorFn: (row) => (row.history && row.history.grade ? row.history.grade : '-')
  },
  {
    header: 'Status',
    enableSorting: false,
    cell: TestHistoryStatusColumn
  }
]
