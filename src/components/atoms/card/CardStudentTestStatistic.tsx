import { LucideIcon } from 'lucide-react'

import { cn } from '@/utils/shadcn'

import { Skeleton } from '@/components/ui/skeleton'

interface CardStudentTestStatisticProps {
  label: string
  value?: number | string | null
  icon: LucideIcon
  variant?: 'secondary' | 'destructive' | 'success' | 'primary'
  isLoading?: boolean
}

const CardStudentTestStatistic = ({
  label,
  value,
  icon: Icon,
  variant = 'primary',
  isLoading
}: CardStudentTestStatisticProps) => {
  return (
    <div
      className={cn('flex flex-col gap-3 rounded-xl p-5 text-foreground', {
        'bg-primary-surface': variant === 'primary',
        'bg-secondary-surface': variant === 'secondary',
        'bg-success-surface': variant === 'success',
        'bg-destructive-surface': variant === 'destructive'
      })}
    >
      <div className="flex w-full justify-between">
        <p>{label}</p>
        <div className="grid h-12 w-12 place-items-center rounded-full bg-background">
          <Icon
            className={cn('h-6 w-6', {
              'text-secondary-icon': variant === 'secondary',
              'text-destructive-icon': variant === 'destructive',
              'text-success': variant === 'success',
              'text-primary-icon': variant === 'primary'
            })}
          />
        </div>
      </div>
      <span className="text-2xl font-bold md:text-3xl">
        {isLoading ? <Skeleton className="h-12 w-16 animate-pulse rounded-md" /> : value === null ? 'N/A' : value}
      </span>
    </div>
  )
}

export default CardStudentTestStatistic
