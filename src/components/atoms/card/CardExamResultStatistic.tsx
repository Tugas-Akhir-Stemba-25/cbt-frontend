import React from 'react'

import { cn } from '@/utils/shadcn'

import { Progress } from '@/components/ui/progress'

interface CardExamResultStatisticProps {
  label: string
  value: number | null | string
  percent?: number
  footer?: React.ReactNode
  variant?: 'success' | 'secondary' | 'destructive' | 'primary'
}

const CardExamResultStatistic = ({
  label,
  value,
  footer,
  variant = 'primary',
  percent
}: CardExamResultStatisticProps) => {
  return (
    <div
      className={cn('flex flex-col gap-3 rounded-xl p-5 text-foreground', {
        'bg-primary-surface': variant === 'primary',
        'bg-secondary-surface': variant === 'secondary',
        'bg-destructive-surface': variant === 'destructive',
        'bg-success-surface': variant === 'success'
      })}
    >
      <p className="text-sm">{label}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
      {percent !== null && (
        <Progress
          indicatorColor={
            variant === 'primary'
              ? 'bg-primary'
              : variant === 'secondary'
                ? 'bg-secondary'
                : variant === 'destructive'
                  ? 'bg-destructive'
                  : variant === 'success'
                    ? 'bg-success'
                    : 'bg-primary'
          }
          className={cn('h-2 w-full rounded-sm bg-white')}
          value={percent}
        />
      )}

      {footer}
    </div>
  )
}

export default CardExamResultStatistic
