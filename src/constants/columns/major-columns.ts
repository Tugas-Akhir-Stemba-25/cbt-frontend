import { ColumnDef } from '@tanstack/react-table'

import MajorNameColumn from '@/components/atoms/column/major/MajorNameColumn'

import { Major } from '@/types/major/major-list'

interface MajorFieldRowProps extends Major {}

export const majorColumns: ColumnDef<MajorFieldRowProps>[] = [
  {
    header: 'Nama Jurusan',
    accessorKey: 'name',
    enableSorting: false,
    cell: MajorNameColumn
  },
  {
    header: 'Nama Singkat',
    accessorKey: 'short_name',
    enableSorting: false
  }
]
