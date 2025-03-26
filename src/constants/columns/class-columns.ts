import { ColumnDef } from '@tanstack/react-table'

import { Class } from '@/types/class/class-list'

interface ClassFieldRowProps extends Class {}

export const classColumns: ColumnDef<ClassFieldRowProps>[] = [
  {
    header: 'Nama Kelas',
    accessorKey: 'name',
    enableSorting: false
  },
  {
    header: 'Tahun Lulus',
    accessorKey: 'grad_year',
    enableSorting: false
  },
  {
    header: 'Jumlah Siswa',
    accessorKey: 'students_count',
    enableSorting: false
  },
  {
    header: 'Jurusan',
    accessorKey: 'major.name',
    enableSorting: false
  }
]
