import React from 'react'

import { QuestionList } from '@/types/question/question'

const QuestionColumn: React.FC<{ row: { original: QuestionList } }> = ({ row }) => {
  const data = row.original

  return <div dangerouslySetInnerHTML={{ __html: data.question }}></div>
}

export default QuestionColumn
