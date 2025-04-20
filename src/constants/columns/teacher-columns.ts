import { ColumnDef } from '@tanstack/react-table'

import AssignTeacherColumn from '@/components/atoms/button/AssignTeacherColumn'

import { Teacher } from '@/types/teacher/teacher'

interface TeacherFieldRowProps extends Teacher {}

export const teacherColumns: ColumnDef<TeacherFieldRowProps>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
    enableSorting: false
  },
  {
    accessorKey: 'username',
    header: 'Username',
    enableSorting: false
  },
  {
    header: 'Aksi',
    enableSorting: false,
    meta: {
      className: 'text-center'
    },
    cell: AssignTeacherColumn
  }
]
