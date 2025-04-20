'use client'

import { useState } from 'react'

import { RefreshCcw } from 'lucide-react'

import RestartTestDialog from '@/components/molecules/popup/test/RestartTestModal'
import { Button } from '@/components/ui/button'

import { TestResult } from '@/types/test/test'

const TestRestartColumn: React.FC<{ row: { original: TestResult } }> = ({ row }) => {
  const [open, setOpen] = useState(false)
  const data = row.original

  if (!data.history || data.history.status !== 3) {
    return null
  }

  return (
    <>
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setOpen(true)}>
        <RefreshCcw className="h-4 w-4" />
      </Button>

      <RestartTestDialog open={open} onOpenChange={setOpen} testId={data.id} userId={data.user.id} />
    </>
  )
}

export default TestRestartColumn
