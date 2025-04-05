'use client'

import { useEffect } from 'react'

import useWorkHashStore from '@/stores/useWorkHashStore'

import ExamWorkHeader from './ExamWorkHeader'
import ExamWorkQuestion from './ExamWorkQuestion'
import ExamWorkSide from './ExamWorkSide'

interface ExamWorkProps {
  hash: string
}
const ExamWork = ({ hash }: ExamWorkProps) => {
  const { setHash } = useWorkHashStore()

  useEffect(() => {
    setHash(hash)
  }, [hash, setHash])

  return (
    <div className="grid min-h-screen w-screen grid-cols-3 grid-rows-[max-content_1fr_max-content] gap-3 bg-primary-surface p-3">
      <ExamWorkHeader />
      <ExamWorkQuestion />
      <ExamWorkSide />
    </div>
  )
}

export default ExamWork
