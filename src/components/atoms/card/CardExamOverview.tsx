import { LucideIcon } from 'lucide-react'

import { cn } from '@/utils/shadcn'

import { Skeleton } from '@/components/ui/skeleton'

interface CardExamOverviewProps {
  value?: number | null | string
  label: string
  icon: LucideIcon
  isLoading?: boolean
  variant?: 'secondary' | 'destructive' | 'success' | 'primary'
}

const CardExamOverview = ({ value, label, icon: Icon, isLoading, variant = 'primary' }: CardExamOverviewProps) => {
  return isLoading ? (
    <CardExamOverviewSkeleton label={label} />
  ) : (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-dashed px-5 py-3">
      <div className="flex w-full justify-between">
        <h5 className="text-base font-semibold">{label}</h5>
        <Icon className="h-5 w-5" />
      </div>
      <p
        className={cn('text-3xl font-bold', {
          'text-primary': variant === 'primary',
          'text-secondary': variant === 'secondary',
          'text-success': variant === 'success',
          'text-destructive': variant === 'destructive'
        })}
      >
        {value === null ? 'N/A' : value}
      </p>
    </div>
  )
}

const CardExamOverviewSkeleton = ({ label }: { label: string }) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-dashed px-5 py-3">
      <div className="flex w-full justify-between">
        <h5 className="text-base font-semibold">{label}</h5>
        <Skeleton className="h-6 w-6 animate-pulse rounded-md" />
      </div>
      <Skeleton className="h-10 w-24 animate-pulse rounded-md" />
    </div>
  )
}

export default CardExamOverview
