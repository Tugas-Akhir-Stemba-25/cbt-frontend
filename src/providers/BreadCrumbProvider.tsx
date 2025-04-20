'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Breadcrumb = {
  label: string
  href: string
}

type BreadcrumbContextType = {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined)

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])

  return <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>{children}</BreadcrumbContext.Provider>
}

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbProvider')
  }
  return context
}
