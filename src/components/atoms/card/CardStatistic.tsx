import { cn } from '@/utils/shadcn'

import { Skeleton } from '@/components/ui/skeleton'

interface CardStatisticProps {
  title: string
  value?: number
  icon: any
  variant?: 'secondary' | 'destructive' | 'blue' | 'success' | 'primary'
  isLoading?: boolean
}

const CardStatistic = ({ title, value = 0, icon: Icon, variant, isLoading = true }: CardStatisticProps) => {
  return (
    <div className="border-muted/1 flex w-1/4 justify-between rounded-xl border-2 border-solid p-5">
      <div className="flex flex-col gap-2">
        <p className="text-sm">{title}</p>
        <span
          className={cn('text-3xl font-semibold', {
            'text-secondary': variant === 'secondary',
            'text-destructive': variant === 'destructive',
            'text-blue-500': variant === 'blue',
            'text-success': variant === 'success',
            'text-primary': variant === 'primary'
          })}
        >
          {isLoading ? <Skeleton className="h-8 w-24" /> : value}
        </span>
      </div>
      <div className="icon">
        <Icon size={20} />
      </div>
    </div>
  )
}
export default CardStatistic
