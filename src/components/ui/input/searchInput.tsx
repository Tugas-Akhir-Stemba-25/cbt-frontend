'use client'

import * as React from 'react'

import { Search } from 'lucide-react'

import { cn } from '@/utils/shadcn'

import { Input } from './input'

interface SearchInputProps extends React.ComponentProps<'input'> {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(({ className, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {/* Icon Kaca Pembesar */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <Search className="h-5 w-5 text-muted" />
      </div>
      {/* Input dengan padding kiri untuk mengakomodasi ikon */}
      <Input ref={ref} type="search" {...props} className={cn('w-full pl-10', className)} />
    </div>
  )
})

SearchInput.displayName = 'SearchInput'

export { SearchInput }
