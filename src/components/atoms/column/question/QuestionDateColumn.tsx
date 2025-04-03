import React from 'react'

import { format } from 'date-fns'
import { id } from 'date-fns/locale'

import { QuestionList } from '@/types/question/question'

const QuestionDateColumn: React.FC<{ row: { original: QuestionList } }> = ({ row }) => {
  const data = row.original
  const date = new Date(data.updated_at)

  return <p>{format(date, 'dd MMMM yyyy, HH:mm', { locale: id })}</p>
}

export default QuestionDateColumn
