import { Metadata } from 'next'

import { defineMetadata } from '@/lib/metadata'

import ContentDashboard from '@/components/organisms/dashboard/teacher/ContentDashboard'

import LayoutTeacher from './layout'

export const metadata: Metadata = defineMetadata({
  title: 'Dashboard Guru'
})

export default async function Test() {
  return (
    <LayoutTeacher>
      <ContentDashboard />
    </LayoutTeacher>
  )
}
