import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/shadcn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent',
  {
    variants: {
      variant: {
        primary: 'bg-[#EEF2FF] text-primary',
        warning: 'bg-[#FFFFE7] text-[#FFD400] ',
        destructive: 'bg-[#FFF2ED] text-destructive ',
        success: 'bg-[#EEFDE8] text-success '
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
