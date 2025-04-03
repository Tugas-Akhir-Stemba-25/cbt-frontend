import { ColumnDef } from '@tanstack/react-table'

import NumberColumn from '@/components/atoms/column/common/NumberColumn'
import QuestionColumn from '@/components/atoms/column/question/QuestionColumn'
import QuestionDateColumn from '@/components/atoms/column/question/QuestionDateColumn'

import { QuestionList } from '@/types/question/question'

interface QuestionFieldRowProps extends QuestionList {}

export const questionColumns: ColumnDef<QuestionFieldRowProps>[] = [
  {
    header: 'No',
    enableSorting: false,
    cell: NumberColumn
  },
  {
    header: 'Pertanyaan',
    accessorKey: 'question',
    enableSorting: false,
    cell: QuestionColumn
  },
  {
    header: 'Diperbarui',
    accessorKey: 'updated_at',
    enableSorting: false,
    cell: QuestionDateColumn
  }
]
