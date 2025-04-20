import { Metadata } from 'next'

import { defineMetadata } from '@/lib/metadata'

import ContentDashboard from '@/components/organisms/dashboard/student/ContentDashboard'

import LayoutStudent from './layout'

export const metadata: Metadata = defineMetadata({
  title: 'Dashboard Siswa'
})

export default async function Test() {
  return (
    <LayoutStudent>
      <ContentDashboard />
    </LayoutStudent>
  )
}
