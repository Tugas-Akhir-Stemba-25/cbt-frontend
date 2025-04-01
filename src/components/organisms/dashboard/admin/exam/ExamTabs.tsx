import React from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const triggerClassName =
  "relative rounded-none px-3 py-3 text-disabled !shadow-none data-[state=active]:text-primary data-[state=active]:after:absolute data-[state=active]:after:bottom-0.5 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:rounded-t-sm data-[state=active]:after:bg-primary data-[state=active]:after:content-['']"

interface ExamTabsProps {
  trigger: { label: string; value: string; disabled?: boolean }[]
  content: React.ReactNode
  defaultValue?: string
  activeTab?: string
  setTab: (tab: string) => void
}

const ExamTabs = ({ trigger, content, defaultValue = trigger[0].value, activeTab, setTab }: ExamTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} onValueChange={setTab} className="flex w-full flex-col gap-6" value={activeTab}>
      <TabsList className="w-max justify-stretch rounded-none border-b border-disabled bg-transparent px-0 text-sm">
        {trigger.map((item) => (
          <TabsTrigger key={item.value} value={item.value} className={triggerClassName} disabled={item.disabled}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {/* Content */}
      {content}
    </Tabs>
  )
}

export default ExamTabs
