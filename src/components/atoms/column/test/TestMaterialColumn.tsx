import React from 'react'

import { Test } from '@/types/test/test-list'

const TestMaterialColumn: React.FC<{ row: { original: Test } }> = ({ row }) => {
  const data = row.original

  return <p>{`${data.material.name} - ${data.material.class.name} ${data.material.class.grad_year}`}</p>
}

export default TestMaterialColumn
