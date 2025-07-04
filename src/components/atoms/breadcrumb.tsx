'use client'

import * as React from 'react'

import { ChevronRight } from 'lucide-react'

import { cn } from '@/utils/shadcn'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

interface BreadcrumbProps {
  separator?: React.ReactNode
  className?: string
  maxItems?: number
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ separator, className, maxItems = 4 }) => {
  const { breadcrumbs: items } = useBreadcrumbs()
  const shouldShowEllipsis = items.length > maxItems
  const displayedItems = shouldShowEllipsis ? [items[0], { label: '...', href: '#' }, ...items.slice(-2)] : items

  return (
    <nav className={cn('w-full p-3', className)} aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2 text-base">
        {displayedItems.map((item, index) => {
          const isLastItem = index === displayedItems.length - 1
          return (
            <li key={index} className="flex items-center space-x-2">
              {item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    'text-sm font-medium text-gray-500 hover:underline dark:text-gray-400',
                    isLastItem ? 'text-gray-900 dark:text-gray-100' : ''
                  )}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'font-semibold text-gray-900 dark:text-gray-100',
                    isLastItem ? 'text-gray-900 dark:text-gray-100' : ''
                  )}
                >
                  {item.label}
                </span>
              )}
              {index < displayedItems.length - 1 && (
                <span className="text-gray-500">{separator || <ChevronRight size={16} />}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
