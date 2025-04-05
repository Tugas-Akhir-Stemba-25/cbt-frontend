'use client'

import ExamWorkHeader from './ExamWorkHeader'
import ExamWorkQuestion from './ExamWorkQuestion'
import ExamWorkSide from './ExamWorkSide'

interface ExamWorkProps {
  hash: string
}
const ExamWork = ({ hash }: ExamWorkProps) => {
  return (
    <div className="flex h-screen w-screen flex-col gap-3 bg-primary-surface p-3">
      <ExamWorkHeader hash={hash} />
      <div className="flex h-full w-full gap-3">
        <ExamWorkQuestion />
        <ExamWorkSide hash={hash} />
      </div>
    </div>
  )
}

export default ExamWork
