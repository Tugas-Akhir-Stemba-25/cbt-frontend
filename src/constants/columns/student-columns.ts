import { ColumnDef } from '@tanstack/react-table'

import { Student } from '@/types/student/student-list'

interface StudentFieldRowProps extends Student {}

export const studentColumns: ColumnDef<StudentFieldRowProps>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
    enableSorting: false
  },
  {
    accessorKey: 'class',
    header: 'Kelas'
  },
  {
    accessorKey: 'year_join',
    header: 'Tahun Masuk',
    enableSorting: false
  },
  {
    accessorKey: 'username',
    header: 'Username'
  }
]
