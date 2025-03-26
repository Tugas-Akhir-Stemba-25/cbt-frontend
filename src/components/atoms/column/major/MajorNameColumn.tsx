import React from 'react'

import Link from 'next/link'

import useMajorStore from '@/stores/useMajorStore'

import { Major } from '@/types/major/major-list'

const MajorNameColumn: React.FC<{ row: { original: Major } }> = ({ row }) => {
  const data = row.original
  const { setSelectedMajor } = useMajorStore()

  return (
    <Link href={`/dashboard/admin/class`} onClick={() => setSelectedMajor(data.id)} className="text-blue-500 underline">
      {data.name}
    </Link>
  )
}

export default MajorNameColumn
