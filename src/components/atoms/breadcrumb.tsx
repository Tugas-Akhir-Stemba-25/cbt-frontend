import * as React from 'react'

import { ChevronRight } from 'lucide-react'

import { cn } from '@/utils/shadcn'

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
  separator?: React.ReactNode
  className?: string
  maxItems?: number
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator, className, maxItems = 4 }) => {
  const shouldShowEllipsis = items.length > maxItems
  const displayedItems = shouldShowEllipsis ? [items[0], { label: '...', href: '#' }, ...items.slice(-2)] : items

  return (
    <nav className={cn('w-full p-3', className)} aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2 text-base">
        {displayedItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {item.href ? (
              <a href={item.href} className="font-medium text-gray-500 hover:underline dark:text-gray-400">
                {item.label}
              </a>
            ) : (
              <span className="font-semibold text-gray-900 dark:text-gray-100">{item.label}</span>
            )}
            {index < displayedItems.length - 1 && (
              <span className="text-gray-500">{separator || <ChevronRight size={16} />}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
