import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Calendar, Clock, Files, User } from 'lucide-react'

import { formatSeconds } from '@/utils/time'

import TestStatusBadge from '@/components/atoms/column/badge/TestStatusBadge'

import { TestDetailStudent } from '@/types/test/test'

interface ExamDetailCardProps {
  data: TestDetailStudent
  withBadge?: boolean
}

const ExamDetailCard = ({ data, withBadge = true }: ExamDetailCardProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-neutral-800/10 p-5 dark:border-neutral-50/15">
      <div className="space-y-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold md:text-2xl">{data.name}</h1>
          {withBadge && <TestStatusBadge status={data.status ?? 1} />}
        </div>
        <p className="text-lg">{data.material.name}</p>
      </div>
      <div className="grid grid-cols-1 gap-2 text-sm @lg:grid-cols-2">
        <p className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span>{data.material.teaching_teacher}</span>
        </p>
        <p className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          <span>{formatSeconds(data.duration || 0, true)}</span>
        </p>
        <p className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span>
            {format(new Date(data.start_time || ''), 'dd MMMM yyyy, HH:mm', {
              locale: id
            })}
          </span>
        </p>
        <p className="flex items-center">
          <Files className="mr-2 h-4 w-4" />
          <span>{data.question_count} Soal</span>
        </p>
      </div>
    </div>
  )
}

export default ExamDetailCard
