'use client'

import { useEffect } from 'react'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

export default function ContentDashboard() {
  const { setBreadcrumbs } = useBreadcrumbs()
  useEffect(() => {
    setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }])
  }, [])
  return (
    <div>
      <p>admin</p>
    </div>
  )
}
