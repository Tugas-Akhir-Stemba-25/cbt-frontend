import { useGetStudentTestList } from '@/http/test/get-student-test-list'

import CardStudentTest, { CardStudentSkeleton } from '@/components/atoms/card/CardStudentTest'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface ExamListProps {
  filter: string
  search?: string
}

const ExamList = ({ filter, search }: ExamListProps) => {
  const { data: testList, isLoading } = useGetStudentTestList(
    {
      filter
    },
    {
      enabled: !!filter
    }
  )

  return (
    // <div className="h-full">
    <ScrollArea className="h-[420px] w-full @3xl:h-[460px]">
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <>
            <CardStudentSkeleton />
            <CardStudentSkeleton />
            <CardStudentSkeleton />
            <CardStudentSkeleton />
          </>
        ) : (
          testList?.data
            .filter(
              (item) =>
                item.name.toLowerCase().includes(search?.toLowerCase() || '') ||
                item.material.name.toLowerCase().includes(search?.toLowerCase() || '')
            )
            .map((item) => <CardStudentTest key={item.id} data={item} />)
        )}
      </div>
      <ScrollBar />
    </ScrollArea>
    // </div>
  )
}

export default ExamList
