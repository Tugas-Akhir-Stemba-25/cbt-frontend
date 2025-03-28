import { ColumnDef } from '@tanstack/react-table'

import { Material } from '@/types/material/material-list'

interface MaterialFieldRowProps extends Material {}

export const materialColumns: ColumnDef<MaterialFieldRowProps>[] = [
  {
    header: 'Mata Pelajaran',
    accessorKey: 'name',
    enableSorting: false
  },
  {
    header: 'Guru Pengajar',
    accessorKey: 'teaching_teacher.name',
    enableSorting: false
  }
]
