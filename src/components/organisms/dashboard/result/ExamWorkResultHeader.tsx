import React from 'react'

import Image from 'next/image'

import ButtonToggleTheme from '@/components/atoms/ButtonToggleTheme'
import AvatarCustom from '@/components/molecules/buttons/AvatarCustom'

const ExamWorkResultHeader = () => {
  return (
    <div className="col-span-1 flex w-full items-center justify-between rounded-xl bg-background p-5 md:col-span-3">
      <div className="flex items-center gap-2">
        <Image src="/assets/images/logo-icon.svg" width={48} height={48} alt="logo-icon-luminaqa" />
        <p className="hidden text-lg font-semibold text-primary md:block">LuminaQA</p>
      </div>
      <div className="flex items-center gap-3">
        <ButtonToggleTheme />
        <AvatarCustom withName={true} />
      </div>
    </div>
  )
}

export default ExamWorkResultHeader
