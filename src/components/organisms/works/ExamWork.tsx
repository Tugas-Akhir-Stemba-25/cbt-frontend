'use client'

import { useEffect, useState } from 'react'

import useWorkHashStore from '@/stores/useWorkHashStore'

import FinishTestModal from '@/components/molecules/popup/test/FinishTestModal'
import TestEndedModal from '@/components/molecules/popup/test/TestEndedModal'

import ExamBottomNavigation from './ExamBottomNavigation'
import ExamTitle from './ExamTitle'
import ExamWorkHeader from './ExamWorkHeader'
import ExamWorkQuestion from './ExamWorkQuestion'
import ExamWorkSide from './ExamWorkSide'

interface ExamWorkProps {
  hash: string
}
const ExamWork = ({ hash }: ExamWorkProps) => {
  const { setHash } = useWorkHashStore()

  const [openFinishTestModal, setOpenFinishTestModal] = useState<boolean>(false)
  const [isTimeout, setIsTimeout] = useState<boolean>(false)

  useEffect(() => {
    setHash(hash)
  }, [hash, setHash])

  const handleOpenFinishTestModal = (isTimeout: boolean) => {
    setOpenFinishTestModal(true)
    setIsTimeout(isTimeout)
  }

  return (
    <>
      <div className="max-w-screen grid min-h-screen grid-cols-1 grid-rows-[max-content_max-content_1fr_max-content] gap-3 bg-primary-surface p-3 md:grid-cols-3 md:grid-rows-[max-content_1fr_max-content]">
        <ExamWorkHeader setOpenFinishTestModal={handleOpenFinishTestModal} />
        <ExamTitle />
        <ExamWorkQuestion />
        <ExamBottomNavigation setOpenFinishTestModal={handleOpenFinishTestModal} />
        <ExamWorkSide setOpenFinishTestModal={handleOpenFinishTestModal} />
      </div>
      <FinishTestModal isOpen={openFinishTestModal} onOpenChange={setOpenFinishTestModal} isTimeout={isTimeout} />
      <TestEndedModal />
    </>
  )
}

export default ExamWork
