'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'

import useWorkHashStore from '@/stores/useWorkHashStore'

import { Button } from '@/components/ui/button'

import ExamWorkResultBottomNav from './ExamWorkResultBottomNav'
import ExamWorkResultDetail from './ExamWorkResultDetail'
import ExamWorkResultHeader from './ExamWorkResultHeader'
import ExamWorkResultSide from './ExamWorkResultSide'
import ExamWorkResultTitle from './ExamWorkResultTitle'

interface ExamWorkResultProps {
  hash: string
}

const ExamWorkResult = ({ hash }: ExamWorkResultProps) => {
  const { setHash } = useWorkHashStore()

  useEffect(() => {
    setHash(hash)
  }, [hash, setHash])

  return (
    <div className="grid min-h-screen w-screen grid-cols-1 grid-rows-[max-content_max-content_max-content_1fr_max-content] gap-3 bg-primary-surface p-3 md:grid-cols-3">
      <ExamWorkResultHeader />
      <div className="col-span-1 md:col-span-2">
        <Button variant={'subtle'} size={'sm'} className="border border-foreground" asChild>
          <Link href={`/dashboard/student/work/${hash}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Kembali ke Preview</span>
          </Link>
        </Button>
      </div>
      <ExamWorkResultTitle />
      <ExamWorkResultDetail />
      <ExamWorkResultSide />
      <ExamWorkResultBottomNav />
    </div>
  )
}

export default ExamWorkResult
