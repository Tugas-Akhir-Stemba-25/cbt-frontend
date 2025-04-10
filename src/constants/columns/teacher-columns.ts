import { ColumnDef } from '@tanstack/react-table'

import { Teacher } from '@/types/teacher/teacher'

interface TeacherFieldRowProps extends Teacher {}

export const teacherColumns: ColumnDef<TeacherFieldRowProps>[] = [
  {
    accessorKey: 'name',
    header: 'Nama'
  },
  {
    accessorKey: 'username',
    header: 'Username'
  }
]
