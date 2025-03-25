import { ColumnDef } from '@tanstack/react-table'

import { Major } from '@/types/major/major-list'

interface MajorFieldRowProps extends Major {}

export const majorColumns: ColumnDef<MajorFieldRowProps>[] = [
  {
    header: 'Nama Jurusan',
    accessorKey: 'name',
    enableSorting: false
  },
  {
    header: 'Nama Singkat',
    accessorKey: 'short_name',
    enableSorting: false
  }
]
