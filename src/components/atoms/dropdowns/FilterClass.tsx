'use client'

import * as React from 'react'

import { Label } from '@radix-ui/react-label'
import { ChevronDown, ChevronUp, ChevronsUpDownIcon } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface CategoryData {
  [key: string]: string[]
}

const FilterDropdown: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, string[]>>({})
  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({})
  const categories: CategoryData = {
    SIJA: ['2021', '2022', '2023', '2024'],
    TMPO: ['2021', '2022', '2023', '2024'],
    KGSP: ['2021', '2022', '2023', '2024'],
    KJIJ: ['2021', '2022', '2023', '2024'],
    TTL: ['2021', '2022', '2023', '2024'],
    TE: ['2021', '2022', '2023', '2024'],
    TFLM: ['2021', '2022', '2023', '2024']
  }

  const handleCheckboxChange = (category: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category]?.includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...(prev[category] || []), value]
    }))
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const handleCategoryCheckbox = (category: string) => {
    const allChecked = selectedFilters[category]?.length === categories[category].length
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: allChecked ? [] : [...categories[category]]
    }))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 sm:w-48">
          <span>Tampilkan</span>
          <ChevronsUpDownIcon size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="max-h-64 w-48 overflow-auto rounded-md p-2 shadow-lg transition-all duration-200 ease-in-out"
      >
        {Object.entries(categories).map(([category, items]) => (
          <div key={category} className="mb-2">
            <div
              className={`mb-1 flex cursor-pointer items-center justify-between ${selectedFilters[category]?.length ? 'rounded-md bg-primary px-1 text-white' : ''}`}
            >
              <Label className="flex cursor-pointer items-center">
                <Checkbox
                  checked={selectedFilters[category]?.length === items.length}
                  onCheckedChange={() => handleCategoryCheckbox(category)}
                  className="border-muted/1 mr-2"
                />
                {category}
              </Label>
              <div onClick={() => toggleCategory(category)} className="cursor-pointer">
                {expandedCategories[category] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            {expandedCategories[category] && (
              <div className="pl-4">
                {items.map((item) => (
                  <Label
                    key={item}
                    className={`mb-1 flex cursor-pointer items-center ${selectedFilters[category]?.includes(item) ? 'rounded-md bg-primary px-1 text-white' : ''}`}
                  >
                    <Checkbox
                      checked={selectedFilters[category]?.includes(item) || false}
                      onCheckedChange={() => handleCheckboxChange(category, item)}
                      className="border-muted/1 mr-2"
                    />
                    {item}
                  </Label>
                ))}
              </div>
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterDropdown
