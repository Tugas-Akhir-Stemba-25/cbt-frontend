import * as React from 'react'

import { ChevronRight } from 'lucide-react'

import { cn } from '@/utils/shadcn'

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
  separator?: React.ReactNode
  className?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator, className }) => {
  return (
    <nav
      className={cn('w-full rounded-lg bg-gray-100 p-3 shadow-sm dark:bg-gray-800', className)}
      aria-label="breadcrumb"
    >
      <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {item.href ? (
              <a
                href={item.href}
                className="font-medium text-blue-600 transition-all duration-200 hover:underline dark:text-blue-400"
              >
                {item.label}
              </a>
            ) : (
              <span className="font-semibold text-gray-900 dark:text-gray-100">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="flex items-center text-gray-400 dark:text-gray-500">
                {separator ?? <ChevronRight className="h-4 w-4" />}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
